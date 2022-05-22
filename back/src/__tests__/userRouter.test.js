import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("userRouter", () => {
  afterAll(() => {
    closeDatabase();
  });

  describe("post -> /user/register", () => {
    it("should create a new user in userDB", async () => {
      const res = await request(app)
        .post("/user/register")
        .set("Content-Type", "application/json")
        .send({
          name: "tester",
          email: "abc@def.com",
          password: "1234",
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.name).toBe("tester");
      expect(res.body.email).toBe("abc@def.com");
    });
  });

  describe("post -> /user/login", () => {
    it("should return a token after login", async () => {
      const res = await request(app)
        .post("/user/login")
        .set("Content-Type", "application/json")
        .send({ email: "abc@def.com", password: "1234" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
    });
  });

  describe("get -> /userlist", () => {
    it("should return a userlist with at least 3 people", async () => {
      await request(app)
        .post("/user/register")
        .set("Content-Type", "application/json")
        .send({
          name: "tester1",
          email: "abc1@def.com",
          password: "1234",
        });
      await request(app)
        .post("/user/register")
        .set("Content-Type", "application/json")
        .send({
          name: "tester2",
          email: "abc2@def.com",
          password: "1234",
        });
      await request(app)
        .post("/user/register")
        .set("Content-Type", "application/json")
        .send({
          name: "tester3",
          email: "abc3@def.com",
          password: "1234",
        });

      const res = await request(app)
        .post("/user/login")
        .set("Content-Type", "application/json")
        .send({ email: "abc@def.com", password: "1234" });

      const token = res.body.token;

      const res2 = await request(app)
        .get("/userlist")
        .set("Authorization", `Bearer ${token}`);

      expect(res2.statusCode).toEqual(200);
      expect(res2.body.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("put -> /users/:id", () => {
    it("should change user information", async () => {
      const res = await request(app)
        .post("/user/login")
        .set("Content-Type", "application/json")
        .send({ email: "abc@def.com", password: "1234" });

      const token = res.body.token;
      const user_id = res.body.id;

      const res2 = await request(app)
        .put(`/users/${user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({ email: "abc@def.com", name: "tester-changed" });

      expect(res2.statusCode).toEqual(200);
      expect(res2.body.name).toBe("tester-changed");
    });
  });

  describe("get -> /users/:id", () => {
    it("should send user data", async () => {
      const res = await request(app)
        .post("/user/login")
        .set("Content-Type", "application/json")
        .send({ email: "abc@def.com", password: "1234" });

      const token = res.body.token;
      const user_id = res.body.id;

      const res2 = await request(app)
        .get(`/users/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res2.statusCode).toEqual(200);
      expect(res2.body.email).toBe("abc@def.com");
    });
  });
});
