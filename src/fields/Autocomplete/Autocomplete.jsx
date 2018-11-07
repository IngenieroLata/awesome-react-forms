import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from '../TextField'

import './Autocomplete.scss'

class Autocomplete extends PureComponent {
  constructor(props) {
    super(props)

    const { input, results, getView, onSelection } = props

    this.state = {
      inputValue: input.value && Object.keys(input.value).length ? getView(input.value) : '',
      selectedValue: input.value,
      selectedIndex: results.indexOf(input.value),
      serching: false,
      openSuggestions: false
    }
    this.autocomplete = React.createRef()
    onSelection(input.value)
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleOnBlur)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOnBlur)
  }

  handleOnChange = ({ target: { value } }) => {
    const { min, input, onSelection } = this.props
    const openSuggestions = value.length >= min
    this.setState({
      inputValue: value,
      selectedValue: null,
      selectedIndex: -1,
      openSuggestions
    })
    if (openSuggestions) {
      input.onChange(value)
    }
    if (input.value) {
      onSelection({})
    }
  }

  handleOnBlur = ({ target }) => {
    if (!this.autocomplete.current.contains(target) && !this.state.selectedValue) {
      this.setState({
        openSuggestions: false,
        selectedIndex: -1,
        inputValue: ''
      })
    }
  }

  handleOnSelected = (selectedValue, selectedIndex, evt) => {
    const { getView, onSelection } = this.props

    this.setState({
      selectedIndex,
      selectedValue,
      inputValue: getView(selectedValue),
      openSuggestions: false
    })

    onSelection(selectedValue)

    evt.preventDefault()
  }

  renderList() {
    const { results, input, emptyMessage, keyId, getView } = this.props
    if (!Array.isArray(results)) {
      return (
        <li className="autcomplete__item autcomplete__item--empty">
          <span className="geograph-edit-regular--14  ngp_color--black">{results}</span>
        </li>
      )
    }

    if (!results.length) {
      return (
        <li className="autcomplete__item autcomplete__item--empty">
          <span className="geograph-edit-regular--14  ngp_color--black">{emptyMessage || 'No results found'}</span>
        </li>
      )
    }

    return results.map((item, i) => (
      <li key={item[keyId]} className={`autcomplete__item ${input.value && input.value[keyId] === item[keyId] ? 'active' : ''}`}>
        <a href="#" className="geograph-edit-regular--14 ngp_color--black" onClick={e => this.handleOnSelected(item, i, e)}>
          {getView(item)}
        </a>
      </li>
    ))
  }

  render() {
    const { openSuggestions } = this.state
    const { input, error, submitted } = this.props
    return (
      <div className="autocomplete" ref={this.autocomplete}>
        <TextField input={{ ...input, value: this.state.inputValue, onChange: this.handleOnChange, onBlur: this.handleOnBlur }} error={error} submitted={submitted} />
        {openSuggestions && <ul className="autcomplete__suggestions">{this.renderList()}</ul>}
      </div>
    )
  }
}

Autocomplete.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.shape({}),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  onSelection: PropTypes.func.isRequired,
  getView: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Array).isRequired,
  submitted: PropTypes.bool.isRequired,
  results: PropTypes.oneOfType([PropTypes.instanceOf(Array), PropTypes.string]).isRequired,
  emptyMessage: PropTypes.string,
  keyId: PropTypes.string,
  min: PropTypes.number
}

Autocomplete.defaultProps = {
  results: [],
  min: 2,
  keyId: 'id',
  emptyMessage: ''
}

export default Autocomplete
