import React, {Component} from 'react';
import RatingStars from 'shared/components/RatingStars.component';
import {map} from 'lodash';

export default class OfferComment extends React.Component {
    constructor() {
        super();
    }

    render() {
        const accepted = 'accepted';
        const pending = 'pending';
        let comment = this.props.comment;
        let date = new Date(comment.created);
        let options = {year: 'numeric', month: 'long', day: 'numeric'};
        let dateCreated = date.toLocaleDateString('es-ES', options);
        return (
            <div className="review-list-item">
                {comment.state == pending ? <div className="cover"></div> : ''}
                <div className="header">
                    <h1>{comment.reviewerFullName}</h1>
                    <span className="small">{comment.reviewerBusinessName}</span>
                    <div className="rating">
                        {comment.state == accepted ? <RatingStars readOnly={true} rating={comment.rating}/> : ''}
                        <span className="small">{dateCreated}</span>
                    </div>
                </div>
                {comment.state == pending ?
                    <div className="pending-comment">
                        <hr/>
                        <div className="btn-action btn-wrapper">
                            <button className="btn" onClick={event => {this.props.acceptReview(comment.id)}}>Aceptar valoración</button>
                            <button className="btn" onClick={event => {this.props.rejectReview(comment.id)}}>Descartar valoración</button>
                        </div>
                    </div> : ''}
                {comment.state == accepted ? <div className="description">
                    <p>{comment.comment}</p>
                </div> : ''}
            </div>
        )
    }
}

