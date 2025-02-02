const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: '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' });

exports.config = {
    name: 'llama-3.2-11b-vision-preview',
    author: 'metoushela',
    description: 'chat with the llama-3.2-11b-vision-preview',
    method: 'get',
    category: 'ai',
    link: ['/llama-3.2-11b-vision-preview?query=hi']
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
                model: "llama-3.2-11b-vision-preview",
            });

        res.json({ response: completion.choices[0]?.message?.content || "" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch" });
    }
};