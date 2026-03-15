import React from 'react';

function CodeSample({ code }) {
  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
}

function Markup({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function buttonTag({ label, variant }) {
  const variantArg = variant ? ` variant=\"${variant}\"` : '';
  return `{% load agency_ui %}\n{% agency_button label=\"${label}\"${variantArg} %}`;
}

function inputTag({ label, placeholder }) {
  return `{% load agency_ui %}\n{% agency_input label=\"${label}\" placeholder=\"${placeholder}\" %}`;
}

function alertTag({ heading, text, variant, slim, noIcon }) {
  return `{% load agency_ui %}\n{% agency_alert heading=\"${heading}\" text=\"${text}\" variant=\"${variant}\" slim=${slim} no_icon=${noIcon} %}`;
}

function renderedButton({ label, variant }) {
  const variantClass = variant === 'secondary' ? ' usa-button--secondary usx-button--secondary' : '';
  return `<button type="button" class="usa-button usx-button${variantClass}">${label}</button>`;
}

function renderedInput({ label, placeholder }) {
  return `<label><span>${label}</span><input class="usa-input usx-input" type="text" placeholder="${placeholder}" /></label>`;
}

function renderedAlert({ heading, text, variant, slim, noIcon }) {
  const slimClass = slim ? ' usa-alert--slim usx-alert--slim' : '';
  const iconClass = noIcon ? ' usa-alert--no-icon usx-alert--no-icon' : '';
  const headingBlock = slim ? '' : `<h4 class="usa-alert__heading usx-alert__heading">${heading}</h4>`;

  return `
    <div class="usa-alert usa-alert--${variant}${slimClass}${iconClass} usx-alert usx-alert--${variant}" ${
      variant === 'error' || variant === 'emergency' ? 'role="alert"' : ''
    }>
      <div class="usa-alert__body usx-alert__body">
        ${headingBlock}
        <p class="usa-alert__text usx-alert__text">${text}</p>
      </div>
    </div>
  `;
}

export default {
  title: 'Components',
  tags: ['autodocs']
};

export const ButtonTemplateTag = {
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
  render: (args) => <CodeSample code={buttonTag(args)} />
};

export const ButtonRenderedEquivalent = {
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
  render: (args) => <Markup html={renderedButton(args)} />
};

export const InputTemplateTag = {
  name: 'InputTemplateTag',
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov'
  },
  render: (args) => <CodeSample code={inputTag(args)} />
};

export const InputRenderedEquivalent = {
  name: 'InputRenderedEquivalent',
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov'
  },
  render: (args) => <Markup html={renderedInput(args)} />
};

export const AlertTemplateTag = {
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
  render: (args) => <CodeSample code={alertTag(args)} />
};

export const AlertRenderedEquivalent = {
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
  render: (args) => <Markup html={renderedAlert(args)} />
};