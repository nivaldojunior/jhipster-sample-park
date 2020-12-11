export interface IValor {
  id?: number;
  primeiraHora?: number;
  demaisHoras?: number;
}

export class Valor implements IValor {
  constructor(public id?: number, public primeiraHora?: number, public demaisHoras?: number) {}
}
