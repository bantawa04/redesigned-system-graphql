const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

describe("Post API endpoint test", function () {
  it("Create new post", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
      mutation{
          createPost(postInput:{
            title: "Post title from graphql",
            content: "Content from graphql"
          }){id title content created_at }
        }
      `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.createPost).to.be.an("object");
        console.log("Created Post");
        console.log(res.status);
        console.log(res.body.data.createPost);
        done();
      });
  });

  it("Delete a post", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        mutation{
          deletePost(id: 5)
        }
      `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.deletePost).to.equal(true);
        console.log("Post deleted");
        // console.log(res.body);
        done();
      });
  });

  it("Get all 200 posts", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        {
          posts{
            posts {
              id
              title
              content
              image
              author_id
              created_at
              updated_at
            }
          }
        }                
        `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.posts.posts).to.be.an("array");
        expect(res.body.data.posts.posts).to.have.lengthOf(200);
        console.log("Length of posts array (200)");
        console.log(res.body.data.posts.posts.length);
        // console.log(res);
        done();
      });
  });

  it("Get 10 posts", function (done) {
    chai
      .request(app)
      .get("/graphql")
      .send({
        query: `
        {
          getPosts(n:10) {
            posts {
              id
              title
              content
              image
              author_id
              created_at
              updated_at
            }
          }
        }
        `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.posts.posts).to.be.an("array");
        expect(res.body.data.posts.posts).to.have.lengthOf(10);
        done();
      });
  });

  it("Update post", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
        mutation {
          updatePost(id: 5, postInput: {title: "Updated Title", content: "Updated Content"}) {
            id
            title
            content
          }
        }      
      `,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.updatePost).to.be.an("object");
        console.log(res.body.data.updatePost);
        console.log("Updated post");
        done();
      });
  });

  it("Get post by id 24", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `{
          getPost(id: 22){
            id
            title
            content
            created_at
            updated_at
          }
        }`,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.getPost).to.be.an("object");
        console.log("Post got by ID");
        console.log(res.body.data.getPost);
        done();
      });
  });

  it("No post above 200", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `{
        getPost(id: 204){
          id
          title
          content
          created_at
          updated_at
        }
      }`,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.statusCode).to.equal(500);
        done();
      });
  });

  it("Cannot update post above id 200", function (done) {
    chai
      .request(app)
      .post("/graphql")
      .send({
        query: `
    mutation {
      updatePost(id: 203, postInput: {title: "Updated Title", content: "Updated Content"}) {
        id
        title
        content
      }
    }      
  `,
      })
      .end(function (err, res) {
        if (err) done(err);
        console.log(res);
        expect(res.status).to.equal(500);
        done();
      });
  });
});
