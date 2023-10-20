const Crias = require("../models/Crias");

class CriasController {
  static async getAll(req, res) {
    try {
      const crias = await Crias.all();
      res.status(200).json(crias);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async getById(req, res) {
    try {
      const cria = await Crias.find(req.params.id);
      if (cria) {
        res.status(200).json(cria);
      } else {
        res.status(404).json({ error: "Cria not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async create(req, res) {
    try {
      const newCria = new Crias(
        req.body.proveedor,
        req.body.identificador,
        req.body.peso,
        req.body.costo,
        req.body.nombre,
        req.body.descripcion
      );
      const id = await newCria.save();
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async update(req, res) {
    try {
      const newCria = new Crias(
        req.body.proveedor,
        req.body.identificador,
        req.body.peso,
        req.body.costo,
        req.body.nombre,
        req.body.descripcion
      );
      const changes = await updatedCria.update();
      if (changes) {
        res.status(200).json({ changes });
      } else {
        res.status(404).json({ error: "Cria not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async delete(req, res) {
    try {
      const deletedCria = new Crias(
        req.body.proveedor,
        req.body.identificador,
        req.body.peso,
        req.body.costo,
        req.body.nombre,
        req.body.descripcion
      );
      const changes = await deletedCria.delete();
      if (changes) {
        res.status(200).json({ changes });
      } else {
        res.status(404).json({ error: "Cria not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async clasificacionCarne(req, res) {
    try {
      const { peso, color, marmoleo } = req.body;

      const clasificacion = await Crias.clasificacionCarne(Number(peso), Number(color), Number(marmoleo));
      res.status(200).json({ clasificacion });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async getCriasEnfermas(req, res) {
    try {
      const criasEnfermas = await Crias.getCriasEnfermas();
      res.status(200).json(criasEnfermas);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async getCriasEnCuarentena(req, res) {
    try {
      const criasEnCuarentena = await Crias.getCriasEnCuarentena();
      res.status(200).json(criasEnCuarentena);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async ponerEnCuarentena(req, res) {
    try {
      const { id } = req.params;
      const crias = new Crias();
      crias.id = id;
      crias.en_cuarentena = 1;
      const changes = await crias.ponerEnCuarentena();
      if (changes) {
        res.status(200).json({ changes });
      } else {
        res.status(404).json({ error: "Cria not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
}

module.exports = CriasController;
