import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVeiculo } from 'app/shared/model/veiculo.model';

type EntityResponseType = HttpResponse<IVeiculo>;
type EntityArrayResponseType = HttpResponse<IVeiculo[]>;

@Injectable({ providedIn: 'root' })
export class VeiculoService {
  public resourceUrl = SERVER_API_URL + 'api/veiculos';

  constructor(protected http: HttpClient) {}

  create(veiculo: IVeiculo): Observable<EntityResponseType> {
    return this.http.post<IVeiculo>(this.resourceUrl, veiculo, { observe: 'response' });
  }

  update(veiculo: IVeiculo): Observable<EntityResponseType> {
    return this.http.put<IVeiculo>(this.resourceUrl, veiculo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVeiculo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVeiculo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
