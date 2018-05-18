import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { addPlayerStats } from "../../actions/profileActions";

class AddPlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTimePlayed: "",
      songsPlayed: "",
      missionsCompleted: "",
      lessonsCompleted: "",
      highestArcadeScore: "",
      errors: {},
      disabled: false
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

    const playerStatsData = {
      totalTimePlayed: this.state.totalTimePlayed,
      songsPlayed: this.state.songsPlayed,
      missionsCompleted: this.state.missionsCompleted,
      lessonsCompleted: this.state.lessonsCompleted,
      highestArcadeScore: this.state.highestArcadeScore
    };
    console.log("submit");
    this.props.addPlayerStats(playerStatsData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="playerstats">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <div className="h1 display-4 text-center">Add Player Stats</div>
              <form onSubmit={this.onSubmit} >
              <TextFieldGroup
                placeholder="Total Time Played"
                name="totalTimePlayed"
                value={this.state.totalTimePlayed}
                onChange={this.onChange}
                error={errors.totalTimePlayed}
                info="Total Time Played in Rocksmith"
              />
              <TextFieldGroup
                placeholder="Songs Played"
                name="songsPlayed"
                value={this.state.songsPlayed}
                onChange={this.onChange}
                error={errors.songsPlayed}
                info="Number of Songs Played in Rocksmith"
              />
              <TextFieldGroup
                placeholder="Missions Completed"
                name="missionsCompleted"
                value={this.state.missionsCompleted}
                onChange={this.onChange}
                error={errors.missionsCompleted}
                info="Number of Missions Completed in Rocksmith"
              />
              <TextFieldGroup
                placeholder="Lessons Completed"
                name="lessonsCompleted"
                value={this.state.lessonsCompleted}
                onChange={this.onChange}
                error={errors.lessonsCompleted}
                info="Number of Lessons Completed in Rocksmith"
              />
              <TextFieldGroup
                placeholder="Highest Arcade Score"
                name="highestArcadeScore"
                value={this.state.highestArcadeScore}
                onChange={this.onChange}
                error={errors.highestArcadeScore}
                info="Highest Arcade Score in Rocksmith"
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

AddPlayerStats.propTypes = {
  addPlayerStats: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addPlayerStats })(
  withRouter(AddPlayerStats)
);
