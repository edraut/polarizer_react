import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Welcome = props => (
  <Topnav />
  <div class="row">
    <h1>Polarizer</h1>

    <h2> A Social Network to Enhance Our Reactionary Disdain for Those Who Think Differently From Us</h2>
    <h3> and </h3>
    <h2> Reinforce Our Misperception That All the Smartest People Agree with Us</h2>
  </div>
)

const TopNav = props => (
  <div class="top-nav">
    <%= ajax_link 'Sign Up', {props.signup_path}, {class: 'span right pill'}, '' %>
    <%= ajax_link 'Login', {props.login_path}, {class: 'span right pill'}, '' %>
  </div>
)

class LoginLink extends React.Component {
  handleClick() {
    $.
  }
  render() {
    return (
      <a onClick={handleClick}>
    )
  }
)
Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="World!" />,
    document.body.appendChild(document.createElement('div')),
  )
})


