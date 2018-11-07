import React from 'react'
import PropTypes from 'prop-types'
import CoreForm from './Form'

const Form = ({ schema, onChange, onSubmit, children, ...args }) => {
  const schemaObj = Object.keys(schema)
    .filter(name => {
      const { visible } = schema[name]
      return typeof visible === 'undefined' || visible === 'on'
    })
    .reduce((accum, name) => ({ ...accum, [name]: schema[name] }), {})

  return (
    <CoreForm schema={schemaObj} onChange={onChange} onSubmit={onSubmit} formArgs={args}>
      {children}
    </CoreForm>
  )
}

Form.propTypes = {
  schema: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired
}

const onChange = () => null
const onSubmit = () => console.warn('Unhandled Form submit')
Form.defaultProps = {
  onChange,
  onSubmit
}

export default Form
