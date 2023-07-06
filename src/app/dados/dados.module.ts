import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosComponent } from './dados/dados.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [DadosComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [DadosComponent],
})
export class DadosModule {}
