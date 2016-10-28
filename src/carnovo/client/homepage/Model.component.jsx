import React, {Component} from 'react';
import _ from 'lodash';

export default class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCars: []
        };
    }

    componentWillMount() {
        //Called the first time the component is loaded right before the component is added to the page
    }

    componentDidMount() {
        //Called after the component has been rendered into a page
    }

    componentWillReceiveProps(nextProps) {
        //Called when the props provided to the component are changed
        if (nextProps.selectedBrand && nextProps.models[nextProps.selectedBrand]) {
            this.setState({
                currentCars: nextProps.models[nextProps.selectedBrand].models
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        // Called when the props and/or state change

    }

    componentWillUnmount() {
        //Called when the component is removed
    }

    render() {
        var models = _.map(this.state.currentCars, (model, i) => {
            return <div className="col-md-2 col-sm-3 col-xs-4 item" key={i}
                        onClick={event => {this.props.onChooseModel(model.name)}}>
                <div className="item-inner font-sm">{model.name}</div>
            </div>;
        });

        return (
            <section id="model" className="container-fluid">
                <div className="model-inner container">
                    <div className="model-body">
                        <div className="model-title text-center">
                            <div className="brand-title">{this.props.selectedBrand}</div>
                            <div className="btn-close" onClick={event => {this.props.onClearSelectedBrand()}}>
                              <i className="ic-close"/>
                            </div>
                            <div className="clear"></div>
                            <h1 className="title">Elija un modelo</h1>
                        </div>

                        <div className="row">
                            {models}
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>
            </section>
        )
    }
}
