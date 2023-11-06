
import { marked } from "marked";


export const METADATA_PATTERN = /^ {0,3}(?:-{3,})(?:[^\n]*)(?:\n)(?:([\s\S]*?)(?:\n))(?:-*(?=\n))/;
export default {
  extensions: [
    {
      name: 'metadata',
      level: 'block',
      tokenizer(this: marked.TokenizerThis, src: string, tokens: marked.Token[] | marked.TokensList): void | marked.Tokens.Generic {
        if(tokens.find(x => x.type as unknown as string === 'metadata')) return;
        let matches = METADATA_PATTERN.exec(src);
        return matches ? {
            type: 'metadata',
            ignore: false,
            data: matches[1],
            raw: src
        } : {
            type: 'metadata',
            ignore: true,
            raw: src
        };
      },
      renderer: (token: marked.Tokens.Generic) => 'ignore' in token && !token['ignore']
          ? token['data']
          : ''
    }
  ],
  headerIds: false,
  mangle: false
} as marked.MarkedExtension


