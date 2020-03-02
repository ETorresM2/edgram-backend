exports.up = function(knex) {
    return knex.schema.createTable("friendships", tbl => {
      tbl.increments("id");
      tbl.text("initiator").notNullable();
      tbl.text("friendName").notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("friendships");
  };