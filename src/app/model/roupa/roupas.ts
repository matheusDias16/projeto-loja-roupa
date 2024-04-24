import { Avaliacoes } from "./avaliacoes"
import { Estoque } from "./estoque"
import { Imagem } from "./imagem"

export class Roupas {
  public id: number
  public produto: string
  public descricao: string
  public estoque: Estoque[]
  public imagem: Imagem[]
  public preco: number
  public parcelas: number[]
  public genero: string
  public categoria: number
  public colecao : number
  public avaliacoes : Avaliacoes []

  constructor(){
    
    this.id = 0
    this.produto = ''
    this.descricao = ''
    this.estoque = []
    this.imagem = []
    this.preco = 0
    this.parcelas = []
    this.genero =  ''
    this.categoria = 0
    this.colecao = 0
    this.avaliacoes = []
  }

}
