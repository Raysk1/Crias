const Sensores = require('../models/Sensores');

class SensoresController {
    static async getAll(req, res) {
        try {
            const sensores = await Sensores.all();
            res.status(200).json(sensores);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
            const sensor = await Sensores.find(req.params.id);
            if (sensor) {
                res.status(200).json(sensor);
            } else {
                res.status(404).json({ error: 'Sensor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async create(req, res) {
        try {
            const newSensor = new Sensores(null, req.body.frecuencia_cardiaca, req.body.presion_sanguinea, req.body.frecuencia_respiratoria, req.body.temperatura, req.body.id_cria);
            const id = await newSensor.save();
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async update(req, res) {
        try {
            const updatedSensor = new Sensores(req.params.id, req.body.frecuencia_cardiaca, req.body.presion_sanguinea, req.body.frecuencia_respiratoria, req.body.temperatura, req.body.id_cria);
            const changes = await updatedSensor.update();
            if (changes) {
                res.status(200).json({ changes });
            } else {
                res.status(404).json({ error: 'Sensor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async delete(req, res) {
        try {
            const deletedSensor = new Sensores(req.params.id, req.body.frecuencia_cardiaca, req.body.presion_sanguinea, req.body.frecuencia_respiratoria, req.body.temperatura, req.body.id_cria);
            const changes = await deletedSensor.delete();
            if (changes) {
                res.status(200).json({ changes });
            } else {
                res.status(404).json({ error: 'Sensor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

module.exports = SensoresController;

