document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const taskWidget = document.getElementById('task-widget');
    const taskContent = document.getElementById('task-content');
    const selectedDateElement = document.getElementById('selected-date');
    const backButton = document.getElementById('back-button');

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

    backButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    function updateTasks(date) {
        const tasks = {
            '4': `## Matin : 9h-12h30
- Réflexion projet

## Après-midi : 13h30-17h
- Révisions sur la stylisation manuelle, avec un petit projet de [calculatrice](../calcul/index.html)`,
            '5': `## Matin : 9h-12h30
- Ajout de la logique sur le projet de la [calculatrice](../calcul/index.html)

## Après-midi : 13h30-17h
- Apprentissage Blender/GIMP, avec pour objectif de se familiariser avec la modélisation/manipulation d'image.Pour l'instant dans un objectif de modding Minecraft`,
            '6': `## Matin : 9h-12h30
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi

## Après-midi : 13h30-17h
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi`,
            '7': `## Matin : 9h-12h30
- Reflexion sur la forme du reporting de stage

## Après-midi : 13h30-17h
- Commencement de la construction de cette GitHub Page, qui servira de portfolio/reporting pour la période de stage`,
            '8': `## Matin : 9h-12h30
- Peaufinement de la GitHub Page :
    - index
    - navigation, connexions
    - reporting :
        - calendrier
        - historique des tâches

## Après-midi : 13h30-17h
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi`,
            '12': `## Matin : 9h-12h30
- Travail sur le projet de [mod Minecraft](../laser/index.html)

## Après-midi : 13h30-17h
- Travail sur le projet de [mod Minecraft](../laser/index.html)`,
            '13': `## Matin : 9h-12h30
- Travail sur le projet de [mod Minecraft](../laser/index.html)

## Après-midi : 13h30-17h
- Travail sur le projet de [mod Minecraft](../laser/index.html)`,
            '14': `## Matin : 9h-12h30
- Travail sur le projet de [mod Minecraft](../laser/index.html)

## Après-midi : 13h30-17h
- Travail sur le projet de [mod Minecraft](../laser/index.html)`,
            '15': `## Matin : 9h-12h30
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi

## Après-midi : 13h30-17h
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi`,
            '18': `## Matin : 9h-12h30
- Travail sur le [jeu des pairs](../pairs/index.html)

## Après-midi : 13h30-17h
- Travail sur le [jeu des pairs](../pairs/index.html)`,
            '19': `## Matin : 9h-12h30
- Travail sur le [jeu des pairs](../pairs/index.html)

## Après-midi : 13h30-17h
- Travail sur le [jeu des pairs](../pairs/index.html)`,
            '20': `## Matin : 9h-12h30
- Travail sur le [Snake](../snake/index.html)

## Après-midi : 13h30-17h
- Travail sur le [Snake](../snake/index.html)`,
            '21': `## Matin : 9h-12h30
- Travail sur le [Snake](../snake/index.html)

## Après-midi : 13h30-17h
- Travail sur le [Snake](../snake/index.html)`,
            '22': `## Matin : 9h-12h30
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi

## Après-midi : 13h30-17h
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi`,
            '25': `## Matin : 9h-12h30
- Travail sur le [2048](../deuxmil/index.html)

## Après-midi : 13h30-17h
- Travail sur le [2048](../deuxmil/index.html)`,
            '26': `## Matin : 9h-12h30
- Travail sur le [2048](../deuxmil/index.html)

## Après-midi : 13h30-17h
- Travail sur le [démineur](../demineur/index.html)`,
            '27': `## Matin : 9h-12h30
- Travail sur le [démineur](../demineur/index.html)

## Après-midi : 13h30-17h
- Travail sur le [démineur](../demineur/index.html)`,
            '28': `## Matin : 9h-12h30
- Travail sur le [démineur](../demineur/index.html)

## Après-midi : 13h30-17h
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi`,
            '29': `## Matin : 9h-12h30
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi

## Après-midi : 13h30-17h
- [Recherche](https://1drv.ms/x/c/b2c781cd25a62a9c/Ef6sVK0IPWFJnIgmviU7zJ0BFBIcSfTW-QedKNZyXlSzCg?e=Ihho6E) d'emploi`,
        };

        const taskMarkdown = tasks[date] || `## Aucune tâche`;

        const taskHTML = marked(taskMarkdown);

        taskContent.innerHTML = taskHTML;
        selectedDateElement.textContent = `${date} novembre 2024`;
        taskWidget.classList.add('fade-in');
        setTimeout(() => {
            taskWidget.classList.remove('fade-in');
        }, 300);
    }

    updateTasks(today.getDate());
});
