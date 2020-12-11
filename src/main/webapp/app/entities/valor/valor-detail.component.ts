import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IValor } from 'app/shared/model/valor.model';

@Component({
  selector: 'jhi-valor-detail',
  templateUrl: './valor-detail.component.html',
})
export class ValorDetailComponent implements OnInit {
  valor: IValor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valor }) => (this.valor = valor));
  }

  previousState(): void {
    window.history.back();
  }
}
