import React, {Component} from 'react';
import _ from 'lodash';

export default class Brand extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        //Called the first time the component is loaded right before the component is added to the page
    }

    componentDidMount() {
        //Called after the component has been rendered into a page
    }

    componentWillReceiveProps(nextProps) {
        //Called when the props provided to the component are changed
    }

    componentWillUpdate(nextProps, nextState) {
        // Called when the props and/or state change
    }

    componentWillUnmount() {
        //Called when the component is removed
    }

    render() {
        var brands = _.map(this.props.brands, (brand, i) => {
            return <div className="col-md-2 col-sm-3 col-xs-4 item" key={i}
                        onClick={event => {this.props.onChangeBrand(brand.name)}}>
                <div className="item-inner font-sm">{brand.name}</div>
            </div>;
        });

        return (
            <section id="brand" className="container-fluid">
                <div className="brand-inner container">
                    <div className="brand-body">
                        <div className="brand-title text-center">
                            <h1 className="title">Elija una marca</h1>
                            <div className="btn-close" onClick={event => {this.props.onCloseBrands()}}>
                                {/*<img src={require("../../theme/img/icon-close.svg")}/>*/}
                                <div className="circle-wrapper"><i className="ic-close"/></div>
                            </div>
                        </div>

                        <div className="row">
                            {brands}
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>

            </section>
        )
    }
}
