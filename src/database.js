const { Pool } = require('pg');

let activeDatabase = null;

/*
  Currently this just works off environment variables as follows:
   -------------------------------
   | PGUSER=postgres             |
   | PGHOST=localhost            |
   | PGPASSWORD=postgres         |
   | PGDATABASE=betterClimbing   |
   | PGPORT=5432                 |
   -------------------------------
  When working off AWS or elsewhere we need to add a way to specify credentials to allow connection to these db services
 */

module.exports.initDBConnection = () => {
 activeDatabase = new Pool();
};

module.exports.getItemByField = async (tableName, field, fieldValue) => {
  return new Promise(async (resolve, reject) => {
    let getString = `SELECT * FROM ${tableName} WHERE ${field}=${fieldValue}`;
    await activeDatabase.query(getString).then((response) => {
      if (response != null && response.rows[0] != null) {
        resolve(response.rows);
      } else {
        resolve("Could not find an entry for this ID");
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports.createItem = async (tableName, columns, values) => {
  let insertString = `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING id`;
  return await activeDatabase.query(insertString);
};

module.exports.deleteItem = async (tableName, primaryKeyField, primaryKeyValue) => {
  let deleteString = `DELETE FROM ${tableName} WHERE ${primaryKeyField}='${primaryKeyValue}'`;
  await activeDatabase.query(deleteString);
};

module.exports.getAllEntriesInTable = async (tableName) => {
  let getString = `SELECT * FROM ${tableName}`;
  return new Promise((resolve, reject) => {
    activeDatabase.query(getString).then((response) => {
      if (response != null && response.rows != null) {
        resolve(response.rows);
      } else {
        resolve("Could not find any entries in the table");
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.joinTablesAndListEntries = async (t1, t1PrimaryKey, outputColumns, t2, t2PrimaryKey, joinTable, joinKey1, joinKey2) => {
  let getString = `SELECT ${outputColumns} FROM ${t1} \
        JOIN ${joinTable} ON ${t1}.${t1PrimaryKey} = ${joinTable}.${joinKey1}\
        JOIN ${t2} ON ${joinTable}.${joinKey2} = ${t2}.${t2PrimaryKey}\
        ORDER BY ${t1}.${t1PrimaryKey} ASC`;
  getString = getString.replace(/(\r\n|\n|\r)/gm, "");
  return new Promise((resolve, reject) => {
    activeDatabase.query(getString).then((response) => {
      if (response != null && response.rows != null) {
        resolve(response.rows);
      } else {
        resolve("Could not find any coaches with Tags");
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports.doubleJoinTablesAndListEntries = async (t1, t2, t3, t1PrimaryKey, t2PrimaryKey, t3PrimaryKey, joinTable1, joinTable2, joinKey1, joinKey2, joinKey3, joinKey4, outputColumns) => {
  let getString = `SELECT ${outputColumns} FROM ${t1} 
        JOIN ${joinTable1} ON ${t1}.${t1PrimaryKey} = ${joinTable1}.${joinKey1}\
        JOIN ${t2} ON ${joinTable1}.${joinKey2} = ${t2}.${t2PrimaryKey}\
        JOIN ${joinTable2} ON ${t1}.${t1PrimaryKey} = ${joinTable2}.${joinKey3}\
        JOIN ${t3} ON ${joinTable2}.${joinKey4} = ${t3}.${t3PrimaryKey}\
        ORDER BY ${t1}.${t1PrimaryKey} ASC`;
  return new Promise((resolve, reject) => {
    activeDatabase.query(getString).then((response) => {
      if (response != null && response.rows != null) {
        resolve(response.rows);
      } else {
        resolve("Could not find any coaches with Tags");
      }
    }).catch((err) => {
      reject(err);
    });
  });
};