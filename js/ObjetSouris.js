import ObjectGraphique from "./ObjectGraphique.js";

export default class ObjetSouris extends ObjectGraphique {
    constructor(x, y, w, h, couleur) {
        super(x, y, w, h, couleur);
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.lineWidth = 2; // Set the line width to make it thicker
        ctx.beginPath();
        ctx.moveTo(this.x + this.w / 2, this.y);
        ctx.lineTo(this.x + this.w / 2, this.y + this.h);
        ctx.moveTo(this.x, this.y + this.h / 2);
        ctx.lineTo(this.x + this.w, this.y + this.h / 2);
        ctx.stroke();
        ctx.restore();
    }
}   