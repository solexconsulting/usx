import{R as s}from"./index-C5e9SFkp.js";function r({label:t="Button",variant:u,type:l="button",className:c="",...d}){const i=["usa-button usx-button",u==="secondary"?"usa-button--secondary usx-button--secondary":"",c].filter(Boolean).join(" ");return s.createElement("button",{type:l,className:i,...d},t)}r.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{defaultValue:{value:"'Button'",computed:!1},required:!1},type:{defaultValue:{value:"'button'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const f={title:"React/Components",tags:["autodocs"]},e={name:"Button",args:{label:"Continue",variant:void 0},argTypes:{variant:{control:"select",options:[void 0,"secondary"]}},render:t=>s.createElement(r,{...t})};var n,a,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
  render: args => <Button {...args} />
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const v=["ButtonStory"];export{e as ButtonStory,v as __namedExportsOrder,f as default};
