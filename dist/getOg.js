import { html } from "satori-html";
import { readFile } from "fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fontFinder from "font-finder";
const defaultOpts = {
  width: 1200,
  height: 630,
  font: "Noto Sans",
  background: "rgba(238, 235, 230, 0)",
};
export async function getOg(data, opts) {
  opts = { ...defaultOpts, ...opts };
  if (!opts.template) {
    opts.template = (await import("./templates/default.js")).template;
  }
  const font = await getFont(opts.font);
  const markup = html(opts.template(data));
  return satori(markup, {
    width: opts.width,
    height: opts.height,
    fonts: [
      {
        name: "Inter",
        data: font,
        weight: 400,
        style: "normal",
      },
    ],
  }).then((svg) => {
    const png = new Resvg(svg, {
      background: opts.background,
      fitTo: {
        mode: "width",
        value: opts.width,
      },
    })
      .render()
      .asPng();
    return { png, svg };
  });
}
// TODO: get font by weight ans style
export async function getFont(name) {
  const font = fontFinder
    .list()
    .then((fonts) => {
      if (name in fonts) return fonts[name];
      else throw new Error(`font ${name} not found`);
    })
    .then((f) => readFile(f[0].path));
  return font;
}
