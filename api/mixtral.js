const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: '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' });

exports.config = {
    name: 'mixtral-8x7b-32768',
    author: 'Metoushela',
    description: 'chat with the mixtral-8x7b-32768',
    method: 'get',
    category: 'ai',
    link: ['/mixtral-8x7b-32768?query=hi']
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
                model: "mixtral-8x7b-32768",
            });

        res.json({ response: completion.choices[0]?.message?.content || "" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch" });
    }
};