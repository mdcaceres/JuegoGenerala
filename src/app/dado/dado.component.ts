import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-dado',
  templateUrl: './dado.component.html',
  styleUrls: ['./dado.component.css']
})
export class DadoComponent implements OnInit {
  @ViewChild("canvasDado", {static: true})
  canvas: ElementRef<HTMLCanvasElement> | undefined;
  private ctx: CanvasRenderingContext2D | null | undefined;
  //private canvas: HTMLCanvasElement; 
  // private ctx: CanvasRenderingContext2D | null;
  private CANVAS_WIDTH: number; 
  private CANVAS_HEIGHT: number; 
  private x = 0; 
  private aux = 16;
  private diceImage: HTMLImageElement; 
  private spriteWidth = 16; 
  private spriteHeigth = 16; 
  private frameX; 
  private frameY;
  private gameFrame = 0; 
  private staggerFrames = 5; 
  private animationFrame : any; 
  private stopFrame : any; 
  private acierto : number;
  private isRolling : boolean; 

  @Output()
  enviar : EventEmitter<number> = new EventEmitter<number>(); 
  

  constructor() {
    //let canvas = document.getElementById("canvas1") as HTMLCanvasElement; 
    // let context = canvas.getContext("2d"); 
    this.CANVAS_HEIGHT = 300; 
    this.CANVAS_WIDTH = 500;
    this.diceImage = new Image(); 
    this.diceImage.src = "./assets/sprite.png"
    this.acierto = Math.min();
    this.frameX = 0//Math.ceil(Math.random() * 5); 
    this.frameY = 14; 
    this.isRolling = false; 
    
    //src\assets\
    
    //this.canvas = canvas; 
    // this.ctx = context; 
   }

  ngOnInit(): void {
    //this.animate(); 
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    // this.start();
    // for(let i = 0; i < 50; i++){
    //   console.log("bla bla bla...")
    // }
    //this.stop(); 
  }

  animate(): void {
    cancelAnimationFrame(this.stopFrame)
    this.ctx!.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT); 
    //this.ctx!.fillRect(this.x,100,100,100);
    //this.ctx!.drawImage(this.diceImage,0,0); 
    //this.frameY = 14;
    this.ctx!.drawImage(this.diceImage,this.frameX*this.spriteWidth,this.frameY * this.spriteHeigth,this.spriteWidth,this.spriteHeigth,100,50,110,50); 
    
    if(this.gameFrame % this.staggerFrames == 0){
      
      if(this.frameX < 5){
        this.frameX++; 
      }
      else this.frameX = 0;
    }
    
    this.gameFrame++;
    console.log("roll" + this.frameX);
    this.animationFrame = requestAnimationFrame(this.animate.bind(this)); 
  }

  start() : void {
    //this.isRolling = true; 
    if(!this.isRolling){
      this.frameX = Math.ceil(Math.random() * 5); 
      this.animate();
      this.isRolling = true; 
    } 
  }

  // no hay manera de quitar esos this??? 

  comunicar(): void{
    this.enviar.emit(this.acierto); 
  }

  stop() : void { 
    this.acierto = this.frameX + 1; 
    let number = this.frameX; 
    //console.log("este !!!" + number)
    
    cancelAnimationFrame(this.animationFrame);
    this.ctx!.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);
    //console.log("stop" + this.frameX);
    this.ctx!.drawImage(this.diceImage,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeigth,100,50,110,50); 
    this.stopFrame = requestAnimationFrame(this.stop.bind(this));
    this.isRolling = false; 
  }
}
