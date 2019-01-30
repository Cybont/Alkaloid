import { GameObject } from "./gameObject";
import { Framerate } from "./framerate";
import { Vector } from "./vector";
import { Player } from "./player";
import { Ball } from "./ball";
import { Block } from "./block";
import { Scoreboard } from "./scoreBoard";

/*
    THis is the main PONG GAME script
*/

export class GameEngine
{

    // items in the game
    public ball:Ball;
    public player1:Player;
    public block : Block;
    
    // canvas info
    public canvasWidth:number;
    public canvasHeight:number;

    // keep track of key states
    public aKey:boolean;
    public dKey:boolean;

    // blocks
    public blocks : number[][] = new Array<Array<number>>();

    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;

    public scoreBoard : Scoreboard;
    
    // array with all gameobjects in the game - If you want more objects in the game add them to this array!
    public objects:GameObject[] = new Array<GameObject>();

    // kepp track of time between loops
    private date: Date = new Date();
    private timeZero: number = this.date.getTime();
    private timeNow: number;

    constructor()
    {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        // listen for keyboard input
        document.addEventListener('keydown', this.keyLeft.bind(this));
        document.addEventListener('keyup', this.keyRight.bind(this));

        //ceate gameobjects
        this.objects.push(new Framerate(new Vector(10,10)));
        
        this.player1 = new Player(new Vector(this.canvasWidth/2,this.canvasHeight - 20), this);
        this.objects.push(this.player1);

        // this.blocks.push(new Block(new Vector(30, 10), this));
        // this.blocks.forEach(block => {
        //     this.objects.push(block);
        // });
        this.mapCreator();

        this.ball = new Ball(new Vector(this.canvasWidth/2, this.canvasHeight/2), this);
        this.objects.push(this.ball);

        this.scoreBoard = new Scoreboard(new Vector(this.canvasHeight - 300, this.canvasWidth -200), this, this.player1);
        this.objects.push(this.scoreBoard);

        this.gameLoop();
    }
    mapCreator(){
        //this.block = new Block(new Vector(100, 100), this, "oneBlock");
        this.blocks = [ [1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 1], 
                        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                        [1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1],
                        [0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                        [1, 0, 1, 0, 1, 0, 3, 0, 1, 0, 3, 0, 1, 0, 2]
                    ];

        for (let i = 0; i < this.blocks.length; i++) {
            for (let a = 0; a < this.blocks[i].length; a++) {
                if (this.blocks[i][a] == 1){                    
                    this.block = new Block(new Vector((a * 20), ((i+1) * 10)), this, "");
                    this.objects.push(this.block);
                }
                else if (this.blocks[i][a] == 2){                    
                    this.block = new Block(new Vector((a * 20), ((i+1) * 10)), this, "Armored");
                    this.objects.push(this.block);
                }
                else if (this.blocks[i][a] == 3){                    
                    this.block = new Block(new Vector((a * 20), ((i+1) * 10)), this, "Obsidian");
                    this.objects.push(this.block);
                }
            }            
        }

        
    }

    // keyboard event
    private keyLeft(event:KeyboardEvent): void
    {
        if (event.repeat) {return};
        switch (event.key) {
            case "a":
                this.player1.keyLeft = true;
                break;
            case "d":
                this.player1.keyRight = true;
        }
    }

    // keyboard event
    private keyRight(event: KeyboardEvent): void
    {
        switch (event.key) {
            case "a":
                this.player1.keyLeft=false;
                break;
            case "d":
                this.player1.keyRight=false;
                break;
        }   
    } 
    
    // a very good explanation of how rectangular collision works: https://silentmatt.com/rectangle-intersection/
    private Collide(a:GameObject, b:GameObject): boolean {
        if (a.position.x < (b.position.x+b.width) &&
            (a.position.x+a.width) > b.position.x &&
            a.position.y < (b.position.y+a.height) &&
            a.position.y+b.height > b.position.y)
            {
                return true;
            }
        
    }

    // the main game loop
    private gameLoop()
    {
        // clear the screen in every update
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.date = new Date();
        this.timeNow = this.date.getTime()
        var time = this.timeNow-this.timeZero;
        this.timeZero=this.timeNow;

        // run throght all objects
        this.objects.forEach(element => {
            //all objects are testeted for collisions on all objects
            this.objects.forEach(other => {  
                if (element !== other)
                {
                    if (this.Collide(element, other))
                    {
                        element.onColliosion(other);
                    }
                }
            });
            
            //every element is updated
            element.update(time);

            // every element is drawn on canvas
            element.draw(this.ctx);
        });
        
        // call the main gamelop again (~60fps by default)
        window.requestAnimationFrame(this.gameLoop.bind(this));



    }

}

//start gameengine
new GameEngine();

