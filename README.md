# Calculator application

## Description

Simple calculator with main operations, built using HTML, CSS, JS and Webpack.   
Allows to switch color scheme. Uses `husky` to run ESLint checking before push.  
Testing project.

## How to run the app

### For users:

1. download the project from the repository using [link](https://github.com/the-all-spark/calculator-app/tree/gh-pages) ('<> Code' > 'Download ZIP');

2. run application (double-click on `index.html`).

### For developers:

1. download the project from the repository using [link](https://github.com/the-all-spark/calculator-app/tree/main) ('<> Code' > 'Download ZIP')  
   or clone the repository using git  
   `$ git clone https://github.com/the-all-spark/calculator-app.git`

2. move to the application folder and open Visual Studio code  
   `$ cd calculator-app`  
   `$ code .`

3. install dependencies  
   `$ npm install`

4. run application in development mode (application is available at the address: http://localhost:3000 )  
   `$ npm run serve`

5. build application (files are available in the `build/` folder)  
   `$ npm run build`

Application is available at the [address](https://the-all-spark.github.io/calculator-app/).

## Folders' and files' structure

`` `src` `` (contains all files of the application):

- `assets/` - contains all images and icons (.svg files)
- `scripts/` - contains all scripts: `script.js` - main script file, `theme.js` - script for theme switching, `numpad.js` - script for interaction with keyboard
- `styles/` - contains all styles
- `index.html` - the main application file

`` `./husky/pre-push` `` - pre-push hook for [Husky](https://typicode.github.io/husky/)

`README.md` - application's documentation  
`.prettierrc.json`, `.eslint.config.mjs` - configuration files for [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) code formatters  
`package.json` - project's configuration file    
`webpack.config.mjs` - configuration file for [webpack](https://webpack.js.org/)
