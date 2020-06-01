# My-Dividends
Stock dividend tracker built with React, Node and MongoDB. Using Alpha Vantage API. Save and edit your portfolio and let the tracker reveal how much you earn per year, month, day and hour. 

Note that the free api key from Alpha Vantage has limited API requests per minute. So if you get an error when fetching stocks it is because of this. 

# Install
First, install all dependencies. There are two package.json files, one for Frontend and one for Backend.

Install Backend dependencies:
``` 
yarn install
```

Install Frontend dependencies in the client folder:
``` 
cd client
yarn install
```

Lastly, add your API key and your database in the .env_sample file, and rename the file to .env
```
API_KEY=YOUR_API_KEY
MONGO_DB='YOUR_DATABASE_HERE'
```
Database example: 'mongodb://127.0.0.1:27017/stocks'

You can get your API key from https://www.alphavantage.co/


# Run
First start the server. Open up the terminal, then type in:
```
nodemon server.js
```


Then start React. Open up a new terminal window. Go to the client folder and then start:
```
cd client
yarn start
```
