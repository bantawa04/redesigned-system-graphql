const faker = require("faker");

const createPost = () => {
  const post = {
    id: Math.floor(Math.random() * 201),
    title: faker.lorem.sentence(),
    content: faker.lorem.sentences(),
    image: faker.image.imageUrl(),
    author_id: faker.random.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  };

  return post;
};

exports.createPost = createPost;
