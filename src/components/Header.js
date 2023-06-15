import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/Header.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="containerHeader">
        <p>Logo</p>
        <div className="infoLogin">
          <p data-testid="email-field">
            Email:
            {' '}
            { email }
          </p>
          <p data-testid="total-field">Despeza Total: R$ 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);
