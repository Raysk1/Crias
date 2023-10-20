const { db } = require("../Database.js")
class Sensores {
    constructor(id, frecuencia_cardiaca, presion_sanguinea, frecuencia_respiratoria, temperatura, id_cria, fecha_registro) {
        this.id = id;
        this.frecuencia_cardiaca = frecuencia_cardiaca;
        this.presion_sanguinea = presion_sanguinea;
        this.frecuencia_respiratoria = frecuencia_respiratoria;
        this.temperatura = temperatura;
        this.id_cria = id_cria;
        this.fecha_registro = fecha_registro;
    }

    static all() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM SensoresRegistros`, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM SensoresRegistros WHERE id = ?`, [id], function(err, row) {
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
            db.run(`INSERT INTO SensoresRegistros (frecuencia_cardiaca, presion_sanguinea, frecuencia_respiratoria, temperatura, id_cria) VALUES (?, ?, ?, ?, ?)`,
                [this.frecuencia_cardiaca, this.presion_sanguinea, this.frecuencia_respiratoria, this.temperatura, this.id_cria],
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
            db.run(`UPDATE SensoresRegistros SET frecuencia_cardiaca = ?, presion_sanguinea = ?, frecuencia_respiratoria = ?, temperatura = ?, id_cria = ? WHERE id = ?`,
                [this.frecuencia_cardiaca, this.presion_sanguinea, this.frecuencia_respiratoria, this.temperatura, this.id_cria, this.id],
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
            db.run(`DELETE FROM SensoresRegistros WHERE id = ?`, [this.id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = Sensores;


