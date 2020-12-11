import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVeiculo, Veiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from './veiculo.service';

@Component({
  selector: 'jhi-veiculo-update',
  templateUrl: './veiculo-update.component.html',
})
export class VeiculoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    modelo: [],
    placa: [],
    marca: [],
  });

  constructor(protected veiculoService: VeiculoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ veiculo }) => {
      this.updateForm(veiculo);
    });
  }

  updateForm(veiculo: IVeiculo): void {
    this.editForm.patchValue({
      id: veiculo.id,
      modelo: veiculo.modelo,
      placa: veiculo.placa,
      marca: veiculo.marca,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const veiculo = this.createFromForm();
    if (veiculo.id !== undefined) {
      this.subscribeToSaveResponse(this.veiculoService.update(veiculo));
    } else {
      this.subscribeToSaveResponse(this.veiculoService.create(veiculo));
    }
  }

  private createFromForm(): IVeiculo {
    return {
      ...new Veiculo(),
      id: this.editForm.get(['id'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
      placa: this.editForm.get(['placa'])!.value,
      marca: this.editForm.get(['marca'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVeiculo>>): void {
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
