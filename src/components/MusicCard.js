import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../css/musicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: '',
      checkBox: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  saveFavorites = async ({ target }) => {
    const { music, removeFavorite } = this.props;
    const { checked } = target;
    this.setState({ loaded: 'loading' }, async () => {
      if (checked) {
        await addSong(music);
        this.setState({
          loaded: 'loaded',
          checkBox: true,
        });
      } else {
        await removeSong(music);
        await removeFavorite();
        this.setState({
          loaded: 'loaded',
          checkBox: false,
        });
      }
    });
  }

  getFavorite = async () => {
    const { music } = this.props;
    const favorites = await getFavoriteSongs();
    if (favorites.some((favorite) => music.trackId === favorite.trackId)) {
      this.setState({
        checkBox: true,
      });
    }
  }

  render() {
    const { music } = this.props;
    const {
      loaded,
      checkBox,
    } = this.state;

    return (
      <div className="music-info">
        { loaded === 'loading' ? <Loading /> : (
          <>
            <div className="music">
              <p className="music-title">{ music.trackName }</p>
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                className="favorite-button"
                checked={ checkBox }
                onChange={ this.saveFavorites }
              />
              Favoritar
            </div>
            <audio
              data-testid="audio-component"
              className="audio"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.string,
  }).isRequired,
  removeFavorite: PropTypes.func,
};

MusicCard.defaultProps = {
  removeFavorite: () => {},
};

export default MusicCard;
