import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  base_url = environment.pathUrl;
  menuList: any = {
    user: [{ title: 'Users', name: '', url: '/users', colorClass: 'info' }],
  };
  chart = new Chart({
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
      },

      // verticalAlign: 'top',
      marginLeft: -10,
      marginTop: 10,
      height: 150,
    },
    accessibility: {
      enabled: false,
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      x: -20,
      y: 80,
    },
    title: {
      text: '54GB/128GB',
      x: 65,
      y: 30,
      style: {
        color: '#171832',
        fontSize: '16px',
        fontWeight: '700',
        fontFamily: 'circular std',
      },
    },
    subtitle: {
      text: 'Available Space',
      x: 60,
      y: 10,
      style: {
        color: '#9f9faa',
        fontSize: '12px',
        fontWeight: '400',
        fontFamily: 'circular std',
      },
    },
    plotOptions: {
      pie: {
        innerSize: 40,
        depth: 45,

        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: 'pie',
        data: [
          ['Used', 90],
          ['Available', 270],
        ],
      },
    ],
  });
  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.authService.getUserDetail().subscribe(
        (success: any) => {
          // console.log("window.location", window.location);
        },
        (err) => {}
      );
    }
  }

  ngOnInit() {}

  ngOnDestroy() {}

  saveDashboardFilter(item: any) {
    localStorage.setItem('dashboardFilter', item.name);
    this.router.navigate([item.url]);
  }
}
