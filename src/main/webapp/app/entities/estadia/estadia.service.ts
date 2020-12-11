import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadia } from 'app/shared/model/estadia.model';

type EntityResponseType = HttpResponse<IEstadia>;
type EntityArrayResponseType = HttpResponse<IEstadia[]>;

@Injectable({ providedIn: 'root' })
export class EstadiaService {
  public resourceUrl = SERVER_API_URL + 'api/estadias';

  constructor(protected http: HttpClient) {}

  create(estadia: IEstadia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(estadia);
    return this.http
      .post<IEstadia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(estadia: IEstadia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(estadia);
    return this.http
      .put<IEstadia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEstadia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEstadia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(estadia: IEstadia): IEstadia {
    const copy: IEstadia = Object.assign({}, estadia, {
      entrada: estadia.entrada && estadia.entrada.isValid() ? estadia.entrada.toJSON() : undefined,
      saida: estadia.saida && estadia.saida.isValid() ? estadia.saida.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.entrada = res.body.entrada ? moment(res.body.entrada) : undefined;
      res.body.saida = res.body.saida ? moment(res.body.saida) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((estadia: IEstadia) => {
        estadia.entrada = estadia.entrada ? moment(estadia.entrada) : undefined;
        estadia.saida = estadia.saida ? moment(estadia.saida) : undefined;
      });
    }
    return res;
  }
}
