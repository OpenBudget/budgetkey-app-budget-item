import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import { BudgetKeyCommonModule, THEME_TOKEN as NG_COMPONENTS_THEME_TOKEN } from 'budgetkey-ng2-components';
import { MushonkeyModule } from 'mushonkey';

import { RenderTemplatePipe, PairsPipe, KeysPipe , ItemLinkPipe, SearchLinkPipe } from './pipes';

import { BudgetKeyItemService, QuestionsService, StoreService, EventsService, ThemeService } from './services';

import {
  BeadcrumbsComponent,
  ItemQuestionsComponent,
  ItemQuestionParameterComponent,
  ItemDataTableComponent,
  ItemInfoComponent,
  ItemVisualizationsComponent,
  PlotlyChartComponent,
} from './components';

import { THEME_TOKEN, defaultTheme, THEME_ID_TOKEN } from './config';

declare const BUDGETKEY_NG2_COMPONENTS_THEME: any;
declare const BUDGETKEY_APP_GENERIC_ITEM_THEME: any;
declare const BUDGETKEY_THEME_ID: any;

let providers: any[] = [
  Title,
  BudgetKeyItemService,
  QuestionsService,
  StoreService,
  EventsService,
  {
    provide: THEME_TOKEN,
    useValue: typeof(BUDGETKEY_APP_GENERIC_ITEM_THEME) === 'undefined' ? defaultTheme : BUDGETKEY_APP_GENERIC_ITEM_THEME
  },
  {provide: THEME_ID_TOKEN, useValue: typeof(BUDGETKEY_THEME_ID) === 'undefined' ? null : BUDGETKEY_THEME_ID},
  ThemeService
];
if (typeof(BUDGETKEY_NG2_COMPONENTS_THEME) !== 'undefined') {
  providers.push({provide: NG_COMPONENTS_THEME_TOKEN, useValue: BUDGETKEY_NG2_COMPONENTS_THEME});
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BudgetKeyCommonModule,
    MushonkeyModule
  ],
  declarations: [
    RenderTemplatePipe,
    PairsPipe,
    KeysPipe,
    ItemLinkPipe,
    SearchLinkPipe,
    AppComponent,
    BeadcrumbsComponent,
    ItemQuestionsComponent,
    ItemQuestionParameterComponent,
    ItemDataTableComponent,
    ItemInfoComponent,
    ItemVisualizationsComponent,
    PlotlyChartComponent,
  ],
  providers: providers,
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
