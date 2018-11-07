import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import Autocomplete from './Autocomplete'

const withError = withState('error', 'setError', [])
const withValue = withState('value', 'setValue', {})
const withResults = withState('results', 'setResults', [])

const handlers = withHandlers({
  onChange: ({ setResults, asyncFn }) => query => {
    setResults('Loading...')
    asyncFn(query).then(({ cities }) => {
      setResults(cities)
    })
  },
  onSelection: ({ validators, setValue, setError, name, handleChange }) => value => {
    setValue(value)
    const error = validators.map(validator => validator(value)).filter(Boolean)
    setError(error)
    handleChange(name, { value, error })
  }
})

const Control = props => {
  const { name, placeholder, value, keyAcess, results, onChange, onSelection, error, submitted } = props
  return (
    <div>
      <Autocomplete
        input={{
          name,
          placeholder,
          autoComplete: 'off',
          value,
          onChange
        }}
        onSelection={onSelection}
        error={error}
        submitted={submitted}
        getView={item => `${item.name}, ${item.adminname1}, ${item.countryname}`}
        keyId={keyAcess}
        results={results}
      />
    </div>
  )
}

Control.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired,
  keyAcess: PropTypes.string.isRequired,
  results: PropTypes.oneOfType([PropTypes.instanceOf(Array), PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  onSelection: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Array).isRequired,
  submitted: PropTypes.bool.isRequired
}

export default compose(
  withError,
  withValue,
  withResults,
  handlers
)(Control)
