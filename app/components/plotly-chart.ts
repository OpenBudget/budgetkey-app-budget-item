import {Component, ViewChild, ElementRef, Input} from '@angular/core';
import {MushonKeyChart, MushonKeyFlowGroup, MushonKeyFlow} from 'mushonkey/lib/components/MushonkeyComponent';
import { Location } from '@angular/common';
import * as d3 from 'd3';

declare const Plotly: any;
declare const window: any;

@Component({
  selector: 'budgetkey-plotly-chart',
  template: `
    <div class='mushonkey-wrapper' [style.height]="chartHeight" #mushonkey >
        <mushonkey [chart]="mushonkeyChart" (onSelected)="onSelected($event)"></mushonkey>
    </div>
    <div style="direction: ltr" #plot>
    </div>
  `,
  styles: [`
      .mushonkey-wrapper {
        width: 90%;
        padding-right: 5%;
        direction: ltr;
      }
      
      
      :host >>> .centerpiece { 
          /*stroke: lightgray;*/
          /*stroke-width: 2;*/
          fill: url('#centerPiece');
      }

      :host >>> .centerpiece-text { 
          font-size: 20px;
          stroke: none;
          fill: #7A6B99;
      }
      
      :host >>> .text { font-family: "Abraham TRIAL"; }
      
      :host >>> .budget-expense.connector { stroke: lightblue; }
      :host >>> .budget-expense.text { fill: voilet; }

      :host >>> .budget-parent.connector { stroke: #E4DCF5; }
      :host >>> .budget-parent.text { fill: #7A6B99; }

      :host >>> .budget-revenues.connector { stroke: violet; }
      :host >>> .budget-revenues.text { fill: black; }

`]
})
export class PlotlyChartComponent {

  @Input() public data: any;
  @Input() public layout: any;

  @ViewChild('plot') plot: ElementRef;
  @ViewChild('mushonkey') mushonkey: ElementRef;

  private mushonkeyChart: MushonKeyChart;
  private chartHeight: string;

  constructor(private location: Location) {

  }

  onSelected(context: any) {
    window.location.href = window.location.origin + '/i/' + context;
  }

  ngOnInit() {
    if (this.data.type === 'mushonkey') {
      this.chartHeight = this.data.height;
      setTimeout(() => {
        let groups: Array<MushonKeyFlowGroup> = [];
        for (let group of this.data.groups) {
          let flows: Array<MushonKeyFlow> = [];
          for (let flow of group.flows) {
            flows.unshift(new MushonKeyFlow(flow.size, flow.label, flow.context));
          }

          let mkfg = new MushonKeyFlowGroup(group.leftSide, flows, group.class, group.offset, group.width, group.slope, group.roundness);
          mkfg.labelTextSize = group.labelTextSize;
          groups.push(mkfg);
        }
        this.mushonkeyChart = new MushonKeyChart(
          groups,
          this.data.centerTitle,
          this.data.centerWidth,
          this.data.centerHeight,
          this.data.directionLeft
        );
        setTimeout(() => {
          let svg = d3.select(this.mushonkey.nativeElement).select('svg');
          let lg = svg.append('defs')
                      .append('linearGradient')
                      .attr('id', 'centerPiece');
          lg.append('stop')
            .attr('stop-color', 'lightblue')
            .attr('offset', '10%');
          lg.append('stop')
            .attr('stop-color', '#E4DCF5')
            .attr('offset', '100%');

        }, 0);
      }, 0);


    } else {
      let traces: any = this.data;
      let labels = null;
      if (traces[0].type === 'sankey') {
        labels = [];
        if (!!window.chrome) {
          if (!traces[0].node._orig_label) {
            traces[0].node._orig_label = traces[0].node.label;
            for (let label of traces[0].node._orig_label) {
              labels.push(label.split('').reverse().join(''));
            }
            traces[0].node.label = labels;
          }
        }
      }

      let layout = Object.assign({
        height: 600,
        font: {
          size: 10
        }
      }, this.layout);

      Plotly.plot(this.plot.nativeElement, traces, layout);
    }
  }
}
