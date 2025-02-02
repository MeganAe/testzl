const crypto = require('crypto');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("VOTRE_CLE_API_GEMINI");

const conversationContexts = new Map();

exports.config = {
    name: 'gemini-1.5-pro',
    author: 'Metoushela',
    description: 'Chat with Gemini 1.5 Pro',
    method: 'get',
    category: 'ai',
    link: ['/gemini-1.5-pro?query=hi']
};

exports.initialize = async function ({ req, res }) {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Ajoutez ?query=your_query_here" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const chatCompletion = await model.generateContent(query);
        const responseMessage = chatCompletion.response.text();

        if (responseMessage) {
            res.json({ response: responseMessage });
        } else {
            res.status(500).json({ error: "Pas de réponse du modèle" });
        }
    } catch (error) {
        console.error("Erreur système :", error);
        res.status(500).json({ error: "Échec de récupération" });
    }
};
