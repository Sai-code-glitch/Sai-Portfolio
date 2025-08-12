document.addEventListener('DOMContentLoaded', () => {
    const welcomeModal = document.getElementById('welcome-modal');
    const startMissionBtn = document.getElementById('start-mission-btn');
    const dialogueText = document.getElementById('dialogue-text');
    const dataDisplay = document.getElementById('data-display');
    const intelTitle = document.getElementById('intel-title');
    const intelContent = document.getElementById('intel-content');
    const locations = document.querySelectorAll('.location');
    const projectModal = document.getElementById('project-modal');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectModalContent = document.getElementById('project-modal-content');
    const closeProjectModalBtn = document.getElementById('close-project-modal-btn');

    startMissionBtn.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
    });

    locations.forEach(location => {
        location.addEventListener('click', () => {
            const intelTemplate = document.getElementById(`${location.id}-intel`);
            
            if (intelTemplate) {
                const content = intelTemplate.content.cloneNode(true);
                intelTitle.textContent = `// INTEL_FEED: ${location.id.toUpperCase()}`;
                intelContent.innerHTML = '';
                intelContent.appendChild(content);
                dataDisplay.classList.remove('hidden');
            }
        });
    });

    document.body.addEventListener('click', event => {
        if (event.target.classList.contains('project-trigger')) {
            const projectDetailsContainer = event.target.nextElementSibling;
            if (projectDetailsContainer) {
                const titleText = event.target.closest('.intel-card').querySelector('h3').textContent;
                projectModalTitle.textContent = `// ${titleText}`;
                projectModalContent.innerHTML = projectDetailsContainer.innerHTML;
                projectModal.classList.remove('hidden');
            }
        }
    });

    closeProjectModalBtn.addEventListener('click', () => {
        projectModal.classList.add('hidden');
    });
});
