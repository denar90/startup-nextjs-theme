import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

/**
 * The getComponent() function imports dynamic component.
 *
 * Dynamic components are loaded by the browser only when these components are actually used.
 * For example, a "HeroSection" component, and its dependencies will, will not be loaded by the browser unless the code
 * call getComponent('HeroSection'),
 */
export function getComponent(key: string): ComponentType {
    return components[key];
}

/**
 * Map of dynamic components.
 *
 * The mapping key of a dynamic component is a model name, and the value is the component imported via Next's
 * dynamic import. You should use dynamic components for large components or components with heavy external dependencies,
 * which are used sparingly in your website's pages. To learn more about Nextjs dynamic imports visit:
 * https://nextjs.org/docs/advanced-features/dynamic-import
 *
 * Dynamic components are mapped by model names that describe the prop types of these components. This fact allows
 * selecting a dynamic component at run-time based on the type of the content, and the type of the content will usually
 * be the name of the content's model. For example, a parent component calls the `getComponent` function, passing it the
 * type of data it needs to render, and gets back the registered component for that type of data:
 *
 *     const Section = getComponent(section.type);
 *     return <Section {...section} />;
 */
const components = {
    'CheckboxFormControl': dynamic(() => import('./molecules/FormBlock/CheckboxFormControl')),
    'ContactSection': dynamic(() => import('./sections/ContactSection')),
    'CtaSection': dynamic(() => import('./sections/CtaSection')),
    'EmailFormControl': dynamic(() => import('./molecules/FormBlock/EmailFormControl')),
    'FaqSection': dynamic(() => import('./sections/FaqSection')),
    'FeaturedItem': dynamic(() => import('./sections/FeaturedItemsSection/FeaturedItem')),
    'FeaturedItemsSection': dynamic(() => import('./sections/FeaturedItemsSection')),
    'FeaturedPeopleSection': dynamic(() => import('./sections/FeaturedPeopleSection')),
    'FormBlock': dynamic(() => import('./molecules/FormBlock')),
    'HeroSection': dynamic(() => import('./sections/HeroSection')),
    'ImageBlock': dynamic(() => import('./molecules/ImageBlock')),
    'MediaGallerySection': dynamic(() => import('./sections/MediaGallerySection')),
    'PostFeedSection': dynamic(() => import('./sections/PostFeedSection')),
    'FeaturedPostsSection': dynamic(() => import('./sections/FeaturedPostsSection')),
    'RecentPostsSection': dynamic(() => import('./sections/RecentPostsSection')),
    'QuoteSection': dynamic(() => import('./sections/QuoteSection')),
    'SelectFormControl': dynamic(() => import('./molecules/FormBlock/SelectFormControl')),
    'TestimonialsSection': dynamic(() => import('./sections/TestimonialsSection')),
    'TextareaFormControl': dynamic(() => import('./molecules/FormBlock/TextareaFormControl')),
    'TextFormControl': dynamic(() => import('./molecules/FormBlock/TextFormControl')),
    'TextSection': dynamic(() => import('./sections/TextSection')),
    'VideoBlock': dynamic(() => import('./molecules/VideoBlock')),
    'PageLayout': dynamic(() => import('./layouts/PageLayout')),
    'PostLayout': dynamic(() => import('./layouts/PostLayout')),
    'PostFeedLayout': dynamic(() => import('./layouts/PostFeedLayout')),
    'PostFeedCategoryLayout': dynamic(() => import('./layouts/PostFeedCategoryLayout'))
};
