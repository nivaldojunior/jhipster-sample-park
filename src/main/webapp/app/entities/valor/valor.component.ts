import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IValor } from 'app/shared/model/valor.model';
import { ValorService } from './valor.service';
import { ValorDeleteDialogComponent } from './valor-delete-dialog.component';

@Component({
  selector: 'jhi-valor',
  templateUrl: './valor.component.html',
})
export class ValorComponent implements OnInit, OnDestroy {
  valors?: IValor[];
  eventSubscriber?: Subscription;

  constructor(protected valorService: ValorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.valorService.query().subscribe((res: HttpResponse<IValor[]>) => (this.valors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInValors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IValor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInValors(): void {
    this.eventSubscriber = this.eventManager.subscribe('valorListModification', () => this.loadAll());
  }

  delete(valor: IValor): void {
    const modalRef = this.modalService.open(ValorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.valor = valor;
  }
}
