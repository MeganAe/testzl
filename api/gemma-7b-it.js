const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: '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' });

exports.config = {
    name: 'gemma-7b-it',
    author: 'Metoushela',
    description: 'chat with the gemma-7b-it',
    method: 'get',
    category: 'ai',
    link: ['/gemma-7b-it?query=hi']
};

exports.initialize = async function ({ req, res }) {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: "Add ?query=your_query_here" });
        }

        const completion = await groq.chat.completions
            .create({
                messages: [{ role: "user", content: query }],
                model: "gemma-7b-it",
            });

        res.json({ response: completion.choices[0]?.message?.content || "" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch" });
    }
};