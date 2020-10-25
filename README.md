# About this boilerplate

This is a boilerplate I set up to easily start developing a Nextcloud App with React and Typescript

## Reproducing the steps

### Using yarn:

Installing dev dependencies
```bash
yarn add --dev @types/react @types/react-dom awesome-typescript-loader css-loader html-webpack-plugin mini-css-extract-plugin source-map-loader typescript webpack webpack-cli webpack-dev-server
```

Installing other dependencies:
```bash
yarn add react react-dom
```

### Using npm

Installing dev dependencies:
```bash
npm install --save-dev @types/react @types/react-dom awesome-typescript-loader css-loader html-webpack-plugin mini-css-extract-plugin source-map-loader typescript webpack webpack-cli webpack-dev-server
```

Installing other dependencies:
```bash
npm install --save react react-dom
```

Creating a **config** folder where to put all the configurations files:
```bash
mkdir config
```

Inside the config folder we create different files:
- webpack.config.js
- tsconfig.json

## Usage
1. Download the boilerplate in your dev environment:
```git
git clone https://gitlab.com/MarcoGarofalo94/react-typescript-nextcloud-boilerplate.git
```
2. Installig dependencies:
```bash
yarn install
```
OR
```bash
npm install
```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)