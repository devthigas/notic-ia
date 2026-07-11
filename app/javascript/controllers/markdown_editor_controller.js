import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    if (window.EasyMDE) {
      this.initEasyMDE()
    } else {
      this.loadLibrary().then(() => this.initEasyMDE())
    }
  }

  disconnect() {
    if (this.easymde) {
      this.easymde.toTextArea()
      this.easymde = null
    }
  }

  initEasyMDE() {
    if (this.easymde) return

    this.easymde = new EasyMDE({
      element: this.element,
      spellChecker: false,
      placeholder: this.element.placeholder || "Escreva aqui todo o conteúdo detalhado da notícia (suporta Markdown)...",
      autosave: {
        enabled: false
      },
      status: ["words", "lines"],
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true
      },
      toolbar: [
        "bold", "italic", "heading", "|",
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "table", "code", "|",
        "preview", "side-by-side", "fullscreen", "|",
        "guide"
      ]
    })

    // Sincroniza o valor com a textarea nativa para o envio correto do Rails/Turbo
    this.easymde.codemirror.on("change", () => {
      this.element.value = this.easymde.value()
      this.element.dispatchEvent(new Event("input", { bubbles: true }))
    })
  }

  loadLibrary() {
    return new Promise((resolve) => {
      if (!document.querySelector('link[href*="easymde.min.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/easymde/dist/easymde.min.css"
        document.head.appendChild(link)
      }

      if (!document.querySelector('script[src*="easymde.min.js"]')) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/easymde/dist/easymde.min.js"
        script.onload = () => resolve()
        document.head.appendChild(script)
      } else {
        const checkInterval = setInterval(() => {
          if (window.EasyMDE) {
            clearInterval(checkInterval)
            resolve()
          }
        }, 50)
      }
    })
  }
}
