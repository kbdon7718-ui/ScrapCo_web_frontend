declare module "sanitize-html" {
  export type IOptions = {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    allowedSchemes?: string[];
    allowedSchemesByTag?: Record<string, string[]>;
    allowProtocolRelative?: boolean;
    transformTags?: Record<
      string,
      (tagName: string, attribs: Record<string, string>) => {
        tagName: string;
        attribs?: Record<string, string>;
      }
    >;
  };

  export default function sanitizeHtml(dirty: string, options?: IOptions): string;
}
