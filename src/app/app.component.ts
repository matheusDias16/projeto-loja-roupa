import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loja-roupa';

  // checkLogin(): string{
  //   // let id = localStorage.getItem('idUser')
  //   let nome = localStorage.getItem('nameUser')
  //   if(nome){
  //     return nome
  //   } else {
  //     return ''
  //   }
  // }
  // logout(): void{
  //   localStorage.clear()
  // }
}