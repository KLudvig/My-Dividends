# My-Dividends
Stock dividend tracker built with React, Node and MongoDB. Using Alpha Vantage API. Save and edit your portfolio and let the tracker reveal how much you earn per year, month, day and hour. 

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
