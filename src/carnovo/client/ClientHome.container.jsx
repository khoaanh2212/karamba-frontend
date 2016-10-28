import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import Brand from './homepage/Brand.component';
import Model from './homepage/Model.component';
import SectionFirst from './homepage/SectionFirst.component';
import SectionSecond from './homepage/SectionSecond.component';
import SectionThird from './homepage/SectionThird.component';
import SectionFourth from './homepage/SectionFourth.component';
import SectionFifth from './homepage/SectionFifth.component';
import SectionTrustpilot from './homepage/SectionTrustpilot.component';
import {ClientHomePropsBindings, ClientHomeDispatchBindings} from "./ClientHome.bindings";
import {browserHistory} from 'react-router';
import ScrollToElement from '../shared/utils/ScrollToElement';

@connect(ClientHomePropsBindings, ClientHomeDispatchBindings)
export default class ClientHome extends Component {
    constructor() {
        super();
        this.state = {
            showBrands: false
        }
    }

    componentWillMount() {
        this.props.fetchBrands(null);
        this.props.selectedBrand && this.props.fetchModels(null, this.props.selectedBrand);
    }

    componentDidMount() {
      setTimeout(()=> { // setTimeout (may) run on different thread => boost up performance
        if (/brands/.test(this.props.location.hash)) {
          this.onShowBrands();
          ScrollToElement(".section-first-end");
        }
      }, 0);
    }

    onShowBrands() {
        this.setState({
            showBrands: true
        });
    }

    onChangeBrand(brandName) {
        this.props.selectBrand(brandName);
        this.props.fetchModels(null, brandName);
    };

    onChooseModel(modelName) {
        this.props.selectModel(modelName);
        this.props.resetSelectedDerivative();
        browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-derivative/' + this.props.selectedBrand + '/' + modelName);
    }

    onClearSelectedBrand() {
        this.props.selectBrand(null);
        this.setState({showBrands: true})
    }

    onCloseBrands() {
        this.setState({
            showBrands: false
        })
    }

    render() {
        return (
            <div id="client-home">
                <Helmet {...config.app.head}/>
                <SectionFirst showBrands={this.state.showBrands} onShowBrands={::this.onShowBrands}/>
                {(!this.props.selectedBrand && this.state.showBrands) ?
                    <Brand brands={this.props.brands} models={this.props.models}
                           selectedBrand={this.props.selectedBrand}
                           onChangeBrand={::this.onChangeBrand}
                           onCloseBrands={::this.onCloseBrands}/> : null}
                {this.props.selectedBrand ?
                    <Model selectedBrand={this.props.selectedBrand} models={this.props.models}
                           onChooseModel={::this.onChooseModel}
                           onClearSelectedBrand={::this.onClearSelectedBrand}/> : null}
                <SectionSecond/>
                <SectionTrustpilot/>
                <SectionThird/>
                <SectionFourth/>
                <SectionFifth onShowBrands={::this.onShowBrands}/>
            </div>
        );
    }
}
