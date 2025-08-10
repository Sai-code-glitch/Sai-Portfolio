document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection ---
    const locationHotspots = document.querySelectorAll('.location');
    const statusText = document.getElementById('status-text');
    const locationText = document.getElementById('location-text');
    const dataDisplay = document.getElementById('data-display');
    const intelTitle = document.getElementById('intel-title');
    const intelContent = document.getElementById('intel-content');

    // --- Event Listener for all Hotspots ---
    locationHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            // Get data from the clicked hotspot
            const locationId = hotspot.id;
            const locationName = hotspot.getAttribute('data-location');
            const intelTemplate = document.getElementById(`${locationId}-intel`);

            // Update the status panel on the left
            statusText.textContent = "Analyzing Data...";
            locationText.textContent = locationName;

            // De-activate all other hotspots
            locationHotspots.forEach(p => p.classList.remove('active'));
            // Activate the currently clicked hotspot
            hotspot.classList.add('active');
            
            // Check if there is intel content to display
            if (intelTemplate) {
                // Update the title of the data display
                intelTitle.textContent = `// INTEL_FEED: ${locationName.toUpperCase()}`;
                
                // Set the content from the template
                intelContent.innerHTML = intelTemplate.innerHTML;
                
                // Show the data display panel
                dataDisplay.classList.remove('hidden');
            }

            // Reset the status text after a short delay
            setTimeout(() => {
                statusText.textContent = "Awaiting Directives";
            }, 1000);
        });
    });
});
