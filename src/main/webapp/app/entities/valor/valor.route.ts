import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IValor, Valor } from 'app/shared/model/valor.model';
import { ValorService } from './valor.service';
import { ValorComponent } from './valor.component';
import { ValorDetailComponent } from './valor-detail.component';
import { ValorUpdateComponent } from './valor-update.component';

@Injectable({ providedIn: 'root' })
export class ValorResolve implements Resolve<IValor> {
  constructor(private service: ValorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IValor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((valor: HttpResponse<Valor>) => {
          if (valor.body) {
            return of(valor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Valor());
  }
}

export const valorRoute: Routes = [
  {
    path: '',
    component: ValorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Valors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ValorDetailComponent,
    resolve: {
      valor: ValorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Valors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ValorUpdateComponent,
    resolve: {
      valor: ValorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Valors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ValorUpdateComponent,
    resolve: {
      valor: ValorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Valors',
    },
    canActivate: [UserRouteAccessService],
  },
];
