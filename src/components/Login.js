import { Link } from 'dva/router';
// import ListErrors from './ListErrors';
import React from 'react';
import { connect } from 'dva';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.changeEmail = ev => this.setState({ email: ev.target.value });
    this.changePassword = ev => this.setState({ password: ev.target.value });
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.dispatch({
        type: 'user/login',
        payload: this.state
      });
    };
  }

  componentWillUnmount() {
    // this.props.onUnload();
  }

  render() {
    const email = this.state.email;
    const password = this.state.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">
                  Need an account?
                </Link>
              </p>

              {/* <ListErrors errors={this.props.errors} /> */}

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
