import React from 'react'
import PropTypes from 'prop-types'
import CoreControl from './Control'

function structureProps(WrappedComponent) {
  const Control = ({ name, validators, component, handleChange, forwardedRef, submitted, error, ...attrs }) => (
    <WrappedComponent ref={forwardedRef} name={name} validators={validators} component={component} errors={error} submitted={submitted} handleChange={handleChange} attrs={attrs} />
  )

  Control.propTypes = {
    forwardedRef: PropTypes.func,
    name: PropTypes.string.isRequired,
    validators: PropTypes.arrayOf(PropTypes.func),
    component: PropTypes.func.isRequired,
    attrs: PropTypes.shape({}),
    handleChange: PropTypes.func,
    submitted: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string)
  }

  const forwardedRef = () => null
  const handleChange = () => null
  Control.defaultProps = {
    attrs: {},
    forwardedRef,
    handleChange,
    validators: [],
    error: [],
    submitted: false
  }

  return React.forwardRef((props, ref) => <Control {...props} forwardedRef={ref} />)
}

export default structureProps(CoreControl)
