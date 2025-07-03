const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/convert', async (req, res) => {
  const { videoUrl } = req.body;
  const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");

  if (!videoId) return res.status(400).json({ error: "ID inválido" });

  try {
    const response = await axios.get('https://youtube-mp36.p.rapidapi.com/dl', {
      params: { id: videoId },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al convertir video", detail: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor backend accesible en red local en puerto ${PORT}`));

