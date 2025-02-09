import ObjectGraphique from "./ObjectGraphique.js";

export default class Obstacle extends ObjectGraphique {
    constructor(x, y, w, h, couleur) {
        super(x, y, w, h, couleur);
        this.sprite = new Image();
        this.sprite.src = '/assets/images/mur.png';
        this.sprite.onload = () => {
            this.pattern = null;
        };
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.sprite.complete && !this.pattern)
        {
            this.pattern = ctx.createPattern(this.sprite, 'repeat');
        }

        if(this.pattern) 
        {
            ctx.fillStyle = this.pattern;
            ctx.fillRect(0, 0, this.w, this.h);
        } 
        else 
        {
            ctx.fillStyle = this.couleur;
            ctx.fillRect(0, 0, this.w, this.h);
        }

        ctx.restore();
    }
}