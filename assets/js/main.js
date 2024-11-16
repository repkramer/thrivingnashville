// Tab Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // Update active nav link
        document.querySelector('.nav-link.active')?.classList.remove('active');
        link.classList.add('active');

        // Show corresponding section
        const sectionId = link.dataset.section;
        document.querySelector('.content-section.active')?.classList.remove('active');
        document.getElementById(sectionId).classList.add('active');

        // Initialize map if neighborhood explorer is selected
        if (sectionId === 'explorer') {
            initMap();
        }
    });
});

// Initialize Map
function initMap() {
    // Check if map is already initialized
    if (window.map) return;

    // Nashville coordinates
    const nashville = [36.1627, -86.7816];
    
    // Initialize map
    window.map = L.map('map').setView(nashville, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(window.map);

    // Add some sample markers
    const markers = [
        { pos: [36.1627, -86.7816], title: "Downtown Nashville" },
        { pos: [36.1866, -86.7852], title: "Germantown" },
        { pos: [36.1774, -86.7674], title: "East Nashville" }
    ];

    markers.forEach(marker => {
        L.marker(marker.pos)
            .bindPopup(marker.title)
            .addTo(window.map);
    });
}

// Set initial active section
document.querySelector('.nav-link[data-section="wellbeing"]').classList.add('active');
