# Micro apps

Generate production ready micro apps

## Steps

```sh
npx create-universal-react
select micro-app
```

## Main Features

- **Module federation:** Inject micro app or its part as remote module
- **Manifest:** Mount micro app in target DOM element using micro app loader
- **HTML:** Deploy and host micro apps as standalone apps
- **Shadow root:** True isolation in your micro apps. No more conflicts!

## Examples with Next JS app

### Module federation

**webpack.config.js**
Generated by universal react

```sh
App name - package.json name
Remote name - <App name>_remote
Expose path - src/index
Expose name - /app
```

**next.config.json**
Enable module federation and add remote entry

```js
module.exports = {
  webpack: (config, options) => {
    const { ModuleFederationPlugin } = options.webpack.container;
    config.plugins.push(
      new ModuleFederationPlugin({
        remotes: {
          header: 'header_remote@http://localhost:4000/remoteEntry.js'
        },
        shared: []
      })
    );
    return config;
  }
};
```

**React component**
Access module via import

```js
const Header = () => {
  const ref = useRef(null);
  const renderFn = async () => {
    const remote = await import('header/app');
    remote.render(ref.current, {});
  };
  useEffect(() => {
    renderFn();
  }, []);
  return <div ref={ref}></div>;
};
```

### Micro app loader

Inject micro app script in DOM target

**Loader utility**

```js
const renderFn = async (domTarget, props, appName) => {
  const domain = 'http://localhost:4001';
  const res = await fetch(`${domain}/manifest.json`);
  const data = await res.json();
  const scriptUrl = `${domain}/${data['main.js']}`;

  const element = document.createElement('script');
  element.src = scriptUrl;
  element.type = 'text/javascript';
  element.async = true;

  element.onload = () => {
    window[appName].render(domTarget, props);
  };

  document.head.appendChild(element);
};
```

**React component**

```js
const Header = () => {
  const ref = useRef(null);
  useEffect(() => {
    renderFn(ref.current, { shadowROOT: true }, 'header');
  }, []);
  return <div ref={ref}></div>;
};
```

### Standalone apps

All Micro apps have index.html file. You can deploy and share link.

```js
http://localhost:4000/
```

### Render method params

- `element`: HTML target to mount micro app
- `config`: Following are defaults. You can always add more.
  1. `props` (object): React props object passed to root element
  2. `shadowROOT` (boolean): set `true` to enable shadow DOM at `element`