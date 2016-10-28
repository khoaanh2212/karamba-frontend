import {fetchModels, fetchCatalog, saveCatalog} from "services/Car.service";

export const CatalogStateToPropsBinding = (state, ownProps) => {
  return {
    token: state.auth.token,
    models: state.cars.models,
    initialValues: {
      catalog: state.catalog.catalog
    }
  };
};

export const CatalogDispatchToPropsBinding = (dispatch, ownProps) => ({
  onGetCatalog: (token) => {fetchCatalog(token).then(dispatch)},
  onSaveCatalog: (catalog, token) => {saveCatalog(catalog, token).then(dispatch)},
  toast: notification => dispatch(notification)
});
