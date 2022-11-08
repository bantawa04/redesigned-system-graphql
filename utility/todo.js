const faker = require("faker");

const createTodo = () => {
  const todo = {
    id: Math.floor(Math.random() * 201),
    title: faker.lorem.sentence(),
    status: faker.random.boolean(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  };

  return todo;
};

exports.createTodo = createTodo;
