import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import ui from 'redux-ui';
import SelectCarUi from './SelectCar.uistate';
import RegisterProgressBar from "../components/RegisterProgressBar.component";
import EmissionsBoard from "./components/EmissionsBoard.component";
import RegisterHeader from "../components/RegisterHeader.component";
import ListCar from "./components/ListCar.component";
import ListPropertyCar from "./components/ListPropertyCar.component";
import {SelectCarPropsBinding, SelectCarDispatchBinding} from "./SelectCar.bindings";

@ui(SelectCarUi)
@connect(SelectCarPropsBinding, SelectCarDispatchBinding)
export default class SelectCar extends Component {
    constructor() {
        super();
        this.state = {
            step: 2,
            vehiclesFilter: [],
            conditionFilter: {},
            changeCondition: false,
            showPopup: false
        };
        window.scrollTo(0,0);
    }

    componentWillMount() {
        this.props.getVehicles(this.props.token, this.props.params.brand, this.props.params.model);
    }

    componentWillReceiveProps(nextProps) {
        this.decorateOptionsFilter(nextProps.options, nextProps.selectedDerivatives);
        this.setState({
            changeCondition: true
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.changeCondition) {
            this.setState({
                changeCondition: false
            });
            this.reloadvehiclesFilter(nextProps, nextState);
        }
    }

    decorateOptionsFilter(options, selectedOptions) {
        let conditionFilter = {}
        let doorsOptions = this.decorateOptionsDoors(options, selectedOptions);
        if (doorsOptions)
            conditionFilter.doors = doorsOptions;

        let fuelsOptions = this.decorateOptionsFuels(options, selectedOptions);
        if (fuelsOptions)
            conditionFilter.fuels = fuelsOptions;

        let transOptions = this.decorateOptionsTrans(options, selectedOptions);
        if (transOptions)
            conditionFilter.trans = transOptions;

        this.setState({
            conditionFilter: conditionFilter
        });
    }

    decorateOptionsDoors(options, selectedOptions) {
        if (options && options.doors) {
            let doors = _.map(options.doors, door => {
                if (selectedOptions.doors.indexOf(door) >= 0)
                    return {name: door, value: true};
                else
                    return {name: door, value: false};
            });
            return doors;
        }
        return null;
    }

    decorateOptionsFuels(options, selectedOptions) {
        if (options && options.fuels) {
            let fuels = _.map(options.fuels, fuel => {
                if (selectedOptions.fuels.indexOf(fuel) >= 0)
                    return {name: fuel, value: true}
                else
                    return {name: fuel, value: false}
            });
            return fuels;
        }
        return null;
    }

    decorateOptionsTrans(options, selectedOptions) {
        if (options && options.trans) {
            let trans = _.map(options.trans, tran => {
                if (selectedOptions.trans.indexOf(tran) >= 0)
                    return {name: tran, value: true}
                else
                    return {name: tran, value: false}
            });
            return trans;
        }
        return null;
    }

    onChangeConditionFilter(derivativeType, derivative) {
        this.props.selectDerivative(derivative, derivativeType);
    }

    reloadvehiclesFilter(nextProps) {
        var vehicles = [];
        if (nextProps.selectedDerivatives.doors.length == 0 && nextProps.selectedDerivatives.fuels.length == 0 && nextProps.selectedDerivatives.trans.length == 0)
            vehicles = nextProps.vehicles;
        else {
            var arrConditions = this.getArrayFilterConditions(nextProps.selectedDerivatives);
            _.map(arrConditions, conditionObject => {
                var cars = _.filter(nextProps.vehicles, conditionObject);
                vehicles = this.arrayUnique(vehicles.concat(cars));
            });
        }

        this.setState({
            vehiclesFilter: vehicles
        });
    }

    arrayUnique(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    getArrayFilterConditions(selectedDerivatives) {
        let arrConditions = [];
        let fuels = selectedDerivatives.fuels;
        let trans = selectedDerivatives.trans;
        let doors = selectedDerivatives.doors;
        if (fuels.length > 0) {
            fuels.map(fuel => {
                arrConditions.push({fuelTypeToDisplay: fuel});
            });
        }
        if (trans.length > 0) {
            arrConditions = this.getConditionsTransmission(arrConditions, trans);
        }
        if (doors.length > 0) {
            arrConditions = this.getConditionsDoors(arrConditions, doors)
        }
        return arrConditions;
    }

    getConditionsTransmission(arrConditions, trans) {
        if (arrConditions.length > 0) {
            var temp = arrConditions;
            arrConditions = [];
            _.map(trans, (tran)=> {
                _.map(temp, (condition) => {
                    var object = {
                        fuelTypeToDisplay: condition.fuelTypeToDisplay,
                        transmission: tran
                    };
                    arrConditions.push(object);
                });
            });
        } else {
            trans.map(tran => {
                arrConditions.push({transmission: tran});
            });
        }
        return arrConditions;
    }

    getConditionsDoors(arrConditions, doors) {
        if (arrConditions.length > 0) {
            let temp = arrConditions;
            arrConditions = [];
            doors.map(door => {
                _.map(temp, condition => {
                    var object = {};
                    if (condition.fuelTypeToDisplay)
                        object.fuelTypeToDisplay = condition.fuelTypeToDisplay;
                    if (condition.transmission)
                        object.transmission = condition.transmission;

                    object.numberOfDoorsToDisplay = door;
                    arrConditions.push(object);
                });
            });
        } else {
            doors.map(door => {
                arrConditions.push({numberOfDoorsToDisplay: door});
            });
        }
        return arrConditions;
    }

    onBack() {
        browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-derivative/' + this.props.params.brand + '/' + this.props.params.model);
    }

    onSelect(vehicleId) {
        this.props.selectVehicle(vehicleId);
        browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-package/' + this.props.params.brand + '/' + this.props.params.model + '/' + vehicleId);
    }

    showPopup() {
        this.setState({
            showPopup: true
        });
    }

    hidePopup() {
        this.setState({
            showPopup: false
        });
    }

    render() {
        let header = "Selecciona el motor para tu <strong>" + this.props.params.model + "</strong>";
        let subHeader = "Puedes editar la selección, o configurar otro coche más tarde.";

        return (
            this.props.ui.loading ? <span>Loading...</span> :
            <div id="register-car" className="container-fluid no-padding">
                <div className="container">
                    <RegisterProgressBar step={this.state.step}/>
                </div>

                <RegisterHeader header={header} subHeader={subHeader}/>

                <div className="body container">
                    <ListPropertyCar conditions={this.state.conditionFilter}
                                     changeCondition={::this.onChangeConditionFilter}/>
                    <ListCar listCar={this.state.vehiclesFilter} onSelect={::this.onSelect}
                             showPopup={::this.showPopup}/>
                    {this.state.showPopup ? <EmissionsBoard hidePopup={::this.hidePopup}/> : ""}
                    {this.state.showPopup ? <div className="fade" onClick={this.hidePopup.bind(this)}></div> : ""}
                </div>

                <div className="footer container">
                    <button className="btn btn-default btn-trans btn-md" onClick={::this.onBack}>Atrás</button>
                </div>
            </div>
        );
    }
}
