import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVeiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from './veiculo.service';
import { VeiculoDeleteDialogComponent } from './veiculo-delete-dialog.component';

@Component({
  selector: 'jhi-veiculo',
  templateUrl: './veiculo.component.html',
})
export class VeiculoComponent implements OnInit, OnDestroy {
  veiculos?: IVeiculo[];
  eventSubscriber?: Subscription;

  constructor(protected veiculoService: VeiculoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.veiculoService.query().subscribe((res: HttpResponse<IVeiculo[]>) => (this.veiculos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVeiculos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVeiculo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVeiculos(): void {
    this.eventSubscriber = this.eventManager.subscribe('veiculoListModification', () => this.loadAll());
  }

  delete(veiculo: IVeiculo): void {
    const modalRef = this.modalService.open(VeiculoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.veiculo = veiculo;
  }
}
