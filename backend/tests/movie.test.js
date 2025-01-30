const request = require("supertest");
const app = require("../app");

const { movies } = require("../routes/movie.routes");

describe("Express API Tests", () => {
  test("GET /movies/id/:id", async () => {
    const response = await request(app).get("/api/movies/id/118073");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("genre");
    expect(response.body).toHaveProperty("score");
    expect(response.body).toHaveProperty("poster");
    expect(response.body).toHaveProperty("num_ratings");
    expect(response.body).not.toHaveProperty("reviews");
  });

  test("GET /movies/id/:id", async () => {
    const response = await request(app).get(
      "/api/movies/id/118073?reviews=true"
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("genre");
    expect(response.body).toHaveProperty("score");
    expect(response.body).toHaveProperty("poster");
    expect(response.body).toHaveProperty("num_ratings");
    expect(response.body).toHaveProperty("reviews");
  });

  test("GET /movies/id/:id", async () => {
    const response = await request(app).get("/api/movies/id/abc");
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/id/:id", async () => {
    const response = await request(app).get(
      "/api/movies/id/118073?reviews=abc"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/id/:id", async () => {
    const response = await request(app).get("/api/movies/id/999999");
    expect(response.statusCode).toBe(404);
  });

  test("GET /movies/id/:id/reviews", async () => {
    const response = await request(app).get("/api/movies/id/118073/reviews");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /movies/id/:id/reviews", async () => {
    const response = await request(app).get("/api/movies/id/abc/reviews");
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/id/:id/reviews", async () => {
    const response = await request(app).get("/api/movies/id/999999/reviews");
    expect(response.statusCode).toBe(404);
  });

  test("POST /movies/id/:id/reviews", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/reviews")
      .send({ review: "This is a review." });
    expect(response.statusCode).toBe(201);
  });

  test("POST /movies/id/:id/reviews", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/reviews")
      .set("Content-Type", "plain/text")
      .send("This is a review.");
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/reviews", async () => {
    const response = await request(app).post("/api/movies/id/abc/reviews");
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/reviews", async () => {
    const response = await request(app)
      .post("/api/movies/id/999999/reviews")
      .send({ review: "This is a review." });
    expect(response.statusCode).toBe(404);
  });

  test("POST /movies/id/:id/reviews", async () => {
    const response = await request(app).post("/api/movies/id/118073/reviews");
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/add", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/add")
      .send({ rating: 3 });
    expect(response.statusCode).toBe(201);
  });

  test("POST /movies/id/:id/rating/add", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/add")
      .set("Content-Type", "plain/text")
      .send("3");
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/add", async () => {
    const response = await request(app).post("/api/movies/id/abc/rating/add");
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/add", async () => {
    const response = await request(app)
      .post("/api/movies/id/999999/rating/add")
      .send({ rating: 3 });
    expect(response.statusCode).toBe(404);
  });

  test("POST /movies/id/:id/rating/add", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/add")
      .send({ rating: "abc" });
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/add", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/add")
      .send({ rating: 6 });
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/add", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/add")
      .send({ rating: -1 });
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/remove", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/remove")
      .send({ rating: 3 });
    expect(response.statusCode).toBe(200);
  });

  test("POST /movies/id/:id/rating/remove", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/remove")
      .set("Content-Type", "plain/text")
      .send("3");
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/remove", async () => {
    const response = await request(app).post(
      "/api/movies/id/abc/rating/remove"
    );
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/remove", async () => {
    const response = await request(app)
      .post("/api/movies/id/999999/rating/remove")
      .send({ rating: 3 });
    expect(response.statusCode).toBe(404);
  });

  test("POST /movies/id/:id/rating/remove", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/remove")
      .send({ rating: "abc" });
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/remove", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/remove")
      .send({ rating: 6 });
    expect(response.statusCode).toBe(400);
  });

  test("POST /movies/id/:id/rating/remove", async () => {
    const response = await request(app)
      .post("/api/movies/id/118073/rating/remove")
      .send({ rating: -1 });
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/random", async () => {
    const response = await request(app).get("/api/movies/random?n=10&offset=0");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(10);
  });

  test("GET /movies/random", async () => {
    const response = await request(app).get(
      "/api/movies/random?n=abc&offset=0"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/random", async () => {
    const response = await request(app).get(
      "/api/movies/random?n=10&offset=abc"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/random", async () => {
    const response = await request(app).get(
      "/api/movies/random?n=10&offset=999999"
    );
    expect(response.statusCode).toBe(404);
  });

  test("GET /movies/ranked", async () => {
    const response = await request(app).get("/api/movies/ranked?n=10&offset=0");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(10);
  });

  test("GET /movies/ranked", async () => {
    const response = await request(app).get(
      "/api/movies/ranked?n=abc&offset=0"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/ranked", async () => {
    const response = await request(app).get(
      "/api/movies/ranked?n=10&offset=abc"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/ranked", async () => {
    const response = await request(app).get(
      "/api/movies/ranked?n=10&offset=999999"
    );
    expect(response.statusCode).toBe(404);
  });

  test("GET /movies/genre/:genre", async () => {
    const response = await request(app).get(
      "/api/movies/genre/Drama?n=10&offset=0"
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(10);
  });

  test("GET /movies/genre/:genre", async () => {
    const response = await request(app).get(
      "/api/movies/genre/Drama?n=abc&offset=0"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/genre/:genre", async () => {
    const response = await request(app).get(
      "/api/movies/genre/Drama?n=10&offset=abc"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/genre/:genre", async () => {
    const response = await request(app).get(
      "/api/movies/genre/abc?n=10&offset=0"
    );
    expect(response.statusCode).toBe(404);
  });

  test("GET /movies/genre/:genre", async () => {
    const response = await request(app).get(
      "/api/movies/genre/Drama?n=10&offset=999999"
    );
    expect(response.statusCode).toBe(404);
  });

  test("GET /movies/all_genres", async () => {
    const response = await request(app).get("/api/movies/all_genres");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /movies/search", async () => {
    const response = await request(app).get(
      "/api/movies/search?q=The&n=10&offset=0"
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /movies/search", async () => {
    const response = await request(app).get(
      "/api/movies/search?q=&n=10&offset=0"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/search", async () => {
    const response = await request(app).get(
      "/api/movies/search?q=The&n=abc&offset=0"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/search", async () => {
    const response = await request(app).get(
      "/api/movies/search?q=The&n=10&offset=abc"
    );
    expect(response.statusCode).toBe(400);
  });

  test("GET /movies/search", async () => {
    const response = await request(app).get(
      "/api/movies/search?q=The&n=10&offset=999999"
    );
    expect(response.statusCode).toBe(404);
  });
});
