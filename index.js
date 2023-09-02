#!/bin/env node

const { program } = require('commander')
const { getOgFromMd } = require('./src/getOg')

program
    // .command('single')
    // .description('generate og image for a single markdown file')
    .argument('<input>', 'the input markdown file')
    .argument('[output]', 'the output png file, default og/${input}')
    .option('--author <name>')
    .option('--font <path>')
    .option('--template <path>')
    .action((input, output = `og/${input}`.replace(/\.md$/, '.png'), opts) => {
        console.log({ input, output, opts })
        getOgFromMd({
            ...opts,
            inFile: input,
            outFile: output,
        })
    })

// program
//     .command('all')
//     .description(
//         'generate og image for all markdown files placed in content/ like https://github.com/simbafs/blog'
//     )
//     .option('-c, --only-change', 'only process files different from git HEAD')
//     .action(opts => {
//         console.log('all', opts)
//     })

program.parse()
