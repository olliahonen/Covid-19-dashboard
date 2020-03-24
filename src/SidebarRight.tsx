import React, { useEffect } from 'react';
import * as d3 from 'd3';
import DataCards from './DataCards';
import CountryNameData from './countryNameData.json';
import './sidebarRight.css'

let graphNode!: SVGSVGElement | null;
let deathGraphNode!: SVGSVGElement | null;
const Sidebar: React.FunctionComponent<{ width:number , height:number, bigScreen:boolean,  graphHeight:number, data:any ,country:string }> = (props) => {

  useEffect(() => {
    d3.select(graphNode).selectAll('g').remove()  
    let margin = {top: 20, right: 10, bottom: 30, left: 10},
    width = props.width - 15 - margin.left - margin.right,
    height = props.graphHeight - margin.top - margin.bottom;
    let g = d3.select(graphNode)
      .append('g')
      .attr('class','bg')
      .attr("transform",`translate(${margin.left},${margin.top})`);

      let doublingValue = 12.28;
      let days = [1,2,3,4]
      let scale = [100, 1000, 100000, 500000]
      let x = d3.scaleLinear()
        .domain([0 , props.data['World'].confirmedData.length + 3])
        .range([ 0, width ]);

      let logScale = d3.scaleLog()
          .domain([100, 500000])
          .range([ height, 0 ])
      g.selectAll('.yAxisLines')
        .data(scale)
        .enter()
        .append('line')
        .attr("stroke", "#ddd")
        .attr("stroke-dasharray", "2,2")
        .attr('x1',0)
        .attr('x2',width)
        .attr('y1',(d:number) => logScale(d))
        .attr('y2',(d:number) => logScale(d))
      g.selectAll('.yAxisLabel')
        .data(scale)
        .enter()
        .append('text')
        .attr("fill", "#999")
        .attr('x',0)
        .attr('y',(d:number) => logScale(d))
        .attr("dy", -4)
        .attr('font-family','IBM Plex Sans')
        .attr('font-size',10)
        .text((d:number) => d)
      g.append('text')
        .attr("fill", "#414141")
        .attr('x',width / 2)
        .attr('y',height + 10)
        .attr("text-anchor", 'middle')
        .attr('font-family','IBM Plex Sans')
        .attr('font-size',10)
        .attr('dy', 15)
        .text(`Days since 100 cases`)
      
      g.append('text')
        .attr("fill", "#999")
        .attr('x',0)
        .attr('y',height)
        .attr("text-anchor", 'start')
        .attr('font-family','IBM Plex Sans')
        .attr('font-size',10)
        .attr('dy', 12)
        .text(`1`)
        g.selectAll('.yAxisLines')
          .data(scale)
          .enter()
          .append('line')
          .attr("stroke", "#ddd")
          .attr("stroke-dasharray", "2,2")
          .attr('x1',0)
          .attr('x2',width)
          .attr('y1',(d:number) => logScale(d))
          .attr('y2',(d:number) => logScale(d))
        g.selectAll('.yAxisLabel')
          .data(scale)
          .enter()
          .append('text')
          .attr("fill", "#999")
          .attr('x',0)
          .attr('y',(d:number) => logScale(d))
          .attr("dy", -4)
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .text((d:number) => d)
        g.append('text')
          .attr("fill", "#414141")
          .attr('x',width / 2)
          .attr('y',height + 10)
          .attr("text-anchor", 'middle')
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .attr('dy', 15)
          .text(`Days since 100 cases`)
        
        g.append('text')
          .attr("fill", "#999")
          .attr('x',0)
          .attr('y',height)
          .attr("text-anchor", 'start')
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .attr('dy', 12)
          .text(`1`)

        
      for (let i = 10; i < props.data['World'].confirmedData.length + 1; i= i + 10){
        g.append('text')
          .attr("fill", "#999")
          .attr('x',x(i))
          .attr('y',height)
          .attr('dy', 12)
          .attr("text-anchor", 'middle')
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .text(`${i}`)
        g.selectAll('.yAxisLines')
          .data(scale)
          .enter()
          .append('line')
          .attr("stroke", "#ddd")
          .attr("stroke-dasharray", "2,2")
          .attr('x1',x(i))
          .attr('x2',x(i))
          .attr('y1',0)
          .attr('y2',height)
      }
      g.selectAll('.doublingLines')
        .data(days)
        .enter()
        .append('line')
        .attr("stroke", "#414141")
        .attr("stroke-dasharray", "2,2")
        .attr("stroke-width", "1")
        .attr('x1',0)
        .attr('x2',(d:number) => x((d - 1) * doublingValue + doublingValue + 1))
        .attr('y1',height)
        .attr('y2',logScale(500000))
      g.selectAll('.doublingLabel')
        .data(days)
        .enter()
        .append('text')
        .attr("fill", "#414141")
        .attr('x',(d:number) => x((d - 1) * doublingValue + doublingValue + 1) - 10)
        .attr('y',logScale(500000))
        .attr("dy", -4)
        .attr('font-family','IBM Plex Sans')
        .attr('font-size', () => props.width > 340 ? 8 : 6)
        .attr('font-weight',() => props.width > 340 ? 'normal' : 'bold')
        .text((d:number) => `double in ${d} days`)

  },[props.graphHeight, props.data,props.width])
  useEffect(() => {
    d3.select(deathGraphNode).selectAll('g').remove()  
    let margin = {top: 20, right: 10, bottom: 30, left: 10},
    width = props.width - 15 - margin.left - margin.right,
    height = props.graphHeight - margin.top - margin.bottom;
    let g = d3.select(deathGraphNode)
      .append('g')
      .attr('class','bg')
      .attr("transform",`translate(${margin.left},${margin.top})`);

      let doublingValue = 11.97;
      let days = [1,2,3,4]
      let logScale = d3.scaleLog()
          .domain([10, 20000])
          .range([ height, 0 ])
      let scale = [10, 500 , 1000, 5000, 10000, 20000]
      let x = d3.scaleLinear()
        .domain([0 , props.data['World'].confirmedData.length + 3])
        .range([ 0, width ]);

      g.selectAll('.yAxisLines')
        .data(scale)
        .enter()
        .append('line')
        .attr("stroke", "#ddd")
        .attr("stroke-dasharray", "2,2")
        .attr('x1',0)
        .attr('x2',width)
        .attr('y1',(d:number) => logScale(d))
        .attr('y2',(d:number) => logScale(d))
      g.selectAll('.yAxisLabel')
        .data(scale)
        .enter()
        .append('text')
        .attr("fill", "#999")
        .attr('x',0)
        .attr('y',(d:number) => logScale(d))
        .attr("dy", -4)
        .attr('font-family','IBM Plex Sans')
        .attr('font-size',10)
        .text((d:number) => d)
      g.append('text')
        .attr("fill", "#414141")
        .attr('x',width / 2)
        .attr('y',height + 10)
        .attr("text-anchor", 'middle')
        .attr('font-family','IBM Plex Sans')
        .attr('font-size',10)
        .attr('dy', 15)
        .text(`Days since 100 cases`)
      
      g.append('text')
        .attr("fill", "#999")
        .attr('x',0)
        .attr('y',height)
        .attr("text-anchor", 'start')
        .attr('font-family','IBM Plex Sans')
        .attr('font-size',10)
        .attr('dy', 12)
        .text(`1`)
        g.selectAll('.yAxisLines')
          .data(scale)
          .enter()
          .append('line')
          .attr("stroke", "#ddd")
          .attr("stroke-dasharray", "2,2")
          .attr('x1',0)
          .attr('x2',width)
          .attr('y1',(d:number) => logScale(d))
          .attr('y2',(d:number) => logScale(d))
        g.selectAll('.yAxisLabel')
          .data(scale)
          .enter()
          .append('text')
          .attr("fill", "#999")
          .attr('x',0)
          .attr('y',(d:number) => logScale(d))
          .attr("dy", -4)
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .text((d:number) => d)
        g.append('text')
          .attr("fill", "#414141")
          .attr('x',width / 2)
          .attr('y',height + 10)
          .attr("text-anchor", 'middle')
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .attr('dy', 15)
          .text(`Days since 10 deaths`)
        
        g.append('text')
          .attr("fill", "#999")
          .attr('x',0)
          .attr('y',height)
          .attr("text-anchor", 'start')
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .attr('dy', 12)
          .text(`1`)

        
      for (let i = 10; i < props.data['World'].confirmedData.length + 1; i= i + 10){
        g.append('text')
          .attr("fill", "#999")
          .attr('x',x(i))
          .attr('y',height)
          .attr('dy', 12)
          .attr("text-anchor", 'middle')
          .attr('font-family','IBM Plex Sans')
          .attr('font-size',10)
          .text(`${i}`)
        g.selectAll('.yAxisLines')
          .data(scale)
          .enter()
          .append('line')
          .attr("stroke", "#ddd")
          .attr("stroke-dasharray", "2,2")
          .attr('x1',x(i))
          .attr('x2',x(i))
          .attr('y1',0)
          .attr('y2',height)
      }
      g.selectAll('.doublingLines')
        .data(days)
        .enter()
        .append('line')
        .attr("stroke", "#414141")
        .attr("stroke-dasharray", "2,2")
        .attr("stroke-width", "1")
        .attr('x1',0)
        .attr('x2',(d:number) => x((d - 1) * doublingValue + doublingValue + 1))
        .attr('y1',height)
        .attr('y2',logScale(20000))
      g.selectAll('.doublingLabel')
        .data(days)
        .enter()
        .append('text')
        .attr("fill", "#414141")
        .attr('x',(d:number) => x((d - 1) * doublingValue + doublingValue + 1) - 10)
        .attr('y',logScale(20000))
        .attr("dy", -4)
        .attr('font-family','IBM Plex Sans')
        .attr('font-size', () => props.width > 340 ? 8 : 6)
        .attr('font-weight',() => props.width > 340 ? 'normal' : 'bold')
        .text((d:number) => `double in ${d} days`)

  },[props.graphHeight,props.data,props.width])
  useEffect(() => {
    d3.select(graphNode).select('.graphG').remove()
    let dataArr:any = Object.keys(props.data).map((key:string) => {
      return ({'countryName': key, 'confirmed':props.data[key]['confirmedData'][props.data[key]['confirmedData'].length - 1]['value'], 'death':props.data[key]['deathData'][props.data[key]['deathData'].length - 1]['value']})
    })
    dataArr.sort((x:any, y:any) => d3.descending(x['confirmed'], y['confirmed']))
    let countryList = dataArr.map((d:any) =>  d.countryName )
    let epidemicCurveData = countryList.map((d:string) => props.data[d].confirmedData.filter((d:any) => d.value >= 100))
    let margin = {top: 20, right: 10, bottom: 30, left: 10},
    width = props.width - 15 - margin.left - margin.right,
    height = props.graphHeight - margin.top - margin.bottom;
    let x = d3.scaleLinear()
      .domain([0 , props.data[countryList[0]].confirmedData.length + 3])
      .range([ 0, width ]);
    let logScale = d3.scaleLog()
      .domain([100, 500000])
        .range([ height, 0 ])
        let g = d3.select(graphNode).append('g').attr('class','graphG').attr("transform",`translate(${margin.left},${margin.top})`);
    if(countryList.indexOf(props.country) >= 0){
      let epidemicCurveDataFiltered = epidemicCurveData.filter((d:any, i:number) => i < 12)
      let countryListFiltered = countryList.filter((d:any, i:number) => i < 12)
      if(props.country !== 'World') {
        epidemicCurveDataFiltered = [epidemicCurveData[countryList.indexOf(props.country)],epidemicCurveData[0]]
        countryListFiltered = [props.country,'World']
      }
      if(epidemicCurveDataFiltered[0].length > 1) {
        epidemicCurveDataFiltered.forEach((el:any,k:number) => {
          let countryG = g.append('g')
            .on('mouseenter',() => {
              g.selectAll('.pandemicCurve')
                .attr('opacity', 0.1)
                .attr("stroke", '#aaa')
              g.selectAll('.pandemicCircle')
                .attr('opacity', 0.1)
                .attr("fill", '#aaa')
              g.selectAll('.pandemicText')
                .attr('opacity', 0.1)
                .attr("fill", '#aaa')
              g.selectAll(`.connectorLine`)
                .attr('opacity', 0.1)
              g.selectAll(`.curve${k}`)
                .attr('opacity', 1)
                .attr("stroke", '#e01a25')
              g.selectAll(`.circle${k}`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.text${k}`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.connectorLine${k}`)
                .attr('opacity', 1)
                .attr("fill", '#aaa')
              g.append('text')
                .attr('class','textHover')
                .attr("x",x(el.length - 1))
                .attr("y",logScale(el[el.length - 1].value) - 5)
                .attr('text-anchor','middle')
                .attr("fill", '#e01a25')
                .attr('font-size', 10)
                .attr('font-width', 'bold')
                .text(countryList[k])
            })
            .on('mouseout',() => {
              g.selectAll('.pandemicCurve')
                .attr('opacity',0.4)
                .attr("stroke", '#aaa')
              g.selectAll('.pandemicCircle')
                .attr('opacity',0.4)
                .attr("fill", '#aaa')
              g.selectAll('.pandemicText')
                .attr('opacity', 1)
                .attr("fill", '#aaa')
              g.selectAll(`.curve0`)
                .attr('opacity', 1)
                .attr("stroke", '#e01a25')
              g.selectAll(`.circle0`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.text0`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.connectorLine`)
                .attr('opacity', 1)
                .attr("fill", '#eee')
              g.selectAll('.textHover').remove()
            })
        
          countryG.append("path")
            .attr('class',`curve${k} pandemicCurve`)
            .datum(el)
            .attr("fill", "none")
            .attr("stroke", k === 0 ? '#e01a25' : '#aaa')
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x((d:any,i:number) => x(i))
              .y((d:any,i:number) => logScale(d.value))
              .curve(d3.curveMonotoneX)
            )
            .attr('opacity', k === 0 ? 1 : 0.4)
          let labelG = countryG.append('g')
          labelG.append("line")
            .attr('class',`connectorLine${k} connectorLine`)
            .attr("stroke", '#eee')
            .attr("x1",x(el.length - 1))
            .attr("y1",logScale(el[el.length - 1].value))
            .attr("x2",width - 5)
            .attr("y2",logScale(el[el.length - 1].value))
            .attr('opacity',  1)
          labelG.append("circle")
            .attr('class',`circle${k} pandemicCircle`)
            .attr("fill", k === 0 ? '#e01a25' : '#aaa')
            .attr('r', 3.5)
            .attr("cx",x(el.length - 1))
            .attr("cy",logScale(el[el.length - 1].value))
            .attr('opacity', k === 0 ? 1 : 0.4)
          labelG.append("text")
            .attr('class',`text${k} pandemicText`)
            .attr("fill", k === 0 ? '#e01a25' : '#aaa')
            .attr('font-size', 10)
            .attr("x",width)
            .attr('text-anchor','end')
            .attr("y",logScale(el[el.length - 1].value) + 3)
            .text(() => {
              let index = CountryNameData.findIndex((obj:any) => obj.countryName === countryListFiltered[k])
              return index < 0 ? countryListFiltered[k] : CountryNameData[index].countryShortCode
            })
            .style('cursor','pointer')
        })
      }
      else {
        g.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor','middle')
          .attr('font-size',16)
          .attr('font-family','IBM Plex Sans')
          .attr('font-weight','bold')
          .attr('fill','#414141')
          .text('Only Applicable for cases  > 100')
      }
    }
  },[props.width, props.graphHeight,props.data, props.country])
  useEffect(() => {
    d3.select(deathGraphNode).select('.graphG').remove()
    let margin = {top: 20, right: 10, bottom: 30, left: 10},
    width = props.width - 15 - margin.left - margin.right,
    height = props.graphHeight - margin.top - margin.bottom;
    let dataArr:any = Object.keys(props.data).map((key:string) => {
      return ({'countryName': key, 'confirmed':props.data[key]['confirmedData'][props.data[key]['confirmedData'].length - 1]['value'], 'death':props.data[key]['deathData'][props.data[key]['deathData'].length - 1]['value']})
    })
    
    dataArr.sort((x:any, y:any) => d3.descending(x['death'], y['death']))
    let countryList = dataArr.map((d:any) =>  d.countryName )
    let g = d3.select(deathGraphNode).append('g').attr('class','graphG').attr("transform",`translate(${margin.left},${margin.top})`);
    let x = d3.scaleLinear()
      .domain([0 , props.data[countryList[0]].deathData.length + 3])
      .range([ 0, width ]);

    let logScale = d3.scaleLog()
        .domain([10, 20000])
        .range([ height, 0 ])
    let epidemicCurveData = countryList.map((d:string) => props.data[d].deathData.filter((d:any) => d.value >= 10))
    if(countryList.indexOf(props.country) >= 0){
      let epidemicCurveDataFiltered = epidemicCurveData.filter((d:any, i:number) => i < 12)
      let countryListFiltered = countryList.filter((d:any, i:number) => i < 12)
      if(props.country !== 'World') {
        epidemicCurveDataFiltered = [epidemicCurveData[countryList.indexOf(props.country)],epidemicCurveData[0]]
        countryListFiltered = [props.country,'World']
      }
      if(epidemicCurveDataFiltered[0].length > 1) {
        epidemicCurveDataFiltered.forEach((el:any,k:number) => {
          let countryG = g.append('g')
            .on('mouseenter',() => {
              g.selectAll('.pandemicCurve')
                .attr('opacity', 0.1)
                .attr("stroke", '#aaa')
              g.selectAll('.pandemicCircle')
                .attr('opacity', 0.1)
                .attr("fill", '#aaa')
              g.selectAll('.pandemicText')
                .attr('opacity', 0.1)
                .attr("fill", '#aaa')
              g.selectAll(`.connectorLine`)
                .attr('opacity', 0.1)
              g.selectAll(`.curve${k}`)
                .attr('opacity', 1)
                .attr("stroke", '#e01a25')
              g.selectAll(`.circle${k}`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.text${k}`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.connectorLine${k}`)
                .attr('opacity', 1)
                .attr("fill", '#aaa')
              g.append('text')
                .attr('class','textHover')
                .attr("x",x(el.length - 1))
                .attr("y",logScale(el[el.length - 1].value) - 5)
                .attr('text-anchor','middle')
                .attr("fill", '#e01a25')
                .attr('font-size', 10)
                .attr('font-width', 'bold')
                .text(countryList[k])
            })
            .on('mouseout',() => {
              g.selectAll('.pandemicCurve')
                .attr('opacity',0.4)
                .attr("stroke", '#aaa')
              g.selectAll('.pandemicCircle')
                .attr('opacity',0.4)
                .attr("fill", '#aaa')
              g.selectAll('.pandemicText')
                .attr('opacity', 1)
                .attr("fill", '#aaa')
              g.selectAll(`.curve0`)
                .attr('opacity', 1)
                .attr("stroke", '#e01a25')
              g.selectAll(`.circle0`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.text0`)
                .attr('opacity', 1)
                .attr("fill", '#e01a25')
              g.selectAll(`.connectorLine`)
                .attr('opacity', 1)
                .attr("fill", '#eee')
              g.selectAll('.textHover').remove()
            })
        
          countryG.append("path")
            .attr('class',`curve${k} pandemicCurve`)
            .datum(el)
            .attr("fill", "none")
            .attr("stroke", k === 0 ? '#e01a25' : '#aaa')
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x((d:any,i:number) => x(i))
              .y((d:any,i:number) => logScale(d.value))
              .curve(d3.curveMonotoneX)
            )
            .attr('opacity', k === 0 ? 1 : 0.4)
          let labelG = countryG.append('g')
          labelG.append("line")
            .attr('class',`connectorLine${k} connectorLine`)
            .attr("stroke", '#eee')
            .attr("x1",x(el.length - 1))
            .attr("y1",logScale(el[el.length - 1].value))
            .attr("x2",width - 5)
            .attr("y2",logScale(el[el.length - 1].value))
            .attr('opacity',  1)
          labelG.append("circle")
            .attr('class',`circle${k} pandemicCircle`)
            .attr("fill", k === 0 ? '#e01a25' : '#aaa')
            .attr('r', 3.5)
            .attr("cx",x(el.length - 1))
            .attr("cy",logScale(el[el.length - 1].value))
            .attr('opacity', k === 0 ? 1 : 0.4)
          labelG.append("text")
            .attr('class',`text${k} pandemicText`)
            .attr("fill", k === 0 ? '#e01a25' : '#aaa')
            .attr('font-size', 10)
            .attr("x",width)
            .attr('text-anchor','end')
            .attr("y",logScale(el[el.length - 1].value) + 3)
            .text(() => {
              let index = CountryNameData.findIndex((obj:any) => obj.countryName === countryListFiltered[k])
              return index < 0 ? countryListFiltered[k] : CountryNameData[index].countryShortCode
            })
            .style('cursor','pointer')
        })
      }
      else {
        g.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor','middle')
          .attr('font-size',16)
          .attr('font-family','IBM Plex Sans')
          .attr('font-weight','bold')
          .attr('fill','#414141')
          .text('Only Applicable for deaths  > 10')
      }
    }
  },[ props.width, props.graphHeight, props.data, props.country])


  let cardTitleSubNotesubNote = props.graphHeight < 240 ? null : <span className="cardTitleSubNote">(Log scale starting from 100 cases)</span>
  let cardTitleSubNotesubNoteDeaths = props.graphHeight < 240 ? null : <span className="cardTitleSubNote">(Log scale starting from 10 deaths)</span>
  return ( 
    <div>
      <DataCards
        title="Total Countries Infected"
        data={Object.keys(props.data).length - 2}
        note={'out of 195'}
        color='#0aa5c2' 
      />
      <div className="graphContainer">
        <h2 className='cardTitle'>Epidemic Curve {cardTitleSubNotesubNote}</h2>
        <svg width={props.width - 5} height={props.graphHeight} ref={node => graphNode = node}/>
      </div>
      <div className="graphContainer">
        <h2 className='cardTitle'>Death Rate Curve {cardTitleSubNotesubNoteDeaths}</h2>
        <svg width={props.width - 5} height={props.graphHeight} ref={node => deathGraphNode = node}/>
      </div>
    </div>
  )
}


export default Sidebar;
