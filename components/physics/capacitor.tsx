"use client";
import { useState } from "react";
import { capacitor, type CapacitorInput } from "@/lib/physics/capacitor";
import { Formula, Slider, Readout, Steps, Tasks, fmt } from "./shared";

export function CapacitorDemo() {
  const [geometry,setGeometry]=useState<CapacitorInput["geometry"]>("thickness");
  const [constraint,setConstraint]=useState<CapacitorInput["constraint"]>("charge");
  const [fraction,setFraction]=useState(.5), [er,setEr]=useState(3);
  const [distance,setDistance]=useState(2), [voltage,setVoltage]=useState(100);
  const [step,setStep]=useState(0);
  const m=capacitor({area:.01,initialDistance:.002,distance:distance*.001,
    initialVoltage:voltage,relativePermittivity:er,fraction,geometry,constraint});
  function reset() { setGeometry("thickness"); setConstraint("charge"); setFraction(.5);
    setEr(3);setDistance(2);setVoltage(100);setStep(0); }
  const h=60+distance*32, top=75, bottom=top+h, split=top+h*(1-fraction);
  const sign=m.Q>0?"+":m.Q<0?"−":"0";
  const other=m.Q>0?"−":m.Q<0?"+":"0";
  const captions=[
    geometry==="thickness"?"沿厚度分层：每段占满板面积，电势差相加。":"按面积分区：两区都跨越完整板距，共用同一电势差。",
    constraint==="charge"?"断电且两板各自隔离：Q固定为初始充电量，U随C变化。":"理想电源保持U：电源可以继续搬运电荷，Q随C变化。",
    geometry==="thickness"?"两层交界无自由电荷，D的法向分量相同；两层E通常不同。":"两区电场相同，但介电常量不同，板上自由面电荷密度不同。",
    "储能的变化等于电源功与外界机械功之和。外界机械功为负，表示电场可向外界输出功。"
  ];
  return <>
    <div className="ph-workbench">
      <div className="ph-scene">
        <div className="ph-scene-top"><span className="ph-pill">S = 100 cm²</span><span>上板A → 下板B 为 +x</span></div>
        <svg viewBox="0 0 700 350" role="img" aria-label={"平行板电容器，"+(geometry==="thickness"?"沿厚度分层":"按面积分区")+"，介质比例"+fraction+"，板距"+distance+"毫米，电场"+(m.Q===0?"为零":m.Q>0?"向下":"向上")}>
          <defs><marker id="cap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="#34d399"/></marker></defs>
          <rect x="130" y={top} width="420" height={h} fill="#111c30"/>
          {fraction>0 && <rect x="130" y={geometry==="thickness"?split:top} width={geometry==="thickness"?420:420*fraction} height={geometry==="thickness"?h*fraction:h} fill="#a78bfa45" stroke="#a78bfa"/>}
          <path d={"M100 "+top+"H580 M100 "+bottom+"H580"} stroke="#60a5fa" strokeWidth="8"/>
          {[160,220,280,340,400,460,520].map(x=><g key={x} fill="#93c5fd" textAnchor="middle" fontSize="22"><text x={x} y={top-15}>{sign}</text><text x={x} y={bottom+30}>{other}</text></g>)}
          <text x="90" y={top+5} fill="#cbd5e1" textAnchor="end">A</text><text x="90" y={bottom+5} fill="#cbd5e1" textAnchor="end">B</text>
          <path d={"M615 "+top+"V"+bottom+" M605 "+top+"H625 M605 "+bottom+"H625"} stroke="#fbbf24"/>
          <text x="634" y={(top+bottom)/2} fill="#fbbf24" fontSize="17">{distance} mm</text>
          {step>=2 && m.Q!==0 && [210,340,470].map(x=><path key={x} d={m.Q>0?"M"+x+" "+(top+18)+"V"+(bottom-18):"M"+x+" "+(bottom-18)+"V"+(top+18)} stroke="#34d399" strokeWidth="2" markerEnd="url(#cap-arrow)"/>)}
          <text x="340" y="317" textAnchor="middle" fill="#c4b5fd">紫色：介质 · 比例 f = {fraction} · εr = {er}</text>
          <text x="340" y="341" textAnchor="middle" fill="#94a3b8" fontSize="14">箭头示方向，不表示不同区域场强相等；大小见读数。</text>
        </svg>
        <p className="ph-caption">{captions[step]}</p>
        <p className="ph-caption">剖面为示意图，板距不按实际比例绘制；正负号只表示极性，数量与间距不表示电荷密度。</p>
        <div className="ph-readouts" aria-live="polite">
          <Readout label="电容 C" value={m.C*1e12} unit="pF"/>
          <Readout label="上板电荷 Q" value={m.Q*1e9} unit="nC"/>
          <Readout label="U = UA − UB" value={m.U} unit="V"/>
          <Readout label="储能 W" value={m.W*1e6} unit="μJ"/>
        </div>
        {step>=2 && <div className="ph-panel ph-cap-fields">
          <h2>分区电场（沿 +x 的有符号分量）</h2>
          <p>真空区：{m.vacuumField===null?"无此区域":fmt(m.vacuumField/1000)+" kV/m"}<br/>
          介质区：{m.dielectricField===null?"无此区域":fmt(m.dielectricField/1000)+" kV/m"}</p>
          {m.polarization!==null && <p>介质极化强度 Px = {fmt(m.polarization*1e6)} μC/m²</p>}
        </div>}
      </div>
      <aside className="ph-controls" aria-label="电容器参数">
        <label className="ph-cap-select">连接条件<select aria-label="连接条件" value={constraint} onChange={e=>setConstraint(e.target.value as CapacitorInput["constraint"])}><option value="charge">断开电源 · 固定Q</option><option value="voltage">连接电源 · 固定U</option></select></label>
        <label className="ph-cap-select">填充几何<select aria-label="填充几何" value={geometry} onChange={e=>setGeometry(e.target.value as CapacitorInput["geometry"])}><option value="thickness">沿厚度分层</option><option value="area">按面积分区</option></select></label>
        <Slider label="介质填充比例 f" value={fraction} min={0} max={1} step={.05} onChange={setFraction}/>
        <Slider label="相对介电常量 εr" value={er} min={1} max={6} step={.1} onChange={setEr}/>
        <Slider label="当前板距 d" value={distance} min={.5} max={4} step={.1} unit="mm" onChange={setDistance}/>
        <Slider label="初始充电电压 U0" value={voltage} min={-100} max={100} step={10} unit="V" onChange={setVoltage}/>
        <p className="ph-footnote">共同初态：真空、d₀ = 2 mm、面积不变。U₀设定初态；切换连接条件从该初态重新比较，不模拟开关瞬间。</p>
      </aside>
    </div>
    <Steps labels={["看填充几何","找保持量","看分区电场","核对能量"]} step={step} setStep={setStep} reset={reset}/>
    <section className="ph-panel">
      <h2>{["从几何求电容","连接条件决定Q与U","电场与极化","电源、场与外界的能量"][step]}</h2>
      {step===0 && <Formula tex={geometry==="thickness"?String.raw`C=\frac{\varepsilon_0S}{d(1-f+f/\varepsilon_r)}`:String.raw`C=\frac{\varepsilon_0S}{d}(1-f+f\varepsilon_r)`}/>}
      {step===1 && <Formula tex={constraint==="charge"?String.raw`Q=Q_0=C_0U_0,\qquad U=\frac{Q_0}{C}`:String.raw`U=U_0,\qquad Q=CU_0`}/>}
      {step===2 && <Formula tex={geometry==="thickness"?String.raw`D=\frac QS,\quad E_{\rm vac}=\frac D{\varepsilon_0},\quad E_{\rm diel}=\frac D{\varepsilon_0\varepsilon_r}`:String.raw`E_{\rm vac}=E_{\rm diel}=\frac Ud,\quad \sigma_f=\varepsilon E`}/>}
      {step===3 && <><Formula tex={String.raw`W=\frac12CU^2,\qquad \Delta W=A_{\rm source}+A_{\rm ext}`}/>
        <p>相对共同初态：ΔW = {fmt((m.W-m.W0)*1e6)} μJ；电源功 = {fmt(m.sourceWork*1e6)} μJ；外界机械功 = {fmt(m.externalWork*1e6)} μJ。</p>
        <p>W / W₀ = {m.energyRatio===null?"初始能量为零，比值无定义":fmt(m.energyRatio)}；C / C₀ = {fmt(m.capacitanceRatio)}。</p></>}
      <p className="ph-footnote">线性、各向同性、无损耗介质；忽略极板和介质交界附近的边缘场。分层中没有自由界面电荷。未模拟漏电、击穿与开关暂态。</p>
    </section>
    <Tasks items={[
      {title:"同样填一半，电容相同吗？",text:"先预测。重置到 εr=3、f=0.5、d=2 mm，再切换两种几何。厚度分层 C/C0=1.5，面积分区为2：前者势差相加，后者电荷相加。"},
      {title:"插入介质后，能量一定减小吗？",text:"保持d=2 mm、εr=3，将f从0变1。固定Q时W变为W0/3；固定U时变为3W0。到步骤4核对电源功，两次外界机械功均为负。"},
      {title:"拉开两板，场会怎样变？",text:"设f=0，将板距2 mm改4 mm。固定Q时场不变而电压加倍；固定U时电压不变而场减半。先预测再到步骤3看读数。"},
      {title:"改变极性与零电荷",text:"将U0由100 V改为−100 V：箭头反向，能量不变；再设为0：电场与能量归零，不显示无意义的能量比值。"}
    ]}/>
  </>;
}
