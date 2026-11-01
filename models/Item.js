import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Item = sequelize.define('Item', {
  productName: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'items' });
export default Item;
