import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadia } from 'app/shared/model/estadia.model';
import { EstadiaService } from './estadia.service';

@Component({
  templateUrl: './estadia-delete-dialog.component.html',
})
export class EstadiaDeleteDialogComponent {
  estadia?: IEstadia;

  constructor(protected estadiaService: EstadiaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadiaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('estadiaListModification');
      this.activeModal.close();
    });
  }
}
