import React, {Component} from 'react';

export default class ConversationsClientIntroduce extends Component {
    render() {
        return (
            <div className="introduce">
                <div className="col-md-4">
                    <div className="img-home-car img"></div>
                    <div className="content">
                        <div className="header">Concesionarios oficiales</div>
                        <div className="description">
                          Solo trabajamos con concesionarios oficiales que cuenten con la aprobación del fabricante y que se preocupen por ofrecerte la mejor experiencia de compra.
                          Todos ellos disponen de showrooms que puedes visitar y cuentan con valoraciones realizadas por otros compradores que puedes consultar.
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="img-trophie img"></div>
                    <div className="content">
                        <div className="header">Solo los mejores</div>
                        <div className="description">
                          Realizamos un seguimiento exhaustivo a nuestros concesionarios de confianza para asegurarnos de que ofrecen la mejor experiencia de compra.
                          Solo trabajamos con aquellos que ofrezcan un trato amable y estén bien informados. Decimos adiós al resto.
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="img-rating img"></div>
                    <div className="content">
                        <div className="header">Ahorro garantizado</div>
                        <div className="description">
                          Te evitamos el desplazamiento hasta el concesionario. Es carnovo quien se encarga de negociar con los agentes para conseguirte la mejor oferta.
                          Logramos precios que no conseguirías de la forma tradicional.
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}
