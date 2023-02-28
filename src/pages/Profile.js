import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../css/profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      users: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
      loaded: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loaded: 'loading' });
    const user = await getUser();
    this.setState({ users: user, loaded: 'loaded' });
  }

  render() {
    const {
      loaded,
      users,
    } = this.state;

    return (
      <>
        <Header active="profile" />
        <h1>Profile</h1>
        <div className="page-profile" data-testid="page-profile">
          { loaded === 'loading' ? <Loading /> : (
            <div>
              <img
                data-testid="profile-image"
                className="profile-image"
                src={ users.image }
                alt={ users.name }
              />
              <p className="profile-title">Name:</p>
              <p>{ users.name }</p>
              <p className="profile-title">Email:</p>
              <p>{ users.email }</p>
              <p className="profile-title">Descrição:</p>
              <p>{ users.description }</p>
              <Link
                to="profile/edit"
                users={ users }
                className="profile-button"
              >
                Editar perfil
              </Link>
            </div>
          ) }
        </div>
      </>
    );
  }
}

export default Profile;
