import { initDatabase } from "./mysql";

export default async function connectToDatabase() {
  await initDatabase();
}
