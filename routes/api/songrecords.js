import express from 'express';

const router = express.Router(); // eslint-disable-line

router.get('/test', (req, res) => res.json({msg: 'SongRecords Endpoint'}));

export default router;
