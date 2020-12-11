import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EstadiaService } from 'app/entities/estadia/estadia.service';
import { IEstadia, Estadia } from 'app/shared/model/estadia.model';

describe('Service Tests', () => {
  describe('Estadia Service', () => {
    let injector: TestBed;
    let service: EstadiaService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadia;
    let expectedResult: IEstadia | IEstadia[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EstadiaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Estadia(0, 0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            entrada: currentDate.format(DATE_TIME_FORMAT),
            saida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Estadia', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            entrada: currentDate.format(DATE_TIME_FORMAT),
            saida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            entrada: currentDate,
            saida: currentDate,
          },
          returnedFromService
        );

        service.create(new Estadia()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Estadia', () => {
        const returnedFromService = Object.assign(
          {
            veiculoID: 1,
            entrada: currentDate.format(DATE_TIME_FORMAT),
            saida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            entrada: currentDate,
            saida: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Estadia', () => {
        const returnedFromService = Object.assign(
          {
            veiculoID: 1,
            entrada: currentDate.format(DATE_TIME_FORMAT),
            saida: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            entrada: currentDate,
            saida: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Estadia', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
