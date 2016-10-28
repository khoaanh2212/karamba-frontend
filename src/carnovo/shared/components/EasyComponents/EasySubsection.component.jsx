import React, {Component} from 'react';

export default class EasySection extends Component {

  componentWillMount() {
    this.state = {
      unfolded: this.props.unfolded,
      icon: this.props.unfolded ? 'expand_less' : 'expand_more'
    }
  }

  toggleSubsection(){
    this.setState({
      unfolded: !this.state.unfolded,
      icon: !this.state.unfolded ? 'expand_less' : 'expand_more'
    });
  }

  render() {
    return (
      <div className="manufacturer-row grid underscored">
        <div className="manufacturer-top noselect">
          <div className={this.state.unfolded ? "subsection manufacturer-title  active" : "subsection manufacturer-title "} onClick={()=>this.toggleSubsection()}>
            {this.props.label ? <span>{this.props.label != 'Items No Codificados' ? this.props.label : "Otros"} <i className="material-icons" style={{position: "relative", top: "6px"}}>{this.state.icon}</i></span> : null}
          </div>
        </div>
        <div className={this.state.unfolded ? "manufacturer-bottom" : "manufacturer-bottom hidden"}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
