import * as React from 'react';
import classNames from 'classnames';
import Link from '../Link';
import Apple from '../../svgs/apple';
import ArrowLeft from '../../svgs/arrow-left';
import ArrowRight from '../../svgs/arrow-right';
import Cart from '../../svgs/cart';
import Facebook from '../../svgs/facebook';
import GitHub from '../../svgs/github';
import GooglePlay from '../../svgs/google-play';
import Instagram from '../../svgs/instagram';
import LinkedIn from '../../svgs/linkedin';
import Play from '../../svgs/play';
import Twitter from '../../svgs/twitter';

const iconMap = {
    apple: Apple,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    cart: Cart,
    facebook: Facebook,
    github: GitHub,
    googlePlay: GooglePlay,
    instagram: Instagram,
    linkedin: LinkedIn,
    play: Play,
    twitter: Twitter
};

export default function Action(props) {
    const { type, label, altText, url, showIcon } = props;
    const icon = props.icon || 'arrowLeft';
    const iconPosition = props.iconPosition || 'right';
    const IconComponent = iconMap[icon];
    const annotationPrefix = props['data-sb-field-path'] || '';
    const annotations = [
        `${annotationPrefix}`,
        `${annotationPrefix}.url#@href`,
        `${annotationPrefix}.altText#@aria-label`,
        `${annotationPrefix}.elementId#@id`,
        `${annotationPrefix}.label#span[1]`,
        `${annotationPrefix}.icon#svg[1]`
    ];
    const defaultStyle = type === 'Link' ? 'link' : 'secondary';
    const style = props.style || defaultStyle;
    const cssClasses = props.className || null;
    const cssId = props.elementId || null;

    return (
        <Link
            href={url}
            aria-label={altText}
            id={cssId}
            className={classNames('sb-component', 'sb-component-block', style === 'link' ? 'sb-component-link' : 'sb-component-button', cssClasses, {
                'sb-component-button-primary': style === 'primary',
                'sb-component-button-secondary': style === 'secondary'
            })}
            data-sb-field-path={annotations.join(' ').trim()}
        >
            {label && <span>{label}</span>}
            {showIcon && IconComponent && (
                <IconComponent
                    className={classNames('fill-current h-5 w-5', {
                        'order-first': iconPosition === 'left',
                        'mr-1.5': label && iconPosition === 'left',
                        'ml-1.5': label && iconPosition === 'right'
                    })}
                />
            )}
        </Link>
    );
}
