import User from './User.js';
import Post from './Post.js';
import Author from './Author.js';
import Book from './Book.js';
import Student from './Student.js';
import Course from './Course.js';
import Enrollment from './Enrollment.js';
import Order from './Order.js';
import Item from './Item.js';

User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

Student.belongsToMany(Course, { through: Enrollment, as: 'courses' });
Course.belongsToMany(Student, { through: Enrollment, as: 'students' });

Order.hasMany(Item, { foreignKey: 'orderId', as: 'items' });
Item.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

export { User, Post, Author, Book, Student, Course, Enrollment, Order, Item };
