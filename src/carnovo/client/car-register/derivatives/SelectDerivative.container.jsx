import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import ui from 'redux-ui';
import SelectDerivativeUi from './SelectDerivative.uistate';
import RegisterProgressBar from "../components/RegisterProgressBar.component";
import RegisterHeader from "../components/RegisterHeader.component";
import RegisterFooter from "../components/RegisterFooter.component";
import SelectDerivativeDetail from "./components/SelectDerivativeDetail.component";
import {SelectDerivativePropsBinding, SelectDerivativeDispatchBinding} from "./SelectDerivative.bindings";

@ui(SelectDerivativeUi)
@connect(SelectDerivativePropsBinding, SelectDerivativeDispatchBinding)
export default class SelectDerivative extends Component {
    constructor() {
        super();
        this.step = 2;
        window.scrollTo(0,0);
    }

    componentWillMount() {
        this.props.fetchModel(null, this.props.params.brand, this.props.params.model);
    }

    onSelectDerivative(derivative, derivativeType) {
        this.props.selectDerivative(derivative, derivativeType);
    }

    onNext() {
        browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-car/' + this.props.params.brand + '/' + this.props.params.model);
    }

    render() {

        let options = this.props.options;
        let fuels = options ? options.fuels : null;
        let trans = options ? options.trans : null;
        let doors = options ? options.doors : null;
        let header = "¿Qué tipo de <strong>" + this.props.params.model + "</strong> quieres?";
        let subHeader = "Puedes seleccionar múltiples opciones";

        return (
            this.props.ui.loading ? <span>Loading...</span> :
            <div id="register-car" className="container">
                <RegisterProgressBar step={this.step}/>
                <RegisterHeader header={header} subHeader={subHeader}/>

                <SelectDerivativeDetail fuels={fuels} trans={trans} doors={doors}
                                        onSelectDerivative={::this.onSelectDerivative}
                                        selectedDerivatives={this.props.selectedDerivatives}></SelectDerivativeDetail>
                <RegisterFooter onNext={::this.onNext}></RegisterFooter>
            </div>
        );
    }
}


