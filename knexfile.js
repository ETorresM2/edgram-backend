// Update with your config settings.

module.exports = {

  development: {
    // our DBMS driver
    client: 'sqlite3',
    // the location of our db
    connection: {
      filename: './data/edgram.db3',
    },
    // necessary when using sqlite3
    useNullAsDefault: true
  },
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: "./data/seeds"
  }

};