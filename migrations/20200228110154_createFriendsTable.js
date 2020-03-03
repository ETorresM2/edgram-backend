exports.up = function(knex) {
  return knex.schema.createTable("friendships", tbl => {
    tbl.increments("id");
    tbl
      .integer("initiator")
      .notNullable()
      .references("id")
      .inTable("users");
    tbl
      .text("friendName")
      .notNullable()
      .references("username")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friendships");
};
