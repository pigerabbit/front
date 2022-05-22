import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("awardRouter", () => {
  let token;
  let user_id;
  let award_id;

  beforeAll(async () => {
    await request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send({
        name: "tester1",
        email: "abc@def.com",
        password: "1234",
      });
    const res = await request(app)
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send({ email: "abc@def.com", password: "1234" });

    token = res.body.token;
    user_id = res.body.id;
  });

  afterAll(() => {
    closeDatabase();
  });

  describe("post -> /award/create", () => {
    it("should create a new award in userDB", async () => {
      const res = await request(app)
        .post("/award/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_award",
          description: "awesome",
        });

      award_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe("awesome_award");
      expect(res.body.description).toBe("awesome");
    });
  });

  describe("get -> /awards/:id", () => {
    it("should return a award information", async () => {
      const res = await request(app)
        .get(`/awards/${award_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_award");
    });
  });

  describe("put -> /awards/:id", () => {
    it("should change a award information", async () => {
      const res = await request(app)
        .put(`/awards/${award_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "awesome_award2",
          description: "awesome2",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_award2");
      expect(res.body.description).toBe("awesome2");
    });
  });

  describe("delete -> /awards/:id", () => {
    it("should delete award from db", async () => {
      const res = await request(app)
        .delete(`/awards/${award_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /awardlist/:user_id", () => {
    it("should return a award list for specific user", async () => {
      await request(app)
        .post("/award/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_award3",
          description: "awesome3",
        });
      await request(app)
        .post("/award/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_award4",
          description: "awesome4",
        });
      await request(app)
        .post("/award/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_award5",
          description: "awesome5",
        });

      const res = await request(app)
        .get(`/awardlist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
