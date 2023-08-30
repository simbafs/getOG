#!/bin/env node

const { program } = require('commander')
const { getOgFromMd } = require('./src/getOg')

program
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

program.parse()
