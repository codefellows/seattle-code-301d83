# Warm-Up Exercise

Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```js

const express = ('express');
const app = express();

const cors = ('cors');
app.use('cors');

const axios = ('axios');

const PORT = process.env.PORT;

app.get('/books', getBooks);

async function getBooks(request, response) {
  axios
    .get(url)
    .then(results => {
      response.status(400).send(results.data);
    })
}
```
