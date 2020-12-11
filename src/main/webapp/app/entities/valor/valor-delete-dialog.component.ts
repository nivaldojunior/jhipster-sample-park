import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IValor } from 'app/shared/model/valor.model';
import { ValorService } from './valor.service';

@Component({
  templateUrl: './valor-delete-dialog.component.html',
})
export class ValorDeleteDialogComponent {
  valor?: IValor;

  constructor(protected valorService: ValorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.valorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('valorListModification');
      this.activeModal.close();
    });
  }
}
