import { Component, Input, Inject } from '@angular/core';

import {THEME_TOKEN as NG_COMPONENTS_THEME_TOKEN} from 'budgetkey-ng2-components';

@Component({
  selector: 'budgetkey-chart-adamkey-wrapper',
  template: `
  <budgetkey-chart-adamkey [data]="data"></budgetkey-chart-adamkey>
  `
})
export class AdamKeyChartWrapperComponent  {

  @Input() public data: any;

  constructor(@Inject(NG_COMPONENTS_THEME_TOKEN) private ngComponentsTheme: any) {
  }

  ngOnInit() {
    for (let v of this.data.values) {
      if (this.ngComponentsTheme.themeId) {
        v.label = v.label.replace('theme=budgetkey', 'theme=' + this.ngComponentsTheme.themeId);
      }
    }
  }

}