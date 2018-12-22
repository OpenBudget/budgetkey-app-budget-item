import { Component, Input, Inject, OnInit } from '@angular/core';

import {THEME_TOKEN} from 'budgetkey-ng2-components';

@Component({
  selector: 'budgetkey-chart-adamkey-wrapper',
  template: `
  <budgetkey-chart-adamkey [data]="data"></budgetkey-chart-adamkey>
  `,
  styles: [
    `
    ::ng-deep .label-col a {
      color: #5A32D1;
      font-family: "Abraham TRIAL";
      font-size: 14px;
      text-align: right;
    }

    ::ng-deep .selected .label-col a {
      color: #FFFFF;
    }

`
  ]
})
export class AdamKeyChartWrapperComponent implements OnInit  {

  @Input() public data: any;

  constructor(@Inject(THEME_TOKEN) private ngComponentsTheme: any) {
  }

  ngOnInit() {
    for (const v of this.data.values) {
      if (this.ngComponentsTheme.themeId) {
        v.label = v.label.replace('theme=budgetkey', 'theme=' + this.ngComponentsTheme.themeId);
      }
    }
  }

}
