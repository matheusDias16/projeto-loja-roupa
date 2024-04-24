import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/model/categorias/categorias';
import { ConteudoSite } from 'src/app/model/conteudo-site';
import { Roupas } from 'src/app/model/roupa/roupas';
import { GeralService } from 'src/app/service/geral.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
roupa : Roupas[] = []
categoria : Categorias[] = []
destaque : ConteudoSite = new ConteudoSite()

constructor(
  private roupaApi: GeralService
){}
ngOnInit(): void {
    this.pegaCategorias()
    this.pegaProdutos ()
    this.produtosDestaque()
}
pegaCategorias(): void{
  this.roupaApi.getCategorias().subscribe( (categorias) => {
    this.categoria = categorias
  })
}
pegaProdutos(): void{
  this.roupaApi.getTodosProdutos().subscribe( (roupas) => {
    this.roupa = roupas
  })
}
produtosDestaque(){
  this.roupaApi.getProdutoEmDestaque().subscribe( (destaque) => {
    this.destaque = destaque
  })
}

}
