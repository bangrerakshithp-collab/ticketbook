import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

// Initialize Supabase client if keys are present, otherwise graceful fallback
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      supabaseConnected: !!supabase,
      timestamp: new Date().toISOString()
    });
  });

  // API Routes for Buses & Bookings
  app.get("/api/buses", async (req, res) => {
    try {
      if (supabase) {
        const { data, error } = await supabase.from('buses').select('*');
        if (!error && data && data.length > 0) {
          return res.json(data);
        }
      }
      // Fallback mock data if Supabase isn't configured yet
      res.json([]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = req.body;
      if (supabase) {
        const { data, error } = await supabase.from('bookings').insert([bookingData]).select();
        if (error) throw error;
        return res.json({ success: true, booking: data[0] });
      }
      res.json({ success: true, booking: { ...bookingData, id: `bk-${Date.now()}` } });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Backend Server] Server running on http://localhost:${PORT}`);
    console.log(`[Supabase Integration] Status: ${supabase ? 'Configured & Active' : 'Offline / Unconfigured (Using Fallback Mode)'}`);
  });
}

startServer();
