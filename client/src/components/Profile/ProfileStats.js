import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileStats extends Component {
  render() {
    const { playerStats } = this.props;

    const playerData = playerStats.map(playData => (
      <li key={playData._id} className="list-group-item">
        <p>
          <strong>Total Time Played:</strong> {playData.totalTimePlayed}
        </p>
        <p>
          <strong>Songs Played:</strong> {playData.songsPlayed}
        </p>
        <p>
          <strong>Missions Completed:</strong> {playData.missionsCompleted}
        </p>
        <p>
          <strong>Lessons Completed:</strong> {playData.lessonsCompleted}
        </p>
        <p>
          <strong>Highest Arcade Score:</strong> {playData.highestArcadeScore}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Player Stats</h3>
          {playerData}
        </div>
      </div>
    );
  }
}

ProfileStats.propTypes = {};

export default ProfileStats;
