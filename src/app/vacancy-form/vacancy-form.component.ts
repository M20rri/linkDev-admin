import { LinkDevService } from './../services/link-dev.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVacancy } from '../models/ivacancy';
import { Toaster } from 'ngx-toast-notifications';
import { ToastPosition, ToastType } from '../models/toastEnum';

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.css']
})
export class VacancyFormComponent implements OnInit {

  public id: number = 0;
  public vacancy: IVacancy = new IVacancy();
  public cardHeader: string = 'Create a new Vacancy';
  public isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private toastr: Toaster, private router: Router, private _linkDev: LinkDevService) {

  }


  async ngOnInit() {
    await this.loadPost();
  }

  loadPost = async () => {
    await this.route.params.subscribe(async params => {
      if (params['id']) {
        this.id = parseInt(params['id']);
        this.isLoading = true;
        await this._linkDev.getVacancyById(this.id).subscribe(res => {
          this.isLoading = false;
          this.vacancy = res.data;
          this.cardHeader = 'Update Vacancy'
        });
      }
    });
  }

  convert = (str: string) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  onSubmit = async () => {

    this.vacancy.validFrom = this.convert(this.vacancy.validFrom);
    this.vacancy.validTo = this.convert(this.vacancy.validTo);

    if (this.id > 0) {
      await this._linkDev.updateVacancy(this.vacancy).subscribe(res => {
        this.toastr.open({ text: `Vacancy #${res.data} Updated successfully`, caption: 'LikDev', duration: 4000, type: ToastType.success, position: ToastPosition.topRight });
      });
    } else {
      await this._linkDev.createVacancy(this.vacancy).subscribe(res => {
        if (res.statusCode == 400) {
          this.toastr.open({ text: res.data, caption: 'LikDev', duration: 4000, type: ToastType.danger, position: ToastPosition.topRight });
          return;
        }
        this.toastr.open({ text: `Vacancy #${res.data} Created successfully`, caption: 'LikDev', duration: 4000, type: ToastType.success, position: ToastPosition.topRight });
        this.router.navigate(['vacancy']);
      });
    }



  }

}
