import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleParkSharedModule } from 'app/shared/shared.module';
import { ValorComponent } from './valor.component';
import { ValorDetailComponent } from './valor-detail.component';
import { ValorUpdateComponent } from './valor-update.component';
import { ValorDeleteDialogComponent } from './valor-delete-dialog.component';
import { valorRoute } from './valor.route';

@NgModule({
  imports: [JhipsterSampleParkSharedModule, RouterModule.forChild(valorRoute)],
  declarations: [ValorComponent, ValorDetailComponent, ValorUpdateComponent, ValorDeleteDialogComponent],
  entryComponents: [ValorDeleteDialogComponent],
})
export class JhipsterSampleParkValorModule {}
