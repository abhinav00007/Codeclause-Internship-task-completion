document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    if (eventName && eventDate) {
        addEvent(eventName, eventDate);
    }
});

function addEvent(name, date) {
    const eventsContainer = document.getElementById('events');
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    
    eventElement.innerHTML = `
        <div class="event-name">${name}</div>
        <div id="countdown-${name}" class="countdown">
            <div class="time">
                <span id="days-${name}"></span> Days
            </div>
            <div class="time">
                <span id="hours-${name}"></span> Hours
            </div>
            <div class="time">
                <span id="minutes-${name}"></span> Minutes
            </div>
            <div class="time">
                <span id="seconds-${name}"></span> Seconds
            </div>
        </div>
    `;

    eventsContainer.appendChild(eventElement);

    const targetDate = new Date(date).getTime();
    const intervalId = setInterval(() => updateCountdown(name, targetDate, intervalId), 1000);
}

function updateCountdown(name, targetDate, intervalId) {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById(`days-${name}`).innerText = days;
    document.getElementById(`hours-${name}`).innerText = hours;
    document.getElementById(`minutes-${name}`).innerText = minutes;
    document.getElementById(`seconds-${name}`).innerText = seconds;

    if (timeLeft < 0) {
        clearInterval(intervalId);
        document.getElementById(`countdown-${name}`).innerHTML = 'The event has started!';
    }
}
