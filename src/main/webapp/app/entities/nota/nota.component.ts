import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INota } from 'app/shared/model/nota.model';
import { NotaService } from './nota.service';
import { NotaDeleteDialogComponent } from './nota-delete-dialog.component';

@Component({
  selector: 'jhi-nota',
  templateUrl: './nota.component.html',
})
export class NotaComponent implements OnInit, OnDestroy {
  notas?: INota[];
  eventSubscriber?: Subscription;

  constructor(protected notaService: NotaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.notaService.query().subscribe((res: HttpResponse<INota[]>) => (this.notas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNotas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INota): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNotas(): void {
    this.eventSubscriber = this.eventManager.subscribe('notaListModification', () => this.loadAll());
  }

  delete(nota: INota): void {
    const modalRef = this.modalService.open(NotaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.nota = nota;
  }
}
