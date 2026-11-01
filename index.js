import sequelize from './database.js';
import { User, Post, Author, Book, Student, Course, Order, Item } from './models/index.js';
import { Op } from 'sequelize';

async function task1() {
  console.log('\n--- Задание 1 ---');
  const users = await User.findAll({
    include: [{
      model: Post, as: 'posts',
      where: { publishedAt: { [Op.gt]: '2023-01-01' } },
      required: true, // INNER JOIN
    }],
    order: [['name', 'ASC'], [{ model: Post, as: 'posts' }, 'publishedAt', 'DESC']],
  });
  users.forEach(u => console.log(`${u.name}: ${u.posts.map(p => p.title).join(', ')}`));
}

async function task2() {
  console.log('\n--- Задание 2 ---');
  const authors = await Author.findAll({
    include: [{ model: Book, as: 'books', required: false }], // LEFT JOIN
    order: [['lastName', 'ASC']],
  });
  authors.forEach(a => console.log(`${a.lastName}: ${a.books.map(b => b.title).join(', ') || 'пусто'}`));
}

async function task3() {
  console.log('\n--- Задание 3 ---');
  const students = await Student.findAll({
    include: [{
      model: Course, as: 'courses',
      where: { credits: { [Op.gt]: 3 } },
      required: true,
      through: { attributes: [] }
    }],
    order: [['name', 'ASC'], [{ model: Course, as: 'courses' }, 'title', 'ASC']],
  });
  students.forEach(s => console.log(`${s.name}: ${s.courses.map(c => c.title).join(', ')}`));
}

async function task4() {
  console.log('\n--- Задание 4 ---');
  const orders = await Order.findAll({
    include: [{
      model: Item, as: 'items',
      where: { quantity: { [Op.gt]: 2 } },
      required: true,
    }],
    order: [['createdAt', 'DESC'], [{ model: Item, as: 'items' }, 'price', 'DESC']],
  });
  orders.forEach(o => console.log(`${o.number}: ${o.items.map(i => `${i.productName} (qty ${i.quantity})`).join(', ')}`));
}

async function task5() {
  console.log('\n--- Задание 5 ---');
  const users = await User.findAll({
    where: { isActive: true },
    include: [{
      model: Post, as: 'posts',
      where: { status: 'published' },
      required: true,
    }],
    order: [['name', 'ASC'], [{ model: Post, as: 'posts' }, 'createdAt', 'DESC']],
  });
  users.forEach(u => console.log(`${u.name}: ${u.posts.map(p => p.title).join(', ')}`));
}

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const u1 = await User.create({ name: 'Alice', isActive: true });
    const u2 = await User.create({ name: 'Bob', isActive: true });
    const u3 = await User.create({ name: 'Charlie', isActive: false });

    await Post.create({ title: 'P1', status: 'published', publishedAt: new Date('2024-01-01'), authorId: u1.id });
    await Post.create({ title: 'P2', status: 'published', publishedAt: new Date('2022-01-01'), authorId: u1.id });
    await Post.create({ title: 'P3', status: 'draft', publishedAt: new Date('2022-05-01'), authorId: u2.id });
    await Post.create({ title: 'P4', status: 'published', publishedAt: new Date('2024-03-01'), authorId: u3.id });

    const a1 = await Author.create({ firstName: 'John', lastName: 'Tolkien' });
    const a2 = await Author.create({ firstName: 'George', lastName: 'Orwell' });
    await Author.create({ firstName: 'Joanne', lastName: 'Rowling' });

    await Book.create({ title: 'The Hobbit', authorId: a1.id });
    await Book.create({ title: '1984', authorId: a2.id });

    const s1 = await Student.create({ name: 'Ivan' });
    const s2 = await Student.create({ name: 'Anna' });
    await Student.create({ name: 'Oleg' });

    const c1 = await Course.create({ title: 'Math', credits: 4 });
    const c2 = await Course.create({ title: 'Physics', credits: 2 });
    const c3 = await Course.create({ title: 'Art', credits: 1 });

    await s1.addCourses([c1, c2]);
    await s2.addCourse(c3);

    const o1 = await Order.create({ number: 'ORD-1', status: 'new' });
    const o2 = await Order.create({ number: 'ORD-2', status: 'paid' });

    await Item.create({ productName: 'Laptop', quantity: 3, price: 1000, orderId: o1.id });
    await Item.create({ productName: 'Mouse', quantity: 1, price: 50, orderId: o1.id });
    await Item.create({ productName: 'Keyboard', quantity: 1, price: 100, orderId: o2.id });

    await task1();
    await task2();
    await task3();
    await task4();
    await task5();

  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
main();
