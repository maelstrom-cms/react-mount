# react-mount

Easily mount react components from your HTML with simple prop support e.g.

```html
<div data-mount="SomeComponent" data-some-title="Hello World" data-settings='{"enabled": true}'></div>
```

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [License](#license)


## Install

```sh
npm i @maelstrom-cms/react-mount
```

## Usage

### Mounting Components

First register all of your components e.g.

```js
import Mount from '@maelstrom-cms/react-mount';
import SomeComponent from './src/SomeComponent.js'

Mount({
    SomeComponent,
})

// same as

Mount({
    'SomeComponent': SomeComponent,
})
```

Use the `data-mount` attribute to define which react component to mount on this element.

```html
<div data-mount="SomeComponent" data-some-title="Hello World" data-settings='{"enabled": true}'></div>
```
#### Dynamically importing components

If you want to lazy load components, you can do so by using the `import()` function

```js
Mount({
    StaticComponent,
    LazyComponent: () => import('./components/LazyComponent'),
})
```

> Currently we only support webpacks import method, if you need to dynamically mount components, consider using `Mount()` directly in your lazy loaded files.

### Passing and Parsing Props

By default, any `data-` attribute will be passed to your component as a prop, allowing you to accept data from server-side systems.

You can apply some additional parsing to these, for example objects e.g.

```js
import parseProps from '@maelstrom-cms/react-mount/dist/parseProps';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.settings = parseProps(props, 'settings');
        // this.settings will now be a JSON object.
    }
}
```

### Cloaking and Loading

Whilst the page is loading you might see a flash of un-styled content, you can get around this 2 ways.

#### Provide some default HTML within the document e.g.

```html
<div data-mount="MyComponent">
    <svg class="spinner" ...></svg>
    Loading.....
</div>
```

or you can choose to hide the component completely e.g.

```html
<div class="cloak" data-mount="MyComponent"></div>
```

Add the CSS snippet

```css
.cloak { display: none; }
```

If you want to use an alternative class name (make sure it's unique e.g. do not use "hidden") you can use the `setCloakClass` e.g.

```js
import { setCloakClass } from '@maelstrom-cms/react-mount/src/mount';

setCloakClass('my-cloak-class');

Mount({
    AnotherComponent
});
```

> Make sure you set the cloak class BEFORE mounting the components.


## License

[MIT](LICENSE) © [Maelstrom CMS](https://www.maelstrom-cms.com)
