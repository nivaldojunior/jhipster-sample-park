import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVeiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from './veiculo.service';

@Component({
  templateUrl: './veiculo-delete-dialog.component.html',
})
export class VeiculoDeleteDialogComponent {
  veiculo?: IVeiculo;

  constructor(protected veiculoService: VeiculoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.veiculoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('veiculoListModification');
      this.activeModal.close();
    });
  }
}
