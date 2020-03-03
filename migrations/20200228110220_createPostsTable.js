exports.up = function(knex) {
  return knex.schema.createTable("posts", tbl => {
    tbl.increments("id");
    tbl.text("body").notNullable();
    tbl
      .text("sender")
      .notNullable()
      .references("username")
      .inTable("users");
    tbl
      .integer("recieiver")
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts");
};
