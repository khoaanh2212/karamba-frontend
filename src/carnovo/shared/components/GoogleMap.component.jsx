import React, {Component} from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
  lat: 21.022052,
  lng: 105.834817
};
const param = {v: '3.exp', key: 'AIzaSyCYQMCqEZ8cd96y5wt7SPVRyJOCavVPW5Y'};

export default class GoogleMap extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  onMapCreated = (map) => {
    map.setOptions({
      disableDefaultUI: true
    });
  };

  onDragEnd = (e) => {
    this.props.onDragEnd && this.props.onDragEnd(e)
  };

  onCloseClick = () => {
    this.props.onCloseClick && this.props.onCloseClick()
  };

  onClick = (e) => {
    this.props.onClick && this.props.onClick(e)
  };

  render() {
    let {
      lat = coords.lat,
      lng = coords.lng,
      zoom = 12,
      markers = [],
      infoWindows = [],
      circles = []
    } = this.props;

    let circleStyle = {
      strokeColor: '#00A4FF',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#00A4FF',
      fillOpacity: 0.35,
    };

    return (
      <div style={{...this.props.style}}>
        <Gmaps
          width={'100%'}
          height={'100%'}
          lat={lat}
          lng={lng}
          zoom={zoom}
          params={param}
          onMapCreated={::this.onMapCreated}>
          {markers.map((marker, i)=>
            <Marker key={i}
              lat={marker.lat}
              lng={marker.lng}
              draggable={marker.draggable || true}
              onDragEnd={::this.onDragEnd} />
          )}
          {infoWindows.map((info, i)=>
            <InfoWindow key={i}
              lat={info.lat}
              lng={info.lng}
              content={info.content}
              onCloseClick={::this.onCloseClick} />
          )}
          {circles.map((circle, i)=>
            <Circle {...circleStyle} key={i}
              lat={circle.lat}
              lng={circle.lng}
              radius={circle.radius}
              onClick={::this.onClick} />
          )}
        </Gmaps>
      </div>
    )
  }

}
