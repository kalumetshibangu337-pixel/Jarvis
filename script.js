/* =====================================
   JARVIS - V1
===================================== */


/* =========================
   ELEMENTS
========================= */

const assistantNameElement =
    document.getElementById("assistantName");

const statusText =
    document.getElementById("statusText");

const assistantMessage =
    document.getElementById("assistantMessage");

const chat =
    document.getElementById("chat");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const micButton =
    document.getElementById("micButton");

const core =
    document.getElementById("core");

const settingsButton =
    document.getElementById("settingsButton");

const settingsModal =
    document.getElementById("settingsModal");

const closeSettings =
    document.getElementById("closeSettings");

const nameInput =
    document.getElementById("nameInput");

const saveName =
    document.getElementById("saveName");

const nameButtons =
    document.querySelectorAll(
        ".name-buttons button"
    );


/* =========================
   ASSISTANT NAME
========================= */

let assistantName =
    localStorage.getItem("assistantName")
    || "JARVIS";


function updateAssistantName() {

    assistantNameElement.textContent =
        assistantName;

    messageInput.placeholder =
        "Écrivez à " +
        assistantName +
        "...";

    nameInput.value =
        assistantName;
}


updateAssistantName();


/* =========================
   SETTINGS
========================= */

settingsButton.addEventListener(
    "click",
    () => {

        nameInput.value =
            assistantName;

        settingsModal.classList.remove(
            "hidden"
        );

    }
);


closeSettings.addEventListener(
    "click",
    () => {

        settingsModal.classList.add(
            "hidden"
        );

    }
);


saveName.addEventListener(
    "click",
    saveAssistantName
);


function saveAssistantName() {

    const newName =
        nameInput.value.trim();

    if (newName.length === 0) {
        return;
    }

    assistantName =
        newName;

    localStorage.setItem(
        "assistantName",
        assistantName
    );

    updateAssistantName();

    addAIMessage(
        "Très bien. À partir de maintenant, vous pouvez m'appeler " +
        assistantName + "."
    );

    settingsModal.classList.add(
        "hidden"
    );
}


/* =========================
   QUICK NAMES
========================= */

nameButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                nameInput.value =
                    button.dataset.name;

            }
        );

    }
);


/* =========================
   CHAT
========================= */

function addUserMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "message user-message";

    message.textContent =
        text;

    chat.appendChild(message);

    scrollChat();
}


function addAIMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "message ai-message";

    message.textContent =
        text;

    chat.appendChild(message);

    scrollChat();
}


function scrollChat() {

    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================
   SEND MESSAGE
========================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


messageInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


function sendMessage() {

    const text =
        messageInput.value.trim();

    if (!text) {
        return;
    }

    addUserMessage(text);

    messageInput.value = "";

    assistantMessage.textContent =
        "Je réfléchis...";

    setTimeout(
        () => {

            const response =
                generatePrototypeResponse(
                    text
                );

            addAIMessage(response);

            assistantMessage.textContent =
                "Comment puis-je vous aider ?";

        },
        700
    );
}


/* =========================
   PROTOTYPE BRAIN
========================= */

function generatePrototypeResponse(text) {

    const lowerText =
        text.toLowerCase();


    if (
        lowerText.includes("bonjour") ||
        lowerText.includes("salut") ||
        lowerText.includes("hello")
    ) {

        return (
            "Bonjour. Je suis " +
            assistantName +
            ". Comment puis-je vous aider ?"
        );

    }


    if (
        lowerText.includes("qui es-tu") ||
        lowerText.includes("qui es tu")
    ) {

        return (
            "Je suis votre assistant personnel. " +
            "Mon véritable cerveau IA sera connecté dans une prochaine version."
        );

    }


    if (
        lowerText.includes("ton nom") ||
        lowerText.includes("comment tu t'appelles")
    ) {

        return (
            "Vous m'avez donné le nom " +
            assistantName +
            "."
        );

    }


    if (
        lowerText.includes("merci")
    ) {

        return (
            "Avec plaisir."
        );

    }


    return (
        "J'ai bien reçu votre demande : « " +
        text +
        " ». " +
        "Je suis encore en version prototype, " +
        "mais mon véritable cerveau IA sera bientôt connecté."
    );
}


/* =========================
   MICROPHONE
========================= */

let isListening = false;

let recognition = null;


/*
   Vérification de la reconnaissance
   vocale du navigateur.
*/

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();

    recognition.lang =
        "fr-FR";

    recognition.continuous =
        false;

    recognition.interimResults =
        false;


    recognition.onstart =
        () => {

            isListening = true;

            micButton.classList.add(
                "listening"
            );

            core.classList.add(
                "core-listening"
            );

            statusText.textContent =
                "ÉCOUTE";

            statusText.style.color =
                "#ff9d00";

            assistantMessage.textContent =
                "Je vous écoute...";

        };


    recognition.onresult =
        event => {

            const transcript =
                event.results[0][0].transcript;

            messageInput.value =
                transcript;

            sendMessage();

        };


    recognition.onend =
        () => {

            stopListening();

        };


    recognition.onerror =
        () => {

            stopListening();

            assistantMessage.textContent =
                "Je n'ai pas réussi à vous entendre.";

        };

}


micButton.addEventListener(
    "click",
    toggleMicrophone
);


function toggleMicrophone() {

    if (!recognition) {

        addAIMessage(
            "La reconnaissance vocale n'est pas disponible dans ce navigateur."
        );

        return;

    }


    if (isListening) {

        recognition.stop();

    } else {

        recognition.start();

    }

}


function stopListening() {

    isListening = false;

    micButton.classList.remove(
        "listening"
    );

    core.classList.remove(
        "core-listening"
    );

    statusText.textContent =
        "EN LIGNE";

    statusText.style.color =
        "#4dff9a";

}


/* =====================================
   BIENVENUE
===================================== */

console.log(
    assistantName +
    " est prêt."
);