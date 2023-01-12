import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/IResponse';
import { IVacancy } from '../models/ivacancy';

@Injectable({
  providedIn: 'root'
})
export class LinkDevService {

  constructor(private _http: HttpClient) { }

  getVacanciesList(pageNo: number, name: string): Observable<IResponse> {
    return this._http.get<IResponse>(`${environment.linkDevUrl}/vacancy/get-all?Page=${pageNo}&Name=${name}`);
  }

  getVacancyById(id: number): Observable<IResponse> {
    return this._http.get<IResponse>(`${environment.linkDevUrl}/vacancy/get-by-id/${id}`);
  }

  createVacancy(model: IVacancy): Observable<IResponse> {
    return this._http.post<IResponse>(`${environment.linkDevUrl}/vacancy/Create`, model);
  }

  updateVacancy(model: IVacancy): Observable<IResponse> {
    return this._http.put<IResponse>(`${environment.linkDevUrl}/vacancy/update`, model);
  }


  deleteVacancy(id: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${environment.linkDevUrl}/vacancy/delete/${id}`);
  }
}
