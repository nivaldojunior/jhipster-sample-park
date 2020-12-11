import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleParkSharedModule } from 'app/shared/shared.module';
import { VeiculoComponent } from './veiculo.component';
import { VeiculoDetailComponent } from './veiculo-detail.component';
import { VeiculoUpdateComponent } from './veiculo-update.component';
import { VeiculoDeleteDialogComponent } from './veiculo-delete-dialog.component';
import { veiculoRoute } from './veiculo.route';

@NgModule({
  imports: [JhipsterSampleParkSharedModule, RouterModule.forChild(veiculoRoute)],
  declarations: [VeiculoComponent, VeiculoDetailComponent, VeiculoUpdateComponent, VeiculoDeleteDialogComponent],
  entryComponents: [VeiculoDeleteDialogComponent],
})
export class JhipsterSampleParkVeiculoModule {}
