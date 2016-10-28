import React, {Component} from 'react';

let Stars = (data) => {
  let {
    idx,
    rating,
    onMouseMove,
    onMouseLeave
  } = data;
  let _position = idx + 1;
  return (
    <i onMouseLeave={onMouseLeave.bind(this, idx)} onMouseMove={onMouseMove.bind(this, idx)} className={rating != 0 && _position <= rating ? "ic-filled-star" : (Math.round(rating) == _position ? "ic-half-filled-star" :  "ic-star")}/>
  )
};

/*
* Class RatingStars
* - Required: readOnly: boolean
* - callback: getRatingValue(rating)
* */

export default class RatingStars extends Component {
  constructor() {
    super();
    this.state = {
      lastStars: 0, // this use for keeping value after click (not implement yet)
      currentStars: 0,
      debounceMouseMove: 0
    }
  }

  setRatingState(props) {
    if (props.rating && props.rating > 0) {
      this.setState({currentStars: props.rating});
      props.getRatingValue && props.getRatingValue(this.state.currentStars);
    }
    this.setState({readOnly: props.readOnly})
  }

  componentWillReceiveProps(nextProps) {
    this.setRatingState(nextProps);
  }

  componentWillMount() {
    this.setRatingState(this.props);
  }

  onStarsMouseMove(index, e) {
    if (this.state.readOnly) return;
    if (this.state.debounceMouseMove !== 0) {
      setTimeout(()=>{this.setState({debounceMouseMove: 0})}, this.state.debounceMouseMove);
      return
    }

    try {
      this.setState({lastStars: this.state.currentStars});
      let _bound = e.target.getBoundingClientRect();
      let _mouseX = e.clientX;
      let _left = _bound.left;
      let _right = _bound.right;
      let _width = Math.abs(_right - _left);

      if (Math.abs(_mouseX - _left) < _width / 2) {
        this.setState({currentStars: index + 0.5})
      } else if(Math.abs(_mouseX - _left) > _width / 2) {
        this.setState({currentStars: index + 1})
      }
      this.props.getRatingValue && this.props.getRatingValue(this.state.currentStars);
    } catch (e) {}
  }

  onStarsLeave(index, e) {
    if (index == 0 && !this.state.readOnly) {
      this.setState({currentStars: 0});
    }
  }

  onRatingClick(e) {
    if (this.state.readOnly) return;
    this.setState({debounceMouseMove: 1000});
    this.props.getRatingValue && this.props.getRatingValue(this.state.currentStars);
  }

  onRatingLeave(e) {
    this.props.getRatingValue && this.props.getRatingValue(this.state.currentStars);
  }

  render() {
    let {
      style = {}
    } = this.props;
    return(
      <div className="rating-component" style={{cursor: this.state.readOnly ? "auto" : "pointer",...style}} onClick={::this.onRatingClick} onMouseLeave={::this.onRatingLeave}>
        {[...Array(5)].map((x, i) =>
          <Stars key={i} idx={i} rating={this.state.currentStars} onMouseLeave={::this.onStarsLeave} onMouseMove={::this.onStarsMouseMove}/>
        )}
      </div>
    )
  }
}

RatingStars.propTypes = {
  readOnly: React.PropTypes.bool.isRequired,
  getRatingValue: React.PropTypes.func,
  rating: React.PropTypes.number
};
