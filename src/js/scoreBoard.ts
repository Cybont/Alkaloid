import { GameObject } from "./gameObject";
import { Vector } from "./vector";
import { GameEngine } from "./index";
import { Player } from "./player";

 export class Scoreboard implements GameObject {
    height: number = 50;
    width: number = 200;

    position : Vector;
    gameEngine : GameEngine;
    player : Player;

    constructor(position: Vector, gameEngine : GameEngine, player : Player){
        this.position = position;
        this.gameEngine = gameEngine;
        this.player = player;
    }
    onColliosion(other: GameObject): void {
        
    }
    update(time: number): void {
        
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillText("Score: " + this.player.score, this.position.x, this.position.y);
    }
 }