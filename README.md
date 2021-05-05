# React TS - Nextcloud Boilerplate
Place this app in **/[your nextcloud instance folder]/data/custom_apps/
# About this boilerplate

This boilerplate is a starting point to develop a Nextcloud application using Typescript and React. There are many features involved in this project such as HRM (Hot Module Replacement) and Live Reloading. In order to benefit of these two feature an appropriate (docker) compose architecture has to be set, see __todo: nextcloud instance link repo.

## How does it work?
Developing an application is a time consume activity, in order to optimize this process, there are many features and approachs useful to speed up the whole  development process such as HMR and Live Reloading.

###Typescript
[TypeScript](https://www.typescriptlang.org/) is a super-set of JavaScript, developed by Microsoft (Yes), that enhances the whole development process by adding features such as: static types definition, compilation time (TypeScript cannot be executed by default in the browser so it need to be transpiled to JavaScript), automatic documentation ([typedoc](https://typedoc.org/), [tsdoc](https://tsdoc.org/)), null safety and much more.

In order to enable typescript there are some dependencies that need to be installed by the package manager of the project (in this project is used [Yarn](https://yarnpkg.com/) but it's possibile to use even [NPM](https://www.npmjs.com/) of course.) and a tsconfig.js file needs to be set up.

#### tsconfig.js

```typescript
{
  "include": ["app/"],
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "jsx": "react",
    "baseUrl": "./",
    "paths": {
      "@components-app/*": ["app/src/components/*"],
      "@components-settings/*": ["app/adminSettings/components/*"],
      "@store-settings/*": ["app/adminSettings/store/*"],
      "@store-app/*": ["app/src/store/*"],
      "@ts/*": ["app/common/ts/*"],
      "@utils/*": ["app/common/utils/*"],
      "@config/*": ["app/common/config/*"],
      "@models/*": ["app/common/models/*"],

    },
    "noImplicitAny": false,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "outDir": "./build/",
    "preserveConstEnums": true,
    "removeComments": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "target": "es5",
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
  }
}
```

### Webpack 
ee

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




## Building the app

The app can be built by using the provided Makefile by running:

    make

This requires the following things to be present:
* make
* which
* tar: for building the archive
* curl: used if phpunit and composer are not installed to fetch them from the web
* npm: for building and testing everything JS, only required if a package.json is placed inside the **js/** folder

The make command will install or update Composer dependencies if a composer.json is present and also **npm run build** if a package.json is present in the **js/** folder. The npm **build** script should use local paths for build systems and package managers, so people that simply want to build the app won't need to install npm libraries globally, e.g.:

**package.json**:
```json
"scripts": {
    "test": "node node_modules/gulp-cli/bin/gulp.js karma",
    "prebuild": "npm install && node_modules/bower/bin/bower install && node_modules/bower/bin/bower update",
    "build": "node node_modules/gulp-cli/bin/gulp.js"
}
```


## Publish to App Store

First get an account for the [App Store](http://apps.nextcloud.com/) then run:

    make && make appstore

The archive is located in build/artifacts/appstore and can then be uploaded to the App Store.

## Running tests
You can use the provided Makefile to run all tests by using:

    make test

This will run the PHP unit and integration tests and if a package.json is present in the **js/** folder will execute **npm run test**

Of course you can also install [PHPUnit](http://phpunit.de/getting-started.html) and use the configurations directly:

    phpunit -c phpunit.xml

or:

    phpunit -c phpunit.integration.xml

for integration tests
=======


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
 b2267e4f6cae3ab1b1903a4fa88f7edb5317a515
