import React, {Component} from 'react';
import GoogleMap from 'shared/components/GoogleMap.component.jsx'
import {Link} from 'react-router';

export default class DealerProfileAvatar extends Component {
  constructor() {
    super();
    this.state = {
      showMap: false
    }
  }

  toggleMap(){
    this.setState({showMap: !this.state.showMap})
  }

  getImageUrl(img) {
    if (img !== null && typeof img === 'object') {
      return img.url;
    }
    return img;
  }

  render() {
    let {
      background,
      avatar,
      name,
      vendorName,
      address,
      zipCode,
      latitude,
      longitude
    } = this.props.profile;

    let MapProps = {
      style: {width: "100%",height: "400px"},
      lat: latitude,
      lng: longitude,
      zoom: 12,
      circles: [{
        lat: latitude,
        lng: longitude,
        radius: 1000
      }]
    };

    return (
      !this.state.showMap?
      <div className="fixed-image" style={{backgroundImage: "url('" + ::this.getImageUrl(background) + "')", display: (this.state.showMap ? "none" : "block")}}>
        <div className="actions-container grid" style={{maxWidth: "none"}}>
          <div className="col-xs-1"></div>
          <div className="col-xs-10">
            <button className="action-button left" onClick={(e)=> {this.props.action.go()}}>{this.props.action.name}</button>
            <button className="action-button right" onClick={(e)=> {this.toggleMap()}}>Ver Mapa</button>
          </div>
          <div className="col-xs-1"></div>
        </div>
        <div className="avatar-container"
             style={{backgroundImage: "url('" + ::this.getImageUrl(avatar) +"')"}}>
        </div>
        <div className="profile-summary">
          <div className="name">{name}</div>
          <div className="vendorName">{vendorName}</div>
          <div className="address">{!!address ? address + ", " : ""}{zipCode}</div>
        </div>
      </div>
      :
      <div className="map-wrapper">
        <GoogleMap {...MapProps}/>
        <button className="action-button right" onClick={(e)=> {this.toggleMap()}}>Ocultar Mapa</button>
      </div>
    )
  }
}
