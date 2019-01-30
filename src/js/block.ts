import { GameObject } from "./gameObject";
import { Vector } from "./vector";
import { GameEngine } from "./index";

export class Block implements GameObject {
    public position: Vector;
    public height: number = 8;
    public width: number = 20;
    public blockType: string;
    public hp : number;
    public gameEngine: GameEngine;
    public exists : boolean = true;

    constructor(position : Vector, gameEngine : GameEngine, blockType : string){
        this.position = position;
        this.gameEngine = gameEngine;
        this.blockType = blockType;

        switch (blockType) {
            case "Armored":
                this.hp = 2;
                break;
            case "Obsidian":
                this.hp = 3;
                break;
            default:
                this.hp = 1;
                break;
        }
    }

    onColliosion(other: GameObject): void {
        if(this.exists){
            this.gameEngine.ball.direction.y *= -1;
            this.gameEngine.player1.score++;
        }
        if(other == this.gameEngine.ball){
            this.hp--;
            if(this.hp <= 0){
                this.exists = false;
            }
        }
    }
    update(time: number): void {
    }
    draw(ctx: CanvasRenderingContext2D): void {
        if (this.exists){  
            if (this.hp == 1){
                ctx.fillStyle = "#99ccff";          
            }      
            else if (this.hp == 2){
                ctx.fillStyle = "#4da3ff";          
            }      
            else if (this.hp == 3){
                ctx.fillStyle = "#0063cc";      
            }  
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

            
        }
    }

}