import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteStaff } from '../../actions/profileActions';

class Staff extends Component {
  onDeleteClick(id) {
    this.props.deleteStaff(id);
  }

  render() {
    const staff = this.props.staff.map(sta => (
      <tr key={sta._id}>
        <td><img src={require("../../img/mbappe.jpg")} className="rounded-circle imgsize"/></td>
        <td>{sta.name}</td>
        <td>{sta.surname}</td>
        <td>{sta.nationality}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, sta._id)}
            className="btn btn-danger"
          >
          Supprimer
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Staff</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Nationalité</th>
              <th />
            </tr>
            {staff}
          </thead>
        </table>
      </div>
    );
  }
}

Staff.propTypes = {
  deleteStaff: PropTypes.func.isRequired
};

export default connect(null, { deleteStaff })(Staff);
