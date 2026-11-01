import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('draft', 'published', 'archived'), defaultValue: 'draft' },
  publishedAt: { type: DataTypes.DATE, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'posts' });
export default Post;
