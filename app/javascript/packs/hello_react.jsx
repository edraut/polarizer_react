// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios';

function afterDomLoad(){ //Do Stuff after the DOM has finished loading
  var csrf_token = document.querySelector('meta[name="csrf-token"]').content
  axios.defaults.headers.common['X-CSRF-Token'] = csrf_token
}
var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "interactive" || document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval);
    afterDomLoad();
  }
}, 10);

const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    axios.post('/login',{
      email: this.state.email
    }).
    then(function (response) {
      console.log(response.data);
    })
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <Hello name="World!" />
      <LoginForm />
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})
