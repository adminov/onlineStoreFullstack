const {Brand} = require('../models/models');

class brandController {
    async creat(reg, res) {
        const {name} = reg.body;
        const brand = await Brand.create({name});
        return res.json(brand);
    }

    async getAll(reg, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
}


module.exports = new brandController();
