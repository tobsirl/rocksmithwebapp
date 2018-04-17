import express from 'express';

const router = express.Router(); // eslint-disable-line

router.get('/test', (req, res) => res.json({msg: 'Users Endpoint'}));

export default router;
