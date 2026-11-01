import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Author = sequelize.define('Author', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'authors' });
export default Author;
