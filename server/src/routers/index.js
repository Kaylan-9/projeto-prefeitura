const express = require('express');
const router = express.Router();
const controller = require('../controllers/Index');

router.get('/', controller.init);
router.post('/screenshot', controller.getimage);
router.get('/teste', controller.get);
router.post('/pages', controller.getpages);
router.post('/remove/conjuntos', controller.removeconjuntos);
router.post('/remove/pages', controller.removepages);

module.exports = router;