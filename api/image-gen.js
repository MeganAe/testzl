const axios = require('axios');

exports.config = {
    name: 'bb-image-gen',
    author: 'Metoushela',
    description: 'Interact with blackbox Image Generator',
    method: 'get',
    category: 'AI Image Generator',
    link: ['/bb-image-gen?query=dog']
};

exports.initialize = async function ({ req, res }) {
    try {
        const query = req.query.query;

        const data = {
            messages: [{ id: "ymAEju4jqExAWxsNJcb_B", content: query, role: "user" }],
            id: "ymAEju4jqExAWxsNJcb_B",
            previewToken: null,
            userId: null,
            codeModelMode: true,
            agentMode: { mode: true, id: "ImageGenerationLV45LJp", name: "Image Generation" },
            trendingAgentMode: {},
            isMicMode: false,
            maxTokens: 1024,
            playgroundTopP: null,
            playgroundTemperature: null,
            isChromeExt: false,
            githubToken: "",
            clickedAnswer2: false,
            clickedAnswer3: false,
            clickedForceWebSearch: false,
            visitFromDelta: false,
            mobileClient: false,
            userSelectedModel: null,
            validated: "00f37b34-a166-4efb-bce5-1312d87f2f94",
            imageGenerationMode: false,
            webSearchModePrompt: false
        };

        const response = await axios.post("https://api.blackbox.ai/api/chat", data, {
            headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200) {
            if (response.data.startsWith('![Generated Image]')) {
                const imageUrl = response.data.split('](')[1].replace(')', '');
                res.json({ imageUrl });
            } else {
                res.json(response.data);
            }
        } else {
            res.status(response.status).json({ error: "Request failed", message: response.statusText });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to interact with Blackbox AI', message: error.message });
    }
};
