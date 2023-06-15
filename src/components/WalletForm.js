import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDespesas, requestCurrencies } from '../redux/actions';
import getCurrencies from '../services/issAPI';
import './css/WalletForm.css';

class WalletForm extends Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentaçãoo',
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;

    const data = await getCurrencies();
    const arrayCurrencies = Object.keys(data)
      .filter((currency) => currency !== 'USDT');

    dispatch(requestCurrencies(arrayCurrencies));
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;

    const data = await getCurrencies();

    this.setState((prev) => ({
      id: prev.id + 1,
      exchangeRates: data,
    }), () => {
      dispatch(addDespesas(this.state));
      this.setState((prev) => ({
        ...prev,
        value: '',
        description: '',
      }));
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <div className="containerForm">
        <form>
          <label htmlFor="value">Valor</label>
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />

          <label htmlFor="description">Despeza</label>
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />

          <label htmlFor="currency">Moeda</label>
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencyId) => (
              <option key={ currencyId } value={ currencyId }>{ currencyId }</option>
            ))}
          </select>

          <label htmlFor="method">Método de Pagamento</label>
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <label htmlFor="tag">Tag</label>
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button onClick={ this.handleClick }>Adicionar despesa</button>
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
