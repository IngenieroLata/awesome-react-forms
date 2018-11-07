import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../fields/TextField'
import Control from '../Control'
import Autocomplete from '../../fields/Autocomplete'

export const validate = (value, validators = []) => validators.map(validator => validator(value)).filter(Boolean)

class Form extends PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.controls = {}

    this.state = {
      values: {},
      errors: {},
      submitted: false
    }

    this.setControlRef = name => element => {
      this.controls = {
        ...this.controls,
        [name]: element
      }
    }
  }

  handleChange(name, { error, value }) {
    this.setState(
      {
        values: {
          ...this.state.values,
          [name]: value
        },
        errors: {
          ...this.state.errors,
          [name]: error
        }
      },
      () => {
        this.props.onChange(this.state.values)
      }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    const errors = Object.keys(this.props.schema)
      .filter(name => typeof this.state.values[name] === 'undefined')
      .reduce((ctrls, name) => ({ ...ctrls, [name]: validate('', this.props.schema[name].validators) }), {})

    this.setState(
      {
        errors: {
          ...this.state.errors,
          ...errors
        },
        submitted: true
      },
      () => {
        const invalid = Object.keys(this.state.errors).filter(name => this.state.errors[name].length)

        this.props.onSubmit({ ...this.state, valid: !invalid.length, invalid: !!invalid.length })
      }
    )
  }

  getField(name, { type, error, ...scheme }) {
    switch (type) {
      case 'autocomplete':
        return <Autocomplete submitted={this.state.submitted} name={name} {...scheme} handleChange={this.handleChange} />
      case 'text':
      case 'password':
      case 'url':
      case 'email':
        return (
          <Control
            type={type}
            name={name}
            component={TextField}
            submitted={this.state.submitted}
            error={error}
            {...scheme}
            handleChange={this.handleChange}
            ref={this.setControlRef(name)}
          />
        )

      default:
        return (
          <Control
            type="text"
            name={name}
            component={TextField}
            submitted={this.state.submitted}
            error={error}
            {...scheme}
            handleChange={this.handleChange}
            ref={this.setControlRef(name)}
          />
        )
    }
  }

  renderField(name) {
    const { wrapper, ...scheme } = this.props.schema[name]
    const field = this.getField(name, scheme)
    if (wrapper) {
      const Wrapper = wrapper
      return (
        <Wrapper key={name} name={name} {...scheme}>
          {field}
        </Wrapper>
      )
    }

    return <React.Fragment key={name}>{field}</React.Fragment>
  }

  render() {
    const { schema, formArgs, children } = this.props
    return (
      <form onSubmit={this.handleSubmit} {...formArgs}>
        {Object.keys(schema).map(name => this.renderField(name))}
        {children}
      </form>
    )
  }
}

Form.propTypes = {
  schema: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formArgs: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired
}

export default Form
