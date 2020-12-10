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

  static async insert({ title, descript, model, color, wheelType, interior }) {
    const { rows } = await pool.query(
      'INSERT INTO model_s (title, descript, model, color, wheel_type, interior) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, descript, model, color, wheelType, interior]
    );

    return new ModelS(rows[0]);
  }