import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadia } from 'app/shared/model/estadia.model';
import { EstadiaService } from './estadia.service';
import { EstadiaDeleteDialogComponent } from './estadia-delete-dialog.component';

@Component({
  selector: 'jhi-estadia',
  templateUrl: './estadia.component.html',
})
export class EstadiaComponent implements OnInit, OnDestroy {
  estadias?: IEstadia[];
  eventSubscriber?: Subscription;

  constructor(protected estadiaService: EstadiaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.estadiaService.query().subscribe((res: HttpResponse<IEstadia[]>) => (this.estadias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEstadias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstadia): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstadias(): void {
    this.eventSubscriber = this.eventManager.subscribe('estadiaListModification', () => this.loadAll());
  }

  delete(estadia: IEstadia): void {
    const modalRef = this.modalService.open(EstadiaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadia = estadia;
  }
}
