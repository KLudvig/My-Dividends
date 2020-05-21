# My-Dividends
Stock dividend tracker built with React, Node and MongoDB. Using Alpha Vantage API. Save and edit your portfolio and let the tracker reveal how much you earn per year, month, day and hour. 

Note that the free api key from Alpha Vantage has limited API requests per minute. So if you get an error when fetching stocks it is because of this. 

# Install
First, install all dependencies.
``` 
yarn install
```


Then, in the server.js file, change line 14 to your MongoDB database name:
```
const url = 'mongodb://127.0.0.1:27017/stocks'
```


Lastly, add your API key in the .env_sample file, and rename the file to .env
```
API_KEY=YOUR_API_KEY
```
You can get your API key from https://www.alphavantage.co/


# Run
First start the server. Open up the terminal, then type in:
```
nodemon server.js
```


Then start React. Open up a new terminal window. Go to the client folder:
```
cd client
```

Then start React:
```
yarn start
```
