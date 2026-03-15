import{R as i}from"./index-C5e9SFkp.js";function I(e={}){const r=e.heading||"Informative status",s=e.message||"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",n=new Set(["info","warning","success","error","emergency"]).has(e.variant)?e.variant:"info",a=document.createElement("div"),o=document.createElement("div"),m=document.createElement("h4"),d=document.createElement("p");return a.className=["usa-alert",`usa-alert--${n}`,e.slim?"usa-alert--slim":"",e.noIcon?"usa-alert--no-icon":"","usx-alert",`usx-alert--${n}`,e.slim?"usx-alert--slim":"",e.noIcon?"usx-alert--no-icon":""].filter(Boolean).join(" "),(n==="error"||n==="emergency")&&a.setAttribute("role","alert"),o.className="usa-alert__body usx-alert__body",m.className="usa-alert__heading usx-alert__heading",m.textContent=r,d.className="usa-alert__text usx-alert__text",d.textContent=s,e.slim||o.appendChild(m),o.appendChild(d),a.appendChild(o),a}function C(e={}){const r=e.label||"Button",s=e.variant==="secondary"?"usa-button--secondary usx-button--secondary":"",t=document.createElement("button");return t.type=e.type||"button",t.className=["usa-button","usx-button",s].filter(Boolean).join(" "),t.textContent=r,t}function T(e={}){const r=e.label||"Label",s=e.placeholder||"Type here",t=document.createElement("label"),n=document.createElement("span"),a=document.createElement("input");return n.textContent=r,a.className="usa-input usx-input",a.type=e.type||"text",a.placeholder=s,t.appendChild(n),t.appendChild(a),t}function p({html:e}){return i.createElement("div",{dangerouslySetInnerHTML:{__html:e}})}const B={title:"JavaScript/Components",tags:["autodocs"]},c={name:"createButton",args:{label:"Continue",variant:void 0,type:"button"},argTypes:{variant:{control:"select",options:[void 0,"secondary"]}},render:e=>i.createElement(p,{html:C(e).outerHTML})},l={name:"createInput",args:{label:"Email address",placeholder:"name@agency.gov",type:"text"},render:e=>i.createElement(p,{html:T(e).outerHTML})},u={name:"createAlert",args:{variant:"info",heading:"Informative status",message:"System status and notification updates appear here.",slim:!1,noIcon:!1},argTypes:{variant:{control:"select",options:["info","warning","success","error","emergency"]}},render:e=>i.createElement(p,{html:I(e).outerHTML})};var g,y,h;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'createButton',
  args: {
    label: 'Continue',
    variant: undefined,
    type: 'button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'secondary']
    }
  },
  render: args => <Markup html={createButton(args).outerHTML} />
}`,...(h=(y=c.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var f,b,v;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'createInput',
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov',
    type: 'text'
  },
  render: args => <Markup html={createInput(args).outerHTML} />
}`,...(v=(b=l.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var x,E,_;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'createAlert',
  args: {
    variant: 'info',
    heading: 'Informative status',
    message: 'System status and notification updates appear here.',
    slim: false,
    noIcon: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error', 'emergency']
    }
  },
  render: args => <Markup html={createAlert(args).outerHTML} />
}`,...(_=(E=u.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};const L=["ButtonFactory","InputFactory","AlertFactory"];export{u as AlertFactory,c as ButtonFactory,l as InputFactory,L as __namedExportsOrder,B as default};
