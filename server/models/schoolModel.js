// MySQL model abstraction for school operations
import pool from "../config/db.js";

export const SchoolModel = {
  async addSchool({ name, address, latitude, longitude }) {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    return { id: result.insertId, name, address, latitude, longitude };
  },

  async getAllSchools() {
    const [rows] = await pool.execute("SELECT * FROM schools");
    return rows;
  }
};
