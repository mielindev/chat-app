import { config } from "dotenv";
import connectDB from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUser = [
  {
    email: "alice@example.com",
    fullName: "Alice Smith",
    password: "P@ssw0rd123",
    profilePic: "https://i.pravatar.cc/300?u=alice@example.com",
  },
  {
    email: "bob@example.com",
    fullName: "Bob Johnson",
    password: "B0bSecure!",
    profilePic: "https://i.pravatar.cc/300?u=bob@example.com",
  },
  {
    email: "carol@example.com",
    fullName: "Carol Williams",
    password: "Car0l#2025",
    profilePic: "https://i.pravatar.cc/300?u=carol@example.com",
  },
  {
    email: "dave@example.com",
    fullName: "Dave Brown",
    password: "D@v3R0cks",
    profilePic: "https://i.pravatar.cc/300?u=dave@example.com",
  },
  {
    email: "eve@example.com",
    fullName: "Eve Davis",
    password: "EvePwd!987",
    profilePic: "https://i.pravatar.cc/300?u=eve@example.com",
  },
  {
    email: "frank@example.com",
    fullName: "Frank Miller",
    password: "FrankPass#89",
    profilePic: "https://i.pravatar.cc/300?u=frank@example.com",
  },
  {
    email: "grace@example.com",
    fullName: "Grace Lee",
    password: "Gr@ceLee101",
    profilePic: "https://i.pravatar.cc/300?u=grace@example.com",
  },
  {
    email: "heidi@example.com",
    fullName: "Heidi Clark",
    password: "HeidiC*2025",
    profilePic: "https://i.pravatar.cc/300?u=heidi@example.com",
  },
  {
    email: "ivan@example.com",
    fullName: "Ivan Martinez",
    password: "IvanM@arts11",
    profilePic: "https://i.pravatar.cc/300?u=ivan@example.com",
  },
  {
    email: "judy@example.com",
    fullName: "Judy Robinson",
    password: "JudyR0b!n12",
    profilePic: "https://i.pravatar.cc/300?u=judy@example.com",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUser);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
