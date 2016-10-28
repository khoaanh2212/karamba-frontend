import React from "react";

export class PendingDealer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onAcceptDealer() {
        var r = confirm("Está seguro que quiere aceptar al vendedor: " + this.props.dealerName + "?");
        if (r == true) {
            this.props.onAccept(this.props.id, this.props.token)
        }
    }
    onRejectDealer() {
        var r = confirm("Está seguro que quiere rechazar al vendedor: " + this.props.dealerName + "?");
        if (r == true) {
            this.props.onReject(this.props.id, this.props.token);
        }

    }
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.vendorName}</td>
                <td>{this.props.email}</td>
                <td>{this.props.phone}</td>
                <td>{this.props.howArrivedHere}</td>
                <td><i className="material-icons iconTable" onClick={this.onAcceptDealer.bind(this)}>done</i></td>
                <td><i className="material-icons iconTable" onClick={this.onRejectDealer.bind(this)}>close</i></td>
            </tr>
        );
    }
}

export default PendingDealer;

