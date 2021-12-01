import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import ImageBlock from '../../molecules/ImageBlock';

export default function TestimonialsSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const testimonials = props.testimonials || [];
    const sectionStyles = props.styles?.self || {};
    const sectionBorderWidth = sectionStyles.borderWidth ? sectionStyles.borderWidth : 0;
    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-testimonials-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                sectionStyles.height ? mapMinHeightStyles(sectionStyles.height) : null,
                sectionStyles.margin,
                sectionStyles.padding,
                sectionStyles.borderColor,
                sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : null
            )}
            style={{
                borderWidth: `${sectionBorderWidth}px`
            }}
        >
            <div className={classNames('flex', 'w-full', sectionStyles.justifyContent ? mapStyles({ justifyContent: sectionStyles.justifyContent }) : null)}>
                <div className={classNames('w-full', sectionStyles.width ? mapMaxWidthStyles(sectionStyles.width) : null)}>
                    {testimonialsHeader(props)}
                    {testimonials.length > 0 && (
                        <div className={classNames({ 'mt-12': props.title || props.subtitle })} data-sb-field-path=".testimonials">
                            {testimonials.map((testimonial, index) => testimonialItem(testimonial, index))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function testimonialsHeader(props) {
    if (!props.title && !props.subtitle) {
        return null;
    }
    const styles = props.styles || {};
    return (
        <div>
            {props.title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                    {props.title}
                </h2>
            )}
            {props.subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, { 'mt-2': props.title })}
                    data-sb-field-path=".subtitle"
                >
                    {props.subtitle}
                </p>
            )}
        </div>
    );
}

function testimonialItem(testimonial, index) {
    const styles = testimonial.styles || {};
    const testimonialStyles = styles.self || {};

    return (
        <blockquote
            key={index}
            className={classNames(
                'flex',
                '-mx-4',
                testimonialStyles.flexDirection ? mapFlexDirectionStyles(testimonialStyles.flexDirection) : null,
                testimonialStyles.margin
            )}
            data-sb-field-path={`.${index}`}
        >
            <div className="flex-grow my-4 px-4">
                {testimonial.quote && (
                    <Markdown
                        options={{ forceBlock: true, forceWrapper: true }}
                        className={classNames('sb-markdown', 'text-3xl', 'sm:text-4xl', styles.quote ? mapStyles(styles.quote) : null)}
                        data-sb-field-path=".quote"
                    >
                        {testimonial.quote}
                    </Markdown>
                )}
                {(testimonial.name || testimonial.title) && (
                    <footer>
                        {testimonial.name && (
                            <span className={classNames('block', 'text-lg', styles.name ? mapStyles(styles.name) : null)} data-sb-field-path=".name">
                                {testimonial.name}
                            </span>
                        )}
                        {testimonial.title && (
                            <span className={classNames('block', styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                                {testimonial.title}
                            </span>
                        )}
                    </footer>
                )}
            </div>
            {testimonial.image && (
                <div className="flex-shrink-0 mx-auto my-4 px-4">
                    <div className="w-36 h-36 sm:w-48 sm:h-48" data-sb-field-path=".image">
                        <ImageBlock {...testimonial.image} className="h-full object-cover w-full" />
                    </div>
                </div>
            )}
        </blockquote>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}

function mapFlexDirectionStyles(flexDirection) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'md:flex-row'];
        case 'row-reverse':
            return ['flex-col-reverse', 'md:flex-row-reverse'];
        case 'col':
            return ['flex-col'];
        case 'col-reverse':
            return ['flex-col-reverse'];
    }
    return null;
}
