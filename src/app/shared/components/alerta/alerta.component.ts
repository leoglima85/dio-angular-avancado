import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  titulo = 'Sucesso!';
  descricao = 'Cadastrado com Sucesso!';
  btnSucesso = 'OK';
  btnCancelar = 'Cancelar';
  corBtn = 'primary';
  possuirBtnFechar = false;


  constructor(public dialogRef: MatDialogRef<AlertaComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      this,this.titulo = this.data.titulo || this.titulo;
      this,this.descricao = this.data.descricao || this.descricao;
      this,this.btnSucesso = this.data.btnSucesso || this.btnSucesso;
      this,this.btnCancelar = this.data.btnCancelar || this.btnCancelar;
      this,this.corBtn = this.data.corBtn || this.corBtn;
      this,this.possuirBtnFechar = this.data.possuirBtnFechar || this.possuirBtnFechar;
    }
  }

}
