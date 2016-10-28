import React, {Component} from 'react'

export default class SectionTrustpilot extends Component {
  render() {
    return (
      <section className="section-trustpilot container-fluid">

        <div className="col-sm-3">
          <div className="text-center">
            <img width="204" height="24"
                 src={require("../../theme/img/trustpilot-logo.svg")}
                 alt="Trustpilot logo"/>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="text-center">
            <div className="svg-icon-star">
              <i className="material-icons">star_rate</i>
            </div>
            <div className="svg-icon-star">
              <i className="material-icons">star_rate</i>
            </div>
            <div className="svg-icon-star">
              <i className="material-icons">star_rate</i>
            </div>
            <div className="svg-icon-star">
              <i className="material-icons">star_rate</i>
            </div>
            <div className="svg-icon-star">
              <i className="material-icons">star_rate</i>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="text-center trustpilot-text">
            <span className="trustpilot-score-value trustpilot-wide-score-current">9.8</span>
            <span className="trustpilot-wide-score">&nbsp;de 10 </span>
            en la comunidad de opiniones <a target="_blank" href="https://uk.trustpilot.com/review/carwow.co.uk">Trustpilot</a>
          </div>
        </div>

      </section>
    )
  }
}
