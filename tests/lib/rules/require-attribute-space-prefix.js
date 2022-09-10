const rule = require('..')['require-attribute-space-prefix'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('require-attribute-space-prefix', rule, {
  valid: [
    // handle empty comment lines
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
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @name hello
      //@description invalid description
      // ==/UserScript==
      // more comments`,
      errors: [
        {
          messageId: 'attributeNotPrefixedBySpace'
        }
      ]
    },
    {
      code: `// ==UserScript==
      //@name hello
      //@description invalid description
      // ==/UserScript==
      // another comment`,
      errors: [
        {
          messageId: 'attributeNotPrefixedBySpace'
        },
        {
          messageId: 'attributeNotPrefixedBySpace'
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @name hello
      //  @description invalid description
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'attributeNotPrefixedBySpace'
        }
      ]
    }
  ]
});
