import express from 'express';
import sql from 'mssql';
import 'dotenv/config';

const router = express.Router();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// routes (api endpoints)
router.get('/concerts', async (req, res) => {

  await sql.connect(dbConnectionString);
  
  const result = await sql.query
    `SELECT *
    FROM [dbo].[Concert] a
    INNER JOIN [dbo].[Band] b 
    ON a.bandID = b.bandID
    INNER JOIN [dbo].[Location] c
    ON a.locationID = c.locationID
    INNER JOIN [dbo].[Genre] d
    ON b.genreID = d.genreID`;

  console.dir(result);

  // return the results as json
  res.json(result.recordset);
});

router.get('/concerts/:id', async (req, res) => {

  await sql.connect(dbConnectionString);
  
  if (isNaN(req.params.id)) {
    res.status(400).send('Invalid concert ID. It must be a number.');
  };

  const result = await sql.query
    `SELECT *
    FROM [dbo].[Concert] a
    INNER JOIN [dbo].[Band] b 
    ON a.bandID = b.bandID
    INNER JOIN [dbo].[Location] c
    ON a.locationID = c.locationID
    INNER JOIN [dbo].[Genre] d
    ON b.genreID = d.genreID
    WHERE concertID = ${req.params.id}`;

  console.dir(result);

  if (result.recordset.length === 0) {
    res.status(404).send(`Concert with ID ${req.params.id} not found.`);
  };

  // return the results as json
  res.json(result.recordset);
});

// more routes go here as needed

router.post('/concerts/:id/tickets', async (req, res) => {
  await sql.connect(dbConnectionString);

  const concertID = parseInt(req.params.id, 10);
  const {
    ticketsOrdered,
    orderDate,
    customerName,
    customerEmail,
    creditCardNumber,
    CVV,
    expiryDate
  } = req.body || {};

  const orderDateObj = orderDate ? new Date(orderDate) : null;
  const expiryDateObj = expiryDate ? new Date(expiryDate) : null;

  await sql.query
    `INSERT INTO [dbo].[Purchase]
    (concertID, ticketsOrdered, orderDate, customerName, customerEmail, creditCardNumber, CVV, expiryDate)
    VALUES
    (${concertID}, ${ticketsOrdered}, ${orderDateObj}, ${customerName}, ${customerEmail}, ${creditCardNumber}, ${CVV}, ${expiryDateObj})`;

  res.json({ message: 'Ticket order placed successfully' });
});

export default router;