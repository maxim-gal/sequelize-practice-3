import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Student = sequelize.define('Student', {
  name: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'students' });
export default Student;
