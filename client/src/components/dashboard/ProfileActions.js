import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Modifier votre profil
      </Link>
      <Link to="/add-staff" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" />
        Ajouter un membre
      </Link>
      <Link to="/add-detection" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" />
        Ajouter une détection
      </Link>
    </div>
  );
};

export default ProfileActions;
