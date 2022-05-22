import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("projectRouter", () => {
  let token;
  let user_id;
  let project_id;

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

  describe("post -> /project/create", () => {
    it("should create a new project in userDB", async () => {
      const res = await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_project",
          description: "awesome",
          from_date: "2022.01.15",
          to_date: "2022.01.16",
        });

      project_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe("awesome_project");
      expect(res.body.description).toBe("awesome");
      expect(res.body.from_date).toBe("2022.01.15");
    });
  });

  describe("get -> /projects/:id", () => {
    it("should return a project information", async () => {
      const res = await request(app)
        .get(`/projects/${project_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_project");
      expect(res.body.description).toBe("awesome");
      expect(res.body.from_date).toBe("2022.01.15");
    });
  });

  describe("put -> /projects/:id", () => {
    it("should change a project information", async () => {
      const res = await request(app)
        .put(`/projects/${project_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "awesome_project2",
          description: "awesome2",
          from_date: "2022.01.31",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_project2");
      expect(res.body.description).toBe("awesome2");
      expect(res.body.from_date).toBe("2022.01.31");
    });
  });

  describe("delete -> /projects/:id", () => {
    it("should delete project from db", async () => {
      const res = await request(app)
        .delete(`/projects/${project_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /projectlist/:user_id", () => {
    it("should return a projects list for specific user", async () => {
      await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_project2",
          description: "awesome3",
          from_date: "2022.01.01",
          to_date: "2022.01.02",
        });
      await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_projects",
          description: "awesome4",
          from_date: "2022.01.06",
          to_date: "2022.01.12",
        });
      await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_project3",
          description: "awesome5",
          from_date: "2022.01.06",
          to_date: "2022.01.12",
        });

      const res = await request(app)
        .get(`/projectlist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
