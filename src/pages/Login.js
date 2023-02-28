import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import img from '../img.jpg';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginInput: '',
      disabled: true,
      loaded: '',
    };
  }

  inputHandle = ({ target }) => {
    const {
      loginInput,
    } = this.state;

    this.setState({ loginInput: target.value });

    const magicNumber = 3;

    if (loginInput.length + 1 >= magicNumber) {
      this.setState({
        disabled: false,
      });
    }
  }

  buttonHandle = async () => {
    const {
      loginInput,
    } = this.state;
    this.setState({ loaded: 'loading' });
    await createUser({ name: loginInput });
    this.setState({ loaded: 'loaded' });
  };

  render() {
    const {
      loginInput,
      disabled,
      loaded,
    } = this.state;

    if (loaded === 'loading') return <Loading />;
    if (loaded === 'loaded') return <Redirect to="/search" />;

    return (
      <div data-testid="page-login" className="page-login">
        <h1>Login</h1>
        <img
          className="image-login"
          src={ img }
          alt="Imagem de um headphone"
          height="300px"
        />
        <div className="login">
          <label htmlFor="login">
            <input
              type="text"
              name="login"
              id="login"
              className="input-login"
              data-testid="login-name-input"
              placeholder="Enter your name"
              value={ loginInput }
              onChange={ this.inputHandle }
            />
          </label>
          <button
            type="button"
            className="login-button"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.buttonHandle }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
