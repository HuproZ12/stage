document.addEventListener('DOMContentLoaded', () => {
    const taskWidget = document.getElementById('task-widget');
    const taskContent = document.getElementById('task-content');
    const backButton = document.getElementById('back-button');

    const contentMarkdown = `
# Mod Minecraft : Pistolet-Laser

---

### Objectif
Développer un mod Minecraft afin d'ajouter un nouvel item dans le jeu, qui représentera le célèbre Pistolet-Laser de Call of Duty :
![](./raygun.jpg)

---

Environnement : loader Forge

### Modèle 3D

Utilisation de sites comme [Sketchfab](https://sketchfab.com/feed), qui sont de larges banques de modèles en tous genres, afin de dénicher [la perle rare](https://sketchfab.com/3d-models/cod-zombies-raygun-b60c104ceded451b9b1a0d31a3e731b3) :
![Exemple d'image](./sf.jpg)

Il aura fallu s'adapter à quelques contraintes :
- formats des modèles donnés (conversion .blend en .obj par ex)
- licences d'utilisation
- limites d'utilisation (trop de détails dans le modèle = problèmes survenants après ...)

### Voxelization

L'étape qui consiste à "convertir" le modèle 3D en un modèle plus cubique :
![](./voxel.jpg)

Utilisation de ce [Online Voxelizer](https://drububu.com/miscellaneous/voxelizer/?out=obj). Il aura fallu jouer avec différents paramètres afin d'avoir le plus de détails dans la limite du possible. Exportation en .vox pour ensuite être utilisé dans Blockbench.

### Blockbench

Le dernier intermédiaire avant de plonger un peu plus dans le code. C'est un soft qui m'a permis d'ajouter une texture au modèle :
![](./1.jpg)

Mais aussi de visualiser (et de fixer) le positionnement du modèle en jeu.
![](./bb.jpg)

Une fois terminé, export en .obj, type d'asset exploitable par le mod.

### Finalisation

Injection des assets dans le projet du mod. Enregistrement d'un nouvel item auquel on viendra rattacher nos assets, eeeeeeet ...

![](./2.jpg)
![](./3.jpg)

Tadaaaaaaa !
    `;

    const contentHTML = marked(contentMarkdown);

    taskContent.innerHTML = contentHTML;
    taskWidget.classList.add('fade-in');
    setTimeout(() => {
        taskWidget.classList.remove('fade-in');
    }, 300);

    backButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});
