import { users, fixtures, matches, type User, type InsertUser, type Fixture, type InsertFixture, type Match, type InsertMatch, type CricketData } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCricketData(): Promise<CricketData>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private fixturesData: Array<{ opponent: string; date: string; status: string }>;
  private matchData: { score: string; message: string };
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Initialize with static cricket data as specified
    this.fixturesData = [
      { opponent: "Australia", date: "2025-07-20", status: "upcoming" },
      { opponent: "England", date: "2025-07-10", status: "completed" },
      { opponent: "Pakistan", date: "2025-07-05", status: "completed" }
    ];
    
    this.matchData = {
      score: "India 250/7 (50 overs) vs England 245/9 (50 overs)",
      message: "India won by 5 runs. Next match vs Australia."
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCricketData(): Promise<CricketData> {
    return {
      fixtures: this.fixturesData,
      score: this.matchData.score,
      message: this.matchData.message
    };
  }
}

export const storage = new MemStorage();
