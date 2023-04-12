/* eslint-disable no-undef */
import sanitizer from '../core/sanitizer.js'

export default {
  data() {
    return {
      markdownIt: null
    }
  },
  async created() {
    this.markdownIt = await this._initMarkdown();
    if (!this.html) {
        this.markdownIt.set({ html: false });
        this.xssOptions = false;
    } else if (typeof this.xssOptions === 'object') {
        this.markdownIt.use(sanitizer, this.xssOptions);
    }
  },
  methods: {
    async _initMarkdown() {
      if (this.markdownIt) return this.markdownIt
      return OpenDocsCore.markdown.createMarkdownRenderer(this.markdownOptions)
    },
    $render(src, func) {
      this._initMarkdown().then((markdownIt) => {
        this.markdownIt = markdownIt
        var res = this.markdownIt.render(src);
        func(res);
      })
    }
  }
}
