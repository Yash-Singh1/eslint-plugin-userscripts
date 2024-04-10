import metadataSpacing from '../../../lib/rules/metadata-spacing';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('metadata-spacing', metadataSpacing, {
  valid: [
    `// ==UserScript==
    // @name         Bottom Padding to Swagger UI
    // @namespace    https://github.com/Yash-Singh1/UserScripts
    // @version      1.3
    // @description  Adds bottom padding to the Swagger UI
    //
    // @author       Yash Singh
    // @match        https://*/*
    // @match        http://*/*
    // @icon         https://petstore.swagger.io/favicon-32x32.png
    // @grant        none
    //
    // @homepage     https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @homepageURL  https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @supportURL   https://github.com/Yash-Singh1/UserScripts/issues
    // @downloadURL  https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // @updateURL    https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // ==/UserScript==`,

    `// ==UserScript==
    // ==/UserScript==`,

    `// ==UserScript==
    // ==/UserScript==

    console.log("ayo");`,

    `// ==UserScript==`,

    `// ==/UserScript==`,

    `// ==UserScript==
    // ==/UserScript==a
    console.log('hello worlds')`,

    `// ==UserScript==
    // ==/UserScript==\r\n\r\nconsole.log('hello worlds')`
  ],
  invalid: [
    {
      code: `// ==UserScript==
    // @name         Bottom Padding to Swagger UI
    // @namespace    https://github.com/Yash-Singh1/UserScripts
    // @version      1.3
    // @description  Adds bottom padding to the Swagger UI
    //
    // @author       Yash Singh
    // @match        https://*/*
    // @match        http://*/*
    // @icon         https://petstore.swagger.io/favicon-32x32.png
    // @grant        none
    //
    // @homepage     https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @homepageURL  https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @supportURL   https://github.com/Yash-Singh1/UserScripts/issues
    // @downloadURL  https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // @updateURL    https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // ==/UserScript==
    console.log("wow")`,
      output: `// ==UserScript==
    // @name         Bottom Padding to Swagger UI
    // @namespace    https://github.com/Yash-Singh1/UserScripts
    // @version      1.3
    // @description  Adds bottom padding to the Swagger UI
    //
    // @author       Yash Singh
    // @match        https://*/*
    // @match        http://*/*
    // @icon         https://petstore.swagger.io/favicon-32x32.png
    // @grant        none
    //
    // @homepage     https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @homepageURL  https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @supportURL   https://github.com/Yash-Singh1/UserScripts/issues
    // @downloadURL  https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // @updateURL    https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // ==/UserScript==

    console.log("wow")`,
      errors: [{ messageId: 'newlineBetween' }]
    },

    {
      code: `// ==UserScript==
    // ==/UserScript==
    console.log("stuff")`,
      output: `// ==UserScript==
    // ==/UserScript==

    console.log("stuff")`,
      errors: [{ messageId: 'newlineBetween' }]
    },

    {
      code: `// ==UserScript==
    // ==/UserScript==\r\nconsole.log("stuff")`,
      output: `// ==UserScript==
    // ==/UserScript==\n\r\nconsole.log("stuff")`,
      errors: [{ messageId: 'newlineBetween' }]
    }
  ]
});
