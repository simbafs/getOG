export type data = {
  title: string;
  description?: string;
  tags?: string[];
  authors?: string[];
  date?: Date;
};

export type opts = Partial<{
  /** path to the template file */
  template: (data: data) => string;
  width: number;
  height: number;
  /** path to the font file */
  font: string;
  background: string;
}>;

export type template = (data: data) => string;
