import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      platform: "",
      instrementType: "",
      instrementModel: "",
      experience: "",
      favouriteMusic: "",
      favouriteArtists: "",
      bio: "",
      playerStats: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReveiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Form>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text center">Create Your Profile</h1>
                <p className="lead text center">
                  Let's get some information to make your profile stand out
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <FormGroup>
                  <Label for="intrementSelect">Select your Intrement</Label>
                  <Input type="select" name="select" id="intrementSelect">
                    <option>Guitar</option>
                    <option>Bass</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
