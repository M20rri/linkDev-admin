import { LinkDevService } from './../services/link-dev.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVacancy } from '../models/ivacancy';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Toaster } from 'ngx-toast-notifications';
import { ToastPosition, ToastType } from '../models/toastEnum';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public id: number = 0;
  public post !: IVacancy;

  constructor(private route: ActivatedRoute, public toastr: Toaster, private router: Router, private confirm: NgxBootstrapConfirmService, private _linkDev: LinkDevService) { }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost = () => {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this._linkDev.getVacancyById(this.id).subscribe(res => {
        this.post = res.data;
      });
    });
  }

  handleDelete = () => {
    let options = {
      title: 'Are you sure ?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    this.confirm.confirm(options).then((res: boolean) => {
      if (res) {
        this._linkDev.deleteVacancy(this.id).subscribe(res => {
          this.toastr.open({ text: 'Deleted Sucessfully', caption: 'LinkDev', duration: 4000, type: ToastType.success, position: ToastPosition.topRight });
          this.router.navigate(['vacancy']);
        });
      }
    });
  }



}
