const { db } = require("../Database");

class Usuario {
    constructor(username, password, id_tipo_usuario) {
        this.username = username;
        this.password = password;
        this.id_tipo_usuario = id_tipo_usuario;
    }

    static all() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM usuario`, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static find(username) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuario WHERE username = ?`, [username], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO usuario (username, password, id_tipo_usuario) VALUES (?, ?, ?)`,
                [this.username, this.password, this.id_tipo_usuario],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE usuario SET password = ?, id_tipo_usuario = ? WHERE username = ?`,
                [this.password, this.id_tipo_usuario, this.username],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                }
            );
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM usuario WHERE username = ?`, [this.username], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    getModulos() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT modulos.* FROM usuario JOIN TipoUsuario_modulos ON usuario.id_tipo_usuario = TipoUsuario_modulos.id_tipo_usuario JOIN modulos ON TipoUsuario_modulos.id_modulo = modulos.id WHERE usuario.username = ?`, [this.username], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static login(username, password) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuario JOIN TipoUsuario ON usuario.id_tipo_usuario = TipoUsuario.id WHERE username = ? AND password = ?`, [username, password], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

module.exports = Usuario;

