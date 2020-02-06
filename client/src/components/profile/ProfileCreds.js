import React, { Component } from 'react';


class ProfileCreds extends Component {
  render() {
    const { detection, staff } = this.props;

    const staItems = staff.map(sta => (
      <li key={sta._id} className="list-group-item">
        <p><strong>Nationalité:</strong> {sta.nationality}</p>

        <p>
          <strong>Nom:</strong> {sta.name}
        </p>
        <p>
          <strong>Prénom:</strong> {sta.surname}
        </p>
        <p>
          {sta.description === '' ? null : (
            <span>
              <strong>Description: </strong> {sta.description}
            </span>
          )}
        </p>
      </li>
    ));

    const detItems = detection.map(det => (
      <li key={det._id} className="list-group-item">
        <p><strong>Centre de formation:</strong> {det.school}</p>

        <p>
          <strong>Nom:</strong> {det.name}
        </p>
        <p>
          <strong>Prénom:</strong> {det.surname}
        </p>
        <p>
          {det.description === '' ? null : (
            <span>
              <strong>Description: </strong> {det.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Detection</h3>
          {detItems.length > 0 ? (
            <ul className="list-group">{detItems}</ul>
          ) : (
            <p className="text-center">Aucune détection</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Staff</h3>
          {staItems.length > 0 ? (
            <ul className="list-group">{staItems}</ul>
          ) : (
            <p className="text-center">Aucun membre du staff</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
