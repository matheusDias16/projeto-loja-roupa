import { Component, OnInit } from '@angular/core';
import { GeralService } from 'src/app/service/geral.service';
import { Roupas } from 'src/app/model/roupa/roupas';
import { Categorias } from 'src/app/model/categorias/categorias';

@Component({
  selector: 'app-roupa',
  templateUrl: './roupa.component.html',
  styleUrls: ['./roupa.component.scss']
})
export class RoupaComponent implements OnInit{

  categorias: Categorias[] = []
  roupas: Roupas[] = []

  constructor(
    private api: GeralService
  ){}

  ngOnInit(): void {
    this.getInfos()
  }

  getInfos(): void{
    this.api.getCategorias().subscribe( (respCategs) => {
      this.categorias = respCategs
      this.api.getTodosProdutos().subscribe( (resposta) => {
        this.roupas = resposta
      })
    })
  }

  getCategValue(id: number): string{
    for(let categ of this.categorias){
      if(id == categ.id){
        return categ.categoria
      }
    }
    return ''
  }

}