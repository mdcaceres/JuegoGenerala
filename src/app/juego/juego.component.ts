import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import Swal from 'sweetalert2';
import { DadoComponent } from '../dado/dado.component';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  @ViewChild(DadoComponent) dado: any; 
  //@ViewChild("parar",{static}) dado: any;
  //@ViewChild("parar", {static: true}) btnParar: ElementRef | undefined;
  @ViewChildren(DadoComponent)
  dados!: QueryList<DadoComponent>;
  public aciertos : number[]; 
  public mensaje : String; 
  public isDisabled: boolean
  //public dados : DadoComponent[]; 

  constructor() {
    this.isDisabled = true;
    this.aciertos = [];
    this.mensaje = ""; 
  }

  

  ngOnInit(): void {
    
  }


  updateAciertos(acierto : number){
    this.aciertos.push(acierto);
    this.mensaje = `RESULTADO ${this.aciertos.toString()}🔥`;
  }

  stop(): void{
    this.dados.forEach(dado => {
      dado.stop(); 
    });
    this.recibir();
    setTimeout(() => this.informarCategoria(), 200);
  }

  habilitar(): void{
    this.isDisabled = false;
  }

  deshabilitar(): void{
    this.isDisabled = true;
  }

  start(){
    this.aciertos = [];
    this.dados.forEach(dado => {
      dado.start(); 
    });
    //this.btnParar!.nativeElement.disabled = false; 
  }

  recibir(){
    this.dados.forEach(dado => {
      dado.comunicar();
    });
  }

  informarCategoria(){
    //alert(this.aciertos.every(x => x == this.aciertos[0]));
    if(this.aciertos.every(x => x == this.aciertos[0])) {
      Swal.fire({
        title: 'SACASTE UNA GENERALA CAMPEON🤴',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    } 
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Intentalo de nuevo',
        showConfirmButton: true
      })
    }
  }

}

