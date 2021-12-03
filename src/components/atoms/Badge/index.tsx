import * as React from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function Badge(props) {
    const { label } = props;
    if (!label) {
        return null;
    }
    const cssClasses = props.className || null;
    const cssId = props.elementId || null;
    const annotationPrefix = props['data-sb-field-path'] || '';
    const styles = props.styles?.self || {};
    return (
        <div
            id={cssId}
            className={classNames('sb-component', 'sb-component-block', 'sb-component-badge', cssClasses, styles ? mapStyles(styles) : null)}
            data-sb-field-path={`${annotationPrefix}.label ${annotationPrefix}.elementId#@id`}
        >
            {label}
        </div>
    );
}
