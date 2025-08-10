document.addEventListener('DOMContentLoaded', () => {
    // --- Sound Asset Loading ---
    // IMPORTANT: Replace these filenames with your actual sound files.
    const clickSound = new Audio('click.mp3');
    const successSound = new Audio('success.mp3');
    const errorSound = new Audio('error.mp3');
    
    // --- DOM Element Selection ---
    const dialogueTextElement = document.getElementById('dialogue-text');
    const optionsContainer = document.getElementById('player-options-container');
    const challengeModal = document.getElementById('challenge-modal');
    const challengeQuestion = document.getElementById('challenge-question');
    const challengeAnswers = document.getElementById('challenge-answers');
    const challengeResult = document.getElementById('challenge-result');

    // --- Game Content Definitions ---
    const dialogueTree = {
        start: {
            text: "SYSTEM BOOT... Welcome, user. My prime directive is to present the profile of Sai Yalamanchili. Please select a data packet to access.",
            options: [
                { text: "Access Skill Matrix [LOCKED]", action: 'challenge', challengeId: 'cybersecurity_q' },
                { text: "Review Mission Logs", action: 'show', target: 'projects-content' },
                { text: "Open Secure Comms", action: 'show', target: 'contact-content' },
            ]
        }
    };

    const challenges = {
        cybersecurity_q: {
            question: "To verify clearance, please identify the primary function of a network firewall:",
            answers: [
                { text: "Accelerate network traffic", correct: false },
                { text: "Block unauthorized access", correct: true },
                { text: "Archive old data packets", correct: false }
            ],
            success: "ACCESS GRANTED. Displaying Skill Matrix...",
            failure: "ACCESS DENIED. Incorrect credentials.",
            target: 'skills-content'
        }
    };

    // --- Core Game Functions ---
    function showSection(sectionId) {
        document.querySelectorAll('.content-window').forEach(section => {
            if (section.id !== sectionId) {
                section.classList.add('hidden-section');
                section.classList.remove('unlocked-section');
            }
        });
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.remove('hidden-section');
            target.classList.add('unlocked-section');
        }
    }

    function handleChallenge(challengeId) {
        const challenge = challenges[challengeId];
        challengeQuestion.innerText = challenge.question;
        challengeAnswers.innerHTML = '';
        challengeResult.innerText = '';
        challengeModal.classList.remove('hidden');

        challenge.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'glow-btn';
            button.innerText = answer.text;
            button.onclick = () => {
                clickSound.play();
                if (answer.correct) {
                    successSound.play();
                    challengeResult.innerText = challenge.success;
                    challengeResult.style.color = 'var(--primary-glow)';
                    setTimeout(() => {
                        challengeModal.classList.add('hidden');
                        showSection(challenge.target);
                    }, 1500);
                } else {
                    errorSound.play();
                    challengeResult.innerText = challenge.failure;
                    challengeResult.style.color = 'var(--secondary-glow)';
                }
            };
            challengeAnswers.appendChild(button);
        });
    }

    function renderDialogueNode(node) {
        dialogueTextElement.innerText = node.text;
        optionsContainer.innerHTML = '';
        node.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'glow-btn';
            button.innerText = option.text;
            button.addEventListener('click', () => {
                clickSound.play();
                if (option.action === 'show') {
                    showSection(option.target);
                } else if (option.action === 'challenge') {
                    handleChallenge(option.challengeId);
                }
            });
            optionsContainer.appendChild(button);
        });
    }

    // --- Start The Game ---
    renderDialogueNode(dialogueTree.start);
});
