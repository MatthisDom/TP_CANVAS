import ObjectGraphique from "./ObjectGraphique.js";

export default class ExitPortal extends ObjectGraphique {
    constructor(x, y, w, h, couleur) {
        super(x, y, w, h, couleur);
        this.sprite = new Image();
        this.sprite.src = '/assets/images/exit.gif';
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.translate(-this.w / 2, -this.h / 2);
        ctx.drawImage(this.sprite, 0, 0, this.w, this.h);
        ctx.restore();
    }
}