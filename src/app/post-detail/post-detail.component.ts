import { IApplicant } from './../models/ivacancy';
import { LinkDevService } from './../services/link-dev.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVacancy } from '../models/ivacancy';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Toaster } from 'ngx-toast-notifications';
import { ToastPosition, ToastType } from '../models/toastEnum';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public id: number = 0;
  public post !: IVacancy;
  public applicants: Array<IApplicant> = [];
  public closeResult: string = '';


  constructor(private route: ActivatedRoute, public toastr: Toaster, private router: Router, private confirm: NgxBootstrapConfirmService, private _linkDev: LinkDevService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost = () => {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this._linkDev.getVacancyById(this.id).subscribe(async res => {
        this.post = res.data;
        await this.getApplicants();
      });
    });
  }

  handleDelete = async () => {
    let options = {
      title: 'Proceed with deleting this record?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    this.confirm.confirm(options).then(async (res: boolean) => {
      if (res) {
        await this._linkDev.deleteVacancy(this.id).subscribe(_ => {
          this.toastr.open({ text: 'Deleted Sucessfully', caption: 'LinkDev', duration: 4000, type: ToastType.success, position: ToastPosition.topRight });
          this.router.navigate(['vacancy']);
        });
      }
    });
  }

  getApplicants = async () => {
    await this._linkDev.getApplicantsPerVacancy(this.id).subscribe(res => {
      this.applicants = res.data;
    })
  }

  handleCandidates = (viewContent: any) => {
    this.modalService.open(viewContent).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }


}
