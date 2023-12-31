import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData, { currencies, expenses, mockTotais } from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_TO_CHECK = 'teste@trybe.com';

const totalId = 'total-field';
const currencyId = 'currency-input';

describe('Testando página da carteira', () => {
  test('testando elementos do Header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(screen.getByTestId('email-field')).toBeInTheDocument();
    expect(screen.getByTestId(totalId)).toBeInTheDocument();
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
  });

  test('testando elementos do Header com valores iniciais', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: {
          user: { email: EMAIL_TO_CHECK },
        },
      },
    );
    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId(totalId);
    const currency = screen.getByTestId('header-currency-field');

    expect(email).toHaveTextContent(EMAIL_TO_CHECK);
    expect(total).toHaveTextContent('0.00');
    expect(currency).toHaveTextContent('BRL');
  });

  test('testando elementos do Form', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId(currencyId)).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
  });
});

const initialState = {
  wallet: {
    currencies,
    expenses,
  },
};

describe('Testando Valores Wallet', () => {
  test('Valores no HEADER', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState,
      },
    );

    const total = screen.getByTestId(totalId);

    expect(total).toHaveTextContent(mockTotais.totalGeral);
  });

  test('Valores no Wallet Form', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState,
      },
    );

    const currencyInput = screen.getByTestId(currencyId);

    expect(currencyInput.children).toHaveLength(initialState.wallet.currencies.length);
  });
});

describe.skip('Manipulando Despesas', () => {
  test('Adicionando despesa', async () => {
    const { store } = renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: {
          wallet: {
            currencies,
            expenses: [],
            editor: false,
            idToEdit: 0,
          },
        },
      },
    );
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId(currencyId);
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    const btnAdd = screen.getByText(/adicionar despesa/i);

    // mockar
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    act(() => {
      userEvent.type(valueInput, expenses[0].value);
      userEvent.type(descriptionInput, expenses[0].description);
      userEvent.selectOptions(currencyInput, expenses[0].currency);
      userEvent.selectOptions(methodInput, expenses[0].method);
      userEvent.selectOptions(tagInput, expenses[0].tag);
      userEvent.click(btnAdd);
    });

    await waitFor(() => {
      console.log(store.getState());
    });
  });

  test('Removendo despesa', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: {
          wallet: {
            currencies,
            expenses,
            editor: false,
            idToEdit: 0,
          },
        },
      },
    );

    const firstDelButton = screen.getAllByRole('button', { name: /excluir/i });
    userEvent.click(firstDelButton[0]);
  });
});
