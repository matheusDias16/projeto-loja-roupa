import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Estoque } from 'src/app/model/roupa/estoque';
import { Imagem } from 'src/app/model/roupa/imagem';
import { Roupas } from 'src/app/model/roupa/roupas';
import { GeralService } from 'src/app/service/geral.service';

@Component({
  selector: 'app-create-roupa',
  templateUrl: './create-roupa.component.html',
  styleUrls: ['./create-roupa.component.scss']
})
export class CreateRoupaComponent {

  camposEstoque: Estoque[] = [{tamanho: '', quantidade: 0}]
  campoImagem: Imagem [] = [{caminho: '', destaque : ''}]
  formularioRoupa : FormGroup;
  constructor(
    private api : GeralService
  ){
    this.formularioRoupa = new FormGroup ({
      produto: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      tamanho: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required]),
      caminho: new FormControl('', [Validators.required]),
      destaque: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      parcelas: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      colecao: new FormControl('', [Validators.required]),
      
    })
  }

  addEstoque(): void{
    this.camposEstoque.push(new Estoque())
  }

  removeEstoque(): void{
    this.camposEstoque.pop()
  }
  

  validateEstoque(): void{
    let erro = false
    for(let est of this.camposEstoque){
      if(est.tamanho.trim().length == 0 || est.quantidade <= 0){
        erro = true
      }
    }
    if(erro){
      alert('Um ou mais campos de estoque estão preenchidos incorretamente!')
    } else {
      alert('Campos de estoque estao ok')
    }
  }
criaProduto():void{
  let produtoNovo = new Roupas()
  produtoNovo.produto = this.formularioRoupa.value.produto
  produtoNovo.descricao = this.formularioRoupa.value.descricao
  produtoNovo.preco = this.formularioRoupa.value.preco
  //produtoNovo.parcelas = this.formularioRoupa.value.parcelas
  produtoNovo.genero = this.formularioRoupa.value.genero
  produtoNovo.categoria = this.formularioRoupa.value.categoria
  produtoNovo.colecao = this.formularioRoupa.value.colecao
  
 for(let estoque of this.camposEstoque){
  let estq = new Estoque 
 estq.tamanho = estoque.tamanho
 estq.quantidade = estoque.quantidade
  produtoNovo.estoque.push(estq)
}
for(let i = 1; i <= this.formularioRoupa.value.parcelas; i++ ){
produtoNovo.parcelas.push(i)
}
  let img = new Imagem 
img.caminho = this.formularioRoupa.value.caminho
img.destaque= this.formularioRoupa.value.destaque
  produtoNovo.imagem.push(img)

  this.api.criarProduto( produtoNovo ).subscribe( (data) => {
    alert('Postagem criada!')
  })
}

}