import React, {Component} from 'react'
import ScrollToElement from '../../shared/utils/ScrollToElement'

export default class SectionFifth extends Component {

  render() {
    return (
      <section className="section-fifth container-fluid">
        <h1 className="text-center">¿Estás listo?</h1>
        <div className="text-center">
          <button className="btn btn-success btn-md" style={{width: '345px'}} onClick={e => {this.props.onShowBrands();ScrollToElement(".section-first-end")}}>Selecciona un coche</button>
        </div>
      </section>
    )
  }
}
