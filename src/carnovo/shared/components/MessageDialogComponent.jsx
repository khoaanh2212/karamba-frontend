import React, {Component} from 'react';
import ErrorBox from '../components/ErrorBox.component';

export default class MessageBoxDialogComponent extends Component {

    render() {
        let data = this.props.data;
        let image = data.image;
        let type = data.type;
        let content = data.content;
        let sendDate = data.sendDate;
        let downloads = data.downloads;
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
    }
}