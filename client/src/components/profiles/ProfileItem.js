import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
        <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.handle}</h3>
            <p>
              <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a>
            </p>
            <p>
              <span>{profile.sport}</span>
            </p>
            
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              Consulter l'équipe
            </Link>
          </div>
          
        </div>
      </div>
    );
  }
}




ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
