const pool = require('../utils/pool');


module.exports = class Consumer {
  id;
  description;
  age;
  gender;
  location;
  modelsId;

  constructor(row) {
    this.id = String(row.id);
    this.description = row.description;
    this.age = row.age;
    this.gender = row.gender;
    this.location = row.location;
    this.modelsId = String(row.models_id);
  }

  // CRUD-------------------------------------

  static async insert({ description, age, gender, location, modelsId }) {
    const { rows } = await pool.query(
      'INSERT INTO consumer (description, age, gender, location, models_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [description, age, gender, location, modelsId]
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
    const { rows } = await pool.query('SELECT * FROM consumer WHERE id=$1', [id]);

    if(!rows[0]) throw new Error(`No consumer with ${id}`);
    return new Consumer(rows[0]);
  }

  // --------------------------------------------

  static async update(id, { description, age, gender, location, modelsId  }) {
    const { rows } = await pool.query(
      `UPDATE consumer
      SET description=$1,
          age=$2,
          gender=$3,
          location=$4,
          models_id=$5
      WHERE id=$6
      RETURNING *
      `,
      [description, age, gender, location, modelsId, id]
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
