import { data, opts } from "./type.js";
export declare function getOg(
  data: data,
  opts?: opts,
): Promise<{
  png: Buffer;
  svg: string;
}>;
export declare function getFont(name: string): Promise<Buffer>;
