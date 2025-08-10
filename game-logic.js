document.addEventListener('DOMContentLoaded', () => {
    // --- Sound Asset Loading (Commented out to run without audio files) ---
    // const clickSound = new Audio('click.mp3');
    // const successSound = new Audio('success.mp3');
    // const errorSound = new Audio('error.mp3');
    
    // --- DOM Element Selection ---
    const dialogueText = document.getElementById('dialogue-text');
    const optionsContainer = document.getElementById('player-options-container');
    const challengeModal = document.getElementById('challenge-modal');
    const challengeTitle = document.getElementById('challenge-title');
    const challengeQuestion = document.getElementById('challenge-question');
    const challengeAnswers = document.getElementById('challenge-answers');
    const challengeResult = document.getElementById('challenge-result');

    // --- Treasure Hunt Stages & Challenges ---
    const dialogueTree = {
        start: {
            text: "Welcome, user. To assemble the candidate profile, you must solve a series of puzzles. Begin when ready.",
            options: [{ text: "Begin First Challenge", action: 'challenge', challengeId: 'gate_challenge' }]
        },
        projectsUnlocked: {
            text: "Mission Logs unlocked. A clue within these reports will grant you access to the Skill Matrix.",
            options: [{ text: "Begin Second Challenge", action: 'challenge', challengeId: 'project_clue' }]
        },
        skillsUnlocked: {
            text: "Skill Matrix unlocked. One final puzzle remains to acquire the full candidate dossier.",
            options: [{ text: "Begin Final Challenge", action: 'challenge', challengeId: 'skills_clue' }]
        },
        finalUnlock: {
            text: "TREASURE UNLOCKED. You have acquired all data fragments. The complete profile is assembled.",
            options: [{ text: "Access Dossier", action: 'show', target: 'contact-content' }]
        }
    };

    const challenges = {
        gate_challenge: {
            title: "ENTRY PROTOCOL",
            question: "Confirm your objective. Are you here to:",
            answers: [{ text: "Find a skilled candidate", correct: true }, { text: "Order a pizza", correct: false }],
            success: "Objective Confirmed. Accessing Mission Logs...",
            failure: "Invalid Objective. Try again.",
            target: 'projects-content',
            nextStage: 'projectsUnlocked'
        },
        project_clue: {
            title: "DATA FRAGMENT #1",
            question: "Analysis of the 'Automated Inventory' mission is required. Which ERP system was integrated?",
            answers: [{ text: "SAP", correct: false }, { text: "Odoo", correct: true }, { text: "Oracle", correct: false }],
            success: "Correct. Accessing Skill Matrix...",
            failure: "Incorrect Data. Review the Mission Logs.",
            target: 'skills-content',
            nextStage: 'skillsUnlocked'
        },
        skills_clue: {
            title: "DATA FRAGMENT #2",
            question: "The Skill Matrix indicates proficiency with a specific tool for major infrastructure projects. Identify it.",
            answers: [{ text: "Primavera P6", correct: true }, { text: "Trello", correct: false }, { text: "Asana", correct: false }],
            success: "Correct. Final data fragment acquired.",
            failure: "Incorrect Analysis. Review the Skill Matrix.",
            target: 'contact-content',
            nextStage: 'finalUnlock'
        }
    };

    // --- Core Game Functions ---
    const showSection = (sectionId) => {
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.remove('hidden-section');
            target.classList.add('unlocked-section');
        }
    };

    const handleChallenge = (challengeId) => {
        const challenge = challenges[challengeId];
        challengeTitle.innerText = challenge.title;
        challengeQuestion.innerText = challenge.question;
        challengeAnswers.innerHTML = '';
        challengeResult.innerText = '';
        challengeModal.classList.remove('hidden');

        challenge.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'glow-btn';
            button.innerText = answer.text;
            button.onclick = () => {
                // clickSound.play(); // Sound disabled
                if (answer.correct) {
                    // successSound.play(); // Sound disabled
                    challengeResult.innerText = challenge.success;
                    challengeResult.style.color = 'var(--success-glow)';
                    setTimeout(() => {
                        challengeModal.classList.add('hidden');
                        showSection(challenge.target);
                        renderDialogueNode(dialogueTree[challenge.nextStage]);
                    }, 1500);
                } else {
                    // errorSound.play(); // Sound disabled
                    challengeResult.innerText = challenge.failure;
                    challengeResult.style.color = 'var(--secondary-glow)';
                }
            };
            challengeAnswers.appendChild(button);
        });
    };

    const renderDialogueNode = (node) => {
        dialogueText.innerText = node.text;
        optionsContainer.innerHTML = '';
        node.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'glow-btn';
            button.innerText = option.text;
            button.addEventListener('click', () => {
                // clickSound.play(); // Sound disabled
                if (option.action === 'challenge') handleChallenge(option.challengeId);
                else if (option.action === 'show') showSection(option.target);
            });
            optionsContainer.appendChild(button);
        });
    };

    renderDialogueNode(dialogueTree.start);
});
