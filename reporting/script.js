document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const taskWidget = document.getElementById('task-widget');

    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let table = `<table><tr>`;
    daysOfWeek.forEach(day => {
        table += `<th>${day}</th>`;
    });
    table += `</tr><tr>`;

    let dayOffset = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    for (let i = 0; i < dayOffset; i++) {
        table += `<td></td>`;
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        table += `<td data-date="${day}">${day}</td>`;
        if ((dayOffset + day) % 7 === 0) {
            table += `</tr><tr>`;
        }
    }

    table += `</tr></table>`;
    calendar.innerHTML = table;

    calendar.addEventListener('click', (event) => {
        if (event.target.tagName === 'TD' && event.target.dataset.date) {
            const selectedDate = event.target.dataset.date;
            updateTasks(selectedDate);
        }
    });

    function updateTasks(date) {
        const tasks = {
            '4': `## Matin : 9h-12h30
- Réflexion projet

## Après-midi : 13h30-17h`,
        };

        const taskMarkdown = tasks[date] || `## Aucune tâche`;

        // Conversion du Markdown en HTML
        const taskHTML = marked(taskMarkdown);

        // Mise à jour du widget avec le HTML généré
        taskWidget.innerHTML = taskHTML;
        taskWidget.classList.add('fade-in');
        setTimeout(() => {
            taskWidget.classList.remove('fade-in');
        }, 300);
    }

    updateTasks(today.getDate());
});
