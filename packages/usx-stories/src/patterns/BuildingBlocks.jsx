import React, { useId, useState } from 'react';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import ButtonGroup from '../../../usx-react/src/components/button-group/ButtonGroup.tsx';
import Fieldset from '../../../usx-react/src/components/fieldset/Fieldset.tsx';
import Icon from '../../../usx-react/src/components/icon/Icon.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';

export function FormSection({
  title = 'Personal information',
  fields,
  values = {},
  onSave,
  onSaveDraft,
  onCancel,
  submitLabel = 'Save',
  state = 'normal',
}) {
  const prefix = useId();
  const [errors, setErrors] = useState(
    state === 'validation' ? { email: 'Enter a valid email address.' } : {}
  );
  const [saved, setSaved] = useState(state === 'success');
  const [draftSaved, setDraftSaved] = useState(false);
  const resolvedFields = fields || [
    { name: 'firstName', label: 'First name', required: true, autoComplete: 'given-name' },
    { name: 'lastName', label: 'Last name', required: true, autoComplete: 'family-name' },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      autoComplete: 'email',
      full: true,
    },
  ];
  return (
    <form
      className="border-top usx-border-border padding-top-3"
      noValidate
      onChange={() => setDraftSaved(false)}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const invalid = [...form.elements].filter((field) => field.name && !field.checkValidity());
        const nextErrors = Object.fromEntries(
          invalid.map((field) => [
            field.name,
            field.validity.valueMissing ? 'Complete this field.' : 'Enter a valid value.',
          ])
        );
        setErrors(nextErrors);
        setSaved(false);
        setDraftSaved(false);
        if (invalid.length) {
          invalid[0].focus();
          return;
        }
        const data = Object.fromEntries(new FormData(form));
        setSaved(true);
        onSave?.(data);
      }}
    >
      {Object.keys(errors).length > 0 && (
        <Alert
          variant="error"
          heading="Check your information"
          text="Correct the highlighted fields before continuing."
        />
      )}
      {state === 'error' && !saved && (
        <Alert
          variant="error"
          heading="Unable to save"
          text="Your information is still here. Try saving again."
        />
      )}
      {saved && !onSave && <Alert variant="success" text="Your information has been saved." slim />}
      {draftSaved && <Alert variant="success" text="Draft saved for this session." slim />}
      <Fieldset legend={title} largeLegend>
        <div className="grid-row grid-gap">
          {resolvedFields.map(({ full, ...field }) => (
            <div key={field.name} className={full ? 'grid-col-12' : 'tablet:grid-col-6'}>
              <Input
                {...field}
                id={`${prefix}-${field.name}`}
                defaultValue={values[field.name] || ''}
                error={errors[field.name]}
              />
            </div>
          ))}
        </div>
      </Fieldset>
      <p className="text-base font-sans-xs">Required fields are marked with an asterisk.</p>
      <ButtonGroup
        className="margin-top-3 flex-justify-end"
        buttonProps={[
          {
            children: 'Cancel',
            type: 'button',
            variant: 'outline',
            onClick:
              onCancel ||
              ((event) => {
                event.currentTarget.form?.reset();
                setErrors({});
                setSaved(false);
              }),
          },
          ...(onSaveDraft ? [{
            children: 'Save draft',
            type: 'button',
            variant: 'outline',
            onClick: (event) => {
              const form = event.currentTarget.form;
              const complete = [...form.elements].every((field) => !field.name || field.validity.valid);
              onSaveDraft(Object.fromEntries(new FormData(form)), complete);
              setErrors({});
              setSaved(false);
              setDraftSaved(true);
            },
          }] : []),
          { children: submitLabel, type: 'submit', variant: 'primary' },
        ]}
      />
    </form>
  );
}

export function MetricCard({
  title = 'Active users',
  value = '1,284',
  trend = '+12.4%',
  color = 'primary',
  negative = false,
  progress,
  state = 'normal',
}) {
  return (
    <div
      className={`bg-surface-2 border-left-05 usx-border-${color} padding-3 usx-rounded-md height-full`}
    >
      <h3 className={`margin-0 text-${color} font-sans-sm`}>{title}</h3>
      <div className="font-heading-xl text-ink margin-y-1">
        {state === 'partial' ? 'Not available' : value}
      </div>
      {state !== 'partial' && (
        <div
          className={`text-${negative ? 'error' : 'success'} font-sans-xs display-flex flex-align-center`}
        >
          <Icon
            name={negative ? 'trending_down' : 'trending_up'}
            size={2}
            className="margin-right-05 flex-no-shrink"
          />
          {trend} from last month
        </div>
      )}
      {progress != null && (
        <meter
          className="width-full margin-top-2"
          min="0"
          max="100"
          value={progress}
          aria-label={`${title} target reached`}
        >
          {progress}%
        </meter>
      )}
    </div>
  );
}

export function ReviewConfirmation({ items, onEdit, onSubmit, disabled = false }) {
  return (
    <section aria-label="Review your application">
      <h2 className="font-sans-lg">Review your application</h2>
      <dl>
        {items.map((item, index) => (
          <div
            key={item.label}
            className="padding-y-2 border-bottom usx-border-border display-flex flex-align-center flex-justify"
          >
            <div>
              <dt className="text-base font-sans-xs">{item.label}</dt>
              <dd className="margin-left-0 margin-top-1">{item.value || 'Not provided'}</dd>
            </div>
            {onEdit && (
              <Button
                variant="unstyled"
                aria-label={`Edit ${item.label}`}
                onClick={() => onEdit(index)}
              >
                Edit
              </Button>
            )}
          </div>
        ))}
      </dl>
      <ButtonGroup
        className="flex-justify-end"
        buttonProps={[{ children: 'Submit', variant: 'primary', disabled, onClick: onSubmit }]}
      />
    </section>
  );
}

export function DestructiveAction({ name = 'application', onCancel, onDelete }) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="border-top usx-border-error padding-y-3">
      <h2 id={headingId} className="font-sans-lg">
        Delete {name}?
      </h2>
      <p>This action cannot be undone.</p>
      <ButtonGroup
        className="flex-justify-end"
        buttonProps={[
          { children: 'Cancel', variant: 'outline', onClick: onCancel },
          { children: 'Delete', variant: 'secondary', onClick: onDelete },
        ]}
      />
    </section>
  );
}
