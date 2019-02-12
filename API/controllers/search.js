const express = require('express');
let router = express.Router();
const search = require('../helpers/search');
const auth = require('./../middlewares/jwtAuth');

router.get('/:values', auth, (req, res) => {
    let a = String(req.params.values);
    if (a.startsWith('@')) {
        value = a.replace("@", "%") + "%";
        search.searchUser(value).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        });
    } else {
        value = `%${a}%`;
        search.searchProject(value).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        });
    }
});

module.exports = router;