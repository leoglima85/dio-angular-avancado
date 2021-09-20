import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  alerta = {
  titulo : 'Sucesso!',
  descricao : 'Cadastrado com Sucesso!',
  btnSucesso : 'OK',
  btnCancelar : 'Cancelar',
  corBtnSucesso : 'accent',
  corBtnCancelar : 'warn',
  possuirBtnFechar : false
 } as Alerta;

  constructor(public dialogRef: MatDialogRef<AlertaComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      this,this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this,this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this,this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this,this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this,this.alerta.corBtnSucesso = this.data.orBtnSucesso || this.alerta.corBtnSucesso;
      this,this.alerta.corBtnCancelar = this.data.corBtnCancelar || this.alerta.corBtnCancelar;
      this,this.alerta.possuirBtnFechar = this.data.possuirBtnFechar || this.alerta.possuirBtnFechar;
    }
  }

}
