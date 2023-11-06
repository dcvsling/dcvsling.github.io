import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/csharp';
import csharp from 'highlight.js/lib/languages/javascript';
import plaintext from 'highlight.js/lib/languages/plaintext';
import { Marked, marked } from "marked";
import { METADATA_PATTERN } from "./metadata.extensions";


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('plaintext', plaintext);
export default {

  ...markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      return hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value;
    }
  }),
  headerIds: false,
  mangle: false,
  extensions: [{
    name: 'ignore-metadata',
    level: 'block',
    tokenizer(src, _): any | void {
      const matches = METADATA_PATTERN.exec(src);
      if(matches) {
        return {
          type: 'ignore-metadata',
          raw: matches[0]
        }
      }
    },
    renderer(token): any | void {
      if(token.type === 'ignore-metadata')
        return '';
    }
  }]
} as marked.MarkedExtension;
