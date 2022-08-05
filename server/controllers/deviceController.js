const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');


class deviceController {
    async creat(reg, res, next) {
        try {
            let {name, price, brandId, typeId, info} = reg.body;
            const {img} = reg.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({name, price, brandId, typeId, img: fileName});
            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    device: device.id,
                    })
                )
            }
            return res.json(device);
        } catch (e) {
            next(ApiError.badReguest(e.message));
        }
    }

    async getAll(reg, res) {
        let {brandId, typeId, limit, page} = reg.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let device;
        if (!brandId && !typeId) {
            device = await Device.findAndCountAll({limit, offset});
        }
        if (brandId && !typeId) {
            device = await Device.findAndCountAll({where: {brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            device = await Device.findAndCountAll({where: {typeId}, limit, offset});
        }
        if (brandId && typeId) {
            device = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});
        }

        return res.json(device);
    }

    async getOne(reg, res) {
        const {id} = reg.params;
        const device = await Device.findAll({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        });
        return res.json(device);
    }
}


module.exports = new deviceController();
