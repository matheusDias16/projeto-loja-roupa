export class ConteudoSite {
  public home :{
    textoCategorias : string
    produtosDestaque: number []
   
}
public  internaProduto : {
    sugestao : string
}
constructor(){
    this.home = {
        textoCategorias : '',
        produtosDestaque : []
    } 
    this.internaProduto = {
        sugestao : '',
    } 
}
}
