const { Hercai } = require('hercai');

exports.config = {
    name: 'gemini',
    author: 'Metoushela',
    description: 'Chat with Gemini',
    method: 'get',
    category: 'ai',
    link: ['/gemini?query=hi']
};

exports.initialize = async function ({ req, res }) {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: "add ?query=your_query_here" });
        }

        const herc = new Hercai();
        const response = await herc.question({ model: "gemini", content: query });
        res.json({ response: response.reply });
    } catch (error) {
        res.status(500).json({ error: "Failed to interact with the model" });
    }
};
