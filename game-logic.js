document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection ---
    const welcomeModal = document.getElementById('welcome-modal');
    const startMissionBtn = document.getElementById('start-mission-btn');
    const dialogueText = document.getElementById('dialogue-text');
    const dataDisplay = document.getElementById('data-display');
    const intelTitle = document.getElementById('intel-title');
    const intelContent = document.getElementById('intel-content');
    const locations = document.querySelectorAll('.location');

    // --- Game State & Content ---
    const missionOrder = ['usa', 'italy', 'india'];
    let currentMissionIndex = 0;
    
    const missionDirectives = {
        'usa': "Directive Received: Access US Operations Intel.",
        'italy': "US Intel Acquired. New Directive: Access European Operations.",
        'india': "European Intel Acquired. Final Directive: Access Asian Operations.",
        'complete': "All Intel Acquired. Profile Assembly Complete. System Standing By."
    };

    // --- Game Functions ---
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

    const updateMissionTargets = () => {
        const currentMissionId = missionOrder[currentMissionIndex];
        locations.forEach(loc => {
            loc.classList.remove('active-mission');
            if (loc.id === currentMissionId) {
                loc.classList.add('active-mission');
            }
        });
    };

    const advanceMission = () => {
        const completedMissionId = missionOrder[currentMissionIndex];
        const completedLocation = document.getElementById(completedMissionId);
        if (completedLocation) {
            completedLocation.classList.remove('active-mission');
            completedLocation.classList.add('completed');
        }

        currentMissionIndex++;
        
        if (currentMissionIndex < missionOrder.length) {
            const nextMissionId = missionOrder[currentMissionIndex];
            typeWriter(dialogueText, missionDirectives[nextMissionId]);
            updateMissionTargets();
        } else {
            typeWriter(dialogueText, missionDirectives['complete']);
            dataDisplay.classList.add('hidden'); // Optionally hide intel after final mission
        }
    };

    // --- Event Listeners ---
    locations.forEach(location => {
        location.addEventListener('click', () => {
            const missionId = missionOrder[currentMissionIndex];
            // Only allow clicking on the active mission target
            if (location.id === missionId) {
                const locationName = location.getAttribute('data-location');
                const intelTemplate = document.getElementById(`${location.id}-intel`);
                
                if (intelTemplate) {
                    intelTitle.textContent = `// INTEL_FEED: ${locationName.toUpperCase()}`;
                    intelContent.innerHTML = intelTemplate.innerHTML;
                    dataDisplay.classList.remove('hidden');
                }
                advanceMission();
            }
        });
    });

    startMissionBtn.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        // Start the first mission
        typeWriter(dialogueText, missionDirectives[missionOrder[0]]);
        updateMissionTargets();
    });

    // --- Initial State ---
    // Game is started via the welcome modal button.
});
