const chai = require("chai");
const chaiHttp = require("chai-http");
const { query } = require("express");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

describe("User API endpoint test", function () {
  it("Get all 200 users", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
          {
            getUsers{
              users {
                id
                name
                email
                username
                avatar
                phone
                address {
                  street
                  suite
                  city
                  zip
                  geo {
                    lat
                    lng
                  }
                }
                company {
                  name
                  catchPhrase
                  email
                  website
                  address {
                    street
                    suite
                    city
                    zip
                    geo {
                      lat
                      lng
                    }
                  }
                }
              }
            }
          }                    
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.getUsers.users).to.be.an("array");
        expect(res.body.data.getUsers.users).to.have.lengthOf(200);
        done();
      });
  });

  it("Get 2 users", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
          {
            getUsers (n:2) {
              users {
                id
                name
                email
                username
                avatar
                phone
                address {
                  street
                  suite
                  city
                  zip
                  geo {
                    lat
                    lng
                  }
                }
                company {
                  name
                  catchPhrase
                  email
                  website
                  address {
                    street
                    suite
                    city
                    zip
                    geo {
                      lat
                      lng
                    }
                  }
                }
              }
            }
          }                    
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.getUsers.users).to.be.an("array");
        expect(res.body.data.getUsers.users).to.have.lengthOf(2);
        done();
      });
  });

  it("Get user by ID 55", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `{
          getUser(id: 55) {
            id
            name
            email
            username
            avatar
            phone
            address {
              street
              suite
              city
              zip
              geo {
                lat
                lng
              }
            }
            company {
              name
              catchPhrase
              email
              website
              address {
                street
                suite
                city
                zip
                geo {
                  lat
                  lng
                }
              }
            }
          }
        }
        `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.getUser).to.be.an("object");
        console.log(res.body.data.getUser);
        done();
      });
  });

  it("No user above ID 200", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `{
          getUser(id: 201) {
            id
            name
            email
            username
            avatar
            phone
            address {
              street
              suite
              city
              zip
              geo {
                lat
                lng
              }
            }
            company {
              name
              catchPhrase
              email
              website
              address {
                street
                suite
                city
                zip
                geo {
                  lat
                  lng
                }
              }
            }
          }
        }
        `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(500);
        // expect(res.body.data.getUser).to.be.an("object");
        // console.log(res.body.data.getUser);
        done();
      });
  });
});
