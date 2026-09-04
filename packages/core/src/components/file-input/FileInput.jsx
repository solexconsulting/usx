import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Required from '../required/Required';
import FormGroup from '../form-group/FormGroup';
import FileList from '../file-list/FileList';

// Mirrors USWDS's own default aria-label text (see updateVisibleInstructions
// in @uswds/uswds's usa-file-input source) so we can restore it after each
// add — USWDS permanently rewrites aria-label to "Change file(s)" once any
// file is selected and never resets it back on its own.
function getDefaultFileInputAriaLabel() {
  const dragTextIsVisible =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const chooseText = dragTextIsVisible ? 'choose from folder' : 'Choose from folder';
  return dragTextIsVisible ? `Drag files here or ${chooseText}` : chooseText;
}

export default function FileInput({
  id = 'file-input',
  name,
  label = null,
  hint = null,
  fileListHint = 'Selected files',
  error = null,
  disabled = false,
  required = false,
  accept = null,
  multiple = false,
  manageIndividualFiles = false,
  invalidFileTypeMessage = null,
  className = '',
  onFilesChange = null,
  defaultFiles = [],
  ...props
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  // VA.gov's file-input-multiple pattern: the file input itself is a single,
  // permanently-enhanced USWDS widget that's used purely to add files — it's
  // reset after every selection so it never shows its own fill/preview state
  // and always looks ready for the next file. The actual selection lives in
  // the FileList below, which owns its own Delete action.
  const isManagedMultiple = multiple && manageIndividualFiles;
  const nextFileId = useRef(0);
  // defaultFiles seeds rows for files that already exist on the server (no
  // File object) — e.g. previously-submitted uploads. Uncontrolled: only read
  // once, like defaultValue.
  const [managedFiles, setManagedFiles] = useState(() =>
    defaultFiles.map((entry) => ({ key: nextFileId.current++, file: null, ...entry })),
  );

  // Only entries backed by a real File are reported — preloaded/server-side
  // entries are already stored and aren't meant to be resubmitted.
  const notify = (files) => onFilesChange && onFilesChange(files.filter((entry) => entry.file).map((entry) => entry.file));

  const addFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setManagedFiles((prev) => {
      const next = [...prev, ...files.map((file) => ({ key: nextFileId.current++, file }))];
      notify(next);
      return next;
    });
    // Reset so the same file can be re-selected later and the input stays
    // ready for the next add (its own USWDS preview UI is hidden via CSS —
    // see .usx-file-input__add-only — since it's built asynchronously and
    // can't be reliably cleared from here). USWDS also permanently rewrites
    // aria-label to "Change file(s)" once any file is added and never resets
    // it, so restore it to its default text ourselves.
    e.target.value = '';
    e.target.setAttribute('aria-label', getDefaultFileInputAriaLabel());
  };

  const removeFile = (entry) => {
    setManagedFiles((prev) => {
      const next = prev.filter((e) => e.key !== entry.key);
      notify(next);
      return next;
    });
  };

  const commonLabel = label && (
    <label className="usa-label usx-label" htmlFor={id}>
      {required && <Required />}
      {label}
    </label>
  );

  const commonHint = hint && (
    <span className="usa-hint usx-hint" id={hintId}>
      {hint}
    </span>
  );

  const commonError = error && (
    <span className="usa-error-message usx-error-message" id={errorId} role="alert">
      {error}
    </span>
  );

  if (!isManagedMultiple) {
    return (
      <FormGroup error={!!error}>
        {commonLabel}
        {commonHint}
        {commonError}
        <input
          className={['usa-file-input', 'usx-file-input', className].filter(Boolean).join(' ')}
          id={id}
          type="file"
          name={name || id}
          aria-describedby={describedBy}
          accept={accept || undefined}
          multiple={multiple}
          disabled={disabled}
          required={required}
          {...(invalidFileTypeMessage ? { 'data-errormessage': invalidFileTypeMessage } : {})}
          {...props}
        />
      </FormGroup>
    );
  }

  return (
    <FormGroup error={!!error}>
      {commonLabel}
      {commonHint}
      {commonError}
      <div className="usx-file-input__add-only">
        <input
          className={['usa-file-input', 'usx-file-input', className].filter(Boolean).join(' ')}
          id={id}
          type="file"
          name={name || id}
          aria-describedby={describedBy}
          multiple
          accept={accept || undefined}
          disabled={disabled}
          required={required && managedFiles.length === 0}
          {...(invalidFileTypeMessage ? { 'data-errormessage': invalidFileTypeMessage } : {})}
          {...props}
          onChange={addFiles}
        />
      </div>
      <FileList files={managedFiles} hint={fileListHint} onRemove={removeFile} disabled={disabled} />
    </FormGroup>
  );
}

FileInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  hint: PropTypes.node,
  fileListHint: PropTypes.node,
  error: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  manageIndividualFiles: PropTypes.bool,
  invalidFileTypeMessage: PropTypes.string,
  className: PropTypes.string,
  onFilesChange: PropTypes.func,
  defaultFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number,
      url: PropTypes.string,
    }),
  ),
};