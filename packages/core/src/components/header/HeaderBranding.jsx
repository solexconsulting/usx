import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/Image';

/**
 * Renders the header branding area.
 *
 * Three modes, mutually exclusive:
 *   logo  — an Image (string or responsive { fallback, sources } object)
 *   symbol + title — symbol image beside linked text
 *   title — linked text only
 */
function BrandingConfig({ config, projectUrl }) {
    const { title, symbol, logo } = config;

    if (logo) {
        return (
            <Image
                src={logo}
                alt={title}
                href={projectUrl}
                className="usx-logo__image"
            />
        );
    }

    return (
        <em className="usa-logo__text">
            {symbol && (
                <img
                    src={symbol}
                    alt=""
                    aria-hidden="true"
                    className="usx-logo__symbol"
                />
            )}
            {title && (
                <a href={projectUrl} className="usx-logo__title">{title}</a>
            )}
        </em>
    );
}

BrandingConfig.propTypes = {
    config: PropTypes.shape({
        title: PropTypes.string,
        symbol: PropTypes.string,
        logo: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                fallback: PropTypes.string.isRequired,
                sources: PropTypes.arrayOf(PropTypes.shape({
                    srcSet: PropTypes.string.isRequired,
                    media: PropTypes.string,
                    type: PropTypes.string,
                    sizes: PropTypes.string,
                })).isRequired,
            }),
        ]),
    }).isRequired,
    projectUrl: PropTypes.string,
};

export default function HeaderBranding({ branding, projectUrl = '/' }) {
    if (!branding) return null;

    return (
        <div className="usa-logo usx-logo">
            <BrandingConfig config={branding} projectUrl={projectUrl} />
        </div>
    );
}

const brandingConfigShape = PropTypes.shape({
    title: PropTypes.string,
    symbol: PropTypes.string,
    logo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            fallback: PropTypes.string.isRequired,
            sources: PropTypes.arrayOf(PropTypes.shape({
                srcSet: PropTypes.string.isRequired,
                media: PropTypes.string,
                type: PropTypes.string,
                sizes: PropTypes.string,
            })).isRequired,
        }),
    ]),
});

HeaderBranding.propTypes = {
    branding: brandingConfigShape,
    projectUrl: PropTypes.string,
};

