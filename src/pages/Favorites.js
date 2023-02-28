import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../css/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesMusic: [],
    };
  }

  componentDidMount() {
    this.favorites();
  }

  favorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoritesMusic: favorites });
  };

  render() {
    const { favoritesMusic } = this.state;
    return (
      <>
        <Header active="favorites" />
        <h1>Favorite Songs</h1>
        <div className="page-favorites" data-testid="page-favorites">
          <div className="favorite-songs">
            {
              favoritesMusic.map((favorite) => (
                <MusicCard
                  key={ favorite.trackId }
                  music={ favorite }
                  removeFavorite={ this.favorites }
                />))
            }
          </div>
        </div>
      </>
    );
  }
}

export default Favorites;
