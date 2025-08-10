document.addEventListener('DOMContentLoaded', () => {

    // Initialize Typed.js for the "Class" text
    new Typed('#typed-class', {
      strings: [
        'Data Mage',
        'Project Paladin',
        'Automation Alchemist',
        'Cybersecurity Sentinel'
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 2000,
      loop: true
    });
    
    // --- Modal Handling Logic ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });
});
