import React from 'react';
import ClassNames from 'classnames';
import ButtonGroup from '../button-group/ButtonGroup';
import Details, { type DetailsProps } from '../details/Details';
import Image from '../image/Image';
import Link from '../link/Link';
import Page from '../page/Page';
import Prose from '../prose/Prose';

export interface ErrorPageAction {
  label: string;
  href: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent-cool'
    | 'accent-warm'
    | 'base'
    | 'outline'
    | 'unstyled';
  isExternal?: boolean;
  className?: string;
  itemClassName?: string;
}

export interface ErrorPageSupportLink {
  label: string;
  href: string;
  external?: boolean;
  newTab?: boolean;
  className?: string;
}

export interface ErrorPageProps {
  id?: string;
  title: string;
  description?: string;
  guidance?: string;
  actions?: ErrorPageAction[];
  supportHeading?: string;
  supportText?: string;
  supportLinks?: ErrorPageSupportLink[];
  cats?: boolean;
  catAlt?: string;
  errorCode?: string | number;
  errorCodeLabel?: string;
  referenceId?: string;
  referenceLabel?: string;
  detailsProps?: DetailsProps | null;
  children?: React.ReactNode;
  className?: string;
}

const DEFAULT_TITLE = 'We couldn’t complete your request';
const DEFAULT_DESCRIPTION = 'We’re sorry. Please try again later.';

/**
 * A shared recovery page for HTTP errors and application error fallbacks.
 * The host application remains responsible for the response status, document
 * title, logging, diagnostic access and redaction, focus movement, and any
 * framework-specific error boundary.
 */
export default function ErrorPage({
  id = 'main-content',
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  guidance = '',
  actions = [],
  supportHeading = '',
  supportText = '',
  supportLinks = [],
  cats = false,
  catAlt = '',
  errorCode,
  errorCodeLabel = 'Error code',
  referenceId = '',
  referenceLabel = 'Reference ID',
  detailsProps = null,
  children = null,
  className = '',
}: ErrorPageProps) {
  const pageId = id || 'main-content';
  const pageTitle = title || DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const titleId = `${pageId}-title`;
  const supportHeadingId = `${pageId}-support-heading`;
  const pageActions = Array.isArray(actions) ? actions : [];
  const pageSupportLinks = Array.isArray(supportLinks) ? supportLinks : [];
  const hasSupport = Boolean(supportHeading || supportText || pageSupportLinks.length);
  const hasErrorCode = errorCode !== undefined && errorCode !== null && errorCode !== '';
  const hasMeta = hasErrorCode || Boolean(referenceId);
  const catImageAlt = catAlt || `Cat illustration for HTTP error ${errorCode}`;
  const classes = ClassNames('usx-error-page', className);

  return (
    <Page id={pageId} title={pageTitle} titleId={titleId} className={classes}>
      <Prose className="usx-error-page__body">
        <p className="usa-intro usx-error-page__description margin-bottom-4">{pageDescription}</p>

        {cats && Boolean(errorCode) && (
          <Image src={`https://http.cat/${errorCode}`} alt={catImageAlt} />
        )}

        {(guidance || children) && (
          <div className="usx-error-page__content">
            {guidance && <p>{guidance}</p>}
            {children}
          </div>
        )}
      </Prose>

      {pageActions.length > 0 && (
        <ButtonGroup buttonProps={pageActions} className="usx-error-page__actions" />
      )}

      <Prose className="usx-error-page__body">
        {hasSupport && (
          <section
            className="usx-error-page__support"
            {...(supportHeading ? { 'aria-labelledby': supportHeadingId } : {})}
          >
            {supportHeading && (
              <h2 id={supportHeadingId} className="usx-error-page__support-heading">
                {supportHeading}
              </h2>
            )}
            {supportText && <p>{supportText}</p>}
            {pageSupportLinks.length > 0 && (
              <ul className="usx-error-page__support-links">
                {pageSupportLinks.map(({ label, ...linkProps }, index) => (
                  <li key={index}>
                    <Link {...linkProps}>{label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {hasMeta && (
          <div className="usx-error-page__meta text-base font-body-2xs">
            {hasErrorCode && (
              <p>
                <strong>{errorCodeLabel || 'Error code'}:</strong>{' '}
                <span className="usx-error-page__meta-value">{errorCode}</span>
              </p>
            )}
            {referenceId && (
              <p>
                <strong>{referenceLabel || 'Reference ID'}:</strong>{' '}
                <span className="usx-error-page__meta-value">{referenceId}</span>
              </p>
            )}
          </div>
        )}

        {detailsProps && (
          <Details
            {...detailsProps}
            className={ClassNames(
              'usx-error-page__details font-family-mono font-mono-sm',
              detailsProps.className
            )}
          />
        )}
      </Prose>
    </Page>
  );
}
