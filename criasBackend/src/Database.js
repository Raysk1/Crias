const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function initDatabase(){
    return new Promise((resolve, reject) => {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS crias (proveedor TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT, peso REAL, costo REAL, nombre TEXT, descripcion TEXT, en_cuarentena BOOLEAN DEFAULT FALSE)", function(err) {
                if (err) {
                    reject(err);
                }
            });
            db.run("CREATE TABLE IF NOT EXISTS SensoresRegistros (id INTEGER PRIMARY KEY AUTOINCREMENT, frecuencia_cardiaca REAL, presion_sanguinea REAL, frecuencia_respiratoria REAL, temperatura REAL, id_cria INTEGER, fecha_registro DATE DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_cria) REFERENCES crias(id))", function(err) {
                if (err) {
                    reject(err);
                }
            });
            db.run("CREATE TABLE IF NOT EXISTS TipoUsuario (id INTEGER PRIMARY KEY, nombre TEXT)", function(err) {
                if (err) {
                    reject(err);
                }
            });
            db.run("CREATE TABLE IF NOT EXISTS usuario (username TEXT PRIMARY KEY, password TEXT, id_tipo_usuario INTEGER, FOREIGN KEY (id_tipo_usuario) REFERENCES TipoUsuario(id))", function(err) {
                if (err) {
                    reject(err);
                } 
            });
            db.run("CREATE TABLE IF NOT EXISTS modulos (id INTEGER PRIMARY KEY, nombre TEXT)", function(err) {
                if (err) {
                    reject(err);
                }
            });
            db.run("CREATE TABLE IF NOT EXISTS TipoUsuario_modulos (id INTEGER PRIMARY KEY, id_tipo_usuario INTEGER, id_modulo INTEGER, FOREIGN KEY (id_tipo_usuario) REFERENCES TipoUsuario(id), FOREIGN KEY (id_modulo) REFERENCES modulos(id))", function(err) {
                if (err) {
                    reject(err);
                }
            });
            db.run("INSERT OR IGNORE INTO TipoUsuario (id, nombre) VALUES (1, 'Veterinario'), (2, 'Personal de control'), (3, 'Reclutador'), (4, 'Ayudante de Veterinario')", function(err) {
                if (err) {
                    reject(err);
                }
            });

            db.run("INSERT OR IGNORE INTO usuario (username, password, id_tipo_usuario) VALUES ('veterinario', '123', 1), ('personal_de_control', '123', 2), ('reclutador', '123', 3), ('ayudante_de_veterinario', '123', 4)", function(err) {
                if (err) {
                    reject(err);
                }
            });
            db.run("INSERT OR IGNORE INTO modulos (id, nombre) VALUES (1, 'crias'), (2, 'cuarentena'), (3, 'sensores')", function(err) {
                if (err) {
                    reject(err);
                }
            });
            db.run("INSERT OR IGNORE INTO TipoUsuario_modulos (id, id_tipo_usuario, id_modulo) VALUES (1, 2, 1), (2, 1, 2), (3, 1, 3), (4, 4, 3)", function(err) {
                if (err) {
                    reject(err);
                }
            });
            
            
        });
    });
}


module.exports = {initDatabase, db}

