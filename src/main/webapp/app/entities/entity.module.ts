import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'veiculo',
        loadChildren: () => import('./veiculo/veiculo.module').then(m => m.JhipsterSampleParkVeiculoModule),
      },
      {
        path: 'estadia',
        loadChildren: () => import('./estadia/estadia.module').then(m => m.JhipsterSampleParkEstadiaModule),
      },
      {
        path: 'nota',
        loadChildren: () => import('./nota/nota.module').then(m => m.JhipsterSampleParkNotaModule),
      },
      {
        path: 'valor',
        loadChildren: () => import('./valor/valor.module').then(m => m.JhipsterSampleParkValorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterSampleParkEntityModule {}
