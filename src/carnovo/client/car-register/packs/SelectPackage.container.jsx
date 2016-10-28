import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import ui from 'redux-ui';
import SelectPackageUi from './SelectPackage.uistate';
import RegisterProgressBar from "../components/RegisterProgressBar.component";
import RegisterHeader from "../components/RegisterHeader.component";
import {SelectPackagePropsBinding, SelectPackageDispatchBinding} from "./SelectPackage.bindings";
import {find, map} from 'lodash';
import FormatCurrency from '../../../shared/utils/FormatCurrency';

@ui(SelectPackageUi)
@connect(SelectPackagePropsBinding, SelectPackageDispatchBinding)
export default class SelectPackage extends Component {
    constructor() {
        super();
        this.state = {
            step: 2
        };
    }

    componentWillMount() {
        this.props.fetchPackagesFromEngine(null, this.props.params.vehicleId)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({packages: nextProps.packages});
    }

    onBack() {
        browserHistory.goBack();
    }

    onNext() {
        this.props.selectPackage(null);
        browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-color/' + this.props.params.vehicleId);
    }

    onSelect(packageId) {
        this.props.selectPackage(packageId);
        browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-color/' + this.props.params.vehicleId + '/' + packageId);
    }

    onReadmore(item) {
        let updatedPackages = this.state.packages;
        let selectedPackage = find(updatedPackages, function (pkg) {
            return pkg.id === item.id
        });
        selectedPackage.hasReadmore = !selectedPackage.hasReadmore;
        this.setState({
            packages: updatedPackages
        });
    }

    render() {
        let header = "Selecciona el Pack para el <strong>" + this.props.params.model + "</strong>";
        let subHeader = "Puedes editar la selección, o configurar otro coche más tarde.";
        return (
            this.props.ui.loading ? <span>Loading...</span> :
            <div id="register-car" className="container-fluid no-padding">
                <div className="container">
                    <RegisterProgressBar step={this.state.step}/>
                </div>

                <RegisterHeader header={header} subHeader={subHeader}/>

                <div className="body container">
                    <div className="list-car list-pack">
                        {
                            map(this.state.packages, (item, i) => {
                                return (
                                    <div className="well" key={i}>
                                        <div className="info">
                                            <div className="text-bold">{item.title}</div>
                                        </div>
                                        <div className={item.hasReadmore ? 'info readmore' : 'info'}>
                                            {
                                                map(item.extrasIncluded, (extra, j) => {
                                                    return (
                                                        <p key={j}>
                                                            {extra}<br/>
                                                        </p>
                                                    )
                                                })
                                            }
                                            <span onClick={() => this.onReadmore(item)}
                                                  className={item.hasReadmore ? '' : 'hidden'}>leer más</span>
                                        </div>
                                        <div className="info">
                                            <span>{item.type}</span>
                                            <div className="text-bold">{FormatCurrency(item.prices)}</div>
                                        </div>
                                        <div className="info">
                                            <button className="btn btn-success btn-md"
                                                    onClick={() => this.onSelect(item.id)}>Siguiente
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="footer container">
                  <div className="pack-footer">
                    <input type="submit" className="btn btn-default btn-trans btn-md" onClick={::this.onBack} value="Atrás"></input>
                    <input type="submit" className="btn btn-success btn-md" value="Siguiente" onClick={::this.onNext}/>
                  </div>
                </div>
            </div>
        )
    }
}
