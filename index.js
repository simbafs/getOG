#!/bin/env node

const path = require('path')
const matter = require('gray-matter')
const fs = require('fs')
const { getOgFromMd } = require('./src/getOg')

let inFile = ''
let outFile = ''
let author = 'SimbaFs'
let font
let template

function help() {
    console.log(`options:
    --in <path> required
    --out <path>
    --font <path>
    --template <path>
    --author <name>
    -h, --help`)
}

for (let i = 2; i < process.argv.length; i++) {
    switch (process.argv[i]) {
        case '--in':
            inFile = process.argv[i + 1]
            break
        case '--out':
            outFile = process.argv[i + 1]
            break
        case '--font':
            font = process.argv[i + 1]
            break
        case '--template':
            template = prcess.argv[i + 1]
            break
        case '--author':
            author = process.argv[i + 1]
            break
        case '--help':
        case '-h':
            help()
            break
    }
}

if (!inFile) {
    console.log('you must give an file with --in')
    process.exit(1)
}

if (!outFile) {
    outFile = path.join('og', inFile).replace(/.md$/, '.png')
}

getOgFromMd({ inFile, outFile, font, template, author })
