export class Listener
{
    public aKey: boolean = false;

    constructor()
    {
        window.addEventListener('keydown', this.keyLeft, false);
        window.addEventListener('keyup', this.keyRight, false);
    }

    private keyLeft(event:KeyboardEvent): void
    {
        this.aKey = true;
    }

    private keyRight(event: KeyboardEvent): void
    {
        this.aKey = false;
    }
}