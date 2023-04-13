/* eslint-disable no-undef */
import sanitizer from '../core/sanitizer.js'
import miip from 'markdown-it-images-preview'

function initMarkdownIt(md) {
  md.use(miip)
}

export default {
  data() {
    return {
      markdownIt: null
    }
  },
  async created() {
    await this._getMarkdownIt();
    if (!this.html) {
        this.markdownIt.set({ html: false });
        this.xssOptions = false;
    } else if (typeof this.xssOptions === 'object') {
        this.markdownIt.use(sanitizer, this.xssOptions);
    }
  },
  methods: {
    async _getMarkdownIt() {
      if (this.markdownIt) return this.markdownIt
      this.markdownIt = await OpenDocsCore.markdown.createMarkdownRenderer(this.markdownOptions)
      initMarkdownIt(this.markdownIt)
      return this.markdownIt
    },
    $render(src, func) {
      this._getMarkdownIt().then(() => {
        var res = this.markdownIt.render(src);
        func(res);
      })
    }
  }
}
