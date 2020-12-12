const pool = require('../utils/pool');

module.exports = class Consumer {
  id;
  description;
  age;
  gender;
  location;

  constructor(row) {
    this.id = row.id;
    this.description = row.description;
    this.age = row.age;
    this.gender = row.gender;
    this.location = row.location;
  }

  // CRUD-------------------------------------

  static async insert({ description, age, gender, location }) {
    const { rows } = await pool.query(
      'INSERT INTO consumer (description, age, gender, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [description, age, gender, location]
    );

    return new Consumer(rows[0]);
  }

  // ------------------------------------------

  static async find() {
    const { rows } = await pool.query('SELECT * FROM consumer');

    return rows.map(row => new Consumer(row));
  }

  // -------------------------------------------

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM consumer WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No consumer with ${id}`);
    return new Consumer(rows[0]);
  }

  // --------------------------------------------

  static async update(id, { description, age, gender, location }) {
    const { rows } = await pool.query(
      `UPDATE consumer
      SET description=$1,
          age=$2,
          gender=$3,
          location=$4
      WHERE id=$5
      RETURNING *
      `,
      [description, age, gender, location, id]
    );

    return new Consumer(rows[0]);
  }

  // ---------------------------------------------
  
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM consumer WHERE id=$1 RETURNING *',
      [id]
    );

    return new Consumer(rows[0]);
  } 


};
