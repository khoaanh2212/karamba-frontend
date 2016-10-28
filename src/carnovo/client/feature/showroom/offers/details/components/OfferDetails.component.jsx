import React, {Component} from 'react';
import OfferFooterDetail from '../../../../../../widgets/OfferFooterDetail.component';
import VehicleDetailsBox from '../../../../../../widgets/VehicleDetailsBox.component';
import OfferDetailsPrice from '../../../../../../widgets/OfferDetailsPrice.component';
import OfferPricePreview from '../../../../../../widgets/OfferPricePreview.component';
import OfferOptionsPreview from '../../../../../../widgets/OfferOptionsPreview.component';

let PriceComponent = (price) => {
  return <OfferDetailsPrice price={price}/>;
};

export default class OfferDetails extends Component {
  render() {
    let {
      offer,
      conditions
    } = this.props;
    let details = <VehicleDetailsBox car={offer.appliance}
                                     PriceComponent={PriceComponent(offer.appliance.price)}
                                    created={offer.created}/>;
    return(
      <div className="opportunityDetails opodetail">
        <div className="grid box">
          <div className="col-1-2">
            {details}
          </div>
          <OfferPricePreview pvp={offer.appliance.price} cashPrice={offer.cashPrice} financePrice={offer.financePrice}/>
        </div>
        <OfferFooterDetail></OfferFooterDetail>
        <OfferOptionsPreview conditions={conditions}></OfferOptionsPreview>
      </div>
    )
  }
}
