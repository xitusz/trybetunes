import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      disabled: true,
      loaded: '',
      artists: [],
      message: '',
    };
  }

  handleChange = ({ target }) => {
    const {
      searchInput,
    } = this.state;

    this.setState({ searchInput: target.value });

    const magicNumber = 2;

    if (searchInput.length + 1 >= magicNumber) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleClick = async () => {
    const {
      searchInput,
    } = this.state;
    this.setState({
      searchInput: '',
      disabled: true,
      loaded: 'loading',
    });
    const data = await searchAlbumsAPI(searchInput);
    if (data.length === 0) {
      this.setState({
        message: 'Nenhum álbum foi encontrado',
      });
    } else {
      this.setState({
        message: `Resultado de álbuns de: ${searchInput}`,
        artists: data,
      });
    }
    this.setState({ loaded: 'loaded' });
  };

  render() {
    const {
      searchInput,
      disabled,
      loaded,
      artists,
      message,
    } = this.state;
    if (loaded === 'loading') return <Loading />;

    return (
      <>
        <Header active="search" />
        <h1>Search</h1>
        <div data-testid="page-search" className="page-search">
          <form className="search">
            <label htmlFor="search">
              <input
                type="text"
                name="search"
                id="search"
                className="input-search"
                data-testid="search-artist-input"
                placeholder="Search"
                value={ searchInput }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              className="search-button"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        </div>
        <span className="result">{ message }</span>
        <div className="result-search">
          {artists.map((artist) => (
            <p key={ artist.collectionId }>
              <Link
                to={ `/album/${artist.collectionId}` }
                data-testid={ `link-to-album-${artist.collectionId}` }
              >
                { artist.collectionName }
              </Link>
            </p>
          ))}
        </div>
      </>
    );
  }
}

export default Search;
