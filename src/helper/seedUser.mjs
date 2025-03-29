const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
import { User } from "./models/user.mjs";

const TOTAL_USERS = 10000;
const BATCH_SIZE = 1000;

async function generateUsers() {
  const users = [];
  const emailSet = new Set();

  for (let i = 0; i < TOTAL_USERS; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      age: faker.number.int({ min: 12, max: 90 }),
      password: await bcrypt.hash("qwer1234", 10),
    };

    if (!emailSet.has(user.email)) {
      users.push(user);
      emailSet.add(user.email);
    }

    if (users.length === BATCH_SIZE || i === TOTAL_USERS - 1) {
      await User.insertMany(users);
      users.length = 0;
      console.log(`Users inserted: ${i + 1}/${TOTAL_USERS}`);
    }
  }

  console.log("Data generation completed!");
}

generateFakeData().catch(console.error);
