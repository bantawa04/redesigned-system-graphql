const faker = require("faker");
const validator = require("validator");
const { createPost } = require("../utility/post");
const { createTodo } = require("../utility/todo");
const { createUser } = require("../utility/user");
const { createProduct } = require("../utility/product");

module.exports = {
  //Posts
  createPost: async function ({ postInput }, req) {
    const errors = [];
    if (validator.isEmpty(postInput.title)) {
      errors.push({ message: "Title is empty" });
    }
    if (!validator.isLength(postInput.title, { min: 5 })) {
      errors.push({ message: "Title must be 5 charcters long." });
    }

    if (validator.isEmpty(postInput.content)) {
      errors.push({ message: "Post content is empty" });
    }
    if (!validator.isLength(postInput.content, { min: 5 })) {
      errors.push({ message: "Post content must be 5 charcters long." });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const post = {
      id: Math.floor(Math.random() * 201),
      title: postInput.title,
      content: postInput.content,
      created_at: faker.date.recent(),
    };

    return post;
  },

  posts: async function ({ n }, req) {
    const posts = [];
    if (n) {
      if (n > 200) {
        errors.push({ message: "Todo not found" });
        const error = new Error("Invalid input");
        error.data = errors;
        error.code = 422;
        throw error;
      } else {
        for (let i = 1; i <= n; i++) {
          posts.push({ ...createPost(), id: i });
        }
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        posts.push({ ...createPost(), id: i });
      }
    }
    return { posts };
  },

  deletePost: async function ({ id }, req) {
    const errors = [];
    if (id > 0 && id <= 200) {
      return true;
    } else {
      errors.push({ message: "Post not found" });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },

  updatePost: async function ({ id, postInput }, req) {
    if (id > 0 && id <= 200) {
      const post = {
        id: id,
        title: postInput.title,
        content: postInput.content,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };
      return post;
    } else {
      const error = new Error("Invalid input");
      error.code = 422;
      throw error;
    }
  },

  getPost: async function ({ id }, req) {
    if (id > 0 && id <= 200) {
      return { ...createPost(), id: id };
    } else {
      const error = new Error("Invalid input");
      error.code = 422;
      throw error;
    }
  },

  //Todo
  createTodo: async function ({ todoInput }, req) {
    const errors = [];
    if (validator.isEmpty(todoInput.title)) {
      errors.push({ message: "Title is empty" });
    }
    if (!validator.isLength(todoInput.title, { min: 5 })) {
      errors.push({ message: "Title must be 5 charcters long." });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const todo = {
      id: Math.floor(Math.random() * 201),
      title: todoInput.title,
      status: faker.random.boolean(),
      created_at: faker.date.recent(),
    };

    return todo;
  },

  deleteTodo: async function ({ id }, req) {
    const errors = [];
    if (id > 0 && id <= 200) {
      return true;
    } else {
      errors.push({ message: "Todo not found" });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },

  updateTodo: async function ({ id, todoInput }, req) {
    if (id > 0 && id <= 200) {
      const todo = {
        id: id,
        title: todoInput.title,
        status: todoInput.status,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };
      return todo;
    } else {
      errors.push({ message: "Todo not found" });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },

  getTodo: async function ({ id }, req) {
    if (id > 0 && id <= 200) {
      return { ...createTodo(), id: id };
    } else {
      errors.push({ message: "Todo not found" });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },

  getTodos: async function ({ n }, req) {
    const todos = [];
    if (n) {
      if (n > 200) {
        errors.push({ message: "Todo not found" });
        const error = new Error("Invalid input");
        error.data = errors;
        error.code = 422;
        throw error;
      } else {
        for (let i = 1; i <= n; i++) {
          todos.push({ ...createTodo(), id: i });
        }
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        todos.push({ ...createTodo(), id: i });
      }
    }
    return { todos };
  },

  //Users

  getUsers: async function ({ n }, req) {
    const users = [];
    if (n) {
      if (n <= 200) {
        for (let i = 1; i <= n; i++) {
          users.push({ ...createUser(), id: i });
        }
        return { users };
      } else {
        errors.push({ message: "User not found" });
        const error = new Error("Invalid input");
        error.data = errors;
        error.code = 422;
        throw error;
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        users.push({ ...createUser(), id: i });
      }
      return { users };
    }
  },

  getUser: async function ({ id }, req) {
    if (id > 0 && id <= 200) {
      return { ...createUser(), id: id };
    } else {
      errors.push({ message: "User not found" });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },

  //Products
  createProduct: async function ({ productInput }, req) {
    const errors = [];
    if (validator.isEmpty(productInput.name)) {
      errors.push({ message: "Product name is empty" });
    }

    if (validator.isEmpty(productInput.description)) {
      errors.push({ message: "Product description is empty" });
    }
    if (!validator.isLength(productInput.description, { min: 5 })) {
      errors.push({ message: "Product description must be 5 charcters long." });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const product = {
      id: Math.floor(Math.random() * 201),
      name: productInput.name,
      description: productInput.description,
      price: productInput.price,
      created_at: faker.date.recent(),
    };
    if (productInput.category) {
      product.category = productInput.category;
    }

    return product;
  },
  deleteProduct: async function ({ id }, req) {
    const errors = [];
    if (id > 0 && id < 200) {
      return true;
    } else {
      errors.push({ message: "Product not found" });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },
  getProduct: async function ({ id }, req) {
    const errors = [];
    if (id > 0 && id < 200) {
      return { ...createProduct(), id: id };
    } else {
      errors.push({ message: "Product not found" });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },
  getProducts: async function ({ n }, req) {
    const errors = [];
    const products = [];
    if (n) {
      if (n > 200) {
        errors.push({ message: "Product id should be from 1-200 " });
        const error = new Error("Invalid input");
        error.data = errors;
        error.code = 422;
        throw error;
      } else {
        for (let i = 1; i <= n; i++) {
          products.push({ ...createProduct(), id: i });
        }
        return { products };
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        products.push({ ...createProduct(), id: i });
      }
      return { products };
    }
  },
  updateProduct: async function ({ id, productInput }, req) {
    const errors = [];
    // console.log(productInput);
    if (id > 200) {
      errors.push({ message: "Product id should be from 1-200 " });
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    } else {
      const product = {
        id: id,
        name: productInput.name,
        price: productInput.price,        
      }
      if (productInput.category) {
        product.category = productInput.category;
      }
      
      return product;
    }
  },
};
