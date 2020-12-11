import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleParkTestModule } from '../../../test.module';
import { VeiculoComponent } from 'app/entities/veiculo/veiculo.component';
import { VeiculoService } from 'app/entities/veiculo/veiculo.service';
import { Veiculo } from 'app/shared/model/veiculo.model';

describe('Component Tests', () => {
  describe('Veiculo Management Component', () => {
    let comp: VeiculoComponent;
    let fixture: ComponentFixture<VeiculoComponent>;
    let service: VeiculoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleParkTestModule],
        declarations: [VeiculoComponent],
      })
        .overrideTemplate(VeiculoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VeiculoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VeiculoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Veiculo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.veiculos && comp.veiculos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
