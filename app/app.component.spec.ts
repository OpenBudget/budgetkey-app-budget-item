import 'karma-test-shim';
import './rxjs-extensions';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {BudgetKeyCommonModule} from 'budgetkey-ng2-components';
import { MushonkeyModule } from 'mushonkey';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';

import { RenderTemplatePipe, PairsPipe, KeysPipe } from './pipes';

import { BudgetKeyItemService, QuestionsService, StoreService, EventsService } from './services';

import {
  BeadcrumbsComponent,
  ItemQuestionsComponent,
  ItemQuestionParameterComponent,
  ItemDataTableComponent,
  ItemContainerComponent,
  ItemDirective,

  ChartRouterComponent,
  VerticalLayoutComponent,
  HorizontallLayoutComponent,

  MushonKeyChartComponent,
  PlotlyChartComponent,
  HorizontalBarchartChartComponent,
  AdamKeyChartComponent,
  TemplateChartComponent,
  PointatronChartComponent,
  ComparatronChartComponent,
  SpendomatChartComponent,
  SpendomatChartComponentRow,

  SimpleItemInfoComponent,
  SimpleItemVisualizationsComponent,
  SimpleItemComponent,

  ReportItemInfoComponent,
  ReportItemComponent,

  OrgItemInfoComponent,
  OrgItemComponent,
  SafeHtmlPipe,
} from './components';

import {defaultTheme, THEME_TOKEN} from './config';

describe('AppComponent', function () {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
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
        AppComponent,
        BeadcrumbsComponent,
        ItemQuestionsComponent,
        ItemQuestionParameterComponent,
        ItemDataTableComponent,
        ItemContainerComponent,
        ItemDirective,
        SafeHtmlPipe,

        ChartRouterComponent,
        VerticalLayoutComponent,
        HorizontallLayoutComponent,

        PlotlyChartComponent,
        MushonKeyChartComponent,
        HorizontalBarchartChartComponent,
        AdamKeyChartComponent,
        TemplateChartComponent,
        PointatronChartComponent,
        ComparatronChartComponent,
        SpendomatChartComponent,
        SpendomatChartComponentRow,

        SimpleItemInfoComponent,
        SimpleItemVisualizationsComponent,
        SimpleItemComponent,

        ReportItemInfoComponent,
        ReportItemComponent,

        OrgItemInfoComponent,
        OrgItemComponent,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: THEME_TOKEN, useValue: defaultTheme},
        BudgetKeyItemService,
        QuestionsService,
        StoreService,
        EventsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );
});
