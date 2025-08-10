document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection ---
    const welcomeModal = document.getElementById('welcome-modal');
    const startMissionBtn = document.getElementById('start-mission-btn');
    const dialogueText = document.getElementById('dialogue-text');
    const challengeModal = document.getElementById('challenge-modal');
    const intelDisplay = document.getElementById('intel-display');
    const intelTitle = document.getElementById('intel-title');
    const intelContent = document.getElementById('intel-content');
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
    const showIntelForLocation = (locationId) => {
        const intelTemplate = document.getElementById(`${locationId}-intel`);
        const locationName = document.getElementById(locationId).dataset.location;

        if (intelTemplate) {
            const content = intelTemplate.content.cloneNode(true);
            intelTitle.textContent = `// INTEL_FEED: ${locationName.toUpperCase()}`;
            intelContent.innerHTML = '';
            intelContent.appendChild(content);
            intelDisplay.classList.remove('hidden');
            codeSamples.classList.add('hidden');
        }
    };

    const handleAnswer = (isCorrect, challenge, locationId) => {
        const resultEl = document.getElementById('challenge-result');
        if (isCorrect) {
            resultEl.innerText = "ACCESS GRANTED. " + challenge.success;
            setTimeout(() => {
                challengeModal.classList.add('hidden');
                
                // *** THE FIX: Show intel for the location you just unlocked ***
                showIntelForLocation(locationId);
                
                gameState.stage = challenge.nextStage;
                renderGameState();
            }, 1500);
        } else {
            resultEl.innerText = "ACCESS DENIED. Try Again.";
        }
    };

    const showChallenge = (locationId) => {
        const challenge = challenges[locationId];
        if (!challenge) return;
        document.getElementById('challenge-title').innerText = challenge.title;
        document.getElementById('challenge-question').innerText = challenge.question;
        const answersContainer = document.getElementById('challenge-answers');
        answersContainer.innerHTML = '';
        challenge.answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'glow-btn';
            btn.innerText = ans.text;
            btn.onclick = () => handleAnswer(ans.correct, challenge, locationId);
            answersContainer.appendChild(btn);
        });
        challengeModal.classList.remove('hidden');
    };

    const renderGameState = () => {
        typeWriter(dialogueText, dialogue[gameState.stage]);
        
        const missionOrder = ['usa', 'italy', 'india'];
        const currentMissionId = missionOrder.find(id => dialogue[gameState.stage].includes(challenges[id]?.success.split('...')[1] || dialogue.start.includes('US intel')));

        locations.forEach(loc => {
            loc.classList.remove('active-mission');
            if (loc.id === currentMissionId) {
                loc.classList.add('active-mission');
            }
        });

        if (gameState.stage === 'unlockEurope') document.getElementById('usa').classList.replace('locked', 'completed');
        if (gameState.stage === 'unlockIndia') document.getElementById('italy').classList.replace('locked', 'completed');
        if (gameState.stage === 'complete') {
            document.getElementById('india').classList.replace('locked', 'completed');
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
                showIntelForLocation(loc.id);
            }
        });
    });

    startMissionBtn.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        renderGameState();
    });

    const typeWriter = (element, text) => {
        let i = 0;
        element.innerHTML = '';
        const typing = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 25);
            }
        };
        typing();
    };
});
