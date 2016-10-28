import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStock} from 'services/Car.service';
import {CarsDomain, FETCHING_MODELS_BRAND} from 'hoc/cars.reducer';
import ErrorBox from 'shared/components/ErrorBox.component';

export default function fetchDealerStock(Component) {
  let mapStateToProps = (state) => ({
    token: state.auth.token,
    stock: state.stock
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    getStock: token => fetchStock(token).then(dispatch)
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchStock extends React.Component {
    componentDidMount() {
      if(!this.props.stock.loaded) this.props.getStock(this.props.token);
    }

    render() {
      if (this.props.stock.loading === true) {
        return <div>Loading...</div>
      } else if (this.props.stock.error) {
        return <ErrorBox message={this.props.stock.error}/>
      } else {
        return <Component {...this.props} stock={this.props.stock} />
      }
    }
  }

  return FetchStock;
}
