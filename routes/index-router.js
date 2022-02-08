import query from '../mysql-connect';
import moment from 'moment';
import express from 'express';
const router = express.Router();

router.post('/rtUser', async function(req, res, next) {
    res.send(JSON.stringify({
        "reinsert": "success"
    }));
});

module.exports = router;