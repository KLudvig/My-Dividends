import React from 'react';
import trashcan from '../assets/images/trashcan.png';
import back from '../assets/images/back.png';

export class ListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      show: ''
    }
  }

  deleteStock(elem) {
    this.props.delete(elem)
  }

  toggleTrash(id) { //Show div with trash can onClick
    if(this.state.show === id) {
      this.setState({
        show: ''
      })
    } else {
      this.setState({
        show: id
      })
    }
  }

  render(){
    const stockData = this.props.stocks
    let listStocks = '';

  if(stockData.length > 0) {
    listStocks = stockData.map((stock) => 
      <li className={'stockList'} key={stock.id} onClick={() => { this.toggleTrash(stock.id)}}>
        <div className={this.state.show === stock.id ? 'overlayDiv show' : 'overlayDiv hide'} > 
          <div className="removeSelection">
            <span className="stockIconRemove"><img style={{width: 20,height: 20,marginTop:2}} src={back} alt="Back" /></span>
            <span className="stockIconRemove" style={{paddingLeft:10,paddingRight:10,marginTop:-5,fontSize:20}}>|</span>
            <span className="stockIconRemove"><img onClick={() => { this.deleteStock(stock)}} style={{width: 20,height: 20}} src={trashcan} alt="Remove" /></span>
          </div>
        </div>
        <span style={{paddingLeft: 15,textTransform: 'uppercase'}}>{stock.stock}</span>
        <span className="sharesList">{stock.shares}</span>
        <span className="sharesListTitle">Shares: </span>
        <br />
        <table style={{marginLeft: 4, marginTop: 15, marginBottom: 0}}>
          <tbody>
            <tr>
              <th className="portTitle">Value</th>
              <th className="portTitle">Yield (%)</th> 
              <th className="portTitle">Yield (USD)</th> 
            </tr>
            <tr>
              <td className="portValue">{stock.price}</td>
              <td className="portValue">{stock.dividendPercent}</td>
              <td className="portValue">{stock.dividend}</td>
            </tr>
          </tbody>
        </table>
      </li>
  )} else {
    listStocks = <></>
  }

    return listStocks
  }
}