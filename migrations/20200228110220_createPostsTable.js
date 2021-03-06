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
    // I BEFORE E EXCEPT AFTER C!!!!
      .text("receiver")
      .notNullable()
      .references("username")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts");
};
