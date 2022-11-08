const faker = require("faker");

const createUser = () => {
    const user = {
        id: Math.floor(Math.random() * 201),
        name: faker.name.findName(),
        email: faker.internet.exampleEmail(),
        username: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        address: {
          street: faker.address.streetAddress(),
          suite: faker.address.secondaryAddress(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          geo: {
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
          },
        },
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        company: {
          name: faker.company.companyName(),
          catchPhrase: faker.company.catchPhrase(),
          email: faker.internet.email(),
          website: faker.internet.url(),
          address: {
            street: faker.address.streetAddress(),
            suite: faker.address.secondaryAddress(),
            city: faker.address.city(),
            zip: faker.address.zipCode(),
            geo: {
              lat: faker.address.latitude(),
              lng: faker.address.longitude(),
            },
          },
        },
      };

      return user;
}

exports.createUser = createUser;