import Game from "./Game.js";
import { loadAssets } from "./utils.js";
// Bonne pratique : avoir une fonction appelée une fois
// que la page est prête, que le DOM est chargé, etc.
window.onload = init;

async function init() {
    // On recupère le canvas
    let canvas = document.querySelector("#myCanvas");

    // Charger les assets avant d'initialiser le jeu
    await loadAssets();

    // On cree une instance du jeu
    let game = new Game(canvas);
    // ici on utilise await car la méthode init est asynchrone
    // typiquement dans init on charge des images, des sons, etc.
    await game.init();

    // on peut démarrer le jeu
    game.start();
}


