import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Roupas } from 'src/app/model/roupa/roupas';
import { Usuarios } from 'src/app/model/usuarios/usuarios';
import { GeralService } from 'src/app/service/geral.service';
import { Carrinho } from 'src/app/model/usuarios/carrinho';
@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit{

produto: Roupas [] =  [] //[]
idDaUrl: number = 0
caminhoImagemDestaque: string = '';
usuario : Usuarios [] = [] // 
tamanhoSelecionado: string = '';
carrinho: Carrinho[] = [];
tamanhoEscolhido = this.tamanhoSelecionado

  constructor(
    private rotaAtiva: ActivatedRoute,
    private roupaApi: GeralService
  ){}

  ngOnInit(): void {
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    this.pegaInfos()
    this.todosProdutos()
  }
  pegaInfos(){ 
    
      this.roupaApi.getUsuarios().subscribe( (usuario) => {
        this.usuario = usuario
      })
    
    }
    
    adicionarAoCarrinho(): void {
      let idUser = Number(localStorage.getItem('idUser'))
      // Pega o usuário existente
      this.roupaApi.getUsuarioPorId(idUser).subscribe((respUser) => {
        // Faz uma copia dele para uma variavel
        let usuarioAlteracao = respUser
  
        // Cria um novo item do carrinho
        let novoItem = new Carrinho()
        novoItem.produto = this.idDaUrl
        novoItem.quantidade = 1
        novoItem.tamanho = this.tamanhoSelecionado
  
        // Adiciona o novo item sem apagar os anteriores
        usuarioAlteracao.carrinho.push(novoItem)
  
        // Atualiza a API com o carrinho novo
        this.roupaApi.putEditaUsuario(idUser, usuarioAlteracao).subscribe((resp) => {
          alert('Carrinho atualizado!')
        })
      })
    }
    findProduto(id: number):any {
      let prod = this.produto.find((obj) => obj.id == id)
      if(prod){
        return prod
      } else {
        return ''
      }
    }
    precoTotal(): number{
      let preco = 0
      for(let item of this.carrinho){
        preco += ( this.findProduto(item.produto).preco * item.quantidade )
      }
      return preco
    }
    todosProdutos(){
      this.roupaApi.getTodosProdutos().subscribe((respRoupas) => {
        this.produto = respRoupas
        let idUser = Number(localStorage.getItem('idUser'))
        this.roupaApi.getUsuarioPorId(idUser).subscribe((usuario) => {
          this.carrinho = usuario.carrinho
        })
      })
    }
    mudaQuantidade(item: Carrinho, diminui: boolean): void {
      // Fazer chamada para pegar o usuário com o carrinho dele
      let idUser = Number(localStorage.getItem('idUser'))
      this.roupaApi.getUsuarioPorId(idUser).subscribe((usuario) => {
        // Faz uma copia do usuario para guardar na variavel
        let copiaUsuario = usuario
  
        // Encontrar o index do produto dentro do carrinho comparando todos os valores dele
        let indexItem = 0
        for(let i = 0; i < copiaUsuario.carrinho.length; i++){
          if(copiaUsuario.carrinho[i].produto == item.produto && copiaUsuario.carrinho[i].quantidade == item.quantidade && copiaUsuario.carrinho[i].tamanho == item.tamanho){
            indexItem = i
          }
        }
        // Segunda maneira de achar o index do produtod
        let acharIndexItem = copiaUsuario.carrinho.findIndex((carrinho) => carrinho.produto == item.produto && carrinho.quantidade == item.quantidade && carrinho.tamanho == item.tamanho)
        
        // Diminuir ou aumentar a quantidade do item com base no botão clicado
        if(diminui){
          copiaUsuario.carrinho[indexItem].quantidade--
        } else {
          copiaUsuario.carrinho[indexItem].quantidade++
        }
  
        // Checar se a quantidade do item ficou ZERO para retirar o item do carrinho
        if(copiaUsuario.carrinho[indexItem].quantidade == 0){
          copiaUsuario.carrinho.splice(indexItem, 1)
        }
  
        // Atualiza o item no JSON pela API
        this.roupaApi.putEditaUsuario(idUser, copiaUsuario).subscribe((usuarioAtualizado) => {
          // Atualiza o carrinho na tela conforme o usuario atualizado
          this.carrinho = usuarioAtualizado.carrinho
        })
      })
    }
  
}