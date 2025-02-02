const ai = require('unlimited-ai');

exports.config = {
    name: 'chatgpt',
    author: 'metoushela',
    description: 'Chat with ChatGpt',
    method: 'get',
    category: 'ai',
    link: ['/chatgpt?query=Hello']
};

exports.initialize = async function ({ req, res }) {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: "Please add ?query=hi" });
        }

        const model = 'gpt-4-turbo-2024-04-09';
        const messages = [
            { role: 'user', content: query },
            { role: 'system', content: 'You are a helpful assistant.' }
        ];

        const response = await ai.generate(model, messages);
        res.json({ response: response });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch response" });
    }
};
