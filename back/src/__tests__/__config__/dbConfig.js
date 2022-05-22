import mongoose from "mongoose";

process.env["MONGODB_URL"] = process.env["MONGODB_URL"] + "--test";

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}

export { closeDatabase };
