import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleParkTestModule } from '../../../test.module';
import { EstadiaUpdateComponent } from 'app/entities/estadia/estadia-update.component';
import { EstadiaService } from 'app/entities/estadia/estadia.service';
import { Estadia } from 'app/shared/model/estadia.model';

describe('Component Tests', () => {
  describe('Estadia Management Update Component', () => {
    let comp: EstadiaUpdateComponent;
    let fixture: ComponentFixture<EstadiaUpdateComponent>;
    let service: EstadiaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleParkTestModule],
        declarations: [EstadiaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EstadiaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadiaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadiaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Estadia(123);
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
        const entity = new Estadia();
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
