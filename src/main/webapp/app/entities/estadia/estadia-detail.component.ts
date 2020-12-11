import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadia } from 'app/shared/model/estadia.model';

@Component({
  selector: 'jhi-estadia-detail',
  templateUrl: './estadia-detail.component.html',
})
export class EstadiaDetailComponent implements OnInit {
  estadia: IEstadia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadia }) => (this.estadia = estadia));
  }

  previousState(): void {
    window.history.back();
  }
}
