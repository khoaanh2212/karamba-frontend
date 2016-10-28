import React, {Component} from 'react'
import { browserHistory } from 'react-router'

export default class RegisterFooter extends Component {

  onBack() {
    browserHistory.push(process.env.PUBLIC_PATH);
  }

  render() {
    return (
      <div className="choose-filters-actions-wrapper">
          <div className="row choose-filters-actions">
            <div className="col-xs-2"></div>

            <div className="col-xs-4 choose-filters-action choose-filters-action-back">
              <input type="submit" className="btn btn-md input-back" value="Atrás" onClick={this.onBack}/>
            </div>

            <div className="col-xs-4 choose-filters-action choose-filters-action-next">
              <input type="submit" className="btn btn-md input-next" value="Siguiente" onClick={this.props.onNext}/>
            </div>
            <div className="col-xs-2"></div>
          </div>
      </div>
    );
  }
}
