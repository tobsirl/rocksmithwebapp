import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Form, FormGroup, Input, Label } from "reactstrap";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      platform: this.state.platform,
      instrementType: this.state.instrementType,
      instrementModel: this.state.instrementModel,
      experience: this.state.experience,
      favouriteMusic: this.state.favouriteMusic,
      favouriteArtists: this.state.favouriteArtists,
      bio: this.state.bio
    };
    this.props.createProfile(profileData, this.props.history);
    console.log(profileData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    const platform = [
      { label: "* Select Gaming Platform", value: 0 },
      { label: "XBox", value: "XBox" },
      { label: "PlayStation", value: "PlayStation" },
      { label: "PC", value: "PC" }
    ];

    const instrement = [
      { label: "* Select Instrement", value: 0 },
      { label: "Guitar", value: "Guitar" },
      { label: "Bass", value: "Bass" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some infomation to make your profile
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Ingame Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Your ingame Rocksmith Handle"
                />
                <SelectListGroup
                  placeholder="Platform"
                  name="platform"
                  value={this.state.platform}
                  onChange={this.onChange}
                  options={platform}
                  error={errors.platform}
                  info="Chose your gaming platform"
                />
                <SelectListGroup
                  placeholder="instrementType"
                  name="platform"
                  value={this.state.platform}
                  onChange={this.onChange}
                  options={instrement}
                  error={errors.platform}
                  info="Chose your Instrement"
                />
                <TextFieldGroup
                  placeholder="Instrement Model"
                  name="instrementModel"
                  value={this.state.instrementModel}
                  onChange={this.onChange}
                  error={errors.instrementModel}
                  info="Your Intrement Model"
                />
                <TextFieldGroup
                  placeholder="Experience"
                  name="experience"
                  value={this.state.experience}
                  onChange={this.onChange}
                  error={errors.experience}
                  info="Your Experience"
                />
                <TextFieldGroup
                  placeholder="Favourite Music"
                  name="favouriteMusic"
                  value={this.state.favouriteMusic}
                  onChange={this.onChange}
                  error={errors.favouriteMusic}
                  info="Favourite Music, Please use comma separated values"
                />
                <TextFieldGroup
                  placeholder="Favourite Artists"
                  name="favouriteArtists"
                  value={this.state.favouriteArtists}
                  onChange={this.onChange}
                  error={errors.favouriteArtists}
                  info="Favourite Artists, Please use comma separated values"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Additional Information"
                />
                <input
                  type="submit"
                  value="Submit"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
