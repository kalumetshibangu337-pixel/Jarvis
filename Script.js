const API_KEY = "AQ.Ab8RN6ISH4lwwM7L23y_7IR7oV4S0ssNQt09ZZyaxacN58Rkrw";

async function envoyerMessage() {
    const inputField = document.querySelector("input") || document.querySelector("textarea");
    const userText = inputField.value.trim();
    if (!userText) return;

    afficherMessage(userText, "user");
    inputField.value = "";

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Tu es EDITH, une IA puissante, élégante et utile. Réponds à l'utilisateur : ${userText}` }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        afficherMessage(aiResponse, "bot");
    } catch (error) {
        afficherMessage("Désolée, une erreur de connexion est survenue.", "bot");
    }
}
