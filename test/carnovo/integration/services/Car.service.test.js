import {fetchBrands, fetchModels, fetchCatalog, saveCatalog, fetchStock} from 'services/Car.service';
import {FETCH_BRANDS_SUCCESS, FETCH_BRANDS_ERROR, FETCH_MODELS_SUCCESS, FETCH_MODELS_ERROR} from "hoc/cars.reducer";
import {
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_ERROR,
  SAVE_CATALOG_SUCCESS,
  SAVE_CATALOG_ERROR
} from "dealer/private/catalog/Catalog.reducer";
import {FETCH_STOCK_SUCCESS, FETCH_STOCK_ERROR} from "dealer/private/stock/StockCatalog.reducer";

describe("[integration] Car.service", () => {
  it("should return an action type " + FETCH_BRANDS_SUCCESS, () => {
    let validToken = 'valid-token';
    return expect(fetchBrands(validToken)).to.eventually.have.property('type', FETCH_BRANDS_SUCCESS);
  });
  it("should return an action type " + FETCH_BRANDS_ERROR, () => {
    let invalidToken = 'false-token';
    return expect(fetchBrands(invalidToken)).to.eventually.have.property('type', FETCH_BRANDS_ERROR);
  });
  it("should return an action type " + FETCH_MODELS_SUCCESS, () => {
    let validToken = 'valid-token';
    let brand = 'audi';
    return expect(fetchModels(validToken, brand)).to.eventually.have.property('type', FETCH_MODELS_SUCCESS);
  });
  it("should return an action type " + FETCH_MODELS_ERROR, () => {
    let invalidToken = 'false-token';
    let brand = 'audi';
    return expect(fetchModels(invalidToken, brand)).to.eventually.have.property('type', FETCH_MODELS_ERROR);
  });
  it("should return an action type " + FETCH_CATALOG_SUCCESS, () => {
    let token = 'token';
    return expect(fetchCatalog(token)).to.eventually.have.property('type', FETCH_CATALOG_SUCCESS);
  });
  it("should return an action type " + FETCH_CATALOG_ERROR, () => {
    let invalidToken = 'false-token';
    return expect(fetchCatalog(invalidToken)).to.eventually.have.property('type', FETCH_CATALOG_ERROR);
  });
  it("should return an action type " + SAVE_CATALOG_SUCCESS, () => {
    let token = 'token';
    return expect(saveCatalog({}, token)).to.eventually.have.property('type', SAVE_CATALOG_SUCCESS);
  });
  it("should return an action type " + SAVE_CATALOG_ERROR, () => {
    let invalidToken = 'false-token';
    return expect(saveCatalog({}, invalidToken)).to.eventually.have.property('type', SAVE_CATALOG_ERROR);
  });
  it("should return an action type " + FETCH_STOCK_SUCCESS, () => {
    let token = 'token';
    return expect(fetchStock(token, {})).to.eventually.have.property('type', FETCH_STOCK_SUCCESS);
  });
  it("should return an action type " + FETCH_STOCK_ERROR, () => {
    let invalidToken = 'false-token';
    return expect(fetchStock(invalidToken, {})).to.eventually.have.property('type', FETCH_STOCK_ERROR);
  });
});
