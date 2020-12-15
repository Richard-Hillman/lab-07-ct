const pool = require('../utils/pool');
const Consumer = require('./Consumer');

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
      `
      SELECT 
        model_s.*,
        array_to_json(array_agg(consumer.*)) AS consumer
      FROM
        model_s
      JOIN consumer
      ON model_s.id = consumer.models_id
      WHERE model_s.id=$1
      GROUP BY model_s.id
      `,
      [id]);
 
    return {
      ...new ModelS(rows[0]),
      consumers: rows[0].consumer.map(consumers => new Consumer(consumers))
    };
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

  // -----------------------------------------------

};
