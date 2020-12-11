import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVeiculo, Veiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from './veiculo.service';
import { VeiculoComponent } from './veiculo.component';
import { VeiculoDetailComponent } from './veiculo-detail.component';
import { VeiculoUpdateComponent } from './veiculo-update.component';

@Injectable({ providedIn: 'root' })
export class VeiculoResolve implements Resolve<IVeiculo> {
  constructor(private service: VeiculoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVeiculo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((veiculo: HttpResponse<Veiculo>) => {
          if (veiculo.body) {
            return of(veiculo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Veiculo());
  }
}

export const veiculoRoute: Routes = [
  {
    path: '',
    component: VeiculoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Veiculos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VeiculoDetailComponent,
    resolve: {
      veiculo: VeiculoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Veiculos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VeiculoUpdateComponent,
    resolve: {
      veiculo: VeiculoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Veiculos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VeiculoUpdateComponent,
    resolve: {
      veiculo: VeiculoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Veiculos',
    },
    canActivate: [UserRouteAccessService],
  },
];
