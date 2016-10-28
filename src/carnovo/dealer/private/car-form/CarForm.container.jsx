import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import EasyBlock from 'shared/components/EasyComponents/EasyBlock.component'
import EasySection from 'shared/components/EasyComponents/EasySection.component'
import EasyButton from 'shared/components/EasyComponents/EasyButton.component'
import EasySubsection from 'shared/components/EasyComponents/EasySubsection.component'
import EasyBox from 'shared/components/EasyComponents/EasyBox.component'
import EasyCheckbox from 'shared/components/EasyComponents/EasyCheckbox.component'
import EasySelect from 'shared/components/EasyComponents/EasySelect.component'
import {CarFormStateToProps, CarFormDispatchToPropsBinding} from "./CarForm.bindings";
import { browserHistory } from 'react-router';

@connect(CarFormStateToProps, CarFormDispatchToPropsBinding, null, {whithRefs: true})
@reduxForm({
    form: 'add-car',
    fields: ['brand', 'model', 'engine', 'color', 'extras', 'packages', 'pvp', 'cash', 'discount', 'photoUrl']
})
export default class CarForm extends Component {
    state = {fuel: '', trans: '', doors: ''};

    componentWillReceiveProps() {
        if (this.props.predefinedOptions) this.setState(this.props.predefinedOptions);
    }

    componentWillUnmount() {
        this.props.selectBrand({name: null});
    }

    onClickBrand(brand) {
        this.resetOptions();
        this.changeField('brand', brand);
        this.props.selectBrand(brand);
        this.props.getModelsByBrand(brand.name);
    }

    onClickModel(model) {
        this.resetOptions();
        this.changeField('model', model);
        this.props.selectModel(model);
        this.props.fetchModel(this.props.token, this.props.selectedBrand.name, model.name);
    }

    onSelectPackage(selectedPackage) {
        this.props.fetchExtrasFromEngine(this.props.token, this.props.selectedEngine, selectedPackage.id);
        this.changeField('pvp', parseFloat(this.props.selectedEngine.price) + parseFloat(selectedPackage.prices));
        this.resetExtras();
    }

    onSelectEngine(engine) {
        this.props.fetchPackagesFromEngine(this.props.token, engine);
        this.changeField('pvp', engine.price);
        this.resetPackage();
    }

    resetOptions() {
        this.setState({doors: '', fuel: '', trans: ''});
        this.resetEngine();
    }

    resetEngine() {
        this.changeField('engine');
        this.resetExtras();
    }

    resetPackage() {
        this.changeField('packages', '');
    }

    resetExtras() {
        this.changeField('extras', []);
        this.changeField('color', '');
    }

    changeField(field, value = '') {
        this.props.fields[field].onChange(value);
    }

    isChecked(formItem, field) {
        return selected => {
            if (!formItem.value || formItem.value === '') return false;
            return selected[field].toString() === formItem.value[field].toString()
        }
    }

    onChangeOptions(field) {
        return value => {
            let newState = {};
            newState[field] = value;

            this.setState(newState);
            this.resetEngine();
        }
    }

    onChangeExtra(extra, event) {
        setTimeout(() => this.props.fields.pvp.onChange(this.newPvp(this.props.fields)), 0);
    }

    calcDiscount(event) {
        if (event.target.value.length <= 0) {
            this.props.fields.cash.onChange(0);
            this.props.fields.discount.onChange(0);
            return;
        }

        let price = parseFloat(event.target.value);
        let pvp = parseFloat(this.props.fields.pvp.value);
        let discount = 100 - (price / pvp * 100);

        this.props.fields.cash.onChange(price);
        this.props.fields.discount.onChange(Math.round((discount * 100)) / 100);
    }

    calcCash(event) {
        if (event.target.value.length <= 0) {
            this.props.fields.cash.onChange(0);
            this.props.fields.discount.onChange(0);
            return;
        }

        let discount = parseFloat(event.target.value);
        let pvp = parseFloat(this.props.fields.pvp.value);
        let price = Math.abs(pvp - (discount * pvp / 100));

        this.props.fields.cash.onChange(Math.round((price * 100) / 100));
        this.props.fields.discount.onChange(discount);
    }

    newPvp(fields) {
        let newPvp = parseInt(fields.engine.value.price);
        if (fields.extras.value.length > 0) {
            newPvp += fields.extras.value
                .map(extra => extra.price)
                .reduce((prev, cur) => prev + cur);
        }

        if (fields.color.value !== '') {
            newPvp += fields.color.value.price;
        }

        return newPvp;
    }

    submit(data) {
        data['photoUrl'] = this.props.photoUrl;
        if (!data.brand) data.brand = this.props.selectedBrand;
        if (!data.model) data.model = this.props.selectedModel;
        if (!data.cash) data.cash = 0;
        if (!data.discount) data.discount = 0;
        this.props.submitForm(data);
    }

    backToStockHome() {
        browserHistory.goBack();
    }

    render() {
        let {fields: {engine, color, extras, packages, pvp, cash, discount}, handleSubmit} = this.props;
        let engines = this.props.vehicle(this.state.fuel, this.state.trans, this.state.doors);
        let isEditMode = !!this.props.params.vehicleId;

        return (
            <div id="car-form">
                <EasySection label="Marca">
                    <EasyBlock items={this.props.brands}
                               compare={item => this.props.selectedBrand.name === item.name}
                               onClick={::this.onClickBrand}/>
                </EasySection>

                {this.props.selectedBrand.name !== null ?
                    <EasySection label="Modelo">
                        <EasyBlock items={::this.props.modelsFromSelectedBrand()}
                                   compare={item => this.props.selectedModel.name === item.name && this.props.selectedModel.year === item.year}
                                   onClick={::this.onClickModel}/>
                    </EasySection>
                    : null}

                <form onSubmit={handleSubmit(::this.submit)}>
                    {this.props.options ?
                        <div>
                            <EasySection label="Combustible">
                                <EasySelect type="fuel" isChecked={selected => this.state.fuel === selected}
                                            options={this.props.options.fuels}
                                            onChange={::this.onChangeOptions('fuel')}/>
                            </EasySection>

                            <EasySection label="Transmisión">
                                <EasySelect type="trans" isChecked={selected => this.state.trans === selected}
                                            options={this.props.options.trans}
                                            onChange={::this.onChangeOptions('trans')}/>
                            </EasySection>

                            <EasySection label="Puertas">
                                <EasySelect type="doors" isChecked={selected => this.state.doors === selected}
                                            options={this.props.options.doors}
                                            onChange={::this.onChangeOptions('doors')}/>
                            </EasySection>
                        </div> : null}

                    {this.state.doors && this.state.trans && this.state.fuel ?
                        <EasySection label="Motores">
                            {engines.length >= 1 ?
                                <EasySelect labelClass="engine"
                                            formItem={engine}
                                            options={engines}
                                            labelClass="add-car-extras"
                                            isChecked={::this.isChecked(engine, 'vehicleId')}
                                            onChange={::this.onSelectEngine}
                                            fieldToShow="derivative"
                                            fieldId="vehicleId"/>
                                : <h4>No hay ningún engine</h4>}
                        </EasySection>
                        : null
                    }

                    {engine.value ?
                        <div>
                            { this.props.packages.length > 0 ?
                                <EasySection label="Paquetes">
                                    <EasySelect formItem={packages}
                                                isChecked={::this.isChecked(packages, 'id')}
                                                labelClass="add-car-extras"
                                                fieldToShow="title"
                                                onChange={::this.onSelectPackage}
                                                fieldId="id"
                                                options={this.props.packages}/>
                                </EasySection>: null
                            }
                            {this.props.colors.length > 0 ?
                                <EasySection label="Colores">
                                    <EasySelect formItem={color}
                                                isChecked={::this.isChecked(color, 'optionId')}
                                                labelClass="add-car-extras"
                                                fieldToShow="optionName"
                                                onChange={::this.onChangeExtra}
                                                fieldId="optionId"
                                                options={this.props.colors}/>
                                </EasySection> : null
                            }
                            {this.props.extras.length > 0 ?
                                <EasySection label="Extras">
                                    {
                                        this.props.extras.map((extra, i) => {
                                                var unfolded = false;
                                                for(var counter=0; counter < extra.options.length; counter++) {
                                                    var elementExtra = extra.options[counter];
                                                    elementExtra.realName = elementExtra.optionName;
                                                    if(elementExtra.includedBy != null) {
                                                        elementExtra.realName += " -- Incluido en el pack seleccionado";
                                                        elementExtra.checked = true;
                                                        elementExtra.disabled = true;
                                                        unfolded = true;
                                                    }
                                                    if(elementExtra.requiredBy != null) {
                                                        elementExtra.realName += " -- Requerido por el pack seleccionado";
                                                        elementExtra.checked = true;
                                                        elementExtra.disabled = true;
                                                        unfolded = true;
                                                    }
                                                }
                                                return (
                                                    <EasySubsection label={extra.name} unfolded={unfolded} key={i}>
                                                        <EasyCheckbox formItem={extras}
                                                                      labelClass="add-car-extras"
                                                                      multiple={true}
                                                                      onChange={::this.onChangeExtra}
                                                                      fieldToShow="realName"
                                                                      fieldId="optionId"
                                                                      type="extras"
                                                                      options={extra.options}/>
                                                    </EasySubsection>
                                                );
                                            }
                                        )
                                    }
                                </EasySection>
                                : null}


                            <EasySection label="Precio">
                                <EasyBox formItem={pvp} label="PVP" disabled={true}/>
                                <EasyBox formItem={cash} label="Al contado" onChange={::this.calcDiscount}/>
                                <EasyBox formItem={discount} label="Descuento" onChange={::this.calcCash}/>
                            </EasySection>
                            <EasyButton type="success" label={isEditMode ? "Guardar": "Añadir"} position="right"/>
                            <EasyButton type="button" label="Cancelar" position="left"
                                        onSubmit={::this.backToStockHome}/>
                        </div> : null
                    }
                </form>
            </div>
        );
    }
}

