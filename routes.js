import express from 'express';

const router = express.Router();

// routes (api endpoints)
router.get('/concerts', (req, res) => {

    const concerts = [
        { id: 1, name: 'Rock Fest', date: '2024-07-15' },
        { id: 2, name: 'Jazz Night', date: '2024-08-20' },
        { id: 3, name: 'Pop Extravaganza', date: '2024-09-10' }
    ];

    res.json(concerts);
    res.send('All concerts will be listed here.');
});

router.get('/concerts/:id', (req, res) => {

  const concertId = req.params.id;

  const concert = { id: concertId, name: 'Sample Concert', date: '2024-07-15' };
  
  res.json(concert);
  res.send(`Details of concert with ID: ${concertId}`);
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