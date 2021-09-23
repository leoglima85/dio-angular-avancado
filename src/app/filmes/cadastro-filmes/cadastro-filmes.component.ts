import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {
  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public validacao: ValidarCamposService, 
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeService: FilmesService,
              private activatedRoute: ActivatedRoute,
              private router: Router              
              ) { }

  get f() {
     return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id){
      this.filmeService.visualizar(this.id).subscribe((filme: Filme)=> this.criarFormulario(filme));
    }
    else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }
    this.generos = ['Ação','Aventura','Comedia','Terror','Ficção Cientifica','Comedia','Drama'];
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo,[Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto,[Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento,[Validators.required]],
      descricao: [filme.descricao],
      nota : [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero,[Validators.required]]
    });
  }

  submit (): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid){
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  reiniciarForm():void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(()=> {
      const config = {
        data : {
          btnSucesso : 'Ir para listagem',
          btnCancelar : 'Cadastrar novo filme',
          corBtnCancelar:'primary',
          possuirBtnFechar : true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao) {
          this.router.navigateByUrl('filmes');
        }else {
          this.reiniciarForm();
        }
      })
    },
    () => {
      const config = {
        data : {
          btnSucesso : 'Fechar',
          descricao: 'Não foi possivel salvar',
          corBtnSucesso: 'Warn',
          titulo: 'Erro ao salvar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(()=> {
      const config = {
        data : {
          btnSucesso : 'Ir para listagem',
          descricao: 'Registro Atualizado com sucesso!.'
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
    },
    () => {
      const config = {
        data : {
          btnSucesso : 'Fechar',
          descricao: 'Não foi possivel salvar',
          corBtnSucesso: 'Warn',
          titulo: 'Erro ao editar o registro'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlImdb: null,
      genero: null
    } as Filme;
  }

}
