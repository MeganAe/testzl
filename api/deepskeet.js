const crypto = require('crypto'); 

const Groq = require("groq-sdk"); 
const groq = new Groq({ apiKey: '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' });

const conversationContexts = new Map(); 

exports.config = { 
    name: 'deepseek-r1-distill-llama-70b', 
    author: 'Metoushela', 
    description: 'Chat with the deepseek-r1-distill-llama-70b', 
    method: 'get', 
    category: 'ai', 
    link: ['/deepseek-r1-distill-llama-70b?query=hi&userId=123'] 
}; 

exports.initialize = async function ({ req, res }) { 
    try { 
        const { query, userId } = req.query; 

        if (!query || !userId) { 
            return res.status(400).json({ 
                error: !query ? "Add ?query=your_query_here" : "Add &userId=your_user_id" 
            }); 
        } 

        const conversationId = crypto.createHash('md5').update(userId).digest('hex'); 
        let conversationContext = conversationContexts.get(conversationId) || []; 

        if (conversationContext.length > 20) { 
            conversationContext = conversationContext.slice(-20); 
        } 

        conversationContext.push({ role: "user", content: query }); 

        const chatCompletion = await groq.chat.completions.create({ 
            messages: conversationContext, 
            model: "deepseek-r1-distill-llama-70b", 
            temperature: 0.6, 
            max_completion_tokens: 4096, 
            top_p: 0.95, 
            stream: true 
        }); 

        let responseMessage = ''; 
        for await (const chunk of chatCompletion) { 
            responseMessage += chunk.choices[0]?.delta?.content || ''; 
        } 

        if (responseMessage) { 
            conversationContext.push({ role: "assistant", content: responseMessage }); 
            conversationContexts.set(conversationId, conversationContext); 
            res.json({ response: responseMessage }); 
        } else { 
            res.status(500).json({ error: "No response from the model" }); 
        } 
    } catch (error) { 
        console.error("Erreur système :", error); 
        res.status(500).json({ error: "Failed to fetch" }); 
    } 
};
