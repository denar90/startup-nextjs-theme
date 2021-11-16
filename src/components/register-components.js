import dynamic from 'next/dynamic';
import { registerComponents } from '@stackbit/components';
import { componentsMap } from '@stackbit/components/dist/components-map';

registerComponents({
    // Register all Stackbit components
    ...componentsMap

    // Override any static or dynamic component,
    // or register your own dynamic component.
});

/**
 * README
 * ======
 *
 * The `registerComponents` function registers the received components with the components registry. To retrieve a
 * registered component, use the `getComponent(key)` function. The `@stackbit/components` package uses the
 * `getComponent` function to retrieve and render registered components. The component registry allows you to override
 * and customize any of the `@stackbit/components` package's internal components by registering different components
 * under the same key.
 *
 * There are two groups of components you can register - "static" and "dynamic".
 *
 * Static components will usually be small components that are frequently used on website pages. The mapping key of a
 * static component is the component name, and the value is the component itself. To override a static component, set
 * its name to your custom component:
 *
 *     import CustomAction from './CustomAction';
 *
 *     registerComponents({
 *       ...componentsMap,
 *       Action: CustomAction
 *     });
 *
 * Note: you don't need to register a new static component unless you override an existing static component from
 * @stackbit/components.
 *
 * Dynamic components are registered using dynamic imports and are loaded by the browser only when these components are
 * needed. The mapping key of a dynamic component is a model name, and the value is the component imported via Next's
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
 *
 * To override a dynamic component or to define a new dynamic component, import your component using Next's dynamic
 * import function and set it to the key matching the model name describing the input type of your component:
 *
 *     registerComponents({
 *       ...componentsMap,
 *       CtaSection: dynamic(() => import('./path/to/component'))
 *     });
 *
 * Note: in @stackbit/components package, model names match the names of the components. For example, the "HeroSection"
 * component renders the content described by a model named "HeroSection".
 *
 * If you need to override a content model, copy the model from node_modules/@stackbit/components/models folder to
 * .stackbit/models folder. Models defined in .stackbit/models folder take precedence over the models with the same name
 * defined in @stackbit/components.
 */
