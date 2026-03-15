import{R as a}from"./index-C5e9SFkp.js";import{i as l,M as g,T as v,f as _,g as J}from"./story-helpers-kPY6rceR.js";function T({label:e="Label",id:r,placeholder:t="Type here",className:n="",...o}){const s=["usa-input","usx-input",n].filter(Boolean).join(" ");return a.createElement("label",null,a.createElement("span",null,e),a.createElement("input",{id:r,className:s,type:"text",placeholder:t,...o}))}T.__docgenInfo={description:"",methods:[],displayName:"Input",props:{label:{defaultValue:{value:"'Label'",computed:!1},required:!1},placeholder:{defaultValue:{value:"'Type here'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};function N(e={}){const r=e.label||"Label",t=e.placeholder||"Type here",n=document.createElement("label"),o=document.createElement("span"),s=document.createElement("input");return o.textContent=r,s.className="usa-input usx-input",s.type=e.type||"text",s.placeholder=t,n.appendChild(o),n.appendChild(s),n}const V=`<label>
  <span>Label</span>
  <input class="usa-input usx-input" type="text" placeholder="Type here" />
</label>
`,z={title:"Components/Input",component:T,tags:["autodocs"],argTypes:l.argTypes},p={name:"React",args:l.args},c={title:"HTML/Input",args:l.args,render:e=>a.createElement(g,{html:J(e)})},u={title:"JS/Input",args:l.args,render:({label:e,placeholder:r,type:t})=>{const n=N({label:e,placeholder:r,type:t});return a.createElement(g,{html:n.outerHTML})}},d={title:"Django/Input",args:l.args,render:e=>a.createElement(v,{snippet:_(e)})},m={title:"Django/Rendered/Input",args:l.args,render:({label:e,placeholder:r,type:t})=>a.createElement(T,{label:e,placeholder:r,type:t})},i={render:()=>a.createElement(g,{html:V})};var f,h,I;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'React',
  args: inputConfig.args
}`,...(I=(h=p.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var y,b,M;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  title: 'HTML/Input',
  args: inputConfig.args,
  render: args => <MarkupBlock html={renderHtmlInput(args)} />
}`,...(M=(b=c.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};var k,E,C;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  title: 'JS/Input',
  args: inputConfig.args,
  render: ({
    label,
    placeholder,
    type
  }) => {
    const element = createInput({
      label,
      placeholder,
      type
    });
    return <MarkupBlock html={element.outerHTML} />;
  }
}`,...(C=(E=u.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var S,j,x;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  title: 'Django/Input',
  args: inputConfig.args,
  render: args => <TemplateTagBlock snippet={renderDjangoInputTag(args)} />
}`,...(x=(j=d.parameters)==null?void 0:j.docs)==null?void 0:x.source}}};var D,L,R;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  title: 'Django/Rendered/Input',
  args: inputConfig.args,
  render: ({
    label,
    placeholder,
    type
  }) => <Input label={label} placeholder={placeholder} type={type} />
}`,...(R=(L=m.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var H,B,q;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <MarkupBlock html={canonicalMarkup} />
}`,...(q=(B=i.parameters)==null?void 0:B.docs)==null?void 0:q.source}}};const A=["ReactStory","HTML","JS","DjangoTemplateTag","DjangoRenderedEquivalent","CanonicalMarkup"];export{i as CanonicalMarkup,m as DjangoRenderedEquivalent,d as DjangoTemplateTag,c as HTML,u as JS,p as ReactStory,A as __namedExportsOrder,z as default};
