import React,{ useEffect} from 'react';
import * as d3 from 'd3';
import DataCards from './DataCards';
import {formatNumber} from './utils';
import './sidebar.css'

let graphNode!: SVGSVGElement | null;
let deathGraphNode!: SVGSVGElement | null;
let dailyCasesGraphNode!: SVGSVGElement | null;
let dailyDeathGraphNode!: SVGSVGElement | null;
const Sidebar: React.FunctionComponent<{width:number , height:number, graphHeight:number, data:any ,country:string }> = (props) => {

  useEffect(() => {
    d3.select(graphNode).selectAll('g').remove()
    d3.select(deathGraphNode).selectAll('g').remove()
    d3.select(dailyCasesGraphNode).selectAll('g').remove()
    d3.select(dailyDeathGraphNode).selectAll('g').remove()
    if(props.data[props.country]) {
      let margin = {top: 10, right: 10, bottom: 20, left: 10},
        width = props.width - 15 - margin.left - margin.right,
        height = props.graphHeight - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
      let g = d3.select(graphNode)
        .append('g')
        .attr("transform",`translate(${margin.left},${margin.top})`);
      
      let x = d3.scaleTime()
        .domain(d3.extent(props.data[props.country].confirmedData, (d:any) => d.date))
        .range([ 0, width ]);

      // Add Y axis
      let y = d3.scaleLinear()
        .domain([0, d3.max(props.data[props.country].confirmedData, (d:any) => d.value)])
        .range([ height, 0 ]);

      g.append("g")
        .call(d3.axisRight(y).tickSize(width).ticks(5));
      g.select(".domain").remove();
      g.selectAll(".tick line").filter(Number).attr("stroke", "#aaa").attr("stroke-dasharray", "2,2");
      g.selectAll(".tick text").attr("x", 4).attr("dy", -4).attr('font-family','IBM Plex Sans').attr('fill','#aaa').attr('font-size',10);
      
      g.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(props.data[props.country]['confirmedData'][0].date)))
        .attr('x',x(props.data[props.country]['confirmedData'][0].date))
        .attr('y',height + 15)
      g.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].date)))
        .attr('x',x(props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].date))
        .attr('text-anchor','end')
        .attr('y',height + 15)
      g.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('2/1/20'))))
        .attr('x',x(d3.timeParse("%m/%d/%y")('2/1/20')))
        .attr('y',height + 15)
      g.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('3/1/20'))))
        .attr('x',x(d3.timeParse("%m/%d/%y")('3/1/20')))
        .attr('text-anchor','end')
        .attr('y',height + 15)
      
      
      g.append("path")
        .datum(props.data[props.country].confirmedData)
        .attr("fill", "#e01a25")
        .attr('fill-opacity',0.25)
        .attr("stroke", "#e01a25")
        .attr("stroke-width", 1)
        .attr("d", d3.area()
          .x((d:any,i:number) => x(d.date))
          .y0(y(0))
          .y1((d:any) =>  y(d.value))
          )
      g.append("path")
        .datum(props.data[props.country].recoveryData)
        .attr("fill", "#42c068")
        .attr("stroke-width", 1)
        .attr("d", d3.area()
          .x((d:any,i:number) => x(d.date))
          .y0(y(0))
          .y1((d:any,i:number) =>  y(d.value + props.data[props.country].deathData[i]['value']))
          )
      g.append("path")
        .datum(props.data[props.country].deathData)
        .attr("fill", "#414141")
        .attr("stroke-width", 1)
        .attr("d", d3.area()
          .x((d:any,i:number) => x(d.date))
          .y0(y(0))
          .y1((d:any) =>  y(d.value))
        )
      // append the svg object to the body of the page

      
      let deathGraphG = d3.select(deathGraphNode)
        .append('g')
        .attr("transform",`translate(${margin.left},${margin.top})`);

      // Add Y axis
      y = d3.scaleLinear()
        .domain([0, d3.max(props.data[props.country].deathData, (d:any) => d.value)])
        .range([ height, 0 ]);

      deathGraphG.append("g")
        .call(d3.axisRight(y).tickSize(width).ticks(5));
      deathGraphG.select(".domain").remove();
      deathGraphG.selectAll(".tick line").filter(Number).attr("stroke", "#aaa").attr("stroke-dasharray", "2,2");
      deathGraphG.selectAll(".tick text").attr("x", 4).attr("dy", -4).attr('font-family','IBM Plex Sans').attr('fill','#aaa').attr('font-size',10);
      
      deathGraphG.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(props.data[props.country]['confirmedData'][0].date)))
        .attr('x',x(props.data[props.country]['confirmedData'][0].date))
        .attr('y',height + 15)
      deathGraphG.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].date)))
        .attr('x',x(props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].date))
        .attr('text-anchor','end')
        .attr('y',height + 15)
      deathGraphG.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('2/1/20'))))
        .attr('x',x(d3.timeParse("%m/%d/%y")('2/1/20')))
        .attr('y',height + 15)
      deathGraphG.append('text')
        .attr('font-family','IBM Plex Sans')
        .attr('fill','#aaa')
        .attr('font-size',10)
        .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('3/1/20'))))
        .attr('x',x(d3.timeParse("%m/%d/%y")('3/1/20')))
        .attr('text-anchor','end')
        .attr('y',height + 15)
      
      deathGraphG.append("path")
        .datum(props.data[props.country].deathData)
        .attr("fill", "#414141")
        .attr('fill-opacity',0.25)
        .attr("stroke", "#414141")
        .attr("stroke-width", 1)
        .attr("d", d3.area()
          .x((d:any,i:number) => x(d.date))
          .y0(y(0))
          .y1((d:any) =>  y(d.value))
        )
        let dailyeCasesG = d3.select(dailyCasesGraphNode)
          .append('g')
          .attr("transform",`translate(${margin.left},${margin.top})`);
        var xScale = d3.scaleBand()
          .range([ 0, width ])
          .domain(props.data[props.country]['confirmedData'].map((d:any) =>  d.date))
          .padding(0.2);
        var yScale = d3.scaleLinear()
          .domain([0, d3.max(props.data[props.country]['confirmedData'], (d:any) => d.new)])
          .range([ height, 0]);
        
        dailyeCasesG.append("g")
          .call(d3.axisRight(yScale).tickSize(width).ticks(5));
        dailyeCasesG.select(".domain").remove();
        dailyeCasesG.selectAll(".tick line").filter(Number).attr("stroke", "#aaa").attr("stroke-dasharray", "2,2");
        dailyeCasesG.selectAll(".tick text").attr("x", 4).attr("dy", -4).attr('font-family','IBM Plex Sans').attr('fill','#aaa').attr('font-size',10);
      
        dailyeCasesG.selectAll(".confirmedBar")
          .data(props.data[props.country]['confirmedData'])
          .enter()
          .append("rect")
          .attr('class', (d:any, i:number) => `confirmedBar confirmedBar${i}`)
          .attr("x", (d:any) => xScale(d.date))
          .attr("y", (d:any) => yScale(d.new))
          .attr("width", xScale.bandwidth())
          .attr("height", (d:any) => height -  yScale(d.new))
          .attr("fill", "#e01a25")
          .on('mouseenter', (d:any, i:number) => {
            d3.selectAll(`.confirmedBar`)
              .attr('opacity','0.4')
              d3.selectAll(`.confirmedBar${i}`)
                .attr('opacity','1')
            d3.select('.barGraphtooltip')
              .style('display', 'inline')
              .style("left", `${d3.event.pageX + 5}px`)		
              .style("top", `${d3.event.pageY - 10}px`);	
            d3.select('.tooltipDate')
              .html(d3.timeFormat("%d %b")(d.date))	
            d3.select('.tooltipCases')
              .html(formatNumber(d.new))
          })
          .on('mousemove',(d:any) => {
            d3.select('.barGraphtooltip')
              .style("left", `${d3.event.pageX + 5}px`)		
              .style("top", `${d3.event.pageY - 10}px`);	
          })
          .on('mouseout',(d:any) => {
            d3.selectAll(`.confirmedBar`)
              .attr('opacity',`1`)
            d3.select('.barGraphtooltip')
              .style('display','none')
          })

        dailyeCasesG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(props.data[props.country]['confirmedData'][0].date)))
          .attr('x',xScale(props.data[props.country]['confirmedData'][0].date))
          .attr('y',height + 15)
        dailyeCasesG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].date)))
          .attr('x',xScale(props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].date) + xScale.bandwidth())
          .attr('text-anchor','end')
          .attr('y',height + 15)
        dailyeCasesG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('2/1/20'))))
          .attr('x',xScale(d3.timeParse("%m/%d/%y")('2/1/20')) + xScale.bandwidth() / 2)
          .attr('text-anchor','middle')
          .attr('y',height + 15)
        dailyeCasesG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('3/1/20'))))
          .attr('x',xScale(d3.timeParse("%m/%d/%y")('3/1/20')) + xScale.bandwidth() / 2)
          .attr('text-anchor','middle')
          .attr('y',height + 15)
        
      // append the svg object to the body of the page
        let dailyDeathG = d3.select(dailyDeathGraphNode)
          .append('g')
          .attr("transform",`translate(${margin.left},${margin.top})`);
        xScale = d3.scaleBand()
          .range([ 0, width ])
          .domain(props.data[props.country]['deathData'].map((d:any) =>  d.date))
          .padding(0.2);
        yScale = d3.scaleLinear()
          .domain([0, d3.max(props.data[props.country]['deathData'], (d:any) => d.new)])
          .range([ height, 0]);
        dailyDeathG.append("g")
          .call(d3.axisRight(yScale).tickSize(width).ticks(5));
        dailyDeathG.select(".domain").remove();
        dailyDeathG.selectAll(".tick line").filter(Number).attr("stroke", "#aaa").attr("stroke-dasharray", "2,2");
        dailyDeathG.selectAll(".tick text").attr("x", 4).attr("dy", -4).attr('font-family','IBM Plex Sans').attr('fill','#aaa').attr('font-size',10);
      
        dailyDeathG.selectAll(".deathBar")
          .data(props.data[props.country]['deathData'])
          .enter()
          .append("rect")
          .attr('class',(d:any, i:number) => `deathBar deathBar${i}`)
          .attr("x", (d:any) => xScale(d.date))
          .attr("y", (d:any) => yScale(d.new))
          .attr("width", xScale.bandwidth())
          .attr("height", (d:any) => height -  yScale(d.new))
          .attr("fill", "#414141")
          .on('mouseenter', (d:any,i:number) => {
            d3.selectAll('.deathBar')
              .attr('opacity',0.4)
            d3.selectAll(`.deathBar${i}`)
              .attr('opacity',`1`)
            d3.select('.barGraphtooltip')
              .style('display', 'inline')
              .style("left", `${d3.event.pageX + 5}px`)		
              .style("top", `${d3.event.pageY - 10}px`);	
            d3.select('.tooltipDate')
              .html(d3.timeFormat("%d %b")(d.date))	
            d3.select('.tooltipCases')
              .html(formatNumber(d.new))
          })
          .on('mousemove',(d:any) => {
            d3.select('.barGraphtooltip')
              .style("left", `${d3.event.pageX + 5}px`)		
              .style("top", `${d3.event.pageY - 10}px`);	
          })
          .on('mouseout',(d:any) => {
            d3.selectAll(`.deathBar`)
              .attr('opacity',`1`)
            d3.select('.barGraphtooltip')
              .style('display','none')
          })

        dailyDeathG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(props.data[props.country]['deathData'][0].date)))
          .attr('x',xScale(props.data[props.country]['deathData'][0].date))
          .attr('y',height + 15)
        dailyDeathG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(props.data[props.country]['deathData'][props.data[props.country]['deathData'].length - 1].date)))
          .attr('x',xScale(props.data[props.country]['deathData'][props.data[props.country]['deathData'].length - 1].date) + xScale.bandwidth())
          .attr('text-anchor','end')
          .attr('y',height + 15)
        dailyDeathG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('2/1/20'))))
          .attr('x',xScale(d3.timeParse("%m/%d/%y")('2/1/20')) + xScale.bandwidth() / 2)
          .attr('text-anchor','middle')
          .attr('y',height + 15)
        dailyDeathG.append('text')
          .attr('font-family','IBM Plex Sans')
          .attr('fill','#aaa')
          .attr('font-size',10)
          .text((d3.timeFormat("%d %b")(d3.timeParse("%m/%d/%y")('3/1/20'))))
          .attr('x',xScale(d3.timeParse("%m/%d/%y")('3/1/20')) + xScale.bandwidth() / 2)
          .attr('text-anchor','middle')
          .attr('y',height + 15)
    }
  })

  let doublingTime = 0

  if(props.data[props.country]){
    let confirmedDataFiltered = props.data[props.country]['confirmedData'].filter((d:any, i:number) => d.value >= 100)
    if(confirmedDataFiltered.length > 1){
      let rate = (Math.pow(confirmedDataFiltered[confirmedDataFiltered.length - 1].value / confirmedDataFiltered[0].value , 1 / (confirmedDataFiltered.length - 1)) - 1) * 100
      doublingTime = parseFloat((69 / rate).toFixed(1))
    }

  }
  return ( 
    <div>
      <h2 className='countryShow'>{props.country}</h2>
      <DataCards
        title="Total Confirmed"
        data={props.data[props.country] ? props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].value : 0}
        subNote={props.data[props.country] ? `${props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].new}` : undefined}
        percentInc = {props.data[props.country] ? `${props.data[props.country]['latestData']['Confirmed Cases Percent Change']}` : undefined}
        color='#e01a25' 
        outof100K= {props.data[props.country] ? props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1]['valuePer100K'] : undefined}
      />
      <DataCards
        title="Doubling Time calculate as Day 1 at > 100 cases"
        data={doublingTime}
        note={doublingTime !== 0 ? 'days' : undefined}
        color='#414141' 
      />
      <DataCards
        title="Total Death"
        data={props.data[props.country] ? props.data[props.country]['deathData'][props.data[props.country]['deathData'].length - 1].value : 0}
        percent={props.data[props.country] ? `${(props.data[props.country]['deathData'][props.data[props.country]['deathData'].length - 1].value * 100 / props.data[props.country]['confirmedData'][props.data[props.country]['confirmedData'].length - 1].value).toFixed(1)}% Case Fatality Rt.` : '0%'}
        subNote={props.data[props.country] ? `${props.data[props.country]['deathData'][props.data[props.country]['deathData'].length - 1].new }`: undefined}
        percentInc = {props.data[props.country] ? `${props.data[props.country]['latestData']['Deaths Percent Change']}` : undefined}
        color='#414141' 
      />
      <DataCards
        title="Recovery"
        data={props.data[props.country] ? props.data[props.country]['latestData']['Recovered Cases'] : 0}
        percent={props.data[props.country] ? `${(props.data[props.country]['latestData']['Recovery Rate'])}% Recovery Rt.` : '0%'}
        color='#42c068' 
      />
      <div className="graphContainer">
        <div className='cardTitle'>Total Cases</div>
        <svg width={props.width - 5} height={props.graphHeight} ref={node => graphNode = node}/>
      </div>
      <div className="graphContainer">
        <div className='cardTitle'>Daily Cases</div>
        <svg width={props.width - 5} height={props.graphHeight} ref={node => dailyCasesGraphNode = node}/>
      </div>
      <div className="graphContainer">
        <div className='cardTitle'>Total Deaths</div>
        <svg width={props.width - 5} height={props.graphHeight} ref={node => deathGraphNode = node}/>
      </div>
      <div className="graphContainer">
        <div className='cardTitle'>Daily Deaths</div>
        <svg width={props.width - 5} height={props.graphHeight} ref={node => dailyDeathGraphNode = node}/>
      </div>
    </div>
  )
}

export default Sidebar