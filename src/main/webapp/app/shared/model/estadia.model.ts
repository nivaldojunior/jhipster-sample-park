import { Moment } from 'moment';
import { IVeiculo } from 'app/shared/model/veiculo.model';

export interface IEstadia {
  id?: number;
  veiculoID?: number;
  entrada?: Moment;
  saida?: Moment;
  veiculoID?: IVeiculo;
}

export class Estadia implements IEstadia {
  constructor(public id?: number, public veiculoID?: number, public entrada?: Moment, public saida?: Moment, public veiculoID?: IVeiculo) {}
}
