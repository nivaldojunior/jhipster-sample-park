import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleParkTestModule } from '../../../test.module';
import { EstadiaDetailComponent } from 'app/entities/estadia/estadia-detail.component';
import { Estadia } from 'app/shared/model/estadia.model';

describe('Component Tests', () => {
  describe('Estadia Management Detail Component', () => {
    let comp: EstadiaDetailComponent;
    let fixture: ComponentFixture<EstadiaDetailComponent>;
    const route = ({ data: of({ estadia: new Estadia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleParkTestModule],
        declarations: [EstadiaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EstadiaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadiaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadia on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
