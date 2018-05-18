import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePlayerStats } from "../../actions/profileActions";

class PlayerStats extends Component {
  onDeleteClick(id) {
    this.props.deletePlayerStats(id);
  }

  render() {
    const playerStats = this.props.playerStats.map(stats => (
      <tr key={stats._id}>
        <td>{stats.totalTimePlayed}</td>
        <td>{stats.songsPlayed}</td>
        <td>{stats.missionsCompleted}</td>
        <td>{stats.lessonsCompleted}</td>
        <td>{stats.highestArcadeScore}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, stats._id)}
            className="button btn-danger"
          >
            {" "}
            Delete{" "}
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Player Stats</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Total Time Played</th>
              <th>Songs Played</th>
              <th>Missions Completed</th>
              <th>Lessons Completed</th>
              <th>Highest Arcade Score</th>
              <th />
            </tr>
            {playerStats}
          </thead>
        </table>
      </div>
    );
  }
}

PlayerStats.propTypes = {
  deletePlayerStats: PropTypes.func.isRequired
};

export default connect(null, { deletePlayerStats })(PlayerStats);
