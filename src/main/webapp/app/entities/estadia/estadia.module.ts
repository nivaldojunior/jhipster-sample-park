import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleParkSharedModule } from 'app/shared/shared.module';
import { EstadiaComponent } from './estadia.component';
import { EstadiaDetailComponent } from './estadia-detail.component';
import { EstadiaUpdateComponent } from './estadia-update.component';
import { EstadiaDeleteDialogComponent } from './estadia-delete-dialog.component';
import { estadiaRoute } from './estadia.route';

@NgModule({
  imports: [JhipsterSampleParkSharedModule, RouterModule.forChild(estadiaRoute)],
  declarations: [EstadiaComponent, EstadiaDetailComponent, EstadiaUpdateComponent, EstadiaDeleteDialogComponent],
  entryComponents: [EstadiaDeleteDialogComponent],
})
export class JhipsterSampleParkEstadiaModule {}
