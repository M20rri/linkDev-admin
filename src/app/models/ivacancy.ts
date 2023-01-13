export class IVacancy {
  id: number = 0;
  name: string = '';
  description: string = '';
  responsibilities: string = '';
  skills: string = '';
  category: string = '';
  validFrom: string = '';
  validTo: string = '';
  maxApplicants: number = 0;
}


export interface IVacancyPagination {
  vacancies: IVacancy[];
  totalCount: number;
}

export interface IApplicant {
  id: number;
  name: string;
  email: string;
  mobile: string;
}
