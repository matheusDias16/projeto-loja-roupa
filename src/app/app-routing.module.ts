import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { InternaComponent } from './component/interna/interna.component';
import { CarrinhoComponent } from './component/carrinho/carrinho.component';
import { RoupaComponent } from './component/crud/roupa/roupa.component';
import { CreateRoupaComponent } from './component/crud/create-roupa/create-roupa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categoria/:id', component: CategoriaComponent },
  { path: 'interna/:id', component: InternaComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'crud/roupa', component: RoupaComponent },
  { path: 'crud/roupa/criar', component: CreateRoupaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
