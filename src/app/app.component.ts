import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { BudgetKeyItemService, StoreService } from './services';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {THEME_TOKEN} from 'budgetkey-ng2-components';

import * as _ from 'lodash';
import * as moment from 'moment';

const gtag: any = window['gtag'];


@Component({
  selector: 'budgetkey-app-generic-item',
  template: `
    <budgetkey-container [showHeader]="true" [showSearchBar]="true">
      <div #container class="budgetkey-item-wrapper container-fluid" [ngClass]="'style-' + style">
        <budgetkey-item-container *ngIf="loaded && style" [style]="style">
        </budgetkey-item-container>

        <div #questionsPanel class="sticky questions-panel" (click)="scrollToTable()">
          <budgetkey-item-questions *ngIf="loaded"></budgetkey-item-questions>
        </div>
        <div #dataTable class="data-table">
          <budgetkey-item-data-table *ngIf="loaded"></budgetkey-item-data-table>
        </div>
        <div class='desktop-notification'>
          <img src='assets/img/desktop.svg' title='Computer by Juan Manuel Corredor from the Noun Project'/>
          <span>
              מידע ונתונים נוספים זמינים בגרסת הדסקטופ
          </span>
          <a class="btn btn-primary btn-lg"
             [href]="mailto()" target='_blank'>
             <i class='glyphicon glyphicon-share-alt'></i>&nbsp;
             שלחו לעצמכם תזכורת או שתפו
          </a>
        </div>
      </div>
    </budgetkey-container>
  `,
  styles: [`
    .sticky {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      bottom: 0;
      z-index: 9000;
    }

    .desktop-notification img {
      width: 90px;
    }

    .desktop-notification span {
      display: inline-block;
      padding: 10px 0;
    }

    .desktop-notification a {
      background-color: #734DE5;
    }

    .desktop-notification a i {
      transform: scaleX(-1);
    }
  `],
  providers: [
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
})
export class AppComponent implements AfterViewInit, OnInit  {
  loaded = true;
  style: string;

  @ViewChild('questionsPanel') questionsPanel: ElementRef;
  @ViewChild('dataTable') dataTable: ElementRef;

  scrollToTable() {
    if (_.isObject(window) && _.isFunction(window.scrollTo)) {
      const questionsPanelBounds = this.questionsPanel.nativeElement.getBoundingClientRect();
      if (questionsPanelBounds.bottom === window.innerHeight) {
        const dataTableBounds = this.dataTable.nativeElement.getBoundingClientRect();
        const questionsPanelHeight = questionsPanelBounds.bottom - questionsPanelBounds.top;
        window.scrollTo({left: 0, top: window.scrollY + dataTableBounds.top - questionsPanelHeight, behavior: 'smooth'});
      }
    }
  }

  constructor(
    private itemService: BudgetKeyItemService,
    private store: StoreService,
    private location: Location,
    @Inject(THEME_TOKEN) private ngComponentsTheme: any
  ) {
    if (window['prefetchedItem']) {
      console.log(window['prefetchedItem']);
      this.handleItem(window['prefetchedItem']);
      this.loaded = true;
    } else {
      this.loaded = false;
    }
  }

  handleItem(item: any): void {
    this.store.item = item;
    const descriptor = this.itemService.getItemDescriptor(item.doc_id);
    this.store.descriptor = descriptor;
    this.style = descriptor.style;
    this.loaded = true;
  }

  ngOnInit(): void {
    const itemId = this.location.path().replace(/^\//, '').replace(/\/$/, '');
    const searchResultsLocation = window.location.search;
    if (searchResultsLocation) {
      const li = /li=(\d+)/;
      const match = li.exec(searchResultsLocation);
      if (match && match.length > 1) {
        const position = parseInt(match[1], 10);
        if (gtag) {
          gtag('event', 'view_item', {
            'event_label': itemId,
            'value': position
          });
        }
      }
    }
   moment.locale('he');
  }

  ngAfterViewInit() {
    if (window.location.hash === '#questions') {
      window.setTimeout(() => {
        this.scrollToTable();
      }, 3000);
    }
  }

  mailto() {
    const subject = `קישור למידע מאתר "${this.ngComponentsTheme.siteName}"`;
    const body = `שלום.

העמוד ״${document.title}״ נשלח אליכם ממכשיר נייד.
לחצו כאן לצפייה בעמוד: ${window.location.href}`;
    return 'mailto:?' +
      'subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body)
    ;
  }

}
