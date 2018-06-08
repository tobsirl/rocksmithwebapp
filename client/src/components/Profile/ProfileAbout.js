import React, { Component } from "react";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstname = profile.user.name.trim().split(" ")[0];

    // Get favourite music
    const favouriteMusic = profile.favouriteMusic.map((favMus, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {favMus}
      </div>
    ));

    const favouriteArtists = profile.favouriteArtists.map(
      (favArtists, index) => (
        <div key={index} className="p-3">
          <i className="fa fa-check" /> {favArtists}
        </div>
      )
    );

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstname}'s Bio</h3>
            <p className="lead">{profile.bio}</p>
            <hr />
            <h3 className="text-center text-info">Favourite Music</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {favouriteMusic}
              </div>
            </div>
            <hr />
            <h3 className="text-center text-info">Favourite Artists</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {favouriteArtists}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
