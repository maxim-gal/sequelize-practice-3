import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'users' });
export default User;
