import { faker } from '@faker-js/faker';
import { Article } from '../models/Article';
import { User } from '../models/User';

async function createFakeData() {
  // Crear usuarios falsos
  const usersData = [];
  for (let i = 0; i < 50; i++) {
    usersData.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await faker.internet.password(),
      is_active: faker.datatype.boolean(),
      avatar: faker.image.avatar(),
    });
  }
  const users = await User.bulkCreate(usersData, { returning: true });

  // Crear artículos falsos
  const articlesData = [];
  for (let i = 0; i < 100; i++) {
    const user = users[faker.number.int({ min: 0, max: users.length - 1 })];
    articlesData.push({
      name: faker.commerce.productName(),
      quantity: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
      stock_min: faker.number.int({ min: 1, max: 50 }),
      stock_max: faker.number.int({ min: 50, max: 200 }),
      user_id: user.id,
    });
  }
  await Article.bulkCreate(articlesData);

  console.log('Datos falsos generados exitosamente.');
}

createFakeData()
  .then(() => console.log('Finalizado'))
  .catch((error) => console.error('Error generando datos falsos:', error));
