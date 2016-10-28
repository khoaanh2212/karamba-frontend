import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from 'app/App.container';
import NotFoundContainer from 'app/NotFound.container';
import TermsConditions from 'app/TermsConditions.container';
import PrivacyPolicy from 'app/PrivacyPolicy.container';
import Login from 'auth/Login.container';
import DealerHome from 'dealer/home/DealerHome.container';
import DealerProfile from "dealer/private/profile/DealerProfile.container";
import EditProfile from "dealer/private/edit/DealerEditForm.container";
import DealerPasswordForm from "confirm/dealer/DealerPasswordForm.container";
import ValidateToken from "confirm/dealer/ValidateDealer.hoc";
import ClientHome from "client/ClientHome.container";
import requiresAuth from "hoc/requiresAuth";
import fetchBrands from "hoc/fetchBrands";
import fetchStock from "hoc/fetchStock";
import fetchOpportunities from "hoc/fetchOpportunities";
import fetchModelAndExtras from "hoc/fetchModelAndExtras";
import fetchStatistic from "hoc/fetchStatistic";
import fetchOffers from "hoc/fetchOffers";
import fetchDealerMessageHOC from "hoc/fetchDealerMessage.jsx";
import fetchMessage from "hoc/fetchClientMessage";
import fetchConversations from "hoc/fetchConversations";
import CurrentDealer from 'dealer/private/edit/DealerEditForm.hoc';
import DealerAppHome from "dealer/private/DealerAppHome.container";
import Catalog from "dealer/private/catalog/Catalog.container";
import StockCatalog from "dealer/private/stock/StockCatalog.container";
import StockDetails from "dealer/private/stock/details/StockDetails.container";
import Opportunities from "dealer/private/opportunities/Opportunities.container";
import OpportunitiesParent from "dealer/private/opportunities/OpportunitiesParent.container";
import Opportunity from "dealer/private/opportunities/details/Opportunity.container";
import Stock from "dealer/private/stock/Stock.container";
import AddCar from "dealer/private/add-car/AddCar.container";
import EditCar from "dealer/private/edit-car/EditCar.container";
import SelectDerivative from "client/car-register/derivatives/SelectDerivative.container";
import SelectCar from "client/car-register/cars/SelectCar.container";
import SelectPackage from "client/car-register/packs/SelectPackage.container";
import SelectColor from "client/car-register/colors/SelectColor.container";
import PostCode from "client/car-register/personal/PostCode.container";
import EmailVerify from "client/car-register/personal/EmailVerify.container";
import ClientLogin from 'client/auth/Login.container';
import LogoutUser from 'auth/LogoutUser.container.jsx';
import Showroom from 'client/feature/showroom/Showroom.container';
import Statistic from "dealer/private/statistic/Statistic.container";
import StatisticParent from "dealer/private/statistic/StatisticParent.container";
import Offers from "client/feature/showroom/offers/Offers.container";
import DealerOfferDetail from "client/feature/showroom/offers/details/DealerOfferDetail.container";
import ClientMessage from "client/feature/message/ClientMessage.container";
import DealerMessage from "dealer/private/message/DealerMessage.container.jsx";
import Conversations from "dealer/private/conversations/Conversations.container";
import Conversation from "dealer/private/conversations/details/Conversation.container";
import CurrentClient from 'client/feature/profile/ClientProfile.hoc';
import ClientProfile from "client/feature/profile/ClientProfile.container";
import ClientReview from "client/feature/review/ClientReview.container";

export default () => {
    return (
        <Route path={process.env.PUBLIC_PATH} component={App}>
            <IndexRoute component={ClientHome}/>

            <Route path="terms-and-conditions" component={TermsConditions}></Route>
            <Route path="privacy-policy" component={PrivacyPolicy}></Route>

            <Route path="confirm">
                <Route path=":token" component={ValidateToken(DealerPasswordForm)}/>
            </Route>

            <Route path="car-register">
                <Route path="select-derivative/:brand/:model" component={SelectDerivative}></Route>
                <Route path="select-car/:brand/:model" component={SelectCar}></Route>
                <Route path="select-package/:brand/:model/:vehicleId" component={SelectPackage}></Route>
                <Route path="select-color/:vehicleId/:packageId" component={SelectColor}></Route>
                <Route path="select-color/:vehicleId" component={SelectColor}></Route>
                <Route path="post-code" component={PostCode}></Route>
                <Route path="email-verify" component={EmailVerify}></Route>
            </Route>

            <Route path="client">
                <Route path="login" component={ClientLogin}/>
                <Route path="profile">
                  <IndexRoute component={requiresAuth(CurrentClient(ClientProfile), 'client')}/>
                </Route>
                <Route path="review" component={requiresAuth(ClientReview, 'client')}/>
                <Route path="showroom">
                  <IndexRoute component={requiresAuth(Showroom, 'client')}/>
                  <Route path=":offerId" component={fetchOffers(Offers)}/>
                </Route>
                <Route path="offer/:offerId/dealer" component={requiresAuth((DealerOfferDetail), 'client')}/>
                <Route path="message/:offerId" component={requiresAuth(fetchMessage(ClientMessage), 'client')}/>
            </Route>

            <Route path="dealer" component={DealerHome}/>
            <Route path="dealer/login" component={Login}/>
            <Route path="user/logout" component={LogoutUser}/>

            <Route path="dealer" component={requiresAuth(CurrentDealer(DealerAppHome), 'dealer')}>
                <Route path="profile">
                    <IndexRoute component={DealerProfile}/>
                    <Route path="edit" component={EditProfile}/>
                    <Route path="valuations" component={DealerProfile}/>
                </Route>
                <Route path="message/:offerId" component={requiresAuth(fetchDealerMessageHOC(DealerMessage), 'dealer')}/>
                <Route path="catalog" component={fetchBrands(Catalog)}/>

                <Route path="opportunities" component={fetchOpportunities(OpportunitiesParent)}>
                    <IndexRoute component={Opportunities}/>
                    <Route path=":opportunityId">
                        <IndexRoute component={CurrentDealer(Opportunity)}/>
                    </Route>
                </Route>

                <Route path="conversations">
                  <IndexRoute component={fetchConversations(Conversations)}/>
                  <Route path=":offerId" component={Conversation}/>
                </Route>

                <Route path="statistic" component={fetchStatistic(StatisticParent)}>
                  <IndexRoute component={Statistic}/>
                </Route>

                <Route path="stock" component={fetchStock(fetchBrands(Stock))}>
                    <IndexRoute component={StockCatalog}/>
                    <Route path="add-car" component={fetchBrands(AddCar)}/>

                    <Route path=":vehicleId">
                        <IndexRoute component={StockDetails}/>
                        <Route path="edit" component={fetchModelAndExtras(EditCar)}/>
                    </Route>
                </Route>

            </Route>

            <Route path="*" component={NotFoundContainer}/>
        </Route>
    );
};
