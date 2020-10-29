<<<<<<< HEAD
# Video Viewer
Place this app in **nextcloud/apps/**

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
>>>>>>> b2267e4f6cae3ab1b1903a4fa88f7edb5317a515
