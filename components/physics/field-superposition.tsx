"use client";
import { useEffect, useState } from "react";
import { pointChargeField } from "@/lib/physics/field-and-potential";
import { Formula, Readout, Slider, Steps, Tasks, fmt } from "./shared";

function Arrow({x,y,dx,dy,color,dashed=false}:{x:number;y:number;dx:number;dy:number;color:string;dashed?:boolean}) {
  const length=Math.hypot(dx,dy);
  if(length<.001) return null;
  const ux=dx/length,uy=dy/length;
  return <g stroke={color} fill={color} opacity={dashed ? 0.55 : 1}>
    <path d={`M${x} ${y}l${dx} ${dy}`} strokeWidth={dashed?2:3} fill="none"
      strokeDasharray={dashed?"5 5":undefined} className={dashed?"":"ph-draw"} pathLength={dashed?undefined:1}/>
    <path d={`M${x+dx} ${y+dy}l${-8*ux+4*uy} ${-8*uy-4*ux}l${-8*uy} ${8*ux}Z`} stroke="none"/>
  </g>;
}
export function FieldSuperpositionDemo(){
  const [a,setA]=useState(1),[q1,setQ1]=useState(1),[q2,setQ2]=useState(1);
  const [x,setX]=useState(0),[y,setY]=useState(1),[probe,setProbe]=useState(1),[step,setStep]=useState(0);
  function preset(opposite=false){setA(1);setQ1(1);setQ2(opposite?-1:1);setX(0);setY(1);setProbe(1);setStep(0);}
  useEffect(()=>{if(new URLSearchParams(window.location.search).get("case")==="opposite")preset(true);},[]);
  const field=pointChargeField([{x:-a,y:0,charge:q1*1e-9},{x:a,y:0,charge:q2*1e-9}],{x,y});
  const terms=field?.contributions??[];
  const peak=Math.max(field?.magnitude??0,...terms.map(c=>Math.hypot(c.x,c.y)),1);
  const scale=65/peak,px=340+x*100,py=300-y*100;
  const texts=[
    "先看蓝色Q₁：虚线从场源连到P，蓝箭头画在P。正电荷的场背离场源，负电荷的场指向场源。",
    "再看紫色Q₂。两支箭头都表示P处的场；虚线投影让你看清哪些水平、竖直分量会抵消。",
    "把紫色箭头平移到蓝箭头的末端，方向与长度保持不变。起点到最终终点的绿色箭头就是合场。",
    "场源没有改变，所以E不变。只有试验电荷受到的力F=q₀E随q₀改变；负电荷受力与E反向。"
  ];
  const formulas=[
    String.raw`\mathbf E_1=kQ_1\frac{(x+a)\hat{\mathbf x}+y\hat{\mathbf y}}{[(x+a)^2+y^2]^{3/2}}`,
    String.raw`E_x=E_{1x}+E_{2x},\qquad E_y=E_{1y}+E_{2y}`,
    String.raw`\mathbf E=\mathbf E_1+\mathbf E_2,\qquad |\mathbf E|=\sqrt{E_x^2+E_y^2}`,
    String.raw`\mathbf F=q_0\mathbf E,\qquad U=k\left(\frac{Q_1}{r_1}+\frac{Q_2}{r_2}\right)`
  ];
  return <>
    <div className="ph-mode-tabs" aria-label="电荷预设">
      <button onClick={()=>preset(false)}>等量同号</button><button onClick={()=>preset(true)}>等量异号</button>
    </div>
    <div className="ph-workbench">
      <div className="ph-scene ph-concept-scene">
        <div className="ph-scene-top"><span>源点Q₁(−a,0)、Q₂(a,0)</span><span>坐标单位：m</span></div>
        <svg viewBox="0 0 680 420" role="img" aria-label={`两点电荷的场在P(${x},${y})叠加，当前第${step+1}步`}>
          {[-2,-1,0,1,2].map(n=><g key={n}><path d={`M${340+n*100} 75V335`} stroke="#1e293b"/><text x={340+n*100} y="355" textAnchor="middle" fill="#94a3b8">{n}</text></g>)}
          <path d="M95 300H610M340 335V65" stroke="#64748b" fill="none"/>
          {[1,2].map(n=><g key={n}><path d={`M95 ${300-n*100}H610`} stroke="#1e293b"/><text x="321" y={306-n*100} fill="#94a3b8">{n}</text></g>)}
          <text x="619" y="306" fill="#94a3b8">x</text><text x="349" y="68" fill="#94a3b8">y</text>
          {[{q:q1,sx:340-a*100,color:"#60a5fa",label:"Q₁"},{q:q2,sx:340+a*100,color:"#c4b5fd",label:"Q₂"}].map((s,i)=><g key={s.label}>
            <path d={`M${s.sx} 300L${px} ${py}`} stroke={s.color} strokeDasharray="4 5" opacity=".45"/>
            <circle cx={s.sx} cy="300" r="17" fill={s.color}/><text x={s.sx} y="306" textAnchor="middle" fill="#08111f">{s.q>0?"+":s.q<0?"−":"0"}</text>
            <text x={s.sx} y="332" fill={s.color} textAnchor="middle">{s.label}</text>
            {field&&(i===0||step>=1)&&<g key={step}>
              <Arrow x={px} y={py} dx={terms[i].x*scale} dy={-terms[i].y*scale} color={s.color}/>
              {step>=1&&<path d={`M${px} ${py}h${terms[i].x*scale}v${-terms[i].y*scale}`} stroke={s.color} opacity=".5" fill="none" strokeDasharray="3 4"/>}
            </g>}
          </g>)}
          {field&&step>=2&&<>
            <Arrow x={px+terms[0].x*scale} y={py-terms[0].y*scale} dx={terms[1].x*scale} dy={-terms[1].y*scale} color="#c4b5fd" dashed/>
            <Arrow x={px} y={py} dx={field.x*scale} dy={-field.y*scale} color="#34d399"/>
          </>}
          <circle cx={px} cy={py} r="5" fill="#fbbf24"/><text x={px+9} y={py+23} fill="#fbbf24">P ({fmt(x)}, {fmt(y)})</text>
          <path d="M36 385H101" stroke="#34d399" strokeWidth="3"/>
          <text x="115" y="391" fill="#94a3b8">{fmt(peak)} N/C</text>
        </svg>
        <p className="ph-footnote">左下绿色线段为场强比例尺；同图全部场箭头共用这个比例。</p>
        <p className="ph-caption">{texts[step]}</p>
        {field?<><div className="ph-readouts">
          <Readout label="合场 Eₓ" value={field.x} unit="N/C"/><Readout label="合场 Eᵧ" value={field.y} unit="N/C"/>
          <Readout label="合场大小" value={field.magnitude} unit="N/C"/><Readout label="P处电势 U（U∞=0）" value={field.potential} unit="V"/>
        </div><div className="ph-mini-readings">
          {terms.map((c,i)=><p key={i} style={{color:i?"#c4b5fd":"#93c5fd"}}>Q{i+1}到P：{fmt(c.distance)} m；E{i+1} = ({fmt(c.x)}, {fmt(c.y)}) N/C</p>)}
        </div></>:<p role="alert" className="ph-caption">P与非零点电荷重合，理想点电荷的场在这里不定义。移动P后再观察。</p>}
      </div>
      <aside className="ph-controls" aria-label="点电荷参数">
        <Slider label="半间距 a" value={a} min={.3} max={1.2} step={.1} onChange={setA} unit="m"/>
        <Slider label="电荷 Q₁" value={q1} min={-5} max={5} step={.5} onChange={setQ1} unit="nC"/>
        <Slider label="电荷 Q₂" value={q2} min={-5} max={5} step={.5} onChange={setQ2} unit="nC"/>
        <Slider label="场点横坐标 x" value={x} min={-1.5} max={1.5} step={.1} onChange={setX} unit="m"/>
        <Slider label="场点纵坐标 y" value={y} min={0} max={2} step={.1} onChange={setY} unit="m"/>
        {step===3&&<Slider label="试验电荷 q₀" value={probe} min={-2} max={2} step={.5} onChange={setProbe} unit="nC"/>}
        <p className="ph-footnote">两个场源的位置和电荷量由参数固定；试验电荷不参与场源叠加。</p>
      </aside>
    </div>
    <Steps labels={["从Q₁看P","加入Q₂","首尾相接","放入试验电荷"]} step={step} setStep={setStep} reset={()=>preset(false)}/>
    <section className="ph-panel"><h2>{["一支箭头：大小乘方向","分量分别相加","绿色箭头是矢量和","同一个E，正负电荷受力相反"][step]}</h2>
      <Formula tex={formulas[step]}/>
      {field&&step===3&&<>
        <p>试验电荷的受力方向：</p>
        <svg viewBox="0 0 340 160" style={{maxWidth:380,display:"block",margin:"auto"}} role="img" aria-label={`试验电荷${probe}纳库仑，受力分量(${fmt(probe*field.x)},${fmt(probe*field.y)})纳牛顿`}>
          <path d="M75 80H265M170 10V150" stroke="#475569"/>
          <circle cx="170" cy="80" r="12" fill="#fb7185"/><text x="170" y="86" textAnchor="middle" fill="#0b1425" fontSize="20">{probe>0?"+":probe<0?"−":"0"}</text>
          <Arrow x={170} y={80} dx={probe*field.x/Math.max(Math.abs(probe)*field.magnitude,1)*54}
            dy={-probe*field.y/Math.max(Math.abs(probe)*field.magnitude,1)*54} color="#fb7185"/>
        </svg>
        <p className="ph-footnote">此图独立表示受力方向；它的箭头长度不与上方的电场箭头比较。</p>
        <p>q₀ = {probe} nC 时，F = ({fmt(probe*field.x)}, {fmt(probe*field.y)}) nN。改变q₀不会改变上方的E与U。</p>
      </>}
      <p>{step===0?"分母的三次方来自平方反比场强再乘方向投影；(x+a,y)是从Q₁到P的位移。":"电荷量可相消，场的箭头未必相消。请在同一个P点比较各项贡献。"}</p>
    </section>
    <Tasks items={[
      {title:"总电荷为零，合场一定为零吗？",text:"选择等量异号，将P移到(0,0)。先预测两支箭头，再看合场：Eₓ约17.98 N/C，电势却为0。"},
      {title:"两个同号电荷，为什么竖直场不是两个大小之和？",text:"选择等量同号，P=(0,1)。每项大小约4.494 N/C；竖直投影各约3.178 N/C，合场约6.355 N/C。沿“加入Q₂→首尾相接”查看投影。"},
      {title:"把试验电荷改成负数",text:"进入第4步，只改变q₀。合场和电势不变，受力分量反号。这区分了场源电荷与试验电荷。"}
    ]}/>
  </>;
}
