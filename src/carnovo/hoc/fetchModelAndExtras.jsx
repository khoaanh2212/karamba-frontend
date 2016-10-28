import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchExtrasFromEngine, fetchOptionsFromModel, fetchModels} from 'services/Car.service';
import {CarsDomain, FETCHING_MODELS_BRAND} from 'hoc/cars.reducer';

export default function fetchModelAndExtras(Component) {
  let mapStateToProps = (state, ownProps) => ({
    token: state.auth.token,
    loaded: vehicle => {
      return !!(state.cars.brands.length > 0 && state.cars.models[vehicle.brand.name]);
    },
    vehicle: state.stock.stock.filter(vehicle => vehicle.id === ownProps.params.vehicleId)[0]
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    fetchModelAndExtras: (token, vehicle) => {
      fetchModels(ownProps.token, vehicle.brand.name).then(dispatch);
      fetchOptionsFromModel(token, vehicle.brand.name, vehicle.model.name).then(dispatch);
      fetchExtrasFromEngine(token, vehicle.vehicle.vehicleId).then(dispatch);
    }
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchModelAndExtras extends React.Component {
    componentWillMount() {
      this.props.fetchModelAndExtras(this.props.token, this.props.vehicle);
    }

    render() {
      if(this.props.loaded(this.props.vehicle)) return <Component {...this.props} />;
      else return <h3>Loading</h3>
    }
  }

  return FetchModelAndExtras;
}
