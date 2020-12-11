import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INota, Nota } from 'app/shared/model/nota.model';
import { NotaService } from './nota.service';
import { IEstadia } from 'app/shared/model/estadia.model';
import { EstadiaService } from 'app/entities/estadia/estadia.service';

@Component({
  selector: 'jhi-nota-update',
  templateUrl: './nota-update.component.html',
})
export class NotaUpdateComponent implements OnInit {
  isSaving = false;
  estadiaids: IEstadia[] = [];

  editForm = this.fb.group({
    id: [],
    estadiaID: [],
    valorTotal: [],
    estadiaID: [],
  });

  constructor(
    protected notaService: NotaService,
    protected estadiaService: EstadiaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nota }) => {
      this.updateForm(nota);

      this.estadiaService
        .query({ filter: 'nota-is-null' })
        .pipe(
          map((res: HttpResponse<IEstadia[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEstadia[]) => {
          if (!nota.estadiaID || !nota.estadiaID.id) {
            this.estadiaids = resBody;
          } else {
            this.estadiaService
              .find(nota.estadiaID.id)
              .pipe(
                map((subRes: HttpResponse<IEstadia>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEstadia[]) => (this.estadiaids = concatRes));
          }
        });
    });
  }

  updateForm(nota: INota): void {
    this.editForm.patchValue({
      id: nota.id,
      estadiaID: nota.estadiaID,
      valorTotal: nota.valorTotal,
      estadiaID: nota.estadiaID,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nota = this.createFromForm();
    if (nota.id !== undefined) {
      this.subscribeToSaveResponse(this.notaService.update(nota));
    } else {
      this.subscribeToSaveResponse(this.notaService.create(nota));
    }
  }

  private createFromForm(): INota {
    return {
      ...new Nota(),
      id: this.editForm.get(['id'])!.value,
      estadiaID: this.editForm.get(['estadiaID'])!.value,
      valorTotal: this.editForm.get(['valorTotal'])!.value,
      estadiaID: this.editForm.get(['estadiaID'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INota>>): void {
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

  trackById(index: number, item: IEstadia): any {
    return item.id;
  }
}
