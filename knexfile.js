require('dotenv').config()
const dbConnection = process.env.DATABASE_URL

module.exports = {

  // development: {
  //   // our DBMS driver
  //   client: 'sqlite3',
  //   // the location of our db
  //   connection: {
  //     filename: './data/edgram.db3',
  //   },
  //   // necessary when using sqlite3
  //   useNullAsDefault: true
  // },

  development: {
    client: "pg",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations"
    }
  }

};