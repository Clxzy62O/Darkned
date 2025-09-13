document.addEventListener("DOMContentLoaded", () => {
    const countdownEl = document.getElementById("countdown");
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() + 7); // Coming in 7 days

    function updateCountdown() {
        const now = new Date();
        const diff = releaseDate - now;
        if (diff <= 0) {
            countdownEl.textContent = "🚀 Launched!";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
