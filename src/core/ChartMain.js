/*  global d3  */
// import Internal from '../subModules/internal';
import utils from '../utils/utils';

/**
Defines the main Chart class. This is the super class for
all chart types. The Main Chart class holds all the common
methods that every chart would use.
@private
*/

export class ChartMain {
  constructor() {
  }

  selectElement() {
    this.element = d3.select(this.location);
    return this;
  }

  setMargin(options) {
    if (!this.margin) {
      this.margin = utils.setDefaultMargins();
    } else {
      this.margins.margins(options);
    }
    return this;
  }

  setWidth(width) {
    if (!this.width) {
      this.width = utils.setDefaultWidth();
    } else {
      this.width.width(width);
    }
    return this;
  }

  setHeight(height) {
    if (!this.height) {
      this.height = utils.setDefaultHeight();
    } else {
      this.height.height(height);
    }
    return this;
  }

  createSVG() {
    this.svg = utils.createSVGElement(this.element, this.width.width, this.height.height, this.margin);
    return this;
  }

  setXscale(type, dataDomain, columnName) {
    this.xAxisLabel = utils.setAxisLabel(columnName);
    if (type === 'ordinal') {
      this.xScale = utils.setOridinalScale(this.width.width);
    }
// TODO: do other types of data domain
    if (dataDomain === 'string') {
      utils.mapDataDomainToString(this.xScale, this.data, columnName);
    }
    return this;
  }

  setYscale(type, dataDomain, columnName) {
    this.yAxisLabel = utils.setAxisLabel(columnName);
    if (type === 'linear') {
      this.yScale = utils.setLinearScale(this.height.height);
    }

    if (dataDomain === 'number') {
      utils.mapDataDomainToNumber(this.yScale, this.data, columnName);
    }
    return this;
  }

  setXaxis() {
    if (!this.xAxis) {
      this.xAxis = utils.createAxis('bottom', this.xScale);
      this.svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0, ' + this.height.height + ')')
              .call(this.xAxis);
    }
    // else {
    //   console.log('TODO');
    // }
    return this;
  }

  setYaxis() {
    if (!this.yAxis) {
      this.yAxis = utils.createAxis('left', this.yScale);

      this.svg.append('g')
               .attr('class', 'y axis')
               .call(this.yAxis);
    }
    // else {
    //   console.log('TODO');
    // }
    return this;
  }

  setAxisPathStyle(fill, stroke, shapeRerendering) {
    utils.setAxisStyle(this.svg, 'path', fill, stroke, shapeRerendering);
    return this;
  }

  setAxisLineStyle(fill, stroke, shapeRerendering) {
    utils.setAxisStyle(this.svg, 'line', fill, stroke, shapeRerendering);
    return this;
  }

  setColors() {

  }

  setTitle() {

  }

  setFontSize() {

  }

  setFontType() {

  }

  createLegend() {

  }

  in(classOrid) {
    this.location = classOrid;
    utils.getData(this.data)
    .then((data) => {
      this.data = data;
      this.render();
    });

    return this;
  }

  using(dataInput) {
    this.data = dataInput;

    return this;
  }

}