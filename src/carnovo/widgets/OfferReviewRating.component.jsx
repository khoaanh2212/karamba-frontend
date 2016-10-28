import React, {Component} from 'react';
import RatingStars from 'shared/components/RatingStars.component';

export default class OfferReviewRating extends React.Component {

  render() {
    let {
      rating, percent, total
    } = this.props.rating;
    return(
      <li>
        <RatingStars readOnly={true} rating={rating}/>
        <div className="progress no-margin">
          <div className="progress-bar" style={{ width: percent + '%' }}></div>
        </div>
        <div className="number">{ total }</div>
      </li>
    )
  }
}

