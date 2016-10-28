import React, {Component} from 'react';

let MessageDialog = (data) => {
  let avatarImage = (data.image && data.image.url) ? `url(${data.image.url})` : null;
  let isReceive = data.type == "receive";
  return (
    <div>
      <div className={"message " + (isReceive ? "receive" : "send")}>
        {avatarImage ?
          <div className="avatar-frame img-circle" style={{backgroundImage: avatarImage}}></div>
            : <div className="avatar-frame img-circle default-avatar"></div>
        }
        <div className="wrapper">
          <div className="message-container">
            <div className="content">
              {data.content}
            </div>
            <div className="time">{data.sendDate}</div>
          </div>
          {data.downloads.length > 0 ?
            <div className="downloads">
              {data.downloads.map((download, i) =>
                <a key={i} className="item" href="#" download={download.url}>
                  <i className="ic-attachment"/><span>{download.label}</span>
                </a>)}
            </div> : null}
        </div>
      </div>
    </div>
  )
};

export default class Message extends Component {
  sendMessage() {
    let message = this.message.value;
    let upload = this.upload;
    let offerId = this.props.offerId;
    this.props.sendDealerMessage(this.props.token, offerId, message, upload);
  }

  _getBase64FromFile(file) {
    this.upload = "";
    var reader = new FileReader();
    reader.onload = (() => {
      return function (e) {
        this.upload = e.target.result;
      };
    })(file).bind(this);
    reader.readAsDataURL(file);
  }

  render() {

    return (
      <div id="client-message" className="floating-left">
        <div className="carnovo-row">
          <div className="offer-id">ID Oferta {this.props.offerId}</div>
          <div className="clearfix"></div>
          <div className="input-container">
            <textarea className="txa" ref={node => {this.message = node }} placeholder="Escribe aqui tu mensaje ..."/>
            <div className="actions">
              <div className="attachments">
                <i className="ic-attachment"/> Adjuntar archivo
                <input type="file" id="upload" onChange={(e)=>{this._getBase64FromFile(e.target.files[0])}}/>
              </div>
              <button className="btn btn-send" onClick={this.sendMessage.bind(this)}>Enviar mensaje</button>
            </div>
          </div>
        </div>
        <hr/>
        <div className="carnovo-row">
          <div className="message-container">
            {
              this.props.messages.map && this.props.messages.map((message, i) =>
                <MessageDialog {...message} key={i}/>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
