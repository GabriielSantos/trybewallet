import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/Header.css';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;

    const test = (expenses.length < 1) ? (0) : (
      expenses.reduce((acc, curr) => acc + (Number(curr.value) * curr
        .exchangeRates[curr.currency].ask), 0).toFixed(2));

    return test;
  };

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
          <p>
            Despeza Total: R$
            {' '}
            <span data-testid="total-field">{ this.totalExpenses() }</span>
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
export default connect(mapStateToProps)(Header);
