const options = {
    query: (e) => {
      console.log(e.query);
    }
  }
  
  const pg = require('pg-promise')(options);
  
  function setDatabase() {
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      return pg({
        database: 'ttp-fs-stockpicker',
        port: 5432,
        host: 'localhost',
      })
    } else if (process.env.NODE_ENV === 'production') {
      return pg(process.env.DATABASE_URL);
    }
  }
  
  const db = setDatabase();
  
  module.exports = db;