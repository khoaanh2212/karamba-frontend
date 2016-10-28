import React, {Component} from 'react';
import ErrorBox from '../components/ErrorBox.component';
import 'lodash';

let MessageDialog = (data) => {
  let {
    image = {},
    type,
    content,
    sendDate,
    downloads = []
  } = data;

  let avatarImage = image && image.url ? `url(${image.url})` : null;
  let isReceive = type == "receive";
  return (
    <div>
      <div className={`message ${isReceive ? 'receive' : 'send'}`}>
        {avatarImage ?
          <div className="avatar-frame img-circle" style={{backgroundImage: avatarImage}}></div> :
            <div className="avatar-frame img-circle default-avatar"></div>
        }
        <div className="wrapper">
          <div className="message-container">
            <div className="content">
              {content}
            </div>
            <div className="time">{sendDate}</div>
          </div>
          {downloads.length > 0 ?
            <div className="downloads">
              {downloads.map((download, i) =>
                <a key={i} className="item" href={download.url}>
                  <i className="ic-attachment"/><span>{download.label}</span>
                </a>)}
            </div> : null}
        </div>
      </div>
    </div>
  )
};

let MessageInput = (data) => {
  let {
    displayTitle = true,
    message,
    chatWith,
    sendMessage,
    _getBase64FromFile,
    msgBlankError
  } = data;

  return (
    <div className="carnovo-row">
      {msgBlankError != "" ?
        <ErrorBox message={msgBlankError}/> : null
      }
      {displayTitle ?
        <div className="title">Mensajes con {chatWith}</div>
      : null}
      <div className="input-container">
        <textarea className="txa" ref={node => {message(node)}} placeholder="Escribe aqui tu mensaje ..."/>
        <div className="actions">
          <div className="attachments">
            <i className="ic-attachment"/> Adjuntar archivo
            <input type="file" id="upload" onChange={(e)=>{_getBase64FromFile(e.target.files[0])}}/>
          </div>
          <button className="btn btn-send" onClick={sendMessage}>Enviar mensaje</button>
        </div>
      </div>
    </div>
  )
};

export default class MessageBox extends Component {
  constructor() {
    super();
    window.messageUpload = null;
    this.state = {
      msgBlankError: ""
    }
  }

  setMessage(message) {
    this.message = message;
  }

  sendMessage() {
    let message = this.message.value;
    let upload = this.upload;
    let offerId = this.props.offerId;

    if (!!offerId && message.trim() != "") {
      this.props.onSendingMessage && this.props.onSendingMessage(offerId, message, upload);
    } else {
      this.setState({msgBlankError: "El mensaje no puede estar vacío."})
    }
  }

  _getBase64FromFile(file) {
    window.messageUpload = null;
    var reader = new FileReader();
    reader.onload = (() => {
      return function (e) {
        this.setState(prevState => {
          let newState = {...prevState};
          newState["attachment"] = e.target.result;
          return newState;
        });
      };
    })(file).bind(this);
    reader.readAsDataURL(file);
    window.messageUpload = file;
  }

  render() {
    let {
      messages = [],
      chatWith,
      displayTitle
    } = this.props;

    let MessageInputProps = {
      displayTitle: displayTitle,
      message: this.setMessage.bind(this),
      chatWith: chatWith,
      sendMessage: this.sendMessage.bind(this),
      _getBase64FromFile: this._getBase64FromFile.bind(this),
      msgBlankError: this.state.msgBlankError
    };

    messages = _.sortBy(messages, (e) => { return new Date(e.sendDate); }).reverse();

    return(
      <div className="message-component">
        <MessageInput {...MessageInputProps}/>

        <div className="carnovo-row">
          <div className="message-container">
            {
              messages.map && messages.map((message, i) =>
                <MessageDialog key={i} {...message}/>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
