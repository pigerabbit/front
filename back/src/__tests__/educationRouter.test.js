import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("userRouter", () => {
  let token;
  let user_id;
  let education_id;

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

  describe("post -> /education/create", () => {
    it("should create a new education in userDB", async () => {
      const res = await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          school: "great_school",
          major: "engineering",
          position: "doctor",
        });

      education_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.school).toBe("great_school");
      expect(res.body.major).toBe("engineering");
      expect(res.body.position).toBe("doctor");
    });
  });

  describe("get -> /educations/:id", () => {
    it("should return a education information", async () => {
      const res = await request(app)
        .get(`/educations/${education_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.school).toBe("great_school");
    });
  });

  describe("put -> /educations/:id", () => {
    it("should change a education information", async () => {
      const res = await request(app)
        .put(`/educations/${education_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id,
          school: "great_school2",
          major: "engineering2",
          position: "doctor2",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.school).toBe("great_school2");
      expect(res.body.major).toBe("engineering2");
      expect(res.body.position).toBe("doctor2");
    });
  });

  describe("delete -> /educations/:id", () => {
    it("should delete education from db", async () => {
      const res = await request(app)
        .delete(`/educations/${education_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /educationlist/:user_id", () => {
    it("should return a education list for specific user", async () => {
      await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          school: "awesome_school",
          major: "awesome_major",
          position: "awesome_position",
        });
      await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          school: "awesome_school2",
          major: "awesome_major2",
          position: "awesome_position2",
        });
      await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          school: "awesome_school3",
          major: "awesome_major3",
          position: "awesome_position3",
        });

      const res = await request(app)
        .get(`/educationlist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
