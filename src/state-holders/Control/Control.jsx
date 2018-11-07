import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Control extends PureComponent {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      formvalue: '',
      value: '',
      error: props.errors
    }
  }

  componentWillMount() {
    const error = this.props.validators.map(validator => validator(null)).filter(Boolean)
    this.setState({
      error: [...this.props.errors, ...error]
    })
  }

  validate(value, cb) {
    const error = this.props.validators.map(validator => validator(value)).filter(Boolean)
    this.setState(
      {
        value,
        error: [...this.props.errors, ...error],
        formvalue: error.length ? '' : value
      },
      () => cb && cb(this.state)
    )
    return error
  }

  onChange(evt) {
    const { handleChange, name } = this.props
    const { value } = evt.target
    this.validate(value, () => {
      handleChange(name, { error: this.state.error, value: this.state.formvalue })
    })
  }

  render() {
    const Component = this.props.component
    const { name, submitted, attrs } = this.props
    const { value, error } = this.state

    return <Component input={{ name, value, ...attrs, onChange: this.onChange }} submitted={submitted} error={error} />
  }
}

Control.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func).isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  attrs: PropTypes.shape({}).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired
}

export default Control
