import React, {Component} from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import EasyTitle from 'shared/components/EasyComponents/EasyTitle.component'
import EasyButton from 'shared/components/EasyComponents/EasyButton.component'
import ManufacturerBlock from './components/ManufacturerBlock.component'
import Notifications from 'react-notification-system-redux';
import {reduxForm} from 'redux-form';
import {
  CatalogStateToPropsBinding,
  CatalogDispatchToPropsBinding
} from "./Catalog.bindings";

export class Catalog extends Component {

  state = {
    manufacturers: []
  }

  componentDidMount(){
    this.props.onGetCatalog(this.props.token);
    this.setState({
      manufacturers: this.props.brands
    });
  }
  showInfo(message) {
    let notificationOpts = {
      message: message,
      position: 'bc',
      autoDismiss: 2
    };

    this.props.toast(Notifications.info(notificationOpts));
  }
  addManufacturer(manufacturerName) {
    if(!this.props.fields.catalog.value[manufacturerName]){
      this.props.fields.catalog.value[manufacturerName] = [];
      this.props.getModelsByBrand(manufacturerName);
    }
  }
  removeManufacturer(manufacturerName) {
    delete this.props.fields.catalog.value[manufacturerName];
    this.props.fields.catalog.onChange(this.props.fields.catalog.value);
  }
  addNewModels(manufacturerName){
    if(this.props.fields.catalog.value[manufacturerName].length===0){
      this.props.fields.catalog.value[manufacturerName] = this.props.models[manufacturerName].models;
    }
  }
  findModel(manufacturerName, model){
    var models = this.props.fields.catalog.value[manufacturerName];
    for(var j=0; j<models.length; j++){
      var rightModel =models[j];
      if(rightModel.name === model.name && rightModel.year == model.year){
        rightModel.available=!rightModel.available;
      }
    }
  }
  toggleAllModels(manufacturerName){
    this.addNewModels(manufacturerName);
    let all = !this.props.fields.catalog.value[manufacturerName].all;
    this.props.fields.catalog.value[manufacturerName].all = all;
    var models = this.props.fields.catalog.value[manufacturerName];
    for(var j=0; j<models.length; j++){
      models[j].available = all;
    }
    this.props.fields.catalog.onChange(this.props.fields.catalog.value);
  }
  toggleModel(manufacturerName, model) {
    this.addNewModels(manufacturerName);
    var catalog = this.props.fields.catalog.value;
    this.findModel(manufacturerName, model);
    this.props.fields.catalog.onChange(catalog);
  }
  onSubmit(){
    var result = {};
    var keys = Object.keys(this.props.fields.catalog.value);
    var that = this;
    keys.forEach(function(brand){
      if(that.props.fields.catalog.value[brand].length!==0) result[brand] = that.props.fields.catalog.value[brand];
    });
    this.props.onSaveCatalog(result, this.props.token);
    this.showInfo(<div><strong>Datos guardados.</strong> El catálogo se ha actualizado </div>)
  }

  filterManufacturer(catalogValue) {
    let manufacturers = [];
    this.state.manufacturers.map((brand,i) => {
      if(catalogValue[brand.name] == undefined)
          manufacturers.push(brand);
    });
    return manufacturers;
  }

  render() {
    const {
      fields: {manufacturers, models, catalog},
    } = this.props;

    let data = {};
    data.addManufacturer = ::this.addManufacturer;
    data.removeManufacturer = ::this.removeManufacturer;
    data.manufacturers = this.props.brands;
    data.toggleModel = ::this.toggleModel;
    data.toggleAllModels = ::this.toggleAllModels;
    data.all = false;

    let facturers = this.filterManufacturer(catalog.value);

    let dataForNewElement = {};
    dataForNewElement.addManufacturer = ::this.addManufacturer;
    dataForNewElement.removeManufacturer = ::this.removeManufacturer;
    dataForNewElement.manufacturers = facturers;
    dataForNewElement.toggleModel = ::this.toggleModel;
    dataForNewElement.toggleAllModels = ::this.toggleAllModels;
    dataForNewElement.all = false;

    return (
      <div>
        <Helmet {...config.app.head}/>
        <EasyTitle title="Catálogo de coches ofertados"/>
        {Object.keys(catalog.value).map((brand, i) =>
          <ManufacturerBlock key={i} disabled="disabled" selected={{name: brand, all: catalog.value[brand].all}} models={catalog.value[brand].length!=0 ? catalog.value[brand] : (this.props.models[brand] ? this.props.models[brand].models : [])} data={data}/>
        )}
        <ManufacturerBlock selected={{name:'default'}} models={[]} data={dataForNewElement}/>
        <div className="manufacturer-row">
          <div className="small-m-block manufacturer-left">
          </div>
          <div className="big-m-block">
            <EasyButton label="Guardar" position="right" onSubmit={::this.onSubmit}/>
          </div>
        </div>
      </div>
    );
  }
}
export default reduxForm({
  form: 'catalog',
  fields: ['manufacturers', 'models', 'catalog']
}, CatalogStateToPropsBinding, CatalogDispatchToPropsBinding)(Catalog);

