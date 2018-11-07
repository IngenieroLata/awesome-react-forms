import React from 'react'
import PropTypes from 'prop-types'
import Fixes from '../Fixes'

const Row = ({ styleClass, children, ...args }) => {
  if (args.prefix || args.postfix) {
    return (
      <Fixes styleClass={styleClass} {...args}>
        {children}
      </Fixes>
    )
  }
  return <div className={styleClass}>{children}</div>
}

Row.propTypes = {
  children: PropTypes.element.isRequired,
  styleClass: PropTypes.string
}

Row.defaultProps = {
  styleClass: 'ngp_row-gut-1'
}

export default Row
