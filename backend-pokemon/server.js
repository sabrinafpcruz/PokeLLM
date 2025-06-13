require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    // Usando um modelo para geração de texto simples, exemplo: gpt2
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      { inputs: question },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // A resposta pode variar de modelo para modelo, geralmente é:
    // response.data[0].generated_text ou response.data.generated_text
    let answer = '';

    if (Array.isArray(response.data)) {
      answer = response.data[0].generated_text || JSON.stringify(response.data);
    } else if (response.data.generated_text) {
      answer = response.data.generated_text;
    } else {
      answer = JSON.stringify(response.data);
    }

    res.json({ answer });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao obter resposta da IA.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
