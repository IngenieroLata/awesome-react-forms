import React from 'react'
import PropTypes from 'prop-types'
import './HrLabel.scss'

const HrLabel = ({ name, label, disclaimer, children }) => (
  <div className="form-control geograph-brand-bold--12">
    <div className="form-control__label geograph-edit-medium--14 ngp_color--gray50">
      <label htmlFor={name}>{label}</label>
      {disclaimer && <small>{disclaimer}</small>}
    </div>
    {children}
  </div>
)

HrLabel.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  disclaimer: PropTypes.string
}

HrLabel.defaultProps = {
  disclaimer: ''
}

export default HrLabel
