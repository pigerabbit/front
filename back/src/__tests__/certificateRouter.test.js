import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("certificateRouter", () => {
  let token;
  let user_id;
  let certificate_id;

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

  describe("post -> /certificate/create", () => {
    it("should create a new certificate in userDB", async () => {
      const res = await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate",
          description: "awesome",
          when_date: "2022.01.15",
        });

      certificate_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe("awesome_certificate");
      expect(res.body.description).toBe("awesome");
      expect(res.body.when_date).toBe("2022.01.15");
    });
  });

  describe("get -> /certificates/:id", () => {
    it("should return a certificate information", async () => {
      const res = await request(app)
        .get(`/certificates/${certificate_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_certificate");
    });
  });

  describe("put -> /certificates/:id", () => {
    it("should change a certificate information", async () => {
      const res = await request(app)
        .put(`/certificates/${certificate_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "awesome_certificate2",
          description: "awesome2",
          when_date: "2022.01.31",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_certificate2");
      expect(res.body.description).toBe("awesome2");
      expect(res.body.when_date).toBe("2022.01.31");
    });
  });

  describe("delete -> /certificates/:id", () => {
    it("should delete certificate from db", async () => {
      const res = await request(app)
        .delete(`/certificates/${certificate_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /certificatelist/:user_id", () => {
    it("should return a certificate list for specific user", async () => {
      await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate3",
          description: "awesome3",
          when_date: "2022",
        });
      await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate",
          description: "awesome4",
          when_date: "2022",
        });
      await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate3",
          description: "awesome5",
          when_date: "2022",
        });

      const res = await request(app)
        .get(`/certificatelist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
