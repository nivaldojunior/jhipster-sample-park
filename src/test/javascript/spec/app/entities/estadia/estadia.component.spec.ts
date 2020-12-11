import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleParkTestModule } from '../../../test.module';
import { EstadiaComponent } from 'app/entities/estadia/estadia.component';
import { EstadiaService } from 'app/entities/estadia/estadia.service';
import { Estadia } from 'app/shared/model/estadia.model';

describe('Component Tests', () => {
  describe('Estadia Management Component', () => {
    let comp: EstadiaComponent;
    let fixture: ComponentFixture<EstadiaComponent>;
    let service: EstadiaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleParkTestModule],
        declarations: [EstadiaComponent],
      })
        .overrideTemplate(EstadiaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadiaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadiaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Estadia(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadias && comp.estadias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
