import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import Link from '../link/Link';
import Button from '../button/Button';

// Matches VA.gov's "X KB"/"X MB" display for selected-file rows.
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

// e.g. "report.pdf" -> "PDF" — shown alongside the size, VA.gov-style.
function getFileExtension(name) {
  const match = /\.([^.]+)$/.exec(name);
  return match ? match[1].toUpperCase() : null;
}

// A row's display name/size can come from a real File (just added/changed in
// this session) or from a preloaded entry describing a file already on the
// server (no File object available) — normalize both shapes for rendering.
function getEntryDisplay(entry) {
  if (entry.file) return { name: entry.file.name, size: entry.file.size, url: entry.url };
  return { name: entry.name, size: entry.size, url: entry.url };
}

// A standalone list of files with a per-row Delete action — used by
// FileInput's managed-multiple mode (see FileInput.jsx), but reusable
// anywhere a parent already owns the file array.
export default function FileList({ files, hint = 'Selected files', onRemove = null, disabled = false, className = '' }) {
  if (!files || files.length === 0) return null;

  const lastEntry = getEntryDisplay(files[files.length - 1]);

  return (
    <div className={['usx-file-input__list', 'margin-top-1', className].filter(Boolean).join(' ')}>
      <span className="usa-sr-only" aria-live="polite">
        {`You have selected the file: ${lastEntry.name}.`}
      </span>
      {hint && <span className="usa-hint usx-hint usx-file-input__list-heading">{hint}</span>}
      <ul className="usx-file-input__file-list">
        {files.map((entry) => {
          const { name, size, url } = getEntryDisplay(entry);
          // A row's own onRemove takes priority over the component-level
          // one — lets most rows share a single handler while specific
          // rows (e.g. a preloaded file needing a server-side call) opt
          // into their own.
          const handleRemove = entry.onRemove || onRemove;
          return (
            <li key={entry.key} className="usx-file-input__file-item">
              <div className="usx-file-input__file-info">
                {url ? (
                  <Link href={url} external className="usx-file-input__file-name">
                    {name}
                  </Link>
                ) : (
                  <span className="usx-file-input__file-name">{name}</span>
                )}
                {size != null && (
                  <span className="usx-file-input__file-size">
                    {[getFileExtension(name), formatFileSize(size)].filter(Boolean).join(', ')}
                  </span>
                )}
              </div>
              {!disabled && handleRemove ? (
                <Button
                  type="button"
                  variant="secondary"
                  className="usx-file-input__delete-button"
                  tooltip="Delete this file"
                  ghost={true}
                  disabled={disabled}
                  onClick={() => handleRemove(entry)}
                >
                  <Icon name="delete" size={3} className="usx-file-input__delete-icon" />
                  {/* Visually hidden below the tablet breakpoint so the button becomes icon-only, see _file-input.scss */}
                  <span className="usx-file-input__delete-label">Delete</span>
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      file: PropTypes.object,
      name: PropTypes.string,
      size: PropTypes.number,
      url: PropTypes.string,
      onRemove: PropTypes.func,
    }),
  ),
  hint: PropTypes.node,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
