import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
         
          <div className="col-lg-4 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.handle) ? null : (
                <span>Gamer Handle: {profile.handle}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.platform) ? null : (
                <span>{profile.platform}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h5>Favourite Music</h5>
            <ul className="list-group">
              {profile.favouriteMusic.slice(0, 4).map((favMusic, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {favMusic}
                </li>
              ))}
            </ul>
          </div>
                
          <div className="col-sm-4">
            <h5>Favourite Artists</h5>
            <ul className="list-group">
              {profile.favouriteArtists.slice(0, 4).map((favArtist, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {favArtist}
                </li>
              ))}
            </ul>
         
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
