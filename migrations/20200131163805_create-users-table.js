
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments("id");
        tbl.text("username", 128)
        .unique()
        .notNullable()
    })
  
};

exports.down = function(knex) {
  
};
