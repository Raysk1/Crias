const Usuario = require("../models/Usuario");

class UsuarioController {
  static async create(req, res) {
    const { username, password, id_tipo_usuario } = req.body;
    const usuario = new Usuario(username, password, id_tipo_usuario);
    try {
      const id = await usuario.save();
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getAll(req, res) {
    try {
      const usuarios = await Usuario.all();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async getById(req, res) {
    try {
      const usuario = await Usuario.find(req.params.username);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: "Usuario not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async update(req, res) {
    const { username, password, id_tipo_usuario } = req.body;
    const usuario = new Usuario(username, password, id_tipo_usuario);
    try {
      const changes = await usuario.update();
      if (changes) {
        res.status(200).json({ changes });
      } else {
        res.status(404).json({ error: "Usuario not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async delete(req, res) {
    const { username } = req.body;
    const usuario = new Usuario(username, null, null);
    try {
      const changes = await usuario.delete();
      if (changes) {
        res.status(200).json({ changes });
      } else {
        res.status(404).json({ error: "Usuario not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    console.log(req.body);
    console.log(username);
    try {
      const usuario = await Usuario.login(username, password);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: "Usuario o Contraseña Incorrectos" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async getModulos(req, res) {
    const usuario = new Usuario(req.params.username, null, null);
    try {
      const modulos = await usuario.getModulos();
      if (modulos) {
        res.status(200).json(modulos);
      } else {
        res.status(404).json({ error: "Modulos not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
}

module.exports = UsuarioController;
