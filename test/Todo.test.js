const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

describe("Post API endpoint test", function () {
  it("Create new Todo", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
            mutation{
                createTodo(todoInput:{title:"Todo graphql title"}){id title status}
              }
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.createTodo).to.be.an("object");
        console.log("Created todo");
        console.log(res.status);
        console.log(res.body.data.createTodo);
        done();
      });
  });

  it("Delete Todo", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
            mutation{
                deleteTodo(id: 15)
              }
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.deleteTodo).to.equal(true);
        done();
      });
  });

  it("Update Todo", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        mutation{
            updateTodo(id: 5, todoInput:{
              title:"Todo title updated",
              status: true
            }) {
              id
              title
              status
            }
          }
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.updateTodo).to.be.an("object");
        console.log("Updated todo");
        console.log(res.status);
        console.log(res.body.data.updateTodo);
        done();
      });
  });  

  it("Get Todo by ID 156", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
            getTodo(id: 156){ id title status}
          }
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        console.log(res.body.data.getTodo);
        done();
      });
  });

  it("Get all TODOS", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
          getTodos {
            todos {
              id
              title
              status
            }
          }
        }
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.getTodos.todos).to.be.an("array");
        expect(res.body.data.getTodos.todos).to.have.lengthOf(200);
        done();
      });
  });  

  it("Get 15 TODOS", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
          getTodos (n:15) {
            todos {
              id
              title
              status
            }
          }
        }
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.getTodos.todos).to.be.an("array");
        expect(res.body.data.getTodos.todos).to.have.lengthOf(15);
        done();
      });
  });    

  it("No todo above 200", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `{
        getTodo(id: 204){
          id
          title
          status
        }
      }`,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.statusCode).to.equal(500);
        done();
      });
  });  

  it("Cannot update Todo 201", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        mutation{
            updateTodo(id: 201, todoInput:{
              title:"Todo title updated",
              status: true
            }) {
              id
              title
              status
            }
          }
          `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(500);
        done();
      });
  });  

});
