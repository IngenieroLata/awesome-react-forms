import React from 'react'
import PropTypes from 'prop-types'
import './ValueField.scss'

const ValueField = ({ input }) => <span className="geograph-edit-medium--14 text-value">{input.value}</span>

ValueField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired
  }).isRequired
}

export default ValueField
