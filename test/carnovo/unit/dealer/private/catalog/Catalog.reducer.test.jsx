import catalogReducer from 'dealer/private/catalog/Catalog.reducer';
import {FETCH_CATALOG_SUCCESS, FETCH_CATALOG_ERROR, SAVE_CATALOG_SUCCESS, SAVE_CATALOG_ERROR, CatalogDomain} from 'dealer/private/catalog/Catalog.reducer';

describe("[unit] Catalog.reducer", () => {
  const token = 'test-token';
  const initialState = {
    error: null,
    catalog: {}
  };

  const reducer = (action, initialState = initialState) => catalogReducer(initialState, action);

  it("should return initial state", () => {
    expect(reducer({}, initialState)).to.deep.equal(initialState)
  });

  it("should return state with catalog when type is " + FETCH_CATALOG_SUCCESS, () => {
    let action = {
      type: FETCH_CATALOG_SUCCESS,
      domain: CatalogDomain,
      catalog: 'test'
    };
    expect(reducer(action)).to.deep.equal({error: null, catalog: 'test'});
  });

  it("should set error when type is " + FETCH_CATALOG_ERROR, () => {
    let action = {
      type: FETCH_CATALOG_ERROR,
      domain: CatalogDomain,
      error: 'thrill'
    };
    expect(reducer(action)).to.deep.equal({error: 'thrill', catalog: {}});
  });
});
