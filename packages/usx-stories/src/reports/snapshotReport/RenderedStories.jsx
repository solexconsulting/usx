import React, { useState } from 'react';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import { SOURCES, SOURCE_LABELS } from './labels.js';
import { normalizeTitle } from './useReport.js';

const frameStyle = { width: '100%', height: '20rem', border: '1px solid currentColor', resize: 'vertical', overflow: 'auto' };
const layoutStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '1rem' };

/** Both sources' stories for a section, side by side, loaded only when asked for. */
export default function RenderedStories({ title, storyIds }) {
  const [open, setOpen] = useState(false);
  const key = normalizeTitle(title);
  return (
    <div className="margin-top-2">
      <Button variant="outline" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? 'Hide rendered stories' : 'Show rendered stories'}
      </Button>
      {open && (
        <div className="margin-top-2" style={layoutStyle}>
          {SOURCES.map((source) => {
            const id = storyIds?.[source]?.[key];
            const label = SOURCE_LABELS[source];
            return (
              <div key={source}>
                <strong>{label}</strong>
                {id ? (
                  <iframe title={`${label} story: ${title}`} src={`./iframe.html?id=${id}&viewMode=story`} loading="lazy" style={frameStyle} />
                ) : (
                  <p>No {label} story named "{title}".</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
