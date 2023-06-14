import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    isDisable: true,
    email: '',
    password: '',
  };

  handleEmail = ({ target }) => {
    const { value } = target;
    this.setState({ email: value }, () => {
      this.handleLogin();
    });
  };

  handlePassword = ({ target }) => {
    const { value } = target;
    this.setState({ password: value }, () => {
      this.handleLogin();
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const minLength = 6;

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isDisable = !(validateEmail.test(email) && password.length >= minLength);

    this.setState({ isDisable });
  };

  render() {
    const { dispatch } = this.props;
    const { isDisable, email, password } = this.state;

    return (
      <div className="container">
        <h1>Trybe Wallet</h1>

        <form className="login">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleEmail }
            value={ email }
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handlePassword }
            value={ password }
          />

          <Link to="/carteira">
            <button
              disabled={ isDisable }
              onClick={ () => dispatch(addUser(email)) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
