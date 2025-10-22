document.addEventListener('DOMContentLoaded', function () {
    const clock = document.getElementById('clock');
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function startClock() {
        
        while (true) {
            let date = new Date();
            clock.innerHTML = date.toLocaleTimeString();

            await delay(1000);
        }
    }

    startClock();
});