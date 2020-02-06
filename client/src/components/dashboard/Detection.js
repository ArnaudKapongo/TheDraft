import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteDetection } from '../../actions/profileActions';

class Detection extends Component {
  onDeleteClick(id) {
    this.props.deleteDetection(id);
  }

  render() {

   const detection = this.props.detection.map(det => (
      <tr key={det._id}>
        
        <td>{det.name}</td>
        <td>{det.surname}</td>
        <td>{det.school}</td>
        <td>{det.location}</td>
        <td>
          <Moment format="DD/MM/YYYY">{det.from}</Moment> -
          {det.to === null ? (
            'Maintenant'
          ) : (
            <Moment format="DD/MM/YYYY">{det.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, det._id)}
            className="btn btn-danger"
          >
            Supprimer
          </button>
        </td>
      </tr>
    )); 
    return (
      <div>
        <h4 className="mb-4">Détection</h4>
        <table className="table">
          <thead>
            <tr>
              
              <th>Nom</th>
              <th>Prénom</th>
              <th>Centre de formation</th>
              <th>Ville</th>
              <th>Date de détection</th>
              <th />
            </tr>
            {detection} 
          </thead>
        </table>
      </div>
    );
  }
}

Detection.propTypes = {
  deleteDetection: PropTypes.func.isRequired
};

export default connect(null, { deleteDetection })(Detection);
