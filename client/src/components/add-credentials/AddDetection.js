import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDetection } from '../../actions/profileActions';

class AddDetection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      name: '',
      surname: '',
      location: '',
      from: '',
      to: '',
      description: '',
      errors: {}, 
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const detData = {
      school: this.state.school,
      name: this.state.name,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      surname: this.state.surname,
      description: this.state.description
    };

    this.props.addDetection(detData, this.props.history);
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return(
      <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Retour
            </Link>
            <h1 className="display-4 text-center">Ajouter un joueur</h1>
            <p className="lead text-center">
              Jeune prodige, Joueur en progression
            </p>
            <small className="d-block pb-3">* = champs obligatoire</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Centre de formation"
                name="school"
                value={this.state.school}
                onChange={this.onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="Prénom*"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Nom*"
                name="surname"
                value={this.state.surname}
                onChange={this.onChange}
                error={errors.surname}
              />
              <h6>Début de la détection</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>Fin de la détection</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? 'disabled' : ''}
              />
              <TextFieldGroup
                placeholder="Ville"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <TextAreaFieldGroup
                placeholder="Particularité du joueur"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="La description est importante pour les besoins du club."
              />
              <input
                type="submit"
                value="Envoyer"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

AddDetection.propTypes = {
  addDetection: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addDetection })(
  withRouter(AddDetection)
);
