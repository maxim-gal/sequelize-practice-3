import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'books' });
export default Book;
