export const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : null)

export const required = value => {
  const message = "This field can't be empty"
  if (value && typeof value === 'object') {
    return Object.keys(value).length ? null : message
  }
  return value ? null : message
}

export default {
  email,
  required
}
