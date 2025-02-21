export async function getMistralResponse(prompt) {
    const API_KEY = "6rzi1Dep2r6SFB7p1QKjRFff0mgMpCZZ"; 
  
    if (!API_KEY) {
      console.error("🚨 Error: Mistral API key is missing! Please add VITE_MISTRAL_API_KEY to your .env file");
      return "I apologize, but I'm not properly configured yet. Please make sure the API key is set up correctly.";
    }
  
    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          temperature: 1.0,
          top_p: 1,
          max_tokens: 250,
          stream: false,
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "text" },
          presence_penalty: 0,
          frequency_penalty: 0,
          n: 1
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;  
      } else {
        return "Error: No response from Mistral AI.";
      }
    } catch (error) {
      console.error("🚨 API Request Failed:", error);
      return `Error: ${error.message || 'Unknown error occurred'}`;
    }
  }