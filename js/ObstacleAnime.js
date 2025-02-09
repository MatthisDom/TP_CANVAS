import ObjectGraphique from "./ObjectGraphique.js";

export default class ObstacleAnime extends ObjectGraphique {
    constructor(x, y, w, h, couleur, destinationX, destinationY, speed) {
        super(x, y, w, h, couleur);
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.speed = speed;
        this.vitesseX = speed;
        this.vitesseY = speed;
        this.sprite = new Image();
        this.sprite.src = '/assets/images/meteor.png';
        this.sprite.onload = () => {
            this.pattern = null;
        };
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.sprite, 0, 0, this.w, this.h);
        ctx.restore();
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}