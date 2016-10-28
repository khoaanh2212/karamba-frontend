import React, {Component} from 'react';
import _ from 'lodash';

export default class ListPropertyCar extends Component {
    constructor() {
        super();
        this.state = {
            tabActive: 'fuels'
        }
    }

    onChangeTransTypeTab() {
        this.setState({
            tabActive: 'trans'
        });
    }

    onChangeFuelsTypeTab() {
        this.setState({
            tabActive: 'fuels'
        });
    }

    onChangeDoorsTypeTab() {
        this.setState({
            tabActive: 'doors'
        });
    }

    renderFuelsOptions() {
        var optionsFuels = "";
        if (this.props.conditions.fuels) {
            optionsFuels = _.map(this.props.conditions.fuels, (fuelOption, i) => {
                return <div className="checkbox" key={i}>
                    <label>
                        <input type="checkbox"
                               onChange={event => this.props.changeCondition('fuels',fuelOption.name)}
                               checked={fuelOption.value} className="checkbox"/>
                        <span>{fuelOption.name}</span>
                    </label>
                </div>
            });
            return <div className="optional text-center">
                {optionsFuels}
            </div>;
        }
        return "";
    }

    renderTransOptions() {
        var optionsTrans = "";
        if (this.props.conditions.trans) {
            optionsTrans = _.map(this.props.conditions.trans, (transmissionOption, i) => {
                return <div className="checkbox" key={i}>
                    <label>
                        <input type="checkbox"
                               onChange={event => this.props.changeCondition('trans',transmissionOption.name)}
                               checked={transmissionOption.value} className="checkbox"/>
                        {transmissionOption.name === 'A' || transmissionOption.name === 'Automático' ?
                            <span>Automático</span> : ""}
                        {transmissionOption.name === 'M' || transmissionOption.name === 'Manual' ?
                            <span>Manual</span> : ""}
                    </label>
                </div>
            });
            return <div className="optional text-center">
                {optionsTrans}
            </div>;
        }
        return "";
    }

    renderDoorsOptions() {
        var optionsDoors = "";
        if (this.props.conditions.doors) {
            optionsDoors = _.map(this.props.conditions.doors, (doorOption, i) => {
                return <div className="checkbox" key={i}>
                    <label>
                        <input type="checkbox"
                               onChange={event => this.props.changeCondition('doors',doorOption.name)}
                               checked={doorOption.value} className="checkbox"/>
                        <span>{doorOption.name} puertas</span>

                    </label>
                </div>
            });
            return <div className="optional text-center">
                {optionsDoors}
            </div>;
        }
        return "";
    }

    render() {
        var Fuels = this.renderFuelsOptions();
        var Trans = this.renderTransOptions();
        var Doors = this.renderDoorsOptions();

        return (
            <div className="list-property">
                <div className="tab container-fluid no-padding">
                    <ul className="list-inline text-center">
                        {this.props.conditions.fuels ? this.state.tabActive === 'fuels' ?
                            <li className="active"><i className="ic-gas-station"></i>&nbsp;Combustible</li> :
                            <li onClick={this.onChangeFuelsTypeTab.bind(this)}><i className="ic-gas-station"></i>&nbsp;Combustible
                            </li> : ""}
                        {this.props.conditions.trans ? this.state.tabActive === 'trans' ?
                            <li className="active"><i className="ic-cog active"></i>&nbsp;Transmisión</li> :
                            <li onClick={this.onChangeTransTypeTab.bind(this)}><i className="ic-cog"></i>&nbsp;Transmisión
                            </li> : ""}
                        {this.props.conditions.doors ? this.state.tabActive === 'doors' ?
                            <li className="active"><i className="ic-car-door"></i>&nbsp;Puertas</li> :
                            <li onClick={this.onChangeDoorsTypeTab.bind(this)}><i className="ic-car-door"></i>&nbsp;Puertas
                            </li> : ""}

                    </ul>
                </div>
                {this.state.tabActive === 'fuels' ? Fuels : "" }
                {this.state.tabActive === 'trans' ? Trans : "" }
                {this.state.tabActive === 'doors' ? Doors : "" }
            </div>);
    }
}
