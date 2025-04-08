import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Certifique-se de que FormGroup está aqui
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
})
export class ProdutoFormComponent implements OnInit {
  form!: FormGroup; // Declare a propriedade sem inicializá-la diretamente
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Inicialize o formulário no ngOnInit
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      descricao: [''],
      codigoBarras: ['', [Validators.required]],
      preco: [0, [Validators.required, Validators.min(0)]],
      estoqueMinimo: [0, [Validators.required, Validators.min(0)]],
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.produtoService.buscarPorId(+id).subscribe((produto) => {
        this.form.patchValue(produto);
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const produto = this.form.value as Produto;
      this.produtoService.salvar(produto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }
}
