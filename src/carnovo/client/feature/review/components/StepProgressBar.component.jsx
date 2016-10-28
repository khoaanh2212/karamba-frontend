import React, {Component} from 'react'

export default class StepProgressBar extends Component {

  render() {
    let stages = this.props.steps;
    let stagesLen = stages.length;

    return (
      <div className="configuration-progress">
        <div className="register-progress-bar">
          <ol className="row col-xs-12">
            {stages.map((stage, i)=>
              <li key={i} className={`col-xs-${12/stagesLen} ${stage.process} ${i==stagesLen-1?'last':''}`}>
                <a className="progress-bar-label">{stage.label}</a>
              </li>
            )}
          </ol>
          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}

StepProgressBar.propTypes = {
  steps: React.PropTypes.array.isRequired
};
