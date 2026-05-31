import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup failure if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI customization will fall back to local templates.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "PLACEHOLDER_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Romantic AI prompt generation endpoint
app.post("/api/romance/generate", async (req, res) => {
  try {
    const { gfName, relationshipLength, letterTone, favoriteAttributes, keyMemories } = req.body;

    if (!gfName) {
      return res.status(400).json({ error: "Girlfriend's name is required to personalize the note." });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      // Fallback response for safe development when API key isn't provided/activated yet in UI env
      return res.json({
        text: `Dearest ${gfName},\n\nEvery day with you over the last ${relationshipLength || "sweet time together"} has been an absolute blessing. You are my light, my comfort, and my favorite reason to smile. I often think about our favorite memories, especially ${keyMemories || "all the little moments we share"}.\n\nYour ${favoriteAttributes && favoriteAttributes.length > 0 ? favoriteAttributes.join(", ") : "beautiful smile"} makes my world a thousand times brighter. Thank you for being my partner, my best friend, and my whole heart.\n\nWith all my love,\nYour Admirer (AI Fallback Note)`
      });
    }

    const ai = getGeminiClient();

    const attributesText = favoriteAttributes && favoriteAttributes.length > 0 
      ? `Their favorite traits about her are: ${favoriteAttributes.join(", ")}.`
      : "";

    const memoryText = keyMemories 
      ? `A highly cherished memory or story to specifically include is: "${keyMemories}". Write about this memory in a warm, detailed, affectionate way.`
      : "";

    const systemInstructions = `You are a warm, highly romantic, poetic partner writing a personalized love letter, card message, or short poem to their beloved girlfriend named "${gfName}". 
The letter should feel extraordinarily genuine, tender, and crafted with high emotional intelligence. 
Avoid robotic clichés, marketing, or excessively dry structures. 
Do not include metadata, introductory remarks like "Here is your letter", or any markdown placeholder brackets like "[Your Name]". Just deliver the raw beautiful text.`;

    const prompt = `Write a romantic letter/poem.
Recipient Name: ${gfName}
Relation Length: ${relationshipLength || "some wonderful time"}
Vibe/Tone: ${letterTone || "romantic"}
${attributesText}
${memoryText}

Make sure to sign off with a deeply touching closing line.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstructions,
        temperature: 0.95,
      },
    });

    const letterText = response.text;
    res.json({ text: letterText });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong creating the love note." });
  }
});

// Serve API check router
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Configure Vite or Static Servers
async function setupBuildEngine() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting developer workspace using integrated Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving compiled static assets from /dist in standard production setup...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server successfully initialized and routing on http://localhost:${PORT}`);
  });
}

setupBuildEngine().catch((err) => {
  console.error("Failed to initialize server platform stack:", err);
});
