# Stackbit Nextjs V2

The NextJs core starter for Stackbit.

## Quickstart

```
npm install
```

```
npm run dev
```

### Add a new page

Create a new markdown file `content/pages/new-page.md` with the following frontmatter.

```yaml
---
title: 'New Example Page'
layout: 'AdvancedLayout'
sections:
  - type: HeroSection
    variant: variant-a
    colors: colors-a
    elementId: ''
    width: wide
    height: short
    topGap: small
    bottomGap: small
    alignHoriz: left
    alignVert: middle
    badge:
      label: New Collaboration
      elementId: ''
    title: The quick, brown fox jumps over **a lazy dog**
    text: >-
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae. explicabo.
    actions:
      - type: Button
        url: '#'
        label: Apply Now
        style: primary
        elementId: ''
      - type: Button
        url: '#'
        label: Learn more
        style: secondary
    feature:
      type: ImageBlock
      url: /images/fishing.jpg
      altText: Image alt text
      caption: Image caption
---
```

Visit http://localhost:3000/new-page/ to see the new page.

> **Note:** The pages url will match the file path - `content/pages/new-page.md` will resolve to _/new-page_. A nested folder like `content/pages/blog/index.md` will resolve to _/blog/_

### Add a menu item

Menu items are configured in `content/data/config.json`. Edit the config file and add a new menu object to the `primaryLinks` array.

```js
// content/data/config.json
{
  "navBar": {
    // ...
    "primaryLinks": [
      // ...
      {
        "type": "Link",
        "label": "My New Page",
        "url": "/new-page",
        "altText": ""
      }
    ],
    // ...
  }
}
```

### Adding more sections to the page

Add a [🧩 CtaSection](https://components.stackbit.com/?path=/docs/components-contactsection--primary) to the page by adding the component to the the sections array.

```yaml
# content/pages/new-page.md
---
title: 'New Example Page'
layout: 'AdvancedLayout'
sections: # sections array
  - type: 'HeroSection'
    # ...
  - type: 'CtaSection'
    variant: 'variant-a'
    width: 'wide'
    height: 'auto'
    alignHoriz: 'center'
    title: "Let's do this"
    text: 'The Stackbit theme is flexible and scalable to every need. It can manage any layout and any screen.'
    actions:
      - type: 'Button'
        url: '/contact'
        label: 'Get Started'
        style: 'primary'
---
```

**Component Library:** The [Stackbit Component Library](https://develop--stackbit-components.netlify.app/?path=/story/layouts-advancedlayout--primary) has full documentation on each component including the available props and frontmatter.

**Component Examples**

- [🧩 CtaSection](https://components.stackbit.com/?path=/docs/components-contactsection--primary)
- [🧩 ContactSection](https://components.stackbit.com/?path=/docs/components-contentsection--primary)
- [🧩 FeaturedPeopleSection](https://components.stackbit.com/?path=/docs/components-featuredpeoplesection--primary)
- [🧩 FeaturedPostsSection](https://components.stackbit.com/?path=/docs/components-featuredpostssection--primary)

## Adding your own components

In this example we will create a new component that displays a grid of logos.

Create a new react component in `src/components/LogoSection.js`:

```js
import React from 'react';

const LogoSection = (props) => {
  const { logos, title } = props;
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14 lg:py-20 mt-10 mb-10 text-center">
      <h1 className="text-3xl tracking-tight sm:text-4xl mb-2">{title}</h1>
      <div className="flex justify-center items-center">
        {(logos || []).map((logo, index) => (
          <div className="p-6" key={index}>
            <img className="mb-2" height="60px" width="60px" src={logo.image} />
            <h2 className="text-sm text-gray-400">{logo.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSection;
```

Register the component in `src/components/register-components.js`:

```js
import dynamic from 'next/dynamic';
import { registerComponents } from '@stackbit/components';
import { componentsMap } from '@stackbit/components/dist/components-map';

registerComponents({
  // Register all Stackbit components
  ...componentsMap,

  // Override any static or dynamic component,
  // or register your own dynamic component.
  LogoSection: dynamic(() => import('./LogoSection'))
});
```

☝️ When registering dynamic components (i.e.: `dynamic(() => import('...'))`) the key should be the model name.
In our case, the model name matches the component name so the key is `LogoSection`.

By registering the `LogoSection` component, page components will be able to access and render this component.

Create a new model file at `.stackbit/models/LogoSection.yaml` which describes the data consumed by the `LogoSection` component:

```yaml
type: object
name: LogoSection
label: Logo section
groups:
  - sectionComponent
fields:
  - type: string
    name: title
  - type: list
    name: logos
    items:
      type: object
      fields:
        - type: string
          name: name
        - type: image
          name: image
```

☝️ By adding the `sectionComponent` to the `group` property you declare that the `LogoSection` object can be added to any content field that allows embedding objects belonging to that group. One of such fields is the `sections` field of the `PageLayout` model.

Now add the `LogoSection` object to the list of `sections` in the home page located at `content/pages/index.md`:

```yaml
---
title: Home
layout: AdvancedLayout
sections:
  - type: HeroSection
    ...
  - type: LogoSection
    title: "Our Partners"
    logos:
      - name: 'Stackbit'
        image: '/images/stackbit.svg'
      - name: 'NextJs'
        image: '/images/nextdotjs.svg'
---
```

Download the images and place them in the `/public/images/` folder.

- https://simpleicons.org/icons/stackbit.svg
- https://simpleicons.org/icons/nextdotjs.svg

## Extending a Stackbit component

In this example we will extend an existing Stackbit component.

### Understanding Layouts

Explain how layouts work.

- How does the `layout` field work?
- How does the `layout` field effect which frontmatter fields can be used?
- The layout is both a component and a model. Explain this concept.

### Editing the CSS

This theme uses Tailwind CSS and PostCSS. The `tailwind.config.js` includes our default style as a **preset**.

#### Changing the preset

You can use any preset from 🎨 [Stackbit Styles](https://github.com/stackbit/stackbit-components/tree/main/styles)

```js
// tailwind.config.js
module.exports = {
  presets: [require('@stackbit/components/styles/retro/tailwind.retro.config')]
  // ...
};
```

#### Editing the Tailwind config

You can override any of the preset values in the `extend` object. In this example we change the themes primary color.

```js
// tailwind.config.js
module.exports = {
  ...
  theme: {
    extend: {
      colors: {
          primary: '#207bea'
      }
    }
  },
  ...
};
```

#### Changing CSS Styles

The CSS is located in `src/css/main.css`. The default style is imported from the Stackbit components library - `@import '@stackbit/components/styles/default/style.css';`

You can add your own custom css or override existing styles.

```scss
// src/css/main.css

@tailwind base;
@tailwind components;
@tailwind utilities;

@import '@stackbit/components/styles/default/style.css';

@layer components {
  .sb-badge {
    @apply uppercase;
  }
  .page-example {
    .component-content-section {
      .component-badge {
        padding: 10px 20px;
        text-transform: uppercase;
        border-radius: 3px;
      }
    }
  }
}
```
