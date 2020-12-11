import { IEstadia } from 'app/shared/model/estadia.model';

export interface INota {
  id?: number;
  estadiaID?: number;
  valorTotal?: number;
  estadiaID?: IEstadia;
}

export class Nota implements INota {
  constructor(public id?: number, public estadiaID?: number, public valorTotal?: number, public estadiaID?: IEstadia) {}
}
