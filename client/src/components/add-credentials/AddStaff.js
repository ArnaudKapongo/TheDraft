import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addStaff } from '../../actions/profileActions';

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      nationality: '',
      description: '',
      errors : {},
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

    const staData = {
      name: this.state.name,
      surname: this.state.surname,
      description: this.state.description,
      nationality: this.state.nationality
    };

    this.props.addStaff(staData, this.props.history);
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
      <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Retour
            </Link>
            <h1 className="display-4 text-center">Staff</h1>
            <p className="lead text-center">
              Joueur du club, personnel
            </p>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Prénom"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Nom"
                name="surname"
                value={this.state.surname}
                onChange={this.onChange}
                error={errors.surname}
              />
              <TextFieldGroup
                placeholder="Nationalité"
                name="nationality"
                value={this.state.nationality}
                onChange={this.onChange}
                error={errors.nationality}
              />
              <TextAreaFieldGroup
                placeholder="Particularité du joueur"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Description est importante pour les besoins du club."
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

AddStaff.propTypes = {
  addStaff: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addStaff })(
  withRouter(AddStaff)
);
