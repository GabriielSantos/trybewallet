import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCurrencies } from '../redux/actions';
import getCurrencies from '../services/issAPI';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    const data = await getCurrencies();
    const arrayCurrencies = Object.keys(data)
      .filter((currency) => currency !== 'USDT');

    dispatch(requestCurrencies(arrayCurrencies));
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            name="valor"
            id="valor"
            data-testid="value-input"
          />

          <label htmlFor="despeza">Despeza</label>
          <input
            type="text"
            name="despeza"
            id="despeza"
            data-testid="description-input"
          />

          <label htmlFor="moeda">Moeda</label>
          <select name="moeda" id="moeda" data-testid="currency-input">
            {currencies.map((current) => (
              <option key={ current } value={ current }>{ current }</option>
            ))}
          </select>

          <label htmlFor="metPgto">Método de Pagamento</label>
          <select name="metPgto" id="metPgto" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>

          <label htmlFor="tag">Tag</label>
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
