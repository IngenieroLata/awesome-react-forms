import React from 'react'
import PropTypes from 'prop-types'
import './Fixes.scss'

const Fixes = ({ prefix, postfix, styleClass, children }) => (
  <div className={`form-control__input ${styleClass}`}>
    {prefix && <span className="prefix geograph-edit-regular--14">{prefix}</span>}
    <span className="control">{children}</span>
    {postfix && <span className="postfix geograph-edit-regular--14">{postfix}</span>}
  </div>
)

Fixes.propTypes = {
  children: PropTypes.element.isRequired,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  styleClass: PropTypes.string
}

Fixes.defaultProps = {
  prefix: '',
  postfix: '',
  styleClass: ''
}

export default Fixes
