var rule = require('..')['no-invalid-headers'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-invalid-headers', rule, {
  valid: [
    `// ==UserScript==
    // @name           Bottom Padding to Swagger UI
    // @namespace      https://github.com/Yash-Singh1/UserScripts
    // @version        1.3
    // @description    Adds bottom padding to the Swagger UI
    // @description:en Adds bottom padding to the Swagger UI
    // @author         Yash Singh
    // @match          https://*/*
    // @match          http://*/*
    // @icon           https://petstore.swagger.io/favicon-32x32.png
    // @grant          none
    // @license        MIT
    // @homepage       https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @homepageURL    https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
    // @supportURL     https://github.com/Yash-Singh1/UserScripts/issues
    // @downloadURL    https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // @updateURL      https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
    // @nocompat       Chrome
    // @history        1.0 Initial release
    // @copyright      2020-2021, Yash Singh (https://github.com/Yash-Singh1)
    // ==/UserScript==
    /* globals globalObj */`
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @naem          MyName
      // @description:  My description
      // @supportUrl    https://example.com
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'invalidHeader',
          data: { header: '@naem' }
        },
        {
          messageId: 'invalidHeader',
          data: { header: '@description:' }
        },
        {
          messageId: 'invalidHeader',
          data: { header: '@supportUrl' }
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @name            MyName
      // @description     My description
      // @whitelisted     whitelisted value
      // @notwhitelisted  this header is not whitelisted
      // ==/UserScript==`,
      options: [{ allowed: ['whitelisted'] }],
      errors: [
        {
          messageId: 'invalidHeader',
          data: { header: '@notwhitelisted' }
        }
      ]
    }
  ]
});
