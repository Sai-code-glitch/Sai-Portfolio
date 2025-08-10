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
            const locationId = hotspot.id;
            const locationName = hotspot.getAttribute('data-location');
            const intelTemplate = document.getElementById(`${locationId}-intel`);

            // Update the status panel on the left
            statusText.textContent = "Analyzing Data...";
            locationText.textContent = locationName;

            // De-activate all other hotspots and activate the current one
            locationHotspots.forEach(p => p.classList.remove('active'));
            hotspot.classList.add('active');
            
            // **-- THE FIX IS HERE --**
            if (intelTemplate) {
                // Update the title of the data display
                intelTitle.textContent = `// INTEL_FEED: ${locationName.toUpperCase()}`;
                
                // 1. Properly clone the content from the <template>
                const contentToDisplay = intelTemplate.content.cloneNode(true);
                
                // 2. Clear any previous content
                intelContent.innerHTML = ''; 
                
                // 3. Append the new, complete content
                intelContent.appendChild(contentToDisplay);
                
                // 4. Show the data display panel
                dataDisplay.classList.remove('hidden');
            }

            // Reset the status text after a short delay
            setTimeout(() => {
                statusText.textContent = "Awaiting Directives";
            }, 1000);
        });
    });
});
