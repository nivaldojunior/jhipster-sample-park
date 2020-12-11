import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleParkTestModule } from '../../../test.module';
import { ValorUpdateComponent } from 'app/entities/valor/valor-update.component';
import { ValorService } from 'app/entities/valor/valor.service';
import { Valor } from 'app/shared/model/valor.model';

describe('Component Tests', () => {
  describe('Valor Management Update Component', () => {
    let comp: ValorUpdateComponent;
    let fixture: ComponentFixture<ValorUpdateComponent>;
    let service: ValorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleParkTestModule],
        declarations: [ValorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ValorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Valor(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Valor();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
