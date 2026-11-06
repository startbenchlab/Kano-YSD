document.addEventListener('DOMContentLoaded', () => {
    const statusBoxes = document.querySelectorAll('.result');
    statusBoxes.forEach((box) => {
        if (box.classList.contains('valid')) {
            box.setAttribute('aria-live', 'polite');
        }
    });
});
