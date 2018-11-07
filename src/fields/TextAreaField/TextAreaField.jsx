import React from 'react'
import PropTypes from 'prop-types'
import './TextAreaField.scss'

const TextAreaField = ({ input, meta: { invalid, error } }) => (
  <div>
    <textarea
      key={input.name}
      className={`field-base input-textarea geograph-edit-regular--14 ngp_color--black ngp_bordercolor--gray10 ${invalid ? 'ngp_bordercolor--danger' : ''}`}
      {...input}
    />
    {invalid && (
      <span key={`error_${input.name}`} className="form-error geograph-edit-regular--14 ngp_color--danger">
        {error}
      </span>
    )}
  </div>
)

TextAreaField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({}).isRequired
}

export default TextAreaField
