const satori = require('satori')
const fs = require('fs')
const { Resvg } = require('@resvg/resvg-js')
const path = require('path')
const matter = require('gray-matter')

/**
 * generate og image from provided information
 * @param {object} data
 * @param {string} data.title
 * @param {string} data.subtitle
 * @param {string} data.tags
 *
 * @param {object} [opt]
 * @param {string} [opt.template]
 * @param {number} [opt.width]
 * @param {number} [opt.height]
 * @param {string} [opt.font]
 *
 * @returns {Promise<{ png: Buffer, svg: string }>}
 */
async function getOg(data, opt) {
    opt = {
        template: '../template/blog.simbafs.cc.js',
        width: 1200,
        height: 600,
        font: '~/.local/share/fonts/jf-openhuninn-1.1.ttf',
        ...opt
    }

    opt.font = path.resolve(opt.font.replace(/^~/, process.env.HOME))

    const { html } = await import('satori-html')
    const og = require(opt.template)(html)
    const font = fs.readFileSync(opt.font)

    // console.log(JSON.stringify(og(data), null, 2))

    return satori
        .default(og(data), {
            width: opt.width,
            height: opt.height,
            fonts: [
                {
                    name: 'Inter',
                    data: font,
                    weight: 400,
                    style: 'normal',
                },
            ],
        })
        .then(svg => {
            const png = new Resvg(svg, {
                background: 'rgba(238, 235, 230, 0)',
                fitTo: {
                    mode: 'width',
                    value: opt.width,
                },
            })
                .render()
                .asPng()
            // fs.writeFileSync('./out.svg', svg)
            // fs.writeFileSync('./out.png', png)
            return { png, svg }
        })
}

async function getOgFromMd({ inFile, outFile, font, template, author }) {
    const file = fs.readFileSync(inFile).toString()
    const { data } = matter(file)

    const ogData = {
        title: data.title,
        subtitle: `${data.date} by ${data.author || author}`,
        tags: data.tags.slice(0, 5),
    }

    const opt = {}
    if (font) opt.font = font
    if (template) opt.template = template

    getOg(ogData, opt).then(({ png }) => {
        const dir = path.dirname(outFile)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(outFile, png)
    })
}

module.exports = {
    getOg,
    getOgFromMd,
}

// getOG({
//     title: 'title title title title title title title title title title title title title title title title',
//     subtitle: '2022/04/12 by simbafs',
//     tags: 'js, html, og',
// })
//     .then(({ png }) => fs.writeFileSync('og.png', png))
//     .catch(console.error)
