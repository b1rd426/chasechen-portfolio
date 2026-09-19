"use client";
import { useEffect, useState } from "react";
import { axisPotential, electricWork } from "@/lib/physics/field-and-potential";
import { Formula, Readout, Slider, Steps, Tasks, fmt } from "./shared";

export function PotentialSlopeDemo(){
  const [mode,setMode]=useState<"ring"|"annulus">("ring"),[x,setX]=useState(1),[radius,setRadius]=useState(1);
  const [ratio,setRatio]=useState(.5),[charge,setCharge]=useState(2),[density,setDensity]=useState(1);
  const [offset,setOffset]=useState(0),[probe,setProbe]=useState(1),[h,setH]=useState(.2),[step,setStep]=useState(0);
  function preset(annulus=false){setMode(annulus?"annulus":"ring");setX(annulus?.5:1);setRadius(1);setRatio(.5);setCharge(2);setDensity(1);setOffset(0);setProbe(1);setH(.2);setStep(0);}
  useEffect(()=>{const p=new URLSearchParams(window.location.search).get("case");if(p==="annulus")preset(true);if(p==="reference"){setOffset(30);setStep(2);}},[]);
  const at=(position:number)=>axisPotential({mode,x:position,outer:radius,inner:radius*ratio,charge:charge*1e-9,density:density*1e-9,offset});
  const result=at(x),reference=at(0),next=at(x+h),work=electricWork(probe*1e-9,reference.potential,result.potential);
  const points=Array.from({length:241},(_,i)=>({x:-3+i/40,...at(-3+i/40)}));
  // Keep the vertical scale unchanged when only the reference potential shifts.
  // Otherwise a pure gauge shift would falsely appear to change the slope.
  const low=Math.min(0,...points.map(p=>p.potential-offset))-30;
  const high=Math.max(0,...points.map(p=>p.potential-offset))+30;
  const span=Math.max(10,high-low),yLow=low-.15*span,yHigh=high+.15*span;
  const gx=(v:number)=>60+(v+3)/6*560,gy=(v:number)=>240-(v-yLow)/(yHigh-yLow)*200;
  const curve=points.map((p,i)=>`${i?"L":"M"}${gx(p.x)} ${gy(p.potential)}`).join(" ");
  const field=result.field??0,px=340+90*x,secant=(next.potential-result.potential)/h;
  const texts=[
    mode==="ring"?"圆环上每一小段到轴上P的距离相同。电势是标量，把k·dq/距离相加即可，不需要投影。":"把圆环形薄板切成很多细圆环。半径s、宽ds的一圈带电量是σ·2πs·ds，逐圈叠加电势。",
    "横坐标是空间位置x，纵坐标是电势U。曲线的高度可以改变零点后整体移动；它不是粒子的运动轨迹。",
    "金色割线给出ΔU/Δx，绿色切线给出dU/dx。将Δx调小，割线斜率趋近切线；电场取斜率的负值。",
    "将试验电荷从A(x=0)移到B(x)。电场力的功只取决于两点的电势差；负试验电荷的功反号。"
  ];
  const tex=step===0?(mode==="ring"?
    String.raw`U(x)=\int\frac{k\,dq}{\sqrt{x^2+R^2}}+U_{\rm shift}=\frac{kQ}{\sqrt{x^2+R^2}}+U_{\rm shift}`:
    String.raw`U(x)=2\pi k\sigma\int_a^R\frac{s\,ds}{\sqrt{x^2+s^2}}+U_{\rm shift}`
  ):step===1?(mode==="ring"?
    String.raw`U(0)=\frac{kQ}{R}+U_{\rm shift},\qquad U(-x)=U(x)`:
    String.raw`U(x)=\frac{\sigma}{2\varepsilon_0}\left(\sqrt{x^2+R^2}-\sqrt{x^2+a^2}\right)+U_{\rm shift}`
  ):step===2?(mode==="ring"?
    String.raw`E_x=-\frac{dU}{dx}=\frac{kQx}{(x^2+R^2)^{3/2}}`:
    String.raw`E_x=-\frac{dU}{dx}=\frac{\sigma x}{2\varepsilon_0}\left(\frac1{\sqrt{x^2+a^2}}-\frac1{\sqrt{x^2+R^2}}\right)`
  ):String.raw`A_{A\to B}=q_0[U(0)-U(x)],\qquad\Delta W=-A_{A\to B}`;
  return <>
    <div className="ph-mode-tabs" aria-label="带电分布"><button aria-pressed={mode==="ring"} onClick={()=>preset(false)}>均匀细圆环</button><button aria-pressed={mode==="annulus"} onClick={()=>preset(true)}>均匀圆环形薄板</button></div>
    <div className="ph-workbench">
      <div className="ph-scene ph-concept-scene">
        <svg viewBox="0 0 680 200" role="img" aria-label={`${mode==="ring"?"细圆环":"圆环形薄板"}轴线观察点x=${x}米，电场分量${fmt(result.field)}N/C`}>
          <path d="M55 100H625" stroke="#64748b"/><text x="631" y="106" fill="#94a3b8">x</text>
          <ellipse cx="340" cy="100" rx={16*radius} ry={45*radius} fill={mode==="annulus"?"#60a5fa55":"none"} stroke="#60a5fa" strokeWidth="3"/>
          {mode==="annulus"&&<ellipse cx="340" cy="100" rx={16*radius*ratio} ry={45*radius*ratio} fill="#091322" stroke="#60a5fa"/>}
          <text x="356" y="182" fill="#93c5fd">{mode==="ring"?"细圆环":"薄板有内孔"} · 轴向示意</text>
          <path d={`M340 ${100-45*radius}L${px} 100`} stroke="#94a3b8" strokeDasharray="5 5"/>
          <circle cx={px} cy="100" r="6" fill="#fbbf24"/><text x={px+10} y="126" fill="#fbbf24">P</text>
          <text x="322" y="128" fill="#94a3b8">O</text>
          {step>=2&&field!==0&&<path d={`M${px} 100h${field>0?50:-50}m${field>0?-9:9} -6l${field>0?9:-9} 6l${field>0?-9:9} 6`} stroke="#34d399" strokeWidth="3" fill="none"/>}
        </svg>
        <p className="ph-footnote">箭头示场方向，大小见读数；虚线是源到场点的距离。</p>
        {step>=1&&<svg viewBox="0 0 680 300" role="img" aria-label={`电势U随轴坐标x的曲线，当前切线斜率${fmt(-field)}伏每米`}>
          <defs><clipPath id="ph-slope-clip"><rect x="55" y="25" width="570" height="222"/></clipPath></defs>
          <path d={`M60 30V245M60 ${gy(0)}H627`} stroke="#64748b" fill="none"/>
          {[-3,-2,-1,0,1,2,3].map(t=><text key={t} x={gx(t)} y="265" textAnchor="middle" fill="#94a3b8">{t}</text>)}
          <text x="588" y="289" fill="#94a3b8">x / m</text><text x="16" y="20" fill="#c4b5fd">U / V</text>
          <text x="4" y={gy(high)+5} fill="#94a3b8" fontSize="12">{fmt(high,3)}</text>
          {low!==high&&<text x="4" y={gy(low)+5} fill="#94a3b8" fontSize="12">{fmt(low,3)}</text>}
          <g clipPath="url(#ph-slope-clip)">
            <path d={curve} stroke="#c4b5fd" strokeWidth="3" fill="none" className="ph-draw" pathLength="1"/>
            {step>=2&&<>
              <path d={`M${gx(x-.7)} ${gy(result.potential+field*.7)}L${gx(x+.7)} ${gy(result.potential-field*.7)}`} stroke="#34d399" strokeWidth="3"/>
              <path d={`M${gx(x)} ${gy(result.potential)}L${gx(x+h)} ${gy(next.potential)}`} stroke="#fbbf24" strokeWidth="3" strokeDasharray="5 3"/>
              <circle cx={gx(x+h)} cy={gy(next.potential)} r="4" fill="#fbbf24"/>
            </>}
            {step===3&&<><path d={`M${gx(0)} ${gy(0)}V${gy(reference.potential)}`} stroke="#60a5fa" strokeDasharray="4 4"/><circle cx={gx(0)} cy={gy(reference.potential)} r="5" fill="#60a5fa"/></>}
            <circle cx={gx(x)} cy={gy(result.potential)} r="6" fill="#fbbf24"/>
          </g>
          <text x="70" y="286" fill="#c4b5fd">紫：U(x)</text>{step>=2&&<text x="180" y="286" fill="#34d399">绿：切线 · 金：割线</text>}
        </svg>}
        <p className="ph-caption">{texts[step]}</p>
        <div className="ph-readouts">
          <Readout label="当前位置的电势 U" value={result.potential} unit="V"/>
          <Readout label="当前位置的电场 Eₓ" value={result.field} unit="N/C"/>
          {step>=2&&<><Readout label="切线斜率 dU/dx" value={-field} unit="V/m"/><Readout label="割线估计 −ΔU/Δx" value={-secant} unit="N/C"/></>}
        </div>
      </div>
      <aside className="ph-controls" aria-label="电势曲线参数">
        <Slider label="轴坐标 x" value={x} min={-2.5} max={2.5} step={.05} onChange={setX} unit="m"/>
        <Slider label={mode==="ring"?"圆环半径 R":"薄板外半径 R"} value={radius} min={.3} max={1.5} step={.05} onChange={setRadius} unit="m"/>
        {mode==="ring"?<Slider label="圆环总电荷 Q" value={charge} min={-5} max={5} step={.5} onChange={setCharge} unit="nC"/>:
          <><Slider label="内外半径比 a/R" value={ratio} min={.2} max={.9} step={.05} onChange={setRatio}/><Slider label="面电荷密度 σ" value={density} min={-3} max={3} step={.25} onChange={setDensity} unit="nC/m²"/></>}
        <Slider label="电势零点平移 Ushift" value={offset} min={-30} max={30} step={5} onChange={setOffset} unit="V"/>
        {step>=2&&<Slider label="割线间隔 Δx" value={h} min={.01} max={.5} step={.01} onChange={setH} unit="m"/>}
        {step===3&&<Slider label="试验电荷 q₀" value={probe} min={-2} max={2} step={.5} onChange={setProbe} unit="nC"/>}
        <p className="ph-footnote">Ushift=0时取无穷远零势。加上同一常数仅改参考点，既不改变场源，也不改变E。</p>
      </aside>
    </div>
    <Steps labels={["电荷怎样产生U","画出U(x)","从斜率得到E","由势差计算功"]} step={step} setStep={setStep} reset={()=>preset(false)}/>
    <section className="ph-panel"><h2>{["先相加电势","电势高度与变化速度","负号把下坡方向变成场方向","电场力做功与势能变化"][step]}</h2><Formula tex={tex}/>
      {step===2&&<p>从x走到x+Δx，ΔU = {fmt(next.potential-result.potential)} V，Δx = {fmt(h)} m。负割线斜率约{fmt(-secant)} N/C；真正的Eₓ为{fmt(field)} N/C。缩小Δx可以比较极限。</p>}
      {step===3&&<p>A在x=0，B在x={fmt(x)} m。U(A)−U(B)={fmt(reference.potential-result.potential)} V；q₀={probe} nC。电场力做功 {fmt(work.work*1e9)} nJ，势能变化 {fmt(work.energyChange*1e9)} nJ。</p>}
      <p>只考察旋转对称轴：横向场相消，因此−dU/dx给出轴线上完整场。图中的曲线是电势随位置的变化，不是粒子的运动路径。</p>
    </section>
    <Tasks items={[
      {title:"U很高，E就一定很大吗？",text:"用默认正圆环，进入第3步并把x设为0。U约17.98 V，但切线水平，所以E=0。向右移动，U下降而E先增大；圆环在x=R/√2处场强最大。"},
      {title:"把U整体抬高30V，电场会变吗？",text:"保持场源与x不变，将Ushift从0改为30V。整条曲线升高，切线斜率、E和两点之间的功保持不变。"},
      {title:"把面分布切成一圈圈",text:"选择圆环形薄板，R=1m、a/R=0.5、σ=1nC/m²、x=0.5m。U约23.21V，Eₓ约14.68N/C。增大内孔意味着移走正电荷，U和x>0处的E均减小。"}
    ]}/>
  </>;
}
