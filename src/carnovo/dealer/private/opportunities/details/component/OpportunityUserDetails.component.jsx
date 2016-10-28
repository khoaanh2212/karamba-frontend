import React from 'react';
import GoogleMap from 'shared/components/GoogleMap.component'

let UserDetails = ({user}) => {
  let GoogleMapProps = {
    style: {width: "100%",height: "320px"},
    lat: user.latitude,
    lng: user.longitude,
    zoom: 12,
    circles: [{
      lat: user.latitude,
      lng: user.longitude,
      radius: 1000
    }]
  };
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var d = new Date(user.created);
  return (
    <div className="userDetails">
      <div className="userDetails-header clearfix">
        <h3>{user.clientName}
          <small>{d.toLocaleString("es-ES", options)}</small>
        </h3>
        {user.isNew ? <div className="newOportunity">
          <span>Nueva oportunidad</span>
        </div> : null}
      </div>

      <div className="userDetails-location">
        <div>
          <i className="material-icons">place</i> <span>{user.city}</span>
          <GoogleMap {...GoogleMapProps}/>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
