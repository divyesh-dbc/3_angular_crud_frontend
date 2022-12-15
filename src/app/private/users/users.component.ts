import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { constant } from 'src/app/constant';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';
import { SortbyService } from 'src/app/shared/services/sortby.service';
import Swal from 'sweetalert2';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  base_url = environment.pathUrl;
  dataList: any = [];
  totalItems = 0;
  totalRecords = 0;
  searchOpened: any = false;
  userStatus: any;
  loadingStatus: any = false;
  should_open: any = false;
  searchValue = '';
  filter: any = {
    gender_search: '',
    qualification_search: '',
    status: [
      { text: 'Active', value: 'active', isChecked: false, access: 'status' },
      {
        text: 'Inactive',
        value: 'inactive',
        isChecked: false,
        access: 'status',
      },
      { text: 'Deleted', value: 'deleted', isChecked: false, access: 'delete' },
    ],
  };

  dataItem: any = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    gender: '',
    date1: '',
    city: '',
    pin: '',
    state: '',
    qualification: '',
    password: '',
    cpassword: '',
    reset_request: '1',
  };

  constructor(
    public regexService: RegexService,
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router,
    public sortbyService: SortbyService,
    private modalService: NgbModal,
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.sortbyService.column =
      '(u.first_name*1=0), CAST(u.first_name as unsigned), u.first_name';
    this.sortbyService.direction = 'asc';
    if (this.authService.isLoggedIn()) {
      this.authService.getUserDetail().subscribe(
        (success: any) => {
          this.getListInitial();
        },
        (err) => {
          this.authService.logOut();
        }
      );
    }
  }
  ngOnInit() {
    setTimeout(() => {
      this.authService.changeContentReceive.subscribe((msg: any) => {
        if (msg == 'saved') {
          this.getList();
        }
      });
    }, 0);
  }

  getListInitial() {
    this.sortbyService.page = 1;

    this.getList();
  }

  onEnter() {
    this.getListInitial();
  }
  updateStatus(id: any, status: any) {
    this.loadingStatus = true;
    Swal.fire({
      // title: 'Are you sure?',
      text: 'Are you sure you want to ' + status + ' this?',
      icon: 'warning',
      showCancelButton: true,
      // denyButtonText: 'Soft Delete',
      // denyButtonColor: '#000fff',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#000fff',
      cancelButtonColor: '#ff0000',
    }).then((result: any) => {
      if (result.isConfirmed) {
        const item = {
          id: id,
          status: status,
        };
        this.apiService.postData(constant.ACTIVE_USERS_STATUS, item).subscribe(
          (success: any) => {
            Swal.fire({
              title: 'SUCCESS',
              text: success['message'],
              icon: 'success',
            }).then((result: any) => {});
            if (this.dataList.length <= 1 && this.sortbyService.page > 1) {
              this.sortbyService.page = this.sortbyService.page - 1;
            }
            this.getList();
          },
          (err) => {
            Swal.fire({
              // title: 'ERROR',
              text: err,
              icon: 'error',
            }).then((result: any) => {});
          }
        );
      }
      this.loadingStatus = false;
    });
  }
  getList() {
    const item = {
      page: this.sortbyService.page,
      limit: this.sortbyService.itemsPerPage,
      sort_column: this.sortbyService.column,
      sort_direction: this.sortbyService.direction,
      search_text: this.filter.search_text,
      user_status: this.filter.status
        .map(function (a: any) {
          if (a.isChecked) return a.value;
        })
        .filter((item: any) => {
          return item != null;
        }),
      user_gender: this.filter.gender_search,
      user_qualification: this.filter.qualification_search,
    };
    this.apiService
      .postData(constant.GET_USERS, item)
      .subscribe((success: any) => {
        this.dataList = success['data'];
        this.totalItems = success['totalItems'];
        this.totalRecords = success['totalRecords'];
        window.scrollTo(0, 0);
      });
  }
  openEdit(item: any) {
    this.authService.userItem = { qualification: '' };
    this.authService.should_open = true;
    if (item.id) {
      setTimeout(() => {
        const idata = JSON.parse(JSON.stringify(item));

        idata.specialization = idata.specialization.split(',');
        for (let index = 0; index < idata.specialization.length; index++) {
          const ind = this.authService.specializationList.findIndex(
            (item: any) => item.name == idata.specialization[index]
          );
          if (ind > -1) {
            this.authService.specializationList[ind].checked = true;
          }
        }
        console.log('idata.user_image.file_name', idata.user_image.file_name);
        if (!idata.user_image.file_name) {
          let item1: Object = {
            file: '',
            file_name: idata.user_image,
            file_src: this.base_url + 'upload/profile/' + idata.user_image,
          };
          idata.user_image = item1;
        }
        this.authService.userItem = idata;
      });
      window.scrollTo(0, 0);
    }
  }

  deleteItem(id: any) {
    Swal.fire({
      // title: 'Are you sure?',
      text: 'Are you sure you want to delete this ?',
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: 'Soft Delete',
      denyButtonColor: '#000fff',
      confirmButtonText: 'Permanent Delete',
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#ff0000',
    }).then((result: any) => {
      if (result.isConfirmed || result.isDenied) {
        const is_hard = result.isConfirmed ? 1 : 0;
        this.apiService
          .deleteData(constant.DELETE_USERS, id + '/' + is_hard)
          .subscribe(
            (success: any) => {
              /* this.translate.get((success['message']).toString()).subscribe((res1: string) => {
                    this.toastr.success(res1, '');
                }); */
              Swal.fire({
                // title: 'Deleted',
                text: success['message'],
                icon: success['status'],
              }).then((result: any) => {});
              if (this.dataList.length <= 1) {
                this.sortbyService.page = this.sortbyService.page - 1;
              }
              this.getList();
            },
            (err) => {
              Swal.fire({
                // title: 'Delete',
                text: err,
                icon: 'error',
              }).then((result: any) => {});
            }
          );
      }
    });
  }
  pageChange(event: any) {
    this.sortbyService.page = event;
    this.getList();
  }
  clearSearch() {
    this.filter.search_text = '';
    this.filter.gender_search = '';
    this.filter.qualification_search = '';
    this.filter.status = this.filter.status.map((item: any) => {
      item.isChecked = false;
      return item;
    });
    /* for (let index = 0; index < this.filter.status.length; index++) {
      const element = this.filter.status[index];
      
    } */
    this.getListInitial();
  }
}
