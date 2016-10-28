import React, {Component} from 'react'

export default class SectionSixth extends Component {
  render() {
    let {
      isHidden,
      onHidePopup
    } = this.props;
    return (
      <section className="section-sixth container-fluid">
        {!isHidden ?
          <div className="text-center">
            Carnovo utiliza cookies para mejorar tu experiencia de usuario. Al continuar navegando consideramos que aceptas su uso. Para más información haz click&nbsp;
            <a href={process.env.PUBLIC_PATH + 'privacy-policy'}>aquí</a>
            <i className="ic-close" onClick={onHidePopup}/>
          </div>: null
        }
      </section>
    )
  }
}
