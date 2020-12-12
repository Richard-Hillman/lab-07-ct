const pool = require('../utils/pool');

module.exports = class ModelS {
  id;
  title;
  descript;
  model;
  color;
  wheelType;
  interior;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.descript = row.descript;
    this.model = row.model;
    this.color = row.color;
    this.wheelType = row.wheel_type;
    this.interior = row.interior;
  }

  // CRUD-------------------------------------

  static async insert({ title, descript, model, color, wheelType, interior }) {
    const { rows } = await pool.query(
      'INSERT INTO model_s (title, descript, model, color, wheel_type, interior) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, descript, model, color, wheelType, interior]
    );

    return new ModelS(rows[0]);
  }

  // ------------------------------------------

  static async find() {
    const { rows } = await pool.query('SELECT * FROM model_s');

    return rows.map(row => new ModelS(row));
  }

  // -------------------------------------------

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM model_s WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No model with ${id}`);
    return new ModelS(rows[0]);
  }

  // --------------------------------------------

  static async update(id, { title, descript, model, color, wheelType, interior }) {
    const { rows } = await pool.query(
      `UPDATE model_s
      SET title=$1,
          descript=$2,
          model=$3,
          color=$4,
          wheel_type=$5,
          interior=$6
      WHERE id=$7
      RETURNING *
      `,
      [title, descript, model, color, wheelType, interior, id]
    );

    return new ModelS(rows[0]);
  }

  // ---------------------------------------------
  
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM model_s WHERE id=$1 RETURNING *',
      [id]
    );

    return new ModelS(rows[0]);
  } 


};
