import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";   

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 95, 40);
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.couleur = "pink";
        this.angle = 0;
        this.sprite = new Image();
        this.sprite.src = '/assets/images/sprite.png';
        this.life = 3;
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.w / 2, -this.h / 2);
        ctx.drawImage(this.sprite, 0, 0, this.w, this.h);
        ctx.restore();

        super.draw(ctx);
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}