import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IValor, Valor } from 'app/shared/model/valor.model';
import { ValorService } from './valor.service';

@Component({
  selector: 'jhi-valor-update',
  templateUrl: './valor-update.component.html',
})
export class ValorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    primeiraHora: [],
    demaisHoras: [],
  });

  constructor(protected valorService: ValorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valor }) => {
      this.updateForm(valor);
    });
  }

  updateForm(valor: IValor): void {
    this.editForm.patchValue({
      id: valor.id,
      primeiraHora: valor.primeiraHora,
      demaisHoras: valor.demaisHoras,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const valor = this.createFromForm();
    if (valor.id !== undefined) {
      this.subscribeToSaveResponse(this.valorService.update(valor));
    } else {
      this.subscribeToSaveResponse(this.valorService.create(valor));
    }
  }

  private createFromForm(): IValor {
    return {
      ...new Valor(),
      id: this.editForm.get(['id'])!.value,
      primeiraHora: this.editForm.get(['primeiraHora'])!.value,
      demaisHoras: this.editForm.get(['demaisHoras'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IValor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
