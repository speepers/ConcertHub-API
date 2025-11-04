import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes (api endpoints)
app.get('/', (req, res) => {
  res.send('This is the home page!');
});

app.get('/hello', (req, res) => {
  res.send('Hello Express!');
});

app.get('/goodbye', (req, res) => {
  res.send('Goodbye Express!');
});

// more routes go here as needed

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
