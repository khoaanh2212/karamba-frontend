import React, {Component} from 'react';
import { NEW_OPPORTUNITY } from '../Opportunities.reducer';
import OpportunityStatusMap from '../../../../shared/utils/OpportunityStatusMap';
import FormatCurrency from '../../../../shared/utils/FormatCurrency';

let progressBarStyle = (numberOffers, total) =>{
  let ratio = (numberOffers / total)*100;
  let style= {width: ratio + "%"};
  if(ratio < 30) return {...style, background: 'limegreen'};
  if(ratio < 70) return {...style, background: 'orange'};
  return {...style, background: 'red'};
};

export default class OpportunityRow extends React.Component {
  render() {
    let data = this.props;
    return (
      <tr onClick={()=>data.onClick(data.content.id)} className={!data.content.isRead ? (data.content.state == NEW_OPPORTUNITY ? "content-row new-opportunity" : "content-row new-activity") : "content-row"}>
        <td><div id="circle"></div>{data.content.id}</td>
        <td>{data.content.brand}</td>
        <td>{data.content.model}</td>
        <td>{FormatCurrency(parseFloat(data.content.pvp) + data.content.summaryExtraPrice)}</td>
        <td>{data.content.clientName}</td>
        {data.content.state == NEW_OPPORTUNITY ?
          <td>
            <div id="number-offers">{data.content.numberOffers}/5</div>
            <div className="easy-progress-wrap easy-progress">
              <div className="easy-progress-bar easy-progress" style={progressBarStyle(data.content.numberOffers, 5)}></div>
            </div>
          </td> :
          <td>
            <div>{data.content.created}</div>
          </td>
        }
        <td>
          <span className={"status " + OpportunityStatusMap(data.content.state).klass}> {OpportunityStatusMap(data.content.state).label} </span>
        </td>
        {!!data.showToolbox ?
          <td>
            <div className="opportunity-toolbox">
              <div id="box-message">
                <i className="ic-message"/>
                <span onClick={
                  (e)=>{
                    e.stopPropagation();
                    data.showToolbox(data.content.id, 'message');
                  }
                }> Mensajes </span>
              </div>

              <div id="box-download">
                <i className="ic-download"/>
                <span onClick={
                  (e)=>{
                    e.stopPropagation();
                    data.showToolbox(data.content.id, 'download');
                  }
                }> Descargar </span>
              </div>

              <div id="box-file">
                <i className="ic-file"/>
                <span onClick={
                  (e)=>{
                    e.stopPropagation();
                    data.showToolbox(data.content.id, 'file');
                  }
                }> Archivar </span>
              </div>

            </div>
          </td> : null }
      </tr>
    );
  }
}
