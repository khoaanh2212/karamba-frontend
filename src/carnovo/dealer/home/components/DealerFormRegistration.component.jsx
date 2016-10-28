import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Input from './Input.component';

export default class DealerFormRegistration extends Component {
    render() {
        const {
            fields: {vendorName, dealerName, vendorRole, phone, email, howArrivedHere},
            handleSubmit
        } = this.props;

        return (
            <div>
                <div className="header">
                    <h3 className="header-title">Interesado en unirte?</h3>
                    <p className="header-description">
                        Fiscinas favere in chremisa! Cum fiscina volare, omnes amicitiaes carpseris germanus, neuter
                        solitudoes. Manducare virtualiter ducunt ad altus armarium.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input {...vendorName} labelId="vendorName" label="First and last name"
                                           placeholder="e.g. Adria Lapiedra"/>
                    <Input {...dealerName} labelId="dealerName" label="Dealership name"
                                           placeholder="e.g. Cochazos Adria"/>
                    <Input {...vendorRole} labelId="vendorRole" label="Job title" placeholder="e.g. Sales Manager"/>
                    <Input {...phone} labelId="phone" label="Phone number" placeholder="e.g. 666 11 22 33"/>
                    <Input {...email} labelId="email" label="Email address"
                                      placeholder="e.g. adria@cochazos-adria.com"/>
                    <Input {...howArrivedHere} labelId="howArrivedHere" label="How did you hear about us?"
                                               placeholder="e.g. Google"/>

                    <button type="submit" className="button-success">Apply now</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'dealerFormRegistration',
    fields: ['vendorName', 'dealerName', 'vendorRole', 'phone', 'email', 'howArrivedHere']
})(DealerFormRegistration);
