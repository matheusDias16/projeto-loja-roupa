import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importo o Modulo de Formulário do Angular (ngModel)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { InternaComponent } from './component/interna/interna.component';
import { CarrinhoComponent } from './component/carrinho/carrinho.component';
import { RoupaComponent } from './component/crud/roupa/roupa.component';
import { CreateRoupaComponent } from './component/crud/create-roupa/create-roupa.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriaComponent,
    InternaComponent,
    CarrinhoComponent,
    RoupaComponent,
    CreateRoupaComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
