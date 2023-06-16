import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailInputId = 'email-input';
const passwordInputId = 'password-input';
const emailTest = 'email@email.com';

describe('Testa a tela de login', () => {
  test('Testa os componentes na tela', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(emailInputId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordInputId)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados 1', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'Email@com');
    expect(btnEntrar).toBeDisabled();

    userEvent.type(inputPassword, '12345');
    expect(btnEntrar).toBeDisabled();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados 2', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '12345');

    expect(btnEntrar).toBeDisabled();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados 3', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'email.com');
    userEvent.type(inputPassword, '123456');

    expect(btnEntrar).toBeDisabled();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados 4', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '1234567');

    expect(btnEntrar).toBeEnabled();
  });

  test('Testa se a rota altera após o login bem sucedido', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '1234567');

    userEvent.click(btnEntrar);

    expect(history.location.pathname).toBe('/carteira');
  });

  test('Testa se os dados estão no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    const emailToCheck = emailTest;
    userEvent.type(inputEmail, emailToCheck);
    userEvent.type(inputPassword, '1234567');

    userEvent.click(btnEntrar);
    expect(store.getState().user.email).toBe(emailToCheck);
  });
});
