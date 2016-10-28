import React from 'react';
import PendingDealer from 'view/components/PendingDealer';

export default class PendingDealersList extends React.Component {
    
    render() {
        const {onAcceptPendingDealer, onRejectPendingDealer, pendingDealers, token} = this.props;
        return (
            <div>
                <table className="panelTable">
                    <thead className="panelHead">
                    <tr>
                        <th>Comercial</th>
                        <th>Vendedor</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Cómo llegó</th>
                        <th>Aceptar</th>
                        <th>Rechazar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingDealers.map(pendingDealer =>
                        <PendingDealer
                            key={pendingDealer.id}
                            {...pendingDealer}
                            onAccept={onAcceptPendingDealer}
                            onReject={onRejectPendingDealer}
                            token={token}
                        />
                    )}
                    </tbody>
                </table>
            </div>

        );
    };
}