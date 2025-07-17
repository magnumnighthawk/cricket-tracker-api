import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { cricketDataSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Cricket data endpoint
  app.get("/api/cricket-data", async (req, res) => {
    try {
      const cricketData = await storage.getCricketData();
      
      // Validate the response data
      const validatedData = cricketDataSchema.parse(cricketData);
      
      res.json(validatedData);
    } catch (error) {
      console.error("Error fetching cricket data:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: "Failed to fetch cricket data"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "cricket-api"
    });
  });

  // Handle 404 for API routes
  app.use("/api/*", (req, res) => {
    res.status(404).json({
      error: "Not Found",
      message: `API endpoint ${req.path} not found`
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
