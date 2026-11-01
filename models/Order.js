import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Order = sequelize.define('Order', {
  number: { type: DataTypes.STRING, allowNull: false, unique: true },
  status: { type: DataTypes.ENUM('new', 'paid', 'shipped'), defaultValue: 'new' },
}, { tableName: 'orders' });
export default Order;
