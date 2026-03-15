import{R as e}from"./index-C5e9SFkp.js";import{c as s}from"./color-B-P8lW9X.js";const m={title:"Foundations/Color",tags:["autodocs"]},r={render:()=>e.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(180px, 1fr))",gap:"1rem"}},Object.entries(s).map(([n,t])=>e.createElement("div",{key:n,style:{border:"1px solid #dfe1e2",borderRadius:"8px",overflow:"hidden"}},e.createElement("div",{style:{height:"64px",background:t}}),e.createElement("div",{style:{padding:"0.75rem"}},e.createElement("strong",null,n),e.createElement("div",null,e.createElement("code",null,t))))))};var d,o,a;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    gap: '1rem'
  }}>
      {Object.entries(colors).map(([name, value]) => <div key={name} style={{
      border: '1px solid #dfe1e2',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
          <div style={{
        height: '64px',
        background: value
      }} />
          <div style={{
        padding: '0.75rem'
      }}>
            <strong>{name}</strong>
            <div><code>{value}</code></div>
          </div>
        </div>)}
    </div>
}`,...(a=(o=r.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const c=["Palette"];export{r as Palette,c as __namedExportsOrder,m as default};
