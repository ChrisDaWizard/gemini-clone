import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/gemini", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const model = "gemini-2.5-flash-preview-04-17";
    const result = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
    res.json({ response: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al generar contenido." });
  }
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
