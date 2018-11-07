import React from 'react'
import PropTypes from 'prop-types'
import './TextField.scss'

const TextField = ({ input, error, submitted }) => (
  <React.Fragment>
    <input
      className={`field-base input-text geograph-edit-regular--14 ngp_color--black ngp_bordercolor--gray10 ${
        (submitted || input.value) && error.length ? 'ngp_bordercolor--danger' : ''
      }`}
      {...input}
    />
    <ul className="errors ngp_color--danger geograph-edit-regular--14">{submitted || input.value ? error.map(e => <li key={e}>{e}</li>) : null}</ul>
  </React.Fragment>
)

TextField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  error: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool
}

TextField.defaultProps = {
  error: [],
  submitted: true
}

export default TextField
