"use client";
import { useState } from "react";
import { uniformFlux } from "@/lib/physics/field-and-potential";
import { Formula, Slider, Steps, Tasks, Readout, fmt } from "./shared";
export function FluxAngleDemo(){
  const [e,setE]=useState(100),[area,setArea]=useState(.02),[angle,setAngle]=useState(0),[step,setStep]=useState(0);
  const f=uniformFlux(e,area,angle),rad=angle*Math.PI/180,nx=Math.cos(rad),ny=-Math.sin(rad);
  const length=160*Math.sqrt(area/.02),half=length/2;
  const captions=[
    "法线是垂直于面的方向。图中的蓝线是面从侧面看去的样子；金箭头是选定的正法线。",
    "旋转蓝色面，实际面积S保持不变；迎着电场的投影面积变成S·|cosθ|。θ取电场与法线的夹角。",
    "场朝法线正侧穿过，通量为正；朝反侧穿过为负。90°时场沿着面，通量为零。",
    "在同一个匀强场里放一个封闭盒子。左面流入记负、右面流出记正，净通量为零；盒子中的E仍不为零。"
  ];
  const tex=[
    String.raw`d\mathbf S=\hat{\mathbf n}\,dS`,
    String.raw`S_{\perp}=S|\cos\theta|`,
    String.raw`\Phi_E=\mathbf E\cdot\mathbf S=ES\cos\theta`,
    String.raw`\oint\mathbf E\cdot d\mathbf S=-ES+ES+0+0+0+0=0`
  ];
  return <>
    <div className="ph-workbench"><div className="ph-scene ph-concept-scene">
      <svg viewBox="0 0 680 350" role="img" aria-label={step===3?"匀强场穿过封闭盒子，左面负通量，右面正通量":`电场向右，面法线夹角${angle}度，通量${fmt(f.flux)}牛平方米每库仑`}>
        {e>0&&[75,120,165,210,255].map(y=><path key={y} d={`M40 ${y}H630m-10-6 10 6-10 6`} stroke="#34d399" opacity=".5" strokeWidth="2" fill="none"/>)}
        <text x="35" y="35" fill="#34d399">E = {e} N/C →</text>
        {step===3?<g>
          <rect x="200" y={165-half} width="280" height={length} fill="#60a5fa15" stroke="#60a5fa" strokeWidth="3"/>
          <path d="M200 165H145m9-6-9 6 9 6M480 165H535m-9-6 9 6-9 6" stroke="#fbbf24" strokeWidth="3" fill="none"/>
          <text x="175" y="287" fill="#fbbf24">−ES = {fmt(-e*area)}</text><text x="413" y="287" fill="#fbbf24">+ES = {fmt(e*area)}</text>
          <text x="253" y="145" fill="#e2e8f0">内部仍有同样的E</text>
        </g>:<g>
          <path d={`M${320+half*ny} ${165-half*nx}L${320-half*ny} ${165+half*nx}`} stroke="#60a5fa" strokeWidth="7"/>
          <path d={`M320 165L${320+75*nx} ${165+75*ny}l${-10*nx+5*ny} ${-10*ny-5*nx}m${10*nx-5*ny} ${10*ny+5*nx}l${-10*nx-5*ny} ${-10*ny+5*nx}`} stroke="#fbbf24" strokeWidth="3" fill="none"/>
          <text x={320+93*nx} y={165+93*ny} fill="#fbbf24" textAnchor="middle">n</text>
          {step>=1&&<>
            <path d={`M540 ${165-half*Math.abs(nx)}V${165+half*Math.abs(nx)}`} stroke="#c4b5fd" strokeWidth="6"/>
            <path d={`M${320+half*ny} ${165-half*nx}H540M${320-half*ny} ${165+half*nx}H540`} stroke="#c4b5fd" strokeDasharray="4 4" opacity=".5"/>
            <text x="470" y="315" fill="#c4b5fd">投影：{fmt(Math.abs(f.signedProjection))} m²</text>
          </>}
          <text x="200" y="315" fill="#fbbf24">θ = {angle}°</text>
        </g>}
      </svg>
      <p className="ph-caption">{captions[step]}</p>
      <div className="ph-readouts"><Readout label={step===3?"封闭盒子的净通量":"有向电通量 Φ"} value={step===3?0:f.flux} unit="N·m²/C"/><Readout label="电场大小 E" value={e} unit="N/C"/></div>
      <p className="ph-footnote">蓝线为平面的侧视图，出屏幕方向的边长也随√S改变；紫线表示投影的侧视长度。场箭头示方向，强度由读数给出。</p>
    </div><aside className="ph-controls" aria-label="电通量参数">
      <Slider label="匀强电场 E" value={e} min={0} max={200} step={10} onChange={setE} unit="N/C"/>
      <Slider label="平面面积 S" value={area} min={.005} max={.04} step={.005} onChange={setArea} unit="m²"/>
      {step!==3&&<Slider label="法线与电场夹角 θ" value={angle} min={0} max={180} step={5} onChange={setAngle} unit="°"/>}
      <p className="ph-footnote">{step===3?"此处S为左、右两面的面积。其余四面法线垂直于E。":"面积矢量的方向是法线，不是沿着面。θ=0°时面与电场垂直。"}</p>
    </aside></div>
    <Steps labels={["找到面法线","看投影面积","给通量定正负","看封闭盒子"]} step={step} setStep={setStep} reset={()=>{setE(100);setArea(.02);setAngle(0);setStep(0);}}/>
    <section className="ph-panel"><h2>{step===3?"净通量为零，局部场仍可以不为零":"正负号来自法线方向"}</h2><Formula tex={tex[step]}/>
      <p>{step===3?`左面通量${fmt(-e*area)}、右面${fmt(e*area)} N·m²/C，恰好相消。高斯定理右边统计盒内净电荷；不能由它为零直接推出E为零。`:`E=${e} N/C，S=${area} m²，cosθ=${fmt(f.cosine)}。三者相乘得到${fmt(f.flux)} N·m²/C。`}</p>
    </section>
    <Tasks items={[
      {title:"把法线从0°转到60°，通量减少多少？",text:"默认参数给出2 N·m²/C；转到60°后变为1，因为投影减半。S和E都没有变。"},
      {title:"面没有变小，通量怎么会是负数？",text:"把θ转到180°。场仍水平向右，法线却向左，通量为−2。负号表示穿过方向，并不表示负面积。"},
      {title:"高斯定理能否直接推出E=0？",text:"进入封闭盒子步骤，把E从100调到200。左右面通量都加倍并继续相消，净通量始终为0，但E不为0。"}
    ]}/>
  </>;
}
