import React from 'react';
import {ListItem} from './components/ListItem';
import {Button} from './components/Button';
import {Overview} from './components/Overview';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stockData: [],
    } 
   this.delete = this.delete.bind(this);
   this.addStock = this.addStock.bind(this);
  }

  addStock() {
    const stock = document.getElementById('addStock').value;
    const shares = document.getElementById('addShares').value;

    this.stockList(`/api/saveStock?stock=${stock}&shares=${shares}`)

    //Resets input value
    document.getElementById('addStock').value = '';
    document.getElementById('addShares').value = '';
  }

  getStocks() {
    this.stockList('/api/getStocks')
  }

  stockList(route) { //Gets stocks and update state
    let self = this; 
    async function getIt(route) {
      const response = await fetch(route)
      const sData = await response.json()
      
      const stockArray = []; 

      sData.forEach(data => {
        let stockInfo = {
          id: data.id,
          stock: data.stock,
          shares: data.shares,
          dividend: data.dividend,
          dividendPercent: data.dividendPercent,
          price: data.price
        }
        stockArray.push(stockInfo)
        self.setState({stockData: stockArray})
      });
    }
    getIt(route);
  }

  delete(stock) {
    this.setState({
      stockData: this.state.stockData.filter(elem => elem.id !== stock.id) //clone stocks to new array and set as state, but exclude the passed in stock
    })
    
    //Send stock to server to delete it
    const data = {'stockId': stock.id}
    const options = {
      method: 'DELETE', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
      fetch('/api/deleteStock', options)
  }

  componentDidMount() {
    this.getStocks();
  }

  render() {

    return (
      <div className="App">
        <Overview stocks={this.state.stockData} />
        <div className="inputContainer">
          <input 
            placeholder="Add stock"
            className="si-left stock-input"
            id="addStock"
          />
          <input 
            type="number"
            placeholder="Nr of shares"
            className="si-right stock-input"
            id="addShares"
          />
          <Button onClick={this.addStock} title="Add" />
        </div>
        <ul className="ulList">
          <ListItem 
            stocks={this.state.stockData} 
            delete={this.delete}
          />
        </ul>
      </div>
    )
  }
}

export default App;
