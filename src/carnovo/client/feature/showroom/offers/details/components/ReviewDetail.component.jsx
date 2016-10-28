/**
 * Created by apium on 17/10/2016.
 */
import React, {Component} from 'react';
import OfferReviewRating from '../../../../../../widgets/OfferReviewRating.component';
import OfferComment from '../../../../../../widgets/OfferComment.component';
import {map} from 'lodash';
import RatingStars from 'shared/components/RatingStars.component';

export default class ReviewDetail extends Component {

  render() {
    let {
      reviews,
      role,
      onLoadMore
    } = this.props;
    return (
      <div id="review-detail">
        <div className="title">
          <strong>{reviews.totalRating}</strong> valoraciones de compradores en Carnovo
        </div>

        <div className="review-summary margin-bottom-60">
          <div className="left-block">
            <div className="margin-bottom-25">
              <div className="main-rating">
                <RatingStars readOnly={true} rating={reviews.avgRating}/>
                <span>{reviews.avgRating} / 5</span>
              </div>
              <span>{reviews.totalRating} comentarios de compadores</span>
            </div>

            <div className="options">
              <ul className="list-unstyled no-margin">
                <li><RatingStars readOnly={true} rating={!!reviews.ratingsByType ? reviews.ratingsByType.kindness : 0}/> <span>Amabilidad</span></li>
                <li><RatingStars readOnly={true} rating={!!reviews.ratingsByType ? reviews.ratingsByType.communication : 0}/> <span>Comunicación</span></li>
                <li><RatingStars readOnly={true} rating={!!reviews.ratingsByType ? reviews.ratingsByType.knowledge : 0}/> <span>Conocimientos</span></li>
                <li><RatingStars readOnly={true} rating={!!reviews.ratingsByType ? reviews.ratingsByType.process : 0}/> <span>Proceso de venta</span></li>
              </ul>
            </div>
          </div>

          <div className="right-block">
            <h1 className="margin-bottom-15">Puntuación por estrellas</h1>
            <ul className="list-unstyled no-margin">
              {
                map(reviews.ratings, (r, i) => {
                  return <OfferReviewRating key={i} rating={r} />
                })
              }
            </ul>
          </div>
        </div>

        <div className="review-list">
          {
            map(reviews.comments && reviews.comments.data || [], (comment, i) => {
                  if (role === 'dealer') {
                    if (comment.state != 'rejected') {
                      return <OfferComment key={i} comment={comment} acceptReview={this.props.acceptReview}
                                           rejectReview={this.props.rejectReview}/>
                    }
                  } else {
                    if (comment.state === 'accepted') {
                      return <OfferComment key={i} comment={comment} acceptReview={this.props.acceptReview}
                                           rejectReview={this.props.rejectReview}/>
                    }
                  }
            })
          }
          <div className="review-footer">
            {
              this.props.hasMore?
              <button className="btn btn-default" onClick={onLoadMore}>Ver mas valoraciones</button>
              :""
            }

          </div>
        </div>

      </div>
    );
  }
}
