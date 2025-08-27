module.exports = {
  source: 'src',
  output: 'lib',
  targets: [
    [
      'module',
      {
        esm: true
      }
    ],
    [
      'typescript',
      {
        tsc: process.platform === 'win32' ? './node_modules/.bin/tsc.cmd' : './node_modules/.bin/tsc'
      }
    ]
  ]
};