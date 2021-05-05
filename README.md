# React TS - Nextcloud Boilerplate
Place this app in **/[your nextcloud instance folder]/data/custom_apps/
# About this boilerplate

This boilerplate is a starting point to develop a Nextcloud application using Typescript and React. There are many features involved in this project such as HRM (Hot Module Replacement) and Live Reloading. In order to benefit of these two feature an appropriate (docker) compose architecture has to be set, see __todo: nextcloud instance link repo.

## How does it work?
Developing an application is a time consume activity, in order to optimize this process, there are many features and approachs useful to speed up the whole  development process such as HMR and Live Reloading.

### Typescript
[TypeScript](https://www.typescriptlang.org/) is a super-set of JavaScript, developed by Microsoft (Yes), that enhances the whole development process by adding features such as: static types definition, compilation time (TypeScript cannot be executed by default in the browser so it need to be transpiled to JavaScript), automatic documentation ([typedoc](https://typedoc.org/), [tsdoc](https://tsdoc.org/)), null safety and much more.

In order to enable typescript there are some dependencies that need to be installed by the package manager of the project (in this project is used [Yarn](https://yarnpkg.com/) but it's possibile to use even [NPM](https://www.npmjs.com/) of course.) and a tsconfig.js file needs to be set up.

#### tsconfig.js

```javascript
{
  "include": ["app/"], //entrypoint
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,  //enabling decorators @
    "jsx": "react",
    "baseUrl": "./",
    "paths": { //path aliasing
      "@components-app/*": ["app/src/components/*"],
      "@components-settings/*": ["app/adminSettings/components/*"],
      "@store-settings/*": ["app/adminSettings/store/*"],
      "@store-app/*": ["app/src/store/*"],
      "@ts/*": ["app/common/ts/*"],
      "@utils/*": ["app/common/utils/*"],
      "@config/*": ["app/common/config/*"],
      "@models/*": ["app/common/models/*"],

    },
    "noImplicitAny": false, //disable complaing about any type
    "noImplicitThis": true,
    "strictNullChecks": true, //enabling null safety
    "outDir": "./build/",
    "preserveConstEnums": true,
    "removeComments": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "target": "es5", //version of js to which the code will be transpiled
    "plugins": [{ "name": "typescript-plugin-css-modules" }] //nice plugin to allow css module in typescript
  }
}
```

In a simple project the TypeScript compiler (tsc) is enough to get started, but in a project like this we need a code bundler like Webpack to resolve all the imports and bundle the code in a single script that will be loaded by Nextcloud. 

### Webpack 
[Webpack](https://webpack.js.org/) is a massive project that allows you to bundle all your modules togheter and structure the output type depending on your needs. Webpack has a huge community and well defined documentation that explains every single step you need to follow in order to setup a project, the only downside is the learning curve, is not very easy to get started and reproduce a complex setup. In this project webpack is used to bundle all the code, but also to run the TypeScript compiler. Webpack has some other features like [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) that allows you to serve your code locally during development and have HRM and live reloading.


# Development Usage 

1. Go to the corrrct folder
```bash
cd <your nextcloud instance>/data/custom_apps
```

2. Clone the repository with the desired name of the application (don't forget to go to your docker-compose.yml file and enable a new volume containing the application es: ./data/custom_apps/<desidered app name>:/var/www/html/custom_apps/<desired app name> and restart the compose).
```bash
git clone https://gitlab.com/FCRLAB/react-typescript-nextcloud-boilerplate.git <desidered name>
```
3. Run the change_app_name.sh script, it will just change the default app name of this project (customappname1) to the desired one. It is an important step in order to setup all the namespaces, if this fails I have bad news.
```bash
./change_app_name.sh <desired name>
```

4. Install all the dependencies

```bash
yarn install
```
or

```bash
npm install
```

# Run

1. To run with HMR just run

```bash
yarn start
```
or 

```bash
npm run start
```

2. Without HMR

```bash
yarn dev
```
or 

```bash
npm run dev
```


# Building the app

```bash
yarn build
```
or 

```bash
npm run build
```

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
