const satori = require('satori')
const fs = require('fs')
const { Resvg } = require('@resvg/resvg-js')

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
async function getOG(data, opt) {
    opt = {
        template: './template/blog.simbafs.cc.js',
        width: 1200,
        height: 600,
        font: '~/.local/share/fonts/jf-openhuninn-1.1.ttf',
        ...opt
    }

    const { html } = await import('satori-html')
    const og = require(opt.template)(html)
    const font = fs.readFileSync('/home/simba/.local/share/fonts/jf-openhuninn-1.1.ttf')

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

module.exports = getOG

// getOG({
//     title: 'title title title title title title title title title title title title title title title title',
//     subtitle: '2022/04/12 by simbafs',
//     tags: 'js, html, og',
// })
//     .then(({ png }) => fs.writeFileSync('og.png', png))
//     .catch(console.error)
