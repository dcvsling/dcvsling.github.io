
import { marked } from "marked";

// Override function
export default {
  renderer: {
    heading(text: string, level: number): string {
      const escapedText = text.replace(/\s/g, '-').toLowerCase();

      return `
        <h${level}>
          <a name="${escapedText}" class="anchor" href="#${escapedText}">
            <span class="header-link"></span>
          </a>
          ${text}
        </h${level}>`;
    }
  }
};

