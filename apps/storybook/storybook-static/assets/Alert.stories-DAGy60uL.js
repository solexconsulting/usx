import{R as s}from"./index-C5e9SFkp.js";import{a as o,M as k,T as ue,r as me,b as ge}from"./story-helpers-kPY6rceR.js";function I({heading:e="Informative status",text:t="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",linkText:r,linkHref:i="javascript:void(0);",children:a,variant:n="info",slim:l=!1,noIcon:c=!1,className:d="",...b}){const u=["info","warning","success","error","emergency"].includes(n)?n:"info",ce=["usa-alert",`usa-alert--${u}`,l?"usa-alert--slim":"",c?"usa-alert--no-icon":"","usx-alert",`usx-alert--${u}`,l?"usx-alert--slim":"",c?"usx-alert--no-icon":"",d].filter(Boolean).join(" "),de=u==="error"||u==="emergency"?"alert":b.role;return s.createElement("div",{className:ce,role:de,...b},s.createElement("div",{className:"usa-alert__body usx-alert__body"},!l&&e?s.createElement("h4",{className:"usa-alert__heading usx-alert__heading"},e):null,s.createElement("p",{className:"usa-alert__text usx-alert__text"},a??t,r?s.createElement(s.Fragment,null," ",s.createElement("a",{className:"usa-link",href:i},r)):null)))}I.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{heading:{defaultValue:{value:"'Informative status'",computed:!1},required:!1},text:{defaultValue:{value:"'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'",computed:!1},required:!1},linkHref:{defaultValue:{value:"'javascript:void(0);'",computed:!1},required:!1},variant:{defaultValue:{value:"'info'",computed:!1},required:!1},slim:{defaultValue:{value:"false",computed:!1},required:!1},noIcon:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};function pe(e={}){const t=e.heading||"Informative status",r=e.message||"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",a=new Set(["info","warning","success","error","emergency"]).has(e.variant)?e.variant:"info",n=document.createElement("div"),l=document.createElement("div"),c=document.createElement("h4"),d=document.createElement("p");return n.className=["usa-alert",`usa-alert--${a}`,e.slim?"usa-alert--slim":"",e.noIcon?"usa-alert--no-icon":"","usx-alert",`usx-alert--${a}`,e.slim?"usx-alert--slim":"",e.noIcon?"usx-alert--no-icon":""].filter(Boolean).join(" "),(a==="error"||a==="emergency")&&n.setAttribute("role","alert"),l.className="usa-alert__body usx-alert__body",c.className="usa-alert__heading usx-alert__heading",c.textContent=t,d.className="usa-alert__text usx-alert__text",d.textContent=r,e.slim||l.appendChild(c),l.appendChild(d),n.appendChild(l),n}const _e=`<h3 class="site-preview-heading">Standard alerts</h3>

<div class="usa-alert usa-alert--info usx-alert usx-alert--info">
  <div class="usa-alert__body usx-alert__body">
    <h4 class="usa-alert__heading usx-alert__heading">Informative status</h4>
    <p class="usa-alert__text usx-alert__text">
      Lorem ipsum dolor sit amet,
      <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a>
      elit, sed do eiusmod.
    </p>
  </div>
</div>

<div class="usa-alert usa-alert--warning usx-alert usx-alert--warning">
  <div class="usa-alert__body usx-alert__body">
    <h4 class="usa-alert__heading usx-alert__heading">Warning status</h4>
    <p class="usa-alert__text usx-alert__text">
      Lorem ipsum dolor sit amet,
      <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a>
      elit, sed do eiusmod.
    </p>
  </div>
</div>

<div class="usa-alert usa-alert--success usx-alert usx-alert--success">
  <div class="usa-alert__body usx-alert__body">
    <h4 class="usa-alert__heading usx-alert__heading">Success status</h4>
    <p class="usa-alert__text usx-alert__text">
      Lorem ipsum dolor sit amet,
      <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a>
      elit, sed do eiusmod.
    </p>
  </div>
</div>

<div class="usa-alert usa-alert--error usx-alert usx-alert--error" role="alert">
  <div class="usa-alert__body usx-alert__body">
    <h4 class="usa-alert__heading usx-alert__heading">Error status</h4>
    <p class="usa-alert__text usx-alert__text">
      Lorem ipsum dolor sit amet,
      <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a>
      elit, sed do eiusmod.
    </p>
  </div>
</div>

<div class="usa-alert usa-alert--emergency usx-alert usx-alert--emergency" role="alert">
  <div class="usa-alert__body usx-alert__body">
    <h4 class="usa-alert__heading usx-alert__heading">Emergency status</h4>
    <p class="usa-alert__text usx-alert__text">
      Lorem ipsum dolor sit amet,
      <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a>
      elit, sed do eiusmod.
    </p>
  </div>
</div>

<h3 class="site-preview-heading">Slim alert</h3>

<div class="usa-alert usa-alert--info usa-alert--slim usx-alert usx-alert--info usx-alert--slim">
  <div class="usa-alert__body usx-alert__body">
    <p class="usa-alert__text usx-alert__text">
      Lorem ipsum dolor sit amet,
      <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a>
      elit, sed do eiusmod.
    </p>
  </div>
</div>

<h3 class="site-preview-heading">Alert with no icon</h3>

<div class="usa-alert usa-alert--info usa-alert--no-icon usx-alert usx-alert--info usx-alert--no-icon">
  <div class="usa-alert__body usx-alert__body">
    <p class="usa-alert__text usx-alert__text">
      Lorem ipsum dolor sit amet,
      <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a>
      elit, sed do eiusmod.
    </p>
  </div>
</div>
`,fe={title:"Components/Alert",component:I,tags:["autodocs"],argTypes:{...o.argTypes,message:{control:"text"}}},m={name:"React",args:o.args},g={args:o.args,render:e=>s.createElement(k,{html:ge(e)})},p={args:{...o.args,message:o.args.text},render:({heading:e,message:t,variant:r,slim:i,noIcon:a})=>{const n=pe({heading:e,message:t,variant:r,slim:i,noIcon:a});return s.createElement(k,{html:n.outerHTML})}},_={args:{...o.args,message:o.args.text},render:({heading:e,message:t,variant:r,slim:i,noIcon:a})=>s.createElement(ue,{snippet:me({heading:e,text:t,variant:r,slim:i,noIcon:a})})},x={args:{...o.args,message:o.args.text},render:({heading:e,message:t,variant:r,slim:i,noIcon:a})=>s.createElement(I,{heading:e,text:t,variant:r,slim:i,noIcon:a})},v={args:{heading:"Warning status",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",variant:"warning"}},f={args:{heading:"Success status",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",variant:"success"}},h={args:{heading:"Error status",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",variant:"error"}},y={args:{heading:"Emergency status",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",variant:"emergency"}},E={args:{heading:"Informative status",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",variant:"info",slim:!0}},L={args:{heading:"Informative status",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",variant:"info",noIcon:!0}},S={render:()=>s.createElement(k,{html:_e})};var j,C,T;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'React',
  args: alertConfig.args
}`,...(T=(C=m.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var w,A,M;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: alertConfig.args,
  render: args => <MarkupBlock html={renderHtmlAlert(args)} />
}`,...(M=(A=g.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var N,V,q;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...alertConfig.args,
    message: alertConfig.args.text
  },
  render: ({
    heading,
    message,
    variant,
    slim,
    noIcon
  }) => {
    const element = createAlert({
      heading,
      message,
      variant,
      slim,
      noIcon
    });
    return <MarkupBlock html={element.outerHTML} />;
  }
}`,...(q=(V=p.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var B,R,H;_.parameters={..._.parameters,docs:{...(B=_.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...alertConfig.args,
    message: alertConfig.args.text
  },
  render: ({
    heading,
    message,
    variant,
    slim,
    noIcon
  }) => <TemplateTagBlock snippet={renderDjangoAlertTag({
    heading,
    text: message,
    variant,
    slim,
    noIcon
  })} />
}`,...(H=(R=_.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var D,W,$;x.parameters={...x.parameters,docs:{...(D=x.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...alertConfig.args,
    message: alertConfig.args.text
  },
  render: ({
    heading,
    message,
    variant,
    slim,
    noIcon
  }) => <Alert heading={heading} text={message} variant={variant} slim={slim} noIcon={noIcon} />
}`,...($=(W=x.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var z,J,F;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    heading: 'Warning status',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    variant: 'warning'
  }
}`,...(F=(J=v.parameters)==null?void 0:J.docs)==null?void 0:F.source}}};var O,G,K;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    heading: 'Success status',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    variant: 'success'
  }
}`,...(K=(G=f.parameters)==null?void 0:G.docs)==null?void 0:K.source}}};var P,Q,U;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    heading: 'Error status',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    variant: 'error'
  }
}`,...(U=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    heading: 'Emergency status',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    variant: 'emergency'
  }
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ae,se;E.parameters={...E.parameters,docs:{...(ee=E.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    heading: 'Informative status',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    variant: 'info',
    slim: true
  }
}`,...(se=(ae=E.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var re,te,ne;L.parameters={...L.parameters,docs:{...(re=L.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    heading: 'Informative status',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    variant: 'info',
    noIcon: true
  }
}`,...(ne=(te=L.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,ie,le;S.parameters={...S.parameters,docs:{...(oe=S.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => <MarkupBlock html={canonicalMarkup} />
}`,...(le=(ie=S.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};const he=["ReactStory","HTML","JS","DjangoTemplateTag","DjangoRenderedEquivalent","Warning","Success","Error","Emergency","Slim","NoIcon","CanonicalMarkup"];export{S as CanonicalMarkup,x as DjangoRenderedEquivalent,_ as DjangoTemplateTag,y as Emergency,h as Error,g as HTML,p as JS,L as NoIcon,m as ReactStory,E as Slim,f as Success,v as Warning,he as __namedExportsOrder,fe as default};
