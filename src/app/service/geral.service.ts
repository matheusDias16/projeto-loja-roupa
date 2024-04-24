import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorias } from '../model/categorias/categorias';
import { Roupas } from '../model/roupa/roupas';
import { ConteudoSite } from '../model/conteudo-site';
import { Colecoes } from '../model/colecoes/colecoes';
import { Avaliacoes } from '../model/roupa/avaliacoes';
import { Usuarios } from '../model/usuarios/usuarios';
import { Carrinho } from '../model/usuarios/carrinho';
@Injectable({
  providedIn: 'root'
})
export class GeralService {

  constructor(private http: HttpClient) { }
  readonly urlDaApi: string = 'http://localhost:3000';

  getCategorias(): Observable<Categorias[]>{
    return this.http.get<Categorias[]>(`${this.urlDaApi}/categorias`) 
  }
  getTodosProdutos(): Observable<Roupas[]>{
    return this.http.get<Roupas[]>(`${this.urlDaApi}/roupas`) 
  }
  getProdutoEmDestaque(): Observable<ConteudoSite>{
    return this.http.get<ConteudoSite>(`${this.urlDaApi}/conteudoSite`) 
  }
  getCategoriaPeloId(id:Number): Observable<Categorias>{
    return this.http.get<Categorias>(`${this.urlDaApi}/categorias/${id}`)
  }
  getProdutoPorCategoria(idCategoria: Number): Observable<Roupas[]>{
    return this.http.get<Roupas[]>(`${this.urlDaApi}/roupas?categoria=${idCategoria}`)  // http://localhost:3000/noticias?categoria=2
  }
  getProdutoPorId(id: number): Observable<Roupas>{
    return this.http.get<Roupas>(`${this.urlDaApi}/roupas/${id}`)
  }
  getColecoes(): Observable<Colecoes[]>{
    return this.http.get<Colecoes[]>(`${this.urlDaApi}/colecoes`) 
  }
 
getUsuarios(): Observable<Usuarios[]>{
  return this.http.get<Usuarios[]>(`${this.urlDaApi}/usuarios`) 
}
getUsuarioPorId(id: number): Observable<Usuarios>{
  return this.http.get<Usuarios>(`${this.urlDaApi}/usuarios/${id}`)
}
putEditaUsuario(id: number, mudanca: Usuarios): Observable<Usuarios>{
  return this.http.put<Usuarios>(`${this.urlDaApi}/usuarios/${id}`, mudanca)
}
deleteProduto( id: Number ): Observable<Usuarios>{
  return this.http.delete<Usuarios>(`${this.urlDaApi}/usuarios/${id}`) 
 }
 criarProduto( produtoNovo: Roupas ): Observable<Roupas>{
  return this.http.post<Roupas>(`${this.urlDaApi}/roupas`, produtoNovo) // Passamos URL e o objeto do novo produto
}

}