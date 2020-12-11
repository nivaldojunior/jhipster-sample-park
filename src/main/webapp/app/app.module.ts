import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterSampleParkSharedModule } from 'app/shared/shared.module';
import { JhipsterSampleParkCoreModule } from 'app/core/core.module';
import { JhipsterSampleParkAppRoutingModule } from './app-routing.module';
import { JhipsterSampleParkHomeModule } from './home/home.module';
import { JhipsterSampleParkEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterSampleParkSharedModule,
    JhipsterSampleParkCoreModule,
    JhipsterSampleParkHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterSampleParkEntityModule,
    JhipsterSampleParkAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class JhipsterSampleParkAppModule {}
