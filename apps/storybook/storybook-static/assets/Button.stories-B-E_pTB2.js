import{R as n}from"./index-C5e9SFkp.js";import{c as o,M as d,T as L,d as N,e as V}from"./story-helpers-kPY6rceR.js";function g({label:e="Button",variant:a,type:r="button",className:t="",...q}){const _=["usa-button usx-button",a==="secondary"?"usa-button--secondary usx-button--secondary":"",t].filter(Boolean).join(" ");return n.createElement("button",{type:r,className:_,...q},e)}g.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{defaultValue:{value:"'Button'",computed:!1},required:!1},type:{defaultValue:{value:"'button'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};function J(e={}){const a=e.label||"Button",r=e.variant==="secondary"?"usa-button--secondary usx-button--secondary":"",t=document.createElement("button");return t.type=e.type||"button",t.className=["usa-button","usx-button",r].filter(Boolean).join(" "),t.textContent=a,t}const I=`<button class="usa-button usx-button" type="button">Button</button>
`,A={title:"Components/Button",component:g,tags:["autodocs"],argTypes:o.argTypes},s={name:"React",args:o.args},u={args:o.args,render:e=>n.createElement(d,{html:V(e)})},c={args:o.args,render:({label:e,variant:a,type:r})=>{const t=J({label:e,variant:a,type:r});return n.createElement(d,{html:t.outerHTML})}},l={args:o.args,render:e=>n.createElement(L,{snippet:N(e)})},m={args:o.args,render:({label:e,variant:a,type:r})=>n.createElement(g,{label:e,variant:a,type:r})},p={render:()=>n.createElement(d,{html:I})};var i,b,f;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'React',
  args: buttonConfig.args
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var B,y,T;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: buttonConfig.args,
  render: args => <MarkupBlock html={renderHtmlButton(args)} />
}`,...(T=(y=u.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var k,v,M;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: buttonConfig.args,
  render: ({
    label,
    variant,
    type
  }) => {
    const element = createButton({
      label,
      variant,
      type
    });
    return <MarkupBlock html={element.outerHTML} />;
  }
}`,...(M=(v=c.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};var C,E,S;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: buttonConfig.args,
  render: args => <TemplateTagBlock snippet={renderDjangoButtonTag(args)} />
}`,...(S=(E=l.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var j,x,R;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: buttonConfig.args,
  render: ({
    label,
    variant,
    type
  }) => <Button label={label} variant={variant} type={type} />
}`,...(R=(x=m.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var h,D,H;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <MarkupBlock html={canonicalMarkup} />
}`,...(H=(D=p.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};const F=["ReactStory","HTML","JS","DjangoTemplateTag","DjangoRenderedEquivalent","CanonicalMarkup"];export{p as CanonicalMarkup,m as DjangoRenderedEquivalent,l as DjangoTemplateTag,u as HTML,c as JS,s as ReactStory,F as __namedExportsOrder,A as default};
