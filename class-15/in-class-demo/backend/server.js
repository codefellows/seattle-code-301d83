'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // bring in Mongoose.
const book = require('./models/book')
mongoose.connect(process.env.DB_URL);
const verifyUser = require('./auth');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Request received');
})


// to use verification functionality, paste your existing code inside of this function:
// verifyUser(req, async (err, user) => {
//   if (err) {
//     console.error(err);
//     res.send('invalid token');
//   } else {
//     // insert try catch logic here.  BE CAREFUL.  check syntax IMMEDIATELY
//   }
// });


app.get('/books', async (request, response) => {

  verifyUser(request, async (err, user) => {
    if (err) {
      console.error(err);
      response.send('invalid token');
    } else {
      // insert try catch logic here.  BE CAREFUL.  check syntax IMMEDIATELY
      // then make edits.  use the user info!
      try {
        // console.log(request);
        const bookQuery = {};
        if (user.email) {
          bookQuery.email = user.email;
        }
        const books = await Book.find(bookQuery);
        // console.log(books);
        response.status(200).send(books);
      }
      catch (error) {
        console.log(error.message);
        response.status(500).send(error.message);
      }
    }
  });
});

app.get('*', (request, response) => {
  response.status(404).send('Page Doesn\'t Exist');
})

// error
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
