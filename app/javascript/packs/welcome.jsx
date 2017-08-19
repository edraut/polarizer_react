// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';

class WelcomeControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.state = {swelcomeAction: 'just got here'};
  }
  handleLoginClick() {
    this.setState({welcomeAction: 'logging in'});
  }

  handleSignUpClick() {
    this.setState({welcomeAction: 'signing up'});
  }

  handleCancelClick() {
    this.setState({welcomeAction: 'just got here'})
  }

  handleErrors(errors){
    this.setState({errors: errors})
  }
  isLoggedIn(){
    let logged_in_string = document.querySelector('meta[name="session_status"]').content
    return eval(logged_in_string)
  }
  render() {
    if(this.isLoggedIn()){
      window.location = '/dashboard'
    } else {
      const welcomeAction = this.state.welcomeAction;
      var current_view = <WelcomeContent onLoginClick={() => this.handleLoginClick()} onSignUpClick={() => this.handleSignUpClick()} />;
      switch (welcomeAction) {
        case 'logging in':
          current_view = (
            <div className="page-container">
              <WelcomeContent onLoginClick={() => this.handleLoginClick()} onSignUpClick={() => this.handleSignUpClick()} />
              <LoginForm onCancelClick={() => this.handleCancelClick()} handleErrors={(errors) => this.handleErrors(errors)} errors={this.state.errors} />
            </div>
          );
          break;
        case 'signing up':
          current_view = (
            <div className="page-container">
              <WelcomeContent onLoginClick={() => this.handleLoginClick()} onSignUpClick={() => this.handleSignUpClick()} />
              <SignUpForm onCancelClick={() => this.handleCancelClick()} handleErrors={(errors) => this.handleErrors(errors)} errors={this.state.errors} />
            </div>
          );
      }
      return (
        <div>
          {current_view}
        </div>
      );
    }
  }
}

function WelcomeContent(props) {
  return (
    <div className="container">
      <div className="top-nav">
        <a className="span right pill" onClick={props.onLoginClick}>Login</a>
        <a className="span right pill" onClick={props.onSignUpClick}>Sign Up</a>
      </div>

      <div className="row">
        <h1>Polarizer</h1>

        <h2> A Social Network to Enhance Our Reactionary Disdain for Those Who Think Differently From Us</h2>
        <h3> and </h3>
        <h2> Reinforce Our Misperception That All the Smartest People Agree with Us</h2>
      </div>
    </div>
  );
}

function RequestErrors(props){
  if(typeof props.errors != 'undefined'){
    return (
      <div className="error row margin">
        {props.errors}
      </div>
    );
  } else {
    return  null;
  }
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
    let login_form = this
    axios({
      method: 'post',
      url: '/login',
      data: {
        email: this.state.email
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    }).
    then(function (response) {
      if(200 == response.status){
        window.location = '/dashboard'
      } else {
        login_form.props.handleErrors(response.data.errors)
      }
    })
    event.preventDefault()
  }
  render() {
    return (
      <div id="hooch-mask">
        <div id="hooch-modal">
          <RequestErrors errors={this.props.errors} />
          <div className="row">
            <form onSubmit={this.handleSubmit} className="span">
              <label>
                Email:
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <button onClick={this.props.onCancelClick} className="span">cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', first_name: '', last_name: '', handle: ''};

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
    let signup_form = this
    axios({
      method: 'post',
      url: '/create_user',
      data: {
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        handle: this.state.handle
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    }).
    then(function (response) {
      if(200 == response.status){
        window.location = '/dashboard'
      } else {
        console.log(response)
        signup_form.props.handleErrors(response.data.errors)
      }
    })
    event.preventDefault()
  }
  render() {
    return (
      <div id="hooch-mask">
        <div id="hooch-modal">
          <div id="new_user_form">
            <RequestErrors errors={this.props.errors} />
            <form onSubmit={this.handleSubmit} className="simple_form new_user" id="new_user">
              <label className="row">
                Email:
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
              </label>
              <label className="row">
                First name:
                <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
              </label>
              <label className="row">
                Last name:
                <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
              </label>
              <label className="row">
                Handle:
                <input type="text" name="handle" value={this.state.handle} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" className="span" />
            </form>
            <button onClick={this.props.onCancelClick} className="span">cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var csrf_token = document.querySelector('meta[name="csrf-token"]').content
  axios.defaults.headers.common['X-CSRF-Token'] = csrf_token
  ReactDOM.render(
    <WelcomeControl />,
    document.body.appendChild(document.createElement('div'))
  )
})
