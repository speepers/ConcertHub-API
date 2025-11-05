import express from 'express';
import router from './routes.js';

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// use routes
app.use('/api', router);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
