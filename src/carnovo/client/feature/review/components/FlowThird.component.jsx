import React, {Component} from 'react'
import RatingStars from '../../../../shared/components/RatingStars.component';

const KINDNESS = "kindness";
const KNOWLEDGE = "knowledge";
const COMMUNICATION = "communication";
const PROCESS = "process";


export default class FlowThird extends Component {
  constructor() {
    super();
    this.ratings = [
      {type: KINDNESS, rating: 0},
      {type: KNOWLEDGE, rating: 0},
      {type: COMMUNICATION, rating: 0},
      {type: PROCESS, rating: 0}
    ];
  }

  componentWillMount() {
    this.props.updateInfo({ratings: this.ratings});
  }

  getRating(rate, field) {
    this.ratings.map(
      (rating)=> {
        rating.type == field && (rating.rating = rate)
      });

    this.props.updateInfo({ratings: this.ratings});
  }

  getComment(e) {
    this.props.updateInfo({comment: e.target.value})
  }

  render() {

    return(
      <div className="third-flow">
        <div className="row">
          <div className="greeting">
            <div className="img-gift"></div>
            <div className="content"> Valorar el trato recibido por el concesionario puede ser de gran ayuda para otros compradores. Además, recuerda que te enviaremos un cheque Amazon valorado en <span>{this.props.gift.gift_value} {this.props.gift.gift_name}</span> al correo que nos facilitaste.</div>
          </div>
        </div>
        <div className="row">
          <div className="rating-wrapper">
            <div className="inner">
              <div className="col-md-6"><span className="rating-name">Amabilidad</span><RatingStars getRatingValue={(rate)=> ::this.getRating(rate, KINDNESS)} readOnly={false}/></div>
              <div className="col-md-6"><span className="rating-name">Conocimientos</span><RatingStars getRatingValue={(rate)=> ::this.getRating(rate, KNOWLEDGE)} readOnly={false}/></div>
            </div>
            <div className="inner">
              <div className="col-md-6"><span className="rating-name">Comunicación</span><RatingStars getRatingValue={(rate)=> ::this.getRating(rate, COMMUNICATION)} readOnly={false}/></div>
              <div className="col-md-6"><span className="rating-name">Proceso de venta</span><RatingStars getRatingValue={(rate)=> ::this.getRating(rate, PROCESS)} readOnly={false}/></div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="comment-wrapper">
            <div className="inner">
              <div className="col-md-3"><span className="rating-name">Valoración</span></div>
              <div className="col-md-8"><textarea id="comment" name="comment" placeholder="Escribe aquí tu valoración ..." onChange={::this.getComment}/></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
