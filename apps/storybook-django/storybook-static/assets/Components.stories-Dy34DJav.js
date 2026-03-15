import{R as r}from"./index-C5e9SFkp.js";function p({code:e}){return r.createElement("pre",null,r.createElement("code",null,e))}function m({html:e}){return r.createElement("div",{dangerouslySetInnerHTML:{__html:e}})}function j({label:e,variant:n}){const a=n?` variant="${n}"`:"";return`{% load agency_ui %}
{% agency_button label="${e}"${a} %}`}function D({label:e,placeholder:n}){return`{% load agency_ui %}
{% agency_input label="${e}" placeholder="${n}" %}`}function H({heading:e,text:n,variant:a,slim:t,noIcon:i}){return`{% load agency_ui %}
{% agency_alert heading="${e}" text="${n}" variant="${a}" slim=${t} no_icon=${i} %}`}function L({label:e,variant:n}){return`<button type="button" class="usa-button usx-button${n==="secondary"?" usa-button--secondary usx-button--secondary":""}">${e}</button>`}function O({label:e,placeholder:n}){return`<label><span>${e}</span><input class="usa-input usx-input" type="text" placeholder="${n}" /></label>`}function z({heading:e,text:n,variant:a,slim:t,noIcon:i}){const k=t?" usa-alert--slim usx-alert--slim":"",M=i?" usa-alert--no-icon usx-alert--no-icon":"",w=t?"":`<h4 class="usa-alert__heading usx-alert__heading">${e}</h4>`;return`
    <div class="usa-alert usa-alert--${a}${k}${M} usx-alert usx-alert--${a}" ${a==="error"||a==="emergency"?'role="alert"':""}>
      <div class="usa-alert__body usx-alert__body">
        ${w}
        <p class="usa-alert__text usx-alert__text">${n}</p>
      </div>
    </div>
  `}const G={title:"Django/Components",tags:["autodocs"]},s={name:"ButtonTemplateTag",args:{label:"Continue",variant:void 0},argTypes:{variant:{control:"select",options:[void 0,"secondary"]}},render:e=>r.createElement(p,{code:j(e)})},o={name:"ButtonRenderedEquivalent",args:{label:"Continue",variant:void 0},argTypes:{variant:{control:"select",options:[void 0,"secondary"]}},render:e=>r.createElement(m,{html:L(e)})},l={name:"InputTemplateTag",args:{label:"Email address",placeholder:"name@agency.gov"},render:e=>r.createElement(p,{code:D(e)})},c={name:"InputRenderedEquivalent",args:{label:"Email address",placeholder:"name@agency.gov"},render:e=>r.createElement(m,{html:O(e)})},d={name:"AlertTemplateTag",args:{heading:"Informative status",text:"System status and notification updates appear here.",variant:"info",slim:!1,noIcon:!1},argTypes:{variant:{control:"select",options:["info","warning","success","error","emergency"]}},render:e=>r.createElement(p,{code:H(e)})},u={name:"AlertRenderedEquivalent",args:{heading:"Informative status",text:"System status and notification updates appear here.",variant:"info",slim:!1,noIcon:!1},argTypes:{variant:{control:"select",options:["info","warning","success","error","emergency"]}},render:e=>r.createElement(m,{html:z(e)})};var g,v,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'ButtonTemplateTag',
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
  render: args => <CodeSample code={buttonTag(args)} />
}`,...(y=(v=s.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var T,f,h;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'ButtonRenderedEquivalent',
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
  render: args => <Markup html={renderedButton(args)} />
}`,...(h=(f=o.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var E,b,_;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'InputTemplateTag',
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov'
  },
  render: args => <CodeSample code={inputTag(args)} />
}`,...(_=(b=l.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};var $,x,I;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  name: 'InputRenderedEquivalent',
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov'
  },
  render: args => <Markup html={renderedInput(args)} />
}`,...(I=(x=c.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var S,C,R;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'AlertTemplateTag',
  args: {
    heading: 'Informative status',
    text: 'System status and notification updates appear here.',
    variant: 'info',
    slim: false,
    noIcon: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error', 'emergency']
    }
  },
  render: args => <CodeSample code={alertTag(args)} />
}`,...(R=(C=d.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var q,A,B;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'AlertRenderedEquivalent',
  args: {
    heading: 'Informative status',
    text: 'System status and notification updates appear here.',
    variant: 'info',
    slim: false,
    noIcon: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error', 'emergency']
    }
  },
  render: args => <Markup html={renderedAlert(args)} />
}`,...(B=(A=u.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};const J=["ButtonTemplateTag","ButtonRenderedEquivalent","InputTemplateTag","InputRenderedEquivalent","AlertTemplateTag","AlertRenderedEquivalent"];export{u as AlertRenderedEquivalent,d as AlertTemplateTag,o as ButtonRenderedEquivalent,s as ButtonTemplateTag,c as InputRenderedEquivalent,l as InputTemplateTag,J as __namedExportsOrder,G as default};
