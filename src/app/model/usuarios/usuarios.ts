import { Carrinho } from "./carrinho"

export class Usuarios {
    public id : number
    public nomeCompleto: string 
    public username : string
    public carrinho : Carrinho[]
    public tipo : string
 
    constructor(){
        this.id = 0
        this.nomeCompleto= ''
        this.username = ''
        this.carrinho = []
        this.tipo = ''
    }
}
