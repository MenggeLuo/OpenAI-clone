import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});


async function getOpenAICompletion(message) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[
            {
                role:"user",
                content:message
            }
        ],
        max_tokens: 256,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
        
    });
    return response.choices[0].message.content;
}

export { getOpenAICompletion };