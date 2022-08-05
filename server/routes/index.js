const Router = require('express');
const router = new Router();
const DeviceRouter  = require('./DeviceRouter');
const UserRouter  = require('./UserRouter');
const BrandRouter  = require('./BrandRouter');
const TypeRouter  = require('./TypeRouter');


router.use('/user', UserRouter);
router.use('/type', TypeRouter);
router.use('/brand', BrandRouter);
router.use('/device', DeviceRouter);

module.exports = router;
