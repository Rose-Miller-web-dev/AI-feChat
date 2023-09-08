import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {DashboardService} from "../../services/dashboard.service";
import {Router} from "@angular/router";


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  data: any;
  totalProcesses: string;
  totalDuration: string;
  loggedInUsername = '';
  isLogged = false;
  type: string;
  asrDuration: string;
  asrProcesses: string;
  spkDuration: string;
  spkProcesses: string;
  ttsDuration: string;
  ttsProcesses: string;
  vcDuration: string;
  vcProcesses: string;
  constructor(private dashboardService: DashboardService,
              private router: Router
  ) {}
    ngOnInit(){
      const status = 'done';
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (isLoggedIn === 'true') {
        // User is logged in, continue with the normal initialization
        this.loggedInUsername = localStorage.getItem('email')
        // this.isLogged = true;
      } else {
        // User is not logged in, navigate to '/speech' path
        this.router.navigateByUrl('/speech');
      }

      this.dashboardService.getUsageByStatus(status, this.loggedInUsername).subscribe(
        response => {
          // Handle the response here
          // this.data = response;
          this.totalDuration= parseFloat(response["totalDuration"]).toFixed(2);
          this.totalProcesses= response["totalProcesses"];
          // parseFloat(this.totalProcesses).toFixed(2)
// console.log(response);
// console.log(this.totalDuration);
// console.log(response["totalDuration"])
        },
        error => {
          // Handle the error here
          console.error(error);
        }
      );

      this.dashboardService.getUsageByTypeByStatus(status, "ASR", this.loggedInUsername).subscribe(
        response => {

          this.asrDuration= parseFloat(response["totalDuration"]).toFixed(2);
          this.asrProcesses= response["totalProcesses"];

        },
        error => {
          // Handle the error here
          console.error(error);
        }
      );

      this.dashboardService.getUsageByTypeByStatus(status, "SPK", this.loggedInUsername).subscribe(
        response => {

          this.spkDuration= parseFloat(response["totalDuration"]).toFixed(2);
          this.spkProcesses= response["totalProcesses"];

        },
        error => {
          // Handle the error here
          console.error(error);
        }
      );

      this.dashboardService.getUsageByTypeByStatus(status, "TTS", this.loggedInUsername).subscribe(
        response => {

          this.ttsProcesses= response["totalProcesses"];

        },
        error => {
          // Handle the error here
          console.error(error);
        }
      );

      this.dashboardService.getUsageByTypeByStatus(status, "VC", this.loggedInUsername).subscribe(
        response => {

          this.vcProcesses= response["totalProcesses"];

        },
        error => {
          // Handle the error here
          console.error(error);
        }
      );

      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
            },
            // {
            //   borderColor: "#f17e5d",
            //   backgroundColor: "#f17e5d",
            //   pointRadius: 0,
            //   pointHoverRadius: 0,
            //   borderWidth: 3,
            //   data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            // },
            // {
            //   borderColor: "#fcc468",
            //   backgroundColor: "#fcc468",
            //   pointRadius: 0,
            //   pointHoverRadius: 0,
            //   borderWidth: 3,
            //   data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            // }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });


      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }

  protected readonly parseFloat = parseFloat;
}
