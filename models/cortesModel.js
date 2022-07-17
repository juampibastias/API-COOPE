var pool = require('./bd');


async function getCortes() {
    
        var query = "select  * from cortes order by id desc";
        var rows = await pool.query(query);
        return rows;

}

async function insertCortes(obj) {
    try {
        var query = "insert into cortes set ?";
        var rows = await pool.query(query, [obj]);
        return rows
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteCortesById(id) {
    var query = 'delete from cortes where id= ?'
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getCorteById(id) {
var query ='select * from cortes where id = ? ';
var rows = await pool.query(query, [id]);
return rows[0];
}

async function modificarCorteById(obj, id) {
    try {
        var query = 'update cortes set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
         throw (error);
    }
}

module.exports = { getCortes, insertCortes, deleteCortesById, getCorteById, modificarCorteById }