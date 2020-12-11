import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEstadia, Estadia } from 'app/shared/model/estadia.model';
import { EstadiaService } from './estadia.service';
import { IVeiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from 'app/entities/veiculo/veiculo.service';

@Component({
  selector: 'jhi-estadia-update',
  templateUrl: './estadia-update.component.html',
})
export class EstadiaUpdateComponent implements OnInit {
  isSaving = false;
  veiculos: IVeiculo[] = [];

  editForm = this.fb.group({
    id: [],
    veiculoID: [],
    entrada: [],
    saida: [],
    veiculoID: [],
  });

  constructor(
    protected estadiaService: EstadiaService,
    protected veiculoService: VeiculoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadia }) => {
      if (!estadia.id) {
        const today = moment().startOf('day');
        estadia.entrada = today;
        estadia.saida = today;
      }

      this.updateForm(estadia);

      this.veiculoService.query().subscribe((res: HttpResponse<IVeiculo[]>) => (this.veiculos = res.body || []));
    });
  }

  updateForm(estadia: IEstadia): void {
    this.editForm.patchValue({
      id: estadia.id,
      veiculoID: estadia.veiculoID,
      entrada: estadia.entrada ? estadia.entrada.format(DATE_TIME_FORMAT) : null,
      saida: estadia.saida ? estadia.saida.format(DATE_TIME_FORMAT) : null,
      veiculoID: estadia.veiculoID,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadia = this.createFromForm();
    if (estadia.id !== undefined) {
      this.subscribeToSaveResponse(this.estadiaService.update(estadia));
    } else {
      this.subscribeToSaveResponse(this.estadiaService.create(estadia));
    }
  }

  private createFromForm(): IEstadia {
    return {
      ...new Estadia(),
      id: this.editForm.get(['id'])!.value,
      veiculoID: this.editForm.get(['veiculoID'])!.value,
      entrada: this.editForm.get(['entrada'])!.value ? moment(this.editForm.get(['entrada'])!.value, DATE_TIME_FORMAT) : undefined,
      saida: this.editForm.get(['saida'])!.value ? moment(this.editForm.get(['saida'])!.value, DATE_TIME_FORMAT) : undefined,
      veiculoID: this.editForm.get(['veiculoID'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadia>>): void {
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

  trackById(index: number, item: IVeiculo): any {
    return item.id;
  }
}
