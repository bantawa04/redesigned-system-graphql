const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

describe("Product API endpoint test", function () {
  it("Create product", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        mutation{
                createProduct(
                    productInput: {
                        name: "Iphone 13", 
                        price: 1299, 
                        description: " Latest Iphone"
                    }) {
                  name
                  price
                  description
                }
            }`,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(200);
        // console.log(res.body);
        console.log(res.body.data.createProduct);
        expect(res.body.data.createProduct).to.be.an("object");
        done();
      });
  });

  it("Delete product", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        mutation{deleteProduct(id: 64)}`,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("Get product by id 54", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
                getProduct(id: 54) {id name description price category}
        }
        `,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(200);
        // console.log(res.body);
        console.log(res.body.data.getProduct);
        expect(res.body.data.getProduct).to.be.an("object");
        done();
      });
  });

  it("Get all products", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
            getProducts {
              products {
                id
                name
                price
                description
              }
            }
          }
        `,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(200);
        // console.log(res.body);
        console.log(res.body.data.getProduct);
        expect(res.body.data.getProducts.products).to.be.an("array");
        expect(res.body.data.getProducts.products).to.have.lengthOf(200);
        done();
      });
  });

  it("Get 10 products", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
            getProducts(n:10) {
              products {
                id
                name
                price
                description
              }
            }
          }
        `,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(200);
        // console.log(res.body);
        console.log(res.body.data.getProduct);
        expect(res.body.data.getProducts.products).to.be.an("array");
        expect(res.body.data.getProducts.products).to.have.lengthOf(10);
        done();
      });
  });

  it("Update product with id 25", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            updateProduct(id: 25, productInput: {name: "One Plus 9", price: 899, description: "Updated Content", category: "Mobile"}) {
              id
              name
              price
              category
            }
          }
          `,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(200);
        expect(res.body.data.updateProduct).to.be.an("object");
        console.log(res.body.data.updateProduct);
        done();
      });
  });

  it("Cannot Update product aabove id 200", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            updateProduct(id: 205, productInput: {name: "One Plus 9", price: 899, description: "Updated Content", category: "Mobile"}) {
              id
              name
              price
              category
            }
          }
          `,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(500);
        done();
      });
  });

  it("No product above ID 200", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
                getProduct(id: 214) {id name description price category}
        }
        `,
      })
      .end(function (err, res) {
        if (err) done();
        expect(res.status).to.equal(500);
        done();
      });
  });

});
