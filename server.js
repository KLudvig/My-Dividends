const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Stock = require("./Models/stocks");
const fetch = require("node-fetch");
require('dotenv').config()

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// *** Connect to database ***
const url = process.env.MONGO_DB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//Check if database is connected
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('connection error:', err)
})


// *** Routes ***

//Get stocks
app.get('/api/getStocks', (req, res) => {
  async function run() {
    const stockInfo = await stockData() 
    res.json(stockInfo)
  }
  run();
})

//Delete stock
app.delete('/api/deleteStock', (req, res) => {
    Stock.deleteOne({_id: req.body.stockId})
    .then((result) => console.log('deleted: ' + req.body.stockId + ' from database'))
    .catch((err) => console.log(err))
    res.end();
  })

//Save new stock to MongoDB and then rerender all stocks with updated price and dividend.
app.get('/api/saveStock', (req, res) => {
  const stock = new Stock({ 
    stock: req.query.stock,
    shares: req.query.shares
  });
  async function run() {
    await stock.save()
    const stockInfo = await stockData() 
    res.json(stockInfo)
  }
  run();
  })


  // *** Functions ***

  //Function for making api calls to Alpha Vantage
const apiCall = (ticker, func, compact) => {
  const key = process.env.API_KEY 
  const urlData = { 
      url: 'https://www.alphavantage.co/query?function=',
      theFunction: func, 
      symbol: ticker, 
      apiKey: key, 
      outputsize: compact
  };
  const {url,theFunction,symbol,apiKey, outputsize} = urlData
  const apiUrl = `${url}${theFunction}&symbol=${symbol}${outputsize}&apikey=${apiKey}`;
  return fetch(apiUrl);
}


//Function to load stocks and then get dividend & price data, for reuse purpose
async function stockData() {
  const getStocks = await Stock.find() 
  const stockInfo = await extractData(getStocks) 
  return stockInfo
  stockData();
} 


//Function to get the data
  async function extractData(getStocks) {
    
    const stockInfo = []; //Each stocks data is pushed in here and later returned

    for(const data of getStocks) {
      const fetchPrice = apiCall(data.stock, 'TIME_SERIES_DAILY', '&outputsize=compact');
      const fetchDividend = apiCall(data.stock, 'TIME_SERIES_MONTHLY_ADJUSTED', '');
      const apiData = await Promise.all([fetchPrice, fetchDividend]);
      
      const priceFile = await apiData[0].json()
      const dividendFile = await apiData[1].json()

  //Get data from first API call
      let getPrice = new Promise(resolve => {
        let priceArray = Object.entries(priceFile['Time Series (Daily)']) 
        let price = parseFloat(priceArray['0']['1']['4. close']);        
        resolve(price)
      })
  
  //Get data from second Api call
      let getDividend = new Promise(resolve => {
        let objArray = Object.entries(dividendFile['Monthly Adjusted Time Series']) 
        let dividendArray = [];                                                     
        let i = 1    

        while(i<=12) {
        dividendArray.push(parseFloat(objArray[i]['1']["7. dividend amount"]))
        i++
        }
        let dividend = dividendArray.reduce((accumulator, currentValue) => {        
        return accumulator + currentValue;
        }).toFixed(2)

        resolve(dividend)
      })

      const [dividend, price] = await Promise.all([getDividend, getPrice]); 
      const dividendPercent = (dividend/price * 100).toFixed(2)

      stockInfo.push({
        id: data._id,
        stock: data.stock,
        shares: data.shares,
        dividend: dividend,
        dividendPercent: dividendPercent,
        price: price
      })
    } //for of loop end

    console.log('The following stock-data is recieved:')
    console.log(stockInfo)
    return stockInfo
  } 


//*** Listen to port ***
app.listen(port, () => console.log(`Listening on port ${port}`));