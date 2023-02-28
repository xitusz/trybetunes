import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../css/album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artist: '',
      collection: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusics(id);
  }

  getMusics = async (id) => {
    const response = await getMusics(id);
    console.log(response);
    this.setState(({
      musics: [...response],
      artist: response[0].artistName,
      collection: response[0].collectionName,
      artworkUrl: response[0].artworkUrl100,
    }));
  }

  render() {
    const {
      musics,
      artist,
      collection,
      artworkUrl,
    } = this.state;

    return (
      <>
        <Header active="album" />
        <h1>Album</h1>
        <div data-testid="page-album" className="page-album">
          <div className="album-info">
            <img src={ artworkUrl } alt={ `Album: ${collection}` } />
            <h2 data-testid="album-name" className="album-name">{ collection }</h2>
            <p data-testid="artist-name">{ artist }</p>
          </div>
          <div className="album-songs">
            { musics.map((music, index) => (
              index === 0
                ? undefined
                : (
                  <MusicCard
                    music={ music }
                  />
                )
            )) }
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
