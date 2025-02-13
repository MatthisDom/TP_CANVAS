import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import ObjetSouris from "./ObjetSouris.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import ExitPortal from "./ExitPortal.js";
import ObstacleAnime from "./ObstacleAnime.js";
import { getRandomInt } from "./utils.js";

export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(150, 100);
        this.objetsGraphiques.push(this.player);
        this.level = 0;
        // Un objert qui suite la souris, juste pour tester
        
        this.nextLevel(this.level)
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");
        this.previousTime = performance.now();
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop(currentTime) {
        let delta = (currentTime - this.previousTime) /100; 
        this.previousTime = currentTime;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAllObjects();
        this.update(delta);

        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update(delta) {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        
        // Déplacement du joueur. 
        this.movePlayer(delta);

        // on met à jour la position de objetSouris avec la position de la souris
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;

        // On regarde si le joueur a atteint la sortie
        // TODO

        // Update the position of moving obstacles and make them bounce
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof ObstacleAnime) {
                obj.move(delta);
                this.bounceOffEdges(obj);
            }
        });

    }
    nextLevel(previous_level) {
        this.objetsGraphiques = [];
        this.player.x = 150;
        this.player.y = 100;
        this.objetsGraphiques.push(this.player);
        this.objetSouris = new ObjetSouris(200, 200, 25, 25, "#320082");
        this.objetsGraphiques.push(this.objetSouris);
        this.previous_level = previous_level + 1;
        
        var exit_portal;
        switch (this.previous_level)
        {
            case 1:
                this.objetsGraphiques.push(new ObstacleAnime(500, 200, 40, 40, "red", 0, 0, -1));
                this.objetsGraphiques.push(new ObstacleAnime(200, 200, 40, 40, "red", 0, 500, 1));
                exit_portal = new ExitPortal(700, 100, 100, 100, "white");
                this.objetsGraphiques.push(exit_portal);
            break;
            case 2:
                this.objetsGraphiques.push(new Obstacle(200, 150, 40, 500, "blue"));
                this.objetsGraphiques.push(new Obstacle(450, 0, 40, 300, "blue"));
                this.objetsGraphiques.push(new ObstacleAnime(200, 200, 60, 60, "red", 0, 500, 1.5));
                this.objetsGraphiques.push(new ObstacleAnime(400, 450, 20, 20, "red", 100, 100, -2.5));
                exit_portal = new ExitPortal(700, 100, 100, 100, "white");
                this.objetsGraphiques.push(exit_portal);
            break;
            case 3:
                this.objetsGraphiques.push(new Obstacle(100, 0, 40, 400, "blue"));
                this.objetsGraphiques.push(new Obstacle(300, 150, 40, 500, "blue"));
                this.objetsGraphiques.push(new Obstacle(500, 0, 40, 400, "blue"));
                this.objetsGraphiques.push(new Obstacle(700, 150, 40, 500, "blue"));
                this.objetsGraphiques.push(new ObstacleAnime(300, 300, 50, 50, "yellow", 600, 600, 3));
                this.objetsGraphiques.push(new ObstacleAnime(430, 50, 50, 50, "red", 100, 100, -4.5));
                this.objetsGraphiques.push(new ObstacleAnime(200, 450, 20, 20, "red", 100, 100, 2.5));
                exit_portal = new ExitPortal(700, 100, 100, 100, "white");
                this.objetsGraphiques.push(exit_portal);
            break;
            case 4:
                this.objetsGraphiques.push(new Obstacle(100, 100, 800, 40, "blue"));
                this.objetsGraphiques.push(new Obstacle(100, 200, 800, 40, "blue"));
                this.objetsGraphiques.push(new ObstacleAnime(300, 300, 50, 50, "yellow", 600, 600, 3));
                this.objetsGraphiques.push(new ObstacleAnime(getRandomInt(100, 700), getRandomInt(100, 500), 40, 40, "green", 200, 200, getRandomInt(1, 5)));
                this.objetsGraphiques.push(new ObstacleAnime(getRandomInt(100, 700), getRandomInt(100, 500), 50, 50, "purple", 300, 300, getRandomInt(1, 4)));
                this.objetsGraphiques.push(new ObstacleAnime(200, 450, 40, 40, "red", 100, 100, 2.5));
                exit_portal = new ExitPortal(700, 170, 100, 50, "white");
                this.objetsGraphiques.push(exit_portal);
            break;
            case 5:
                let obstacle1 = new Obstacle(300, 0, 40, 300, "red");
                let obstacle2 = new Obstacle(400, 260,40,100, "red" );
                let obstacle3 = new Obstacle(300, 400, 40, 100, "red");
                let obstacle4 = new Obstacle(0, 150, 200, 40, "red");
                let obstacle5 = new Obstacle(200, 260, 100, 40, "red");
                let obstacle6 = new Obstacle(600, 150, 40, 310, "red");
                let obstacle7 = new Obstacle(600,150, 200, 40, "red");
                let obstacle8 = new Obstacle(440,150, 300, 40, "red" )
        
                this.objetsGraphiques.push(obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8);        
                exit_portal = new ExitPortal(700, 100, 100, 100, "white");
                this.objetsGraphiques.push(exit_portal);
                let obstacleAnime1 = new ObstacleAnime(300, 100, 40, 40, "red", 500, 500, 1);
                let obstacleAnime2 = new ObstacleAnime(getRandomInt(170, 500), getRandomInt(200,500), 40, 40, "blue", 0, 500, getRandomInt(1,10));
                let obstacleAnime3 = new ObstacleAnime(getRandomInt(400,800), getRandomInt(400,400), 50, 50,"yellow",500,500,getRandomInt(1,4))
                this.objetsGraphiques.push(obstacleAnime1, obstacleAnime2, obstacleAnime3);

            break;
            default:
                alert("Bien joué à toi tu as completer tout les niveaux !");
                window.location.reload();
                break;
        }


    }

    movePlayer(delta)
    {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        if(this.inputStates.ArrowRight)
        {
            this.player.vitesseX = 1;
        } 
        if(this.inputStates.ArrowLeft)
        {
            this.player.vitesseX = -1;
        } 

        if(this.inputStates.ArrowUp) 
        {
            this.player.vitesseY = -1;
        } 

        if(this.inputStates.ArrowDown)
        {
            this.player.vitesseY = 1;
        } 

        this.player.move(delta);

        this.bounceOffEdges(this.player);
        this.testCollisionsPlayer();
    }

    bounceOffEdges(obj) {
        if (obj.x - obj.w / 2 < 0 || obj.x + obj.w / 2 > this.canvas.width) {
            obj.vitesseX = -obj.vitesseX;
        }
        if (obj.y - obj.h / 2 < 0 || obj.y + obj.h / 2 > this.canvas.height) {
            obj.vitesseY = -obj.vitesseY;
        }
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();
        this.testCollisionPlayerObstacles();
        this.testCollisionPlayerObstaclesAnimes();
        this.testCollisionPlayerExit();
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/2 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w/2;
        }
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Obstacle) {
                if (rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // Determine the side of collision and adjust player's position
                    let playerLeft = this.player.x - this.player.w / 2;
                    let playerRight = this.player.x + this.player.w / 2;
                    let playerTop = this.player.y - this.player.h / 2;
                    let playerBottom = this.player.y + this.player.h / 2;

                    let objLeft = obj.x;
                    let objRight = obj.x + obj.w;
                    let objTop = obj.y;
                    let objBottom = obj.y + obj.h;

                    let overlapX = Math.min(playerRight, objRight) - Math.max(playerLeft, objLeft);
                    let overlapY = Math.min(playerBottom, objBottom) - Math.max(playerTop, objTop);

                    if (overlapX < overlapY) {
                        if (playerLeft < objLeft) {
                            this.player.x = objLeft - this.player.w / 2;
                        } else {
                            this.player.x = objRight + this.player.w / 2;
                        }
                        this.player.vitesseX = 0;
                    } else {
                        if (playerTop < objTop) {
                            this.player.y = objTop - this.player.h / 2;
                        } else {
                            this.player.y = objBottom + this.player.h / 2;
                        }
                        this.player.vitesseY = 0;
                    }
                }
            }
        });
    }

    testCollisionPlayerObstaclesAnimes() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof ObstacleAnime) {
                if (rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // Determine the side of collision and adjust player's position
                    if (this.player.x < obj.x) {
                        // Collision on the left side
                        this.player.x = obj.x - this.player.w / 2;
                    } else if (this.player.x > obj.x + obj.w) {
                        // Collision on the right side
                        this.player.x = obj.x + obj.w + this.player.w / 2;
                    } else if (this.player.y < obj.y) {
                        // Collision on the top side
                        this.player.y = obj.y - this.player.h / 2;
                    } else if (this.player.y > obj.y + obj.h) {
                        // Collision on the bottom side
                        this.player.y = obj.y + obj.h + this.player.h / 2;
                    }

                    // Stop the player's movement
                    this.player.x = 150;
                    this.player.y = 100;
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;
                    this.player.life -= 1;
                    this.updateHearts();

                    if(this.player.life == 0)
                    {
                        this.gameover(); 
                    }
                }
            }
        });
    }

    testCollisionPlayerExit() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof ExitPortal)
            {
                if (rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    this.player.x = 10;
                    this.player.y = 10;
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;

                    this.inputStates.ArrowRight = false;
                    this.inputStates.ArrowLeft = false;
                    this.inputStates.ArrowUp = false;
                    this.inputStates.ArrowDown = false;
                    this.nextLevel(this.previous_level)
                }
            }
        });
    }

    gameover()
    {
        alert("Vous n'avez plus de vie, vous avez perdu !");
        this.inputStates.ArrowRight = false;
        this.inputStates.ArrowLeft = false;
        this.inputStates.ArrowUp = false;
        this.inputStates.ArrowDown = false;
        window.location.reload();
    }

    updateHearts() {
        for (let i = 1; i <= 3; i++) {
            const heart = document.getElementById(`heart${i}`);
            if (i <= this.player.life) {
                heart.classList.remove('heart-empty');
                heart.classList.add('heart');
            } else {
                heart.classList.remove('heart');
                heart.classList.add('heart-empty');
            }
        }
    }
    
}