import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleParkTestModule } from '../../../test.module';
import { ValorComponent } from 'app/entities/valor/valor.component';
import { ValorService } from 'app/entities/valor/valor.service';
import { Valor } from 'app/shared/model/valor.model';

describe('Component Tests', () => {
  describe('Valor Management Component', () => {
    let comp: ValorComponent;
    let fixture: ComponentFixture<ValorComponent>;
    let service: ValorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleParkTestModule],
        declarations: [ValorComponent],
      })
        .overrideTemplate(ValorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Valor(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.valors && comp.valors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
