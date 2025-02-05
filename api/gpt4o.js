const axios = require('axios');

exports.config = {
    name: 'gpt4o',
    author: 'Metoushela',
    description: 'Chat avec GPT-4o via une API externe',
    method: 'get',
    category: 'ai',
    link: ['/gpt4o?query=hi']
};

exports.initialize = async function ({ req, res }) {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: "Usage: ?query=your_query_here" });
        }

        // Encodage du prompt pour éviter les problèmes avec l'URL
        const encodedQuery = encodeURIComponent(query);
        const apiUrl = `https://metoushela-openai-api.vercel.app/api/text/${encodedQuery}`;

        // Appel à l'API externe
        const response = await axios.get(apiUrl);

        // Vérification si la réponse est valide
        if (!response.data || !response.data.response) {
            throw new Error("Réponse invalide de l'API");
        }

        res.json({ response: response.data.response });
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error.message);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};
