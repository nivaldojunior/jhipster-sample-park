import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstadia, Estadia } from 'app/shared/model/estadia.model';
import { EstadiaService } from './estadia.service';
import { EstadiaComponent } from './estadia.component';
import { EstadiaDetailComponent } from './estadia-detail.component';
import { EstadiaUpdateComponent } from './estadia-update.component';

@Injectable({ providedIn: 'root' })
export class EstadiaResolve implements Resolve<IEstadia> {
  constructor(private service: EstadiaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estadia: HttpResponse<Estadia>) => {
          if (estadia.body) {
            return of(estadia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Estadia());
  }
}

export const estadiaRoute: Routes = [
  {
    path: '',
    component: EstadiaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Estadias',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadiaDetailComponent,
    resolve: {
      estadia: EstadiaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Estadias',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadiaUpdateComponent,
    resolve: {
      estadia: EstadiaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Estadias',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadiaUpdateComponent,
    resolve: {
      estadia: EstadiaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Estadias',
    },
    canActivate: [UserRouteAccessService],
  },
];
