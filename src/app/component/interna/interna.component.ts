import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeralService } from 'src/app/service/geral.service';
import { Roupas } from 'src/app/model/roupa/roupas';
import { Categorias } from 'src/app/model/categorias/categorias';
import { Colecoes } from 'src/app/model/colecoes/colecoes';
import { Usuarios } from 'src/app/model/usuarios/usuarios';
import { Avaliacoes } from 'src/app/model/roupa/avaliacoes';
import { Carrinho } from 'src/app/model/usuarios/carrinho';

@Component({
  selector: 'app-interna',
  templateUrl: './interna.component.html',
  styleUrls: ['./interna.component.scss']
})
export class InternaComponent implements OnInit {
  produto: Roupas  = new Roupas()
  idDaUrl: number = 0
  categoria : Categorias [] = []
  colecao : Colecoes [] = []
  usuario: Usuarios[] = []
  caminhoImagemDestaque: string = '';
  arrayNumeros:number [] = [0,1,2,3,4];
  tamanhoSelecionado: string = '';
  
  
  constructor(
    private rotaAtiva: ActivatedRoute,
    private roupaApi: GeralService
  ){}

  ngOnInit(): void {
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    this.pegaInfos()
  }
  pegaInfos(){ 
  this.roupaApi.getProdutoPorId(this.idDaUrl).subscribe( (produto) => {
    this.produto = produto
    this.caminhoImagemDestaque = produto.imagem[0].caminho
    
    this.roupaApi.getColecoes().subscribe( (respColecao) => {
      this.colecao = respColecao
      
    })
    this.roupaApi.getCategorias().subscribe( (respCategoria) => {
      this.categoria = respCategoria
      
    })
    this.roupaApi.getUsuarios().subscribe( (respUsuario) => {
      this.usuario = respUsuario
      
    })
  })
 
}


findCategoria(id: number): string {
  let categ = this.categoria.find((obj) => obj.id == id)
  if(categ){
    return categ.categoria
  } else {
    return ''
  }
}

findColecao(id: number): string {
  let colec = this.colecao.find((obj) => obj.id == id)
  if(colec){
    return colec.nome
  } else {
    return ''
  }
}
findId(id: number): string {
  let userId = this.usuario.find((obj) => obj.id == id)
  if(userId){
    return userId.nomeCompleto
  } else {
    return 'Usuario não encontrado'
  }
}
mudaImagemDestaque(caminhoNovo: string): void {
  this.caminhoImagemDestaque = caminhoNovo
}
mudaTamanho(tamanhoNovo: string): void {
  this.tamanhoSelecionado = tamanhoNovo
}
 adicionarAoCarrinho(): void {
    let idUser = Number(localStorage.getItem('idUser'))
    // Pega o usuário existente
    this.roupaApi.getUsuarioPorId(idUser).subscribe((respUser) => {
      // Faz uma copia dele para uma variavel
      let usuarioAlteracao = respUser



      let prodJaExiste = false
      let novoItem = new Carrinho()

      for(let item of respUser.carrinho){
        if(item.produto == this.idDaUrl && item.tamanho == this.tamanhoSelecionado){
          prodJaExiste = true
          novoItem = item
        }
      }

      if(prodJaExiste){
        novoItem.quantidade++
      } else {
        // Cria um novo item do carrinho
        novoItem.produto = this.idDaUrl
        novoItem.quantidade = 1
        novoItem.tamanho = this.tamanhoSelecionado
      }

      // Adiciona o novo item sem apagar os anteriores
      usuarioAlteracao.carrinho.push(novoItem)

      // Atualiza a API com o carrinho novo
      this.roupaApi.putEditaUsuario(idUser, usuarioAlteracao).subscribe((resp) => {
        alert('Carrinho atualizado!')
      })
    })
  }

}