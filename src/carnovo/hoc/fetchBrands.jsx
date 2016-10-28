import React, {Component} from 'react';
import {connect} from 'react-redux';
import ErrorBox from 'shared/components/ErrorBox.component';
import {fetchBrands, fetchModels} from 'services/Car.service';
import {CarsDomain, FETCHING_MODELS_BRAND} from 'hoc/cars.reducer';

export default function fetchBrand(Component) {
  let mapStateToProps = (state) => ({
    token: state.auth.token,
    loading: state.cars.loading,
    brands: state.cars.brands,
    models: state.cars.models
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    getBrands: () => fetchBrands().then(dispatch),
    getModelsByBrand: (brand) => {
      dispatch({type: FETCHING_MODELS_BRAND, domain: CarsDomain, brand: brand});
      fetchModels(ownProps.token, brand).then(dispatch)
    }
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchBrands extends React.Component {
    componentDidMount() {
      this.props.getBrands();
    }

    render() {
      if (this.props.loading === true) {
        return <div>Loading brands ...</div>
      } else if (this.props.brands.error) {
        return <ErrorBox message={this.props.brands.error}/>
      } else {
        return <Component {...this.props} brands={this.props.brands} models={this.props.models} getModelsByBrand={this.props.getModelsByBrand}/>
      }
    }
  }

  return FetchBrands;
}
