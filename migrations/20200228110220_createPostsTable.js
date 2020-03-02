exports.up = function(knex) {
  return knex.schema.createTable("posts", tbl => {
    tbl.increments("id");
    tbl.text("body").notNullable();
    tbl.text("sender").notNullable();
    tbl.text("recieiver").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts");
};
