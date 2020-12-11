import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleParkTestModule } from '../../../test.module';
import { ValorDetailComponent } from 'app/entities/valor/valor-detail.component';
import { Valor } from 'app/shared/model/valor.model';

describe('Component Tests', () => {
  describe('Valor Management Detail Component', () => {
    let comp: ValorDetailComponent;
    let fixture: ComponentFixture<ValorDetailComponent>;
    const route = ({ data: of({ valor: new Valor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleParkTestModule],
        declarations: [ValorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ValorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ValorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load valor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.valor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
