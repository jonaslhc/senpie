import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class MapLink extends Component {
  render() {
    return (
      <div className="Result">
        <span>Found {this.props.length} results</span>
        <Link to= {`/map`} >
        <span> View on Map</span>
        </Link>
      </div>
    )
  }
}

export default MapLink

