
exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "marry", password: 'password1'},
        {username: "barry", password: 'password2'},
        {username: "larry", password: 'password3'}
      ]);
    });
};
