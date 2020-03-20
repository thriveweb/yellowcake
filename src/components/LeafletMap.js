import React, { Component } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'

class LeafletMap extends Component {
  static defaultProps = {
    lat: 41.303921,
    lng: -81.901693,
    zoom: 16,
    height: '50vh',
    width: '100%',
  }

  render() {
    const { lat, lng, zoom, height, width } = this.props
    const position = [lat, lng]
    if (typeof window !== 'undefined') {
      return (
        <Map
          style={{ width: width, height: height }}
          center={position}
          zoom={zoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} />
        </Map>
      )
    }
    return null
  }
}

export default LeafletMap
