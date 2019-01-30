import { Vector } from "./vector";
import { GameObject } from "./gameObject";
import { GameEngine } from "./index";

export class Player implements GameObject
{   
    public position:Vector 
    private gameEngine:GameEngine;

    private speed:number = 200;
    public height:number = 10;
    public width:number = 30;
    public score : number = 0;

    public keyLeft : boolean;
    public keyRight : boolean;

    constructor(position:Vector, gameEngine:GameEngine)
    {
        this.position = position;
        this.gameEngine = gameEngine;
    }

    update(time: number): void {
        if (this.keyRight)
        {
            //move down
            this.position.x += time/1000 * this.speed 
        }
        if (this.keyLeft)
        {
            //move up
            this.position.x -= time/1000 * this.speed
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    onColliosion(other: GameObject): void {
        // not doing anything at the moment...
    }
}