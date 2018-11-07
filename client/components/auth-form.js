import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  const formContainer = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  }
  if (name === 'login') {
    return (
      <div style={formContainer}>
        <form
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          onSubmit={handleSubmit}
          name={name}
        >
          <div>
            <label className="auth-form-title" htmlFor="email">
              Email
            </label>
            <input className="auth-form-field" name="email" type="text" />
          </div>
          <div>
            <label className="auth-form-title" htmlFor="password">
              Password
            </label>
            <input
              className="auth-form-field"
              name="password"
              type="password"
            />
          </div>
          <div>
            <button className="auth-form-button" type="submit">
              {displayName}
            </button>
          </div>
          {error &&
            error.response && (
              <div style={{marginTop: 15, color: 'red'}}>
                {' '}
                {error.response.data}{' '}
              </div>
            )}
        </form>
        <a className="auth-form-button" href="/auth/google">
          {displayName} with Google
        </a>
      </div>
    )
  } else {
    return (
      <div style={formContainer}>
        <form
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          onSubmit={handleSubmit}
          name={name}
        >
          <div>
            <label className="auth-form-title" htmlFor="firstName">
              First Name
            </label>
            <input className="auth-form-field" name="firstName" type="text" />
          </div>
          <div>
            <label className="auth-form-title" htmlFor="lastName">
              Last Name
            </label>
            <input className="auth-form-field" name="lastName" type="text" />
          </div>
          <div>
            <label className="auth-form-title" htmlFor="username">
              User Name
            </label>
            <input className="auth-form-field" name="username" type="text" />
          </div>
          <div>
            <label className="auth-form-title" htmlFor="email">
              Email
            </label>
            <input className="auth-form-field" name="email" type="text" />
          </div>
          <div>
            <label className="auth-form-title" htmlFor="password">
              Password
            </label>
            <input
              className="auth-form-field"
              name="password"
              type="password"
            />
          </div>
          <div>
            <button className="auth-form-button" type="submit">
              {displayName}
            </button>
          </div>
          {error &&
            error.response && (
              <div style={{marginTop: 15, color: 'red'}}>
                {' '}
                {error.response.data}{' '}
              </div>
            )}
        </form>
        <a className="auth-form-button" href="/auth/google">
          {displayName} with Google
        </a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const username = evt.target.username.value.replace(' ', '')
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, formName, firstName, lastName, username))
      } else {
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
