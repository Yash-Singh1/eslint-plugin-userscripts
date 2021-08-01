var rule = require('..')['filename-user'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('filename-user', rule, {
  valid: [
    {
      code: 'foo()',
      filename: 'hello.user.js',
      options: ['always']
    },
    {
      code: 'var stuff = "hello"; console.log(stuff.slice(1))',
      filename: 'src/userscripts/more/dirs/down/something.user.js',
      options: ['always']
    },
    {
      code: '',
      filename: '/home/john/dir/theirfiledir/heythere.user.js',
      options: ['always']
    },
    {
      code: 'somecodeimeanfunctiontorun()',
      filename: 'src/userscripts/thing.js',
      options: ['never']
    },
    {
      code: 'somecodeimeanfunctiontorun();//just filename',
      filename: 'thing2.js',
      options: ['never']
    },
    {
      code: 'var hey = 2',
      filename: '/home/person/thing3eee.js',
      options: ['never']
    },
    {
      code: 'nofilename',
      options: ['always']
    },
    {
      code: 'inputfilename',
      filename: '<input>',
      options: ['always']
    },
    {
      code: 'textfilename',
      filename: '<text>',
      options: ['always']
    }
  ],
  invalid: [
    {
      code: 'foo()',
      filename: 'hello.js',
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: 'hello.js',
            newFilename: 'hello.user.js'
          }
        }
      ],
      options: ['always']
    },
    {
      code: 'var stuff = "hello"; console.log(stuff.slice(1))',
      filename: 'src/userscripts/more/dirs/down/something.js',
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: 'src/userscripts/more/dirs/down/something.js',
            newFilename: 'src/userscripts/more/dirs/down/something.user.js'
          }
        }
      ],
      options: ['always']
    },
    {
      code: '',
      filename: '/home/john/dir/theirfiledir/heythere.js',
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: '/home/john/dir/theirfiledir/heythere.js',
            newFilename: '/home/john/dir/theirfiledir/heythere.user.js'
          }
        }
      ],
      options: ['always']
    },
    {
      code: 'somecodeimeanfunctiontorun()',
      filename: 'src/userscripts/thing.user.js',
      options: ['never'],
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: 'src/userscripts/thing.user.js',
            newFilename: 'src/userscripts/thing.js'
          }
        }
      ]
    },
    {
      code: 'somecodeimeanfunctiontorun();//just filename',
      filename: 'thing2.user.js',
      options: ['never'],
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: 'thing2.user.js',
            newFilename: 'thing2.js'
          }
        }
      ]
    },
    {
      code: 'var hey = 2',
      filename: '/home/person/thing3eee.user.js',
      options: ['never'],
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: '/home/person/thing3eee.user.js',
            newFilename: '/home/person/thing3eee.js'
          }
        }
      ]
    }
  ]
});
