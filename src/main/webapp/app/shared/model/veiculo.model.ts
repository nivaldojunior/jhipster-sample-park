export interface IVeiculo {
  id?: number;
  modelo?: string;
  placa?: string;
  marca?: string;
}

export class Veiculo implements IVeiculo {
  constructor(public id?: number, public modelo?: string, public placa?: string, public marca?: string) {}
}
