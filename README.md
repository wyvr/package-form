# Form Package

Package for [wyvr](https://wyvr.dev) which contains basic form elements

-   Text
-   Checkbox
-   Password
-   ...

## **WARNING: This software is currently under heavy development. It is not considered stable and there may be bugs, incomplete features, or changes without prior notice. Use at your own risk.**

## Install

### Install dependency

Add it to your Node.js Dependencies with

```bash
pnpm install @wyvr/package-form
```

### Add package

Add the package to your `wyvr.js` file

```javascript
export default {
    packages: [
        {
            name: 'Form',
            path: '@wyvr/package-form',
        },
    ],
};
```

## Usage

Include the elements like this

```html
<script>
    import Text from '@src/form/Text.svelte';

    let text = 'Hello World';
</script>

<Text bind:value="{text}">Label</Text>
```

## Release Notes

see [Release Notes](RELEASE_NOTES.md)

## Contributing Guidelines

TBD

## License

[MIT](LICENSE.md)
