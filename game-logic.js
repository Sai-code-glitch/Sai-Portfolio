document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection ---
    const welcomeModal = document.getElementById('welcome-modal');
    const startMissionBtn = document.getElementById('start-mission-btn');
    const dialogueText = document.getElementById('dialogue-text');
    const challengeModal = document.getElementById('challenge-modal');
    const intelDisplay = document.getElementById('intel-display');
    const codeSamples = document.getElementById('code-samples');
    const locations = document.querySelectorAll('.location');

    // --- Game State & Content ---
    let gameState = { stage: 'start' };
    const dialogue = {
        start: "Handler, your mission is to verify Operative Yalamanchili's credentials. Begin by decrypting the US intel.",
        unlockEurope: "US Intel decrypted. Data fragment points to Europe. Use the key from the US report to proceed.",
        unlockIndia: "European Intel decrypted. Final fragment points to India. Decrypt the final node.",
        complete: "All field intel acquired. Operative profile is complete. Accessing code samples..."
    };
    const challenges = {
        'usa': { title: "DECRYPT US INTEL", question: "Confirm your objective:", answers: [{ text: "Find a skilled candidate", correct: true }, { text: "Order a pizza", correct: false }], success: "Accessing US Intel...", nextStage: 'unlockEurope' },
        'italy': { title: "DECRYPT EUROPEAN INTEL", question: "Key required: Which project management tool was cited in the European report?", answers: [{ text: "Primavera P6", correct: true }, { text: "MS Project", correct: false }], success: "Accessing Indian Intel...", nextStage: 'unlockIndia' },
        'india': { title: "DECRYPT INDIAN INTEL", question: "Final confirmation: Was the Indian operation focused on cost analysis or marketing?", answers: [{ text: "Cost Analysis", correct: true }, { text: "Marketing", correct: false }], success: "All intel acquired.", nextStage: 'complete' }
    };

    // --- Game Functions ---
    const typeWriter = (element, text) => { /* ... (same as before) ... */ };

    const showChallenge = (locationId) => {
        const challenge = challenges[locationId];
        if (!challenge) return;

        // Populate and show the modal
        document.getElementById('challenge-title').innerText = challenge.title;
        document.getElementById('challenge-question').innerText = challenge.question;
        const answersContainer = document.getElementById('challenge-answers');
        answersContainer.innerHTML = '';
        challenge.answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'glow-btn';
            btn.innerText = ans.text;
            btn.onclick = () => handleAnswer(ans.correct, challenge);
            answersContainer.appendChild(btn);
        });
        challengeModal.classList.remove('hidden');
    };

    const handleAnswer = (isCorrect, challenge) => {
        const resultEl = document.getElementById('challenge-result');
        if (isCorrect) {
            resultEl.innerText = "ACCESS GRANTED. " + challenge.success;
            setTimeout(() => {
                challengeModal.classList.add('hidden');
                gameState.stage = challenge.nextStage;
                renderGameState();
            }, 1500);
        } else {
            resultEl.innerText = "ACCESS DENIED. Try Again.";
        }
    };

    const renderGameState = () => {
        typeWriter(dialogueText, dialogue[gameState.stage]);
        
        if (gameState.stage === 'start') {
            document.getElementById('usa').classList.add('active-mission');
        } else if (gameState.stage === 'unlockEurope') {
            document.getElementById('usa').classList.replace('active-mission', 'completed');
            document.getElementById('italy').classList.add('active-mission');
        } else if (gameState.stage === 'unlockIndia') {
            document.getElementById('italy').classList.replace('active-mission', 'completed');
            document.getElementById('india').classList.add('active-mission');
        } else if (gameState.stage === 'complete') {
            document.getElementById('india').classList.replace('active-mission', 'completed');
            intelDisplay.classList.add('hidden');
            codeSamples.classList.remove('hidden');
        }
    };
    
    // --- Event Listeners ---
    locations.forEach(loc => {
        loc.addEventListener('click', () => {
            if (loc.classList.contains('active-mission')) {
                showChallenge(loc.id);
            } else if (loc.classList.contains('completed')) {
                const intelTemplate = document.getElementById(`${loc.id}-intel`);
                document.getElementById('intel-title').innerText = `// REPLAY_INTEL: ${loc.dataset.location.toUpperCase()}`;
                document.getElementById('intel-content').innerHTML = intelTemplate.innerHTML;
                intelDisplay.classList.remove('hidden');
            }
        });
    });

    startMissionBtn.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        renderGameState();
    });
});
