import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Enrollment = sequelize.define('Enrollment', {
  grade: { type: DataTypes.INTEGER },
}, { tableName: 'enrollments' });
export default Enrollment;
