document.addEventListener('DOMContentLoaded', () => {
    const darkModeState = localStorage.getItem('dark-mode');
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Set initial state from localStorage
    if (darkModeState === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Toggle dark mode and update localStorage
    darkModeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});
