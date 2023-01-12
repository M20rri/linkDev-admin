import { IVacancy } from './../models/ivacancy';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LinkDevService } from '../services/link-dev.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private _linkDev: LinkDevService, private route: ActivatedRoute) { }

  public title: string = 'Vacancies';
  public vacancies !: Array<IVacancy>;
  public isLoading: boolean = false;

  public page: number = 1;
  public count: number = 0;
  public tableSize: number = environment.pageSize;
  public searchByName: string = '';

  async ngOnInit() {
    await this.getVacancies();
  }

  onTableDataChange = async (event: any) => {
    this.page = event;
    await this.getVacancies();
  };

  filterByName = async () => {
    this.page = 1;
    await this.getVacancies();
  }

  getVacancies = async () => {
    this.isLoading = true;
    await this._linkDev.getVacanciesList(this.page, this.searchByName).subscribe(res => {
      this.isLoading = false;
      const { totalCount, vacancies } = res.data;
      this.vacancies = vacancies;
      this.count = totalCount;

    })
  }

}
