import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/Table.css';

class Table extends Component {
  getValue = (expense) => (+expense.value).toFixed(2);

  getNameCurrency = (expense) => expense.exchangeRates[expense.currency].name;

  getCambio = (expense) => {
    const currValue = expense.exchangeRates[expense.currency].ask;
    return (+currValue).toFixed(2);
  };

  getConvertValue = (expense) => {
    const { ask } = expense.exchangeRates[expense.currency];
    const result = (expense.value * ask).toFixed(2);
    return +result;
  };

  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>

            { expenses.forEach((expense) => {
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ this.getValue(expense) }</td>
                <td>{ this.getNameCurrency(expense)}</td>
                <td>{ this.getCambio(expense)}</td>
                <td>{ this.getConvertValue(expense)}</td>
                <td>Real</td>
              </tr>;
            })}

          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
export default connect(mapStateToProps)(Table);
