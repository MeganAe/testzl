const axios = require('axios');

exports.config = {
    name: 'gpt4o',
    author: 'Metoushela',
    description: 'Proxy vers GPT-4o API',
    method: 'get',
    category: 'ai',
    link: ['/api/text/:prompt']
};

exports.initialize = async function ({ req, res }) {
    try {
        const prompt = req.params.prompt; // Récupération du prompt depuis l'URL
        if (!prompt) {
            return res.status(400).json({ error: "Usage: /api/text/{prompt}" });
        }

        // Encodage du prompt pour éviter les erreurs dans l'URL
        const encodedPrompt = encodeURIComponent(prompt);
        const apiUrl = `https://metoushela-openai-api.vercel.app/api/text/${encodedPrompt}`;

        // Requête vers l'API d'origine
        const response = await axios.get(apiUrl);

        // Vérification si la réponse est valide
        if (!response.data || !response.data.response) {
            throw new Error("Réponse invalide de l'API");
        }

        // Retourne la réponse exactement sous le même format
        res.json(response.data);
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error.message);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};
