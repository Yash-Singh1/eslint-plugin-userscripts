var rule = require('..')['no-invalid-metadata'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-invalid-metadata', rule, {
  valid: [
    `// ==UserScript==
    // @name         Bottom Padding to Swagger UI
    // @namespace    https://github.com/Yash-Singh1/UserScripts
    // @version      1.3
    // @description  Adds bottom padding to the Swagger UI
    // @author       Yash Singh
    // @match        https://*/*
    // @match        http://*/*
    // @icon         https://petstore.swagger.io/favicon-32x32.png
    // @grant        none
    // @homepage     https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @homepageURL  https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @supportURL   https://github.com/Yash-Singh1/UserScripts/issues
    // @downloadURL  https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // @updateURL    https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // ==/UserScript==`,
    `// ==UserScript==
    // ==/UserScript==`,
    {
      code: `/* global myGlobalVar */
      // ==UserScript==
      // ==/UserScript==`,
      options: [{ top: 'optional' }]
    }
  ],
  invalid: [
    {
      code: '',
      errors: [
        {
          messageId: 'metadataRequired'
        }
      ]
    },
    {
      code: 'abcd()',
      errors: [
        {
          messageId: 'metadataRequired'
        }
      ]
    },
    {
      code: '// ==UserScript==',
      errors: [
        {
          messageId: 'noClosingMetadata'
        }
      ]
    },
    {
      code: `
      // ==UserScript==
      // ==/UserScript==
      // abc`,
      errors: [
        {
          messageId: 'moveMetadataToTop'
        }
      ]
    },
    {
      code: `/* global myGlobalVar */
      // ==UserScript==`,
      errors: [
        {
          messageId: 'noClosingMetadata'
        },
        {
          messageId: 'moveMetadataToTop'
        }
      ]
    },
    {
      code: `/* global myGlobalVar */
      // ==UserScript==
      console.log("hello")
      // ==/UserScript==`,
      options: [{ top: 'optional' }],
      errors: [
        {
          messageId: 'noCodeBetween'
        }
      ]
    },
    {
      code: `// ==UserScript==
      console.log("hello")
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'noCodeBetween'
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @name hello
      // description invalid description
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'attributeNotStartsWithAtTheRate'
        }
      ]
    },
    {
      code: `// ==UserScript==
      // name hello
      // description invalid description
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'attributeNotStartsWithAtTheRate'
        },
        {
          messageId: 'attributeNotStartsWithAtTheRate'
        }
      ]
    }
  ]
});
