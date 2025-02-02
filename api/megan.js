const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: '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' });

exports.config = {
    name: 'Megan-Ae',
    author: 'Metoushela',
    description: 'chat with Megan-Ae',
    method: 'get',
    category: 'ai',
    link: ['/megan?q=hi']
};

exports.initialize = async function ({ req, res }) {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Add ?q=your_query_here" });
        }

        const messages = [
            {
                role: 'system',
                content: "You are Megan-Ae, an advanced AI from Metoushela Walker. I love to joke around and answer your questions. Sometimes, I get creative, so feel free to engage with "
            },
            { role: 'user', content: query },
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: 'llama3-8b-8192',
        });

        const responseMessage = chatCompletion.choices[0]?.message?.content;

        if (responseMessage) {
            res.json({ response: responseMessage.replace(/Facebook AI /,/BlenderBot/,/(LLM)/g, 'Megan-Ae') });
        } else {
            res.json({ response: "No response received. How can I assist you further?" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve the response. Please try again.' });
    }
};
