import React from 'react';

export function MarkupBlock({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function TemplateTagBlock({ snippet }) {
  return (
    <div>
      <p>Django template tag usage:</p>
      <pre>{snippet}</pre>
    </div>
  );
}
