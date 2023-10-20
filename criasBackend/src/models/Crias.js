const { db } = require("../Database.js")

class Crias {
    constructor(proveedor, id, peso, costo, nombre, descripcion, en_cuarentena) {
        this.proveedor = proveedor;
        this.id = id;
        this.peso = peso;
        this.costo = costo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.en_cuarentena = en_cuarentena;
    }

    static all() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM crias`, function(err, rows) {
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
            db.get(`SELECT * FROM crias WHERE id = ?`, [id], function(err, row) {
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
            db.run(`INSERT INTO crias (proveedor, id, peso, costo, nombre, descripcion) VALUES (?, ?, ?, ?, ?, ?)`,
                [this.proveedor, this.id, this.peso, this.costo, this.nombre, this.descripcion],
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
            db.run(`UPDATE crias SET proveedor = ?, peso = ?, costo = ?, nombre = ?, descripcion = ?, en_cuarentena = ? WHERE id = ?`,
                [this.proveedor, this.peso, this.costo, this.nombre, this.descripcion, this.en_cuarentena, this.id],
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
            db.run(`DELETE FROM crias WHERE id = ?`, [this.id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    static clasificacionCarne(peso, color, marmoleo) {
        if ((peso >= 15 && peso <= 25) && (color >= 3 && color <= 5) && (marmoleo === 1 || marmoleo === 2)) {
            return 1;
        } else if ((peso < 15 || peso > 25) && (color === 1 || color === 2 || color === 6 || color === 7) && (marmoleo >= 3 && marmoleo <= 5)) {
            return 2;
        } else {
            return 0;
        }
    
    }

    static async getCriasEnfermas() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT crias.* FROM crias
                    INNER JOIN SensoresRegistros ON crias.id = SensoresRegistros.id_cria
                    WHERE crias.en_cuarentena = 0 AND
                    SensoresRegistros.temperatura > 39.5 AND
                    (SensoresRegistros.frecuencia_cardiaca < 70 OR SensoresRegistros.frecuencia_cardiaca > 80) AND
                    (SensoresRegistros.frecuencia_respiratoria < 15 OR SensoresRegistros.frecuencia_respiratoria > 20) AND
                    SensoresRegistros.presion_sanguinea > 10
                    GROUP BY crias.id
                    ORDER BY SensoresRegistros.fecha_registro DESC`, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

       
    }
    static async getCriasEnCuarentena() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM crias WHERE en_cuarentena = 1`, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async ponerEnCuarentena() {
        this.en_cuarentena = 1;
        return new Promise((resolve, reject) => {
            db.run(`UPDATE crias SET en_cuarentena = ? WHERE id = ?`, [this.en_cuarentena, this.id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    
    
}

module.exports = Crias;
