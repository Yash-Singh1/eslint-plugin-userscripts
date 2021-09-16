var rule = require('..')['filename-user'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('filename-user', rule, {
  valid: [
    {
      filename: 'hello.user.js',
      code: 'foo()',
      options: ['always']
    },
    {
      filename: 'src/userscripts/more/dirs/down/something.user.js',
      code: 'var stuff = "hello"; console.log(stuff.slice(1))',
      options: ['always']
    },
    {
      filename: '/home/john/dir/theirfiledir/heythere.user.js',
      code: '',
      options: ['always']
    },
    {
      filename: 'src/userscripts/thing.js',
      code: 'somecodeimeanfunctiontorun()',
      options: ['never']
    },
    {
      filename: 'thing2.js',
      code: 'somecodeimeanfunctiontorun();//just filename',
      options: ['never']
    },
    {
      filename: '/home/person/thing3eee.js',
      code: 'var hey = 2',
      options: ['never']
    },
    {
      code: 'nofilename',
      options: ['always']
    },
    {
      filename: '<input>',
      code: 'inputfilename',
      options: ['always']
    },
    {
      filename: '<text>',
      code: 'textfilename',
      options: ['always']
    }
  ],
  invalid: [
    {
      filename: 'hello.js',
      code: 'foo()',
      options: ['always'],
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: 'hello.js',
            newFilename: 'hello.user.js'
          }
        }
      ]
    },
    {
      filename: 'src/userscripts/more/dirs/down/something.js',
      code: 'var stuff = "hello"; console.log(stuff.slice(1))',
      options: ['always'],
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: 'src/userscripts/more/dirs/down/something.js',
            newFilename: 'src/userscripts/more/dirs/down/something.user.js'
          }
        }
      ]
    },
    {
      filename: '/home/john/dir/theirfiledir/heythere.js',
      code: '',
      options: ['always'],
      errors: [
        {
          messageId: 'filenameExtension',
          data: {
            oldFilename: '/home/john/dir/theirfiledir/heythere.js',
            newFilename: '/home/john/dir/theirfiledir/heythere.user.js'
          }
        }
      ]
    },
    {
      filename: 'src/userscripts/thing.user.js',
      code: 'somecodeimeanfunctiontorun()',
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
      filename: 'thing2.user.js',
      code: 'somecodeimeanfunctiontorun();//just filename',
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
      filename: '/home/person/thing3eee.user.js',
      code: 'var hey = 2',
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
