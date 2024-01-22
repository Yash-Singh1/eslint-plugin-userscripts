import noInvalidMetadata from '../../../lib/rules/no-invalid-metadata';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('no-invalid-metadata', noInvalidMetadata, {
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
    // ==/UserScript==`,
    `// ==UserScript==
    // ==/UserScript==`,

    // handle empty lines
    `// ==UserScript==
    // @name My cool name

    // @version 1.0.0
    // ==/UserScript==`,
    {
      code: `/* global myGlobalVar */
      // ==UserScript==
      // ==/UserScript==`,
      options: [{ top: 'optional' }]
    },
    `// ==UserScript==
    // @name My cool name
    // ==/UserScript==
    /*//////////////////////////////////////////////////////////////////////////
    THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR \`AS IS' AND ANY EXPRESS OR IMPLIED
    WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
    MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
    EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
    SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
    OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
    WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
    OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
    ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    /*//////////////////////////////////////////////////////////////////////////`
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
        // @name foo
        ////
        // @description bar
        // ==/UserScript==`,
      errors: [
        {
          messageId: 'attributeNotStartsWithAtTheRate'
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
    },
    {
      code: `// abc
      // ==UserScript==
      // @name hello
      // @description invalid description`,
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
      code: `/*///////
      // ==UserScript==
      // @name         Bottom Padding to Swagger UI
      // @namespace    https://github.com/Yash-Singh1/UserScripts
      // @version      1.3
      // @description  Adds bottom padding to the Swagger UI
      //
      // @author       Yash Singh
      // @icon         https://petstore.swagger.io/favicon-32x32.png
      // @grant        none
      //
      // @homepage     https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
      // @homepageURL  https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
      // @supportURL   https://github.com/Yash-Singh1/UserScripts/issues
      // @downloadURL  https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
      // @updateURL    https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
      // ==/UserScript==
      /*///////`,
      errors: [
        {
          messageId: 'moveMetadataToTop'
        }
      ]
    },
    {
      code: `/*///////
      // @name         Bottom Padding to Swagger UI
      // @namespace    https://github.com/Yash-Singh1/UserScripts
      // @version      1.3
      // @description  Adds bottom padding to the Swagger UI
      //
      // @author       Yash Singh
      // @icon         https://petstore.swagger.io/favicon-32x32.png
      // @grant        none
      //
      // @homepage     https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
      // @homepageURL  https://github.com/Yash-Singh1/UserScripts/tree/main/Bottom_Padding_to_Swagger_UI#readme
      // @supportURL   https://github.com/Yash-Singh1/UserScripts/issues
      // @downloadURL  https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
      // @updateURL    https://raw.githubusercontent.com/Yash-Singh1/UserScripts/main/Bottom_Padding_to_Swagger_UI/Bottom_Padding_to_Swagger_UI.user.js
      // ==/UserScript==
      /*///////`,
      errors: [
        {
          messageId: 'metadataRequired'
        }
      ]
    }
  ]
});
