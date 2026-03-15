import{R as o}from"./index-C5e9SFkp.js";function l({html:e}){return o.createElement("div",{dangerouslySetInnerHTML:{__html:e}})}function M({label:e,variant:a}){return`<button type="button" class="usa-button usx-button${a==="secondary"?" usa-button--secondary usx-button--secondary":""}">${e}</button>`}function S({label:e,placeholder:a}){return`<label><span>${e}</span><input class="usa-input usx-input" type="text" placeholder="${a}" /></label>`}function $({heading:e,text:a,variant:n,slim:u,noIcon:v}){const b=u?" usa-alert--slim usx-alert--slim":"",x=v?" usa-alert--no-icon usx-alert--no-icon":"",_=u?"":`<h4 class="usa-alert__heading usx-alert__heading">${e}</h4>`;return`
    <div class="usa-alert usa-alert--${n}${b}${x} usx-alert usx-alert--${n}" ${n==="error"||n==="emergency"?'role="alert"':""}>
      <div class="usa-alert__body usx-alert__body">
        ${_}
        <p class="usa-alert__text usx-alert__text">${a}</p>
      </div>
    </div>
  `}const I={title:"HTML/Components",tags:["autodocs"]},t={name:"Button",args:{label:"Continue",variant:void 0},argTypes:{variant:{control:"select",options:[void 0,"secondary"]}},render:e=>o.createElement(l,{html:M(e)})},r={name:"Input",args:{label:"Email address",placeholder:"name@agency.gov"},render:e=>o.createElement(l,{html:S(e)})},s={name:"Alert",args:{variant:"info",heading:"Informative status",text:"System status and notification updates appear here.",slim:!1,noIcon:!1},argTypes:{variant:{control:"select",options:["info","warning","success","error","emergency"]}},render:e=>o.createElement(l,{html:$(e)})};var c,i,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Button',
  args: {
    label: 'Continue',
    variant: undefined
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'secondary']
    }
  },
  render: args => <Markup html={buttonMarkup(args)} />
}`,...(p=(i=t.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var d,m,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Input',
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov'
  },
  render: args => <Markup html={inputMarkup(args)} />
}`,...(g=(m=r.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var y,f,h;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Alert',
  args: {
    variant: 'info',
    heading: 'Informative status',
    text: 'System status and notification updates appear here.',
    slim: false,
    noIcon: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error', 'emergency']
    }
  },
  render: args => <Markup html={alertMarkup(args)} />
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const C=["ButtonStory","InputStory","AlertStory"];export{s as AlertStory,t as ButtonStory,r as InputStory,C as __namedExportsOrder,I as default};
