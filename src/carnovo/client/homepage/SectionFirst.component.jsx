import React, {Component} from 'react'
import ScrollToElement from '../../shared/utils/ScrollToElement'

export default class SectionFirst extends Component {

    render() {
        var maxWidth = {width: '100%'};
        return (
            <section className="section-first container-fluid">
                <div className="section-first-inner container text-center">
                    <h1>La mejor manera<br/>de comprar un coche nuevo</h1>
                    <div className="col-xs-12 no-padding">
                        <div className="col-xs-4 col-xs-push-4" onClick={event => {
                          this.props.onShowBrands();
                          ScrollToElement(".section-second")}}>
                            <button className="btn btn-md btn-success" style={maxWidth}>Configura tu coche </button>
                        </div>
                        {/*<div className="col-xs-4 col-xs-push-2">*/}
                            {/*<button className="btn btn-md btn-default btn-trans" style={maxWidth}>¿Cómo funciona?*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="find-out-more" onClick={(e) => ScrollToElement(".section-first-end")}>
                  <i className="ic-caret-down"/>
                </div>
              <div className="section-first-end"/>
            </section>
        )
    }
}
