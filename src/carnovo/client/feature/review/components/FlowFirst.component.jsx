import React, {Component} from 'react'
import EasySelectBox from '../../../../shared/components/EasyComponents/EasySelectBox.component'

export default class FlowFirst extends Component {
  constructor() {
    super();
    this.state = {
      selectChanged: false
    }
  }

  componentDidMount() {
    //initialize dealerName
    this.props.updateInfo({dealerId: ""})
  }

  onSelectChange(e) {
    this.props.updateInfo({dealerId: e.value});
  }

  onInputChange(e) {
    let temp = {};
    temp[e.target.id] = e.target.value;
    this.props.updateInfo(temp);
  }

  toSelectBoxItems() {
    let items = [];
    this.props.dealers.map(
      (dealer) => {
        let temp = {};
        temp.label = dealer.dealer_name;
        temp.value = dealer.dealer_id;
        items.push(temp);
      }
    );
    return items;
  }

  render() {
    let items = this.toSelectBoxItems();

    return(
      <div className="first-flow">
        <div className="row">
          <div className="col-md-6 lbel">¿En qué concesionario compraste?</div>
          <div className="col-md-6"><EasySelectBox items={items} selected={{label: "Nombre del concesionario", value: ""}} onChange={::this.onSelectChange}/></div>
        </div>
        <div className="row">
          <div className="col-md-6 lbel">¿Cómo se llamaba el comercial?</div>
          <div className="col-md-6"><input name="business" id="business" type="text" placeholder="Nombre del comercial" onChange={::this.onInputChange}/></div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-6 lbel">¿Cuál es tu nombre completo?</div>
          <div className="col-md-6"><input name="name" id="name" type="text" placeholder="Nombre y apellidos" onChange={::this.onInputChange}/></div>
        </div>
      </div>
    )
  }
}
