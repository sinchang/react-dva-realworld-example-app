import { Link } from 'dva/router';
// import ListErrors from './ListErrors';
import React from 'react';
import { connect } from 'dva';

const mapStateToProps = state => ({ ...state.auth });

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.changeEmail = ev => this.setState({ email: ev.target.value });
    this.changePassword = ev => this.setState({ password: ev.target.value });
    this.changeUsername = ev => this.setState({ username: ev.target.value })
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.dispatch({
        type: 'user/register',
        payload: this.state
      })
    }
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              {/* <ListErrors errors={this.props.errors} /> */}

              <form onSubmit={this.submitForm()}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      onChange={this.changeUsername} />
                  </fieldset>

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
                    Sign up
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

export default connect(mapStateToProps)(Register);
