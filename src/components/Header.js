import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: '',
      user: '',
    };
  }

  componentDidMount() {
    this.loadingHandle();
  }

  loadingHandle = async () => {
    this.setState({ loaded: 'loading' });
    const name = await getUser();
    this.setState({
      loaded: 'loaded',
      user: name.name,
    });
  };

  render() {
    const { loaded, user } = this.state;

    if (loaded === 'loading') return <Loading />;
    return (
      <header data-testid="header-component" className="header">
        <span data-testid="header-user-name" className="user">
          {user}
        </span>
        <Link to="/search" data-testid="link-to-search" className="links-header">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites" className="links-header">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile" className="links-header">
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
