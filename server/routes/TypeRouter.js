const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRoleWiddleware = require('../middleware/checkRoleWiddleware');

router.post('/', checkRoleWiddleware('ADMIN'), typeController.creat);
router.get('/', typeController.getAll);

module.exports = router;
