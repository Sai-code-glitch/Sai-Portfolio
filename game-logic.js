document.addEventListener('DOMContentLoaded', () => {
    const dialogueTextElement = document.getElementById('dialogue-text');
    const optionsContainer = document.getElementById('player-options-container');

    // This object defines the entire conversation and the tasks.
    const dialogueTree = {
        start: {
            text: "Welcome, brave recruiter! I am Sai, your guide. To proceed, please accept a task.",
            options: [
                { text: "Task: Analyze Skills", action: 'show', target: 'skills-content' },
                { text: "Task: Review Quest Log", action: 'show', target: 'projects-content' },
                { text: "Task: Open Communications", action: 'show', target: 'contact-content' },
            ]
        }
    };

    // This function handles showing and hiding the content sections.
    function showSection(sectionId) {
        // Hide all unlocked sections first
        document.querySelectorAll('.unlocked-section').forEach(section => {
            section.classList.remove('unlocked-section');
            section.classList.add('hidden-section');
        });

        // Show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden-section');
            targetSection.classList.add('unlocked-section');
        }
    }

    // This function updates the dialogue box and the player's options.
    function renderDialogueNode(node) {
        // Typing effect for dialogue
        let i = 0;
        dialogueTextElement.innerHTML = '';
        function typeWriter() {
            if (i < node.text.length) {
                dialogueTextElement.innerHTML += node.text.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Adjust typing speed here
            }
        }
        typeWriter();

        optionsContainer.innerHTML = ''; // Clear previous options

        node.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'nes-btn';
            button.innerText = option.text;
            
            button.addEventListener('click', () => {
                if (option.action === 'show') {
                    showSection(option.target);
                }
            });

            optionsContainer.appendChild(button);
        });
    }

    // --- Start The Game ---
    renderDialogueNode(dialogueTree.start);
});
