import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorias } from 'src/app/model/categorias/categorias';
import { Roupas } from 'src/app/model/roupa/roupas';
import { GeralService } from 'src/app/service/geral.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  produto: Roupas [] = []
  categoria: Categorias = new Categorias()
  idDaUrl: number = 0

  constructor(
    private rotaAtiva: ActivatedRoute,
    private produtoApi: GeralService
  ){}

  ngOnInit(): void {
     this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
      this.pegarInfos()
  }

  pegarInfos(): void{
    this.produtoApi.getProdutoPorCategoria(this.idDaUrl).subscribe( (resProduto) => {
      this.produto = resProduto
    })
    this.produtoApi.getCategoriaPeloId(this.idDaUrl).subscribe( (respCategoria) => {
      this.categoria = respCategoria
    })
  }
}
