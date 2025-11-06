import express from 'express';
import sql from 'mssql';
import 'dotenv/config';

const router = express.Router();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// routes (api endpoints)
router.get('/concerts', async (req, res) => {

  await sql.connect(dbConnectionString)
  
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

  await sql.connect(dbConnectionString)
  
  if (isNaN(req.params.id)) {
    res.status(400).send('Invalid concert ID. It must be a number.');
  }

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
  }

  // return the results as json
  res.json(result.recordset);
})

router.get('/genres', (req, res) => {
  res.send('All genres will be listed here.');
});

router.get('/genres/:id', (req, res) => {
  const genreId = req.params.id;
  res.send(`Details of genre with ID: ${genreId}`);
});

router.get('/locations', (req, res) => {
  res.send('All locations will be listed here.');
});

router.get('/locations/:id', (req, res) => {
  const locationId = req.params.id;
  res.send(`Details of location with ID: ${locationId}`);
});

router.get('/bands', (req, res) => {
  res.send('All bands will be listed here.');
});

router.get('/bands/:id', (req, res) => {
  const bandId = req.params.id;
  res.send(`Details of band with ID: ${bandId}`);
});

// more routes go here as needed

export default router;