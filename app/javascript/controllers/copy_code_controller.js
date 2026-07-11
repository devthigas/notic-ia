import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.setupCodeCopyButtons()
  }

  setupCodeCopyButtons() {
    const codeBlocks = this.element.querySelectorAll("pre")
    
    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-code-btn")) return

      block.style.position = "relative"

      const button = document.createElement("button")
      button.className = "copy-code-btn"
      button.type = "button"
      button.ariaLabel = "Copiar código"
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="14" height="14">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125v-9.75A1.125 1.125 0 0 1 4.875 9.75H8.25M16.5 4.5h-3.375a1.125 1.125 0 0 0-1.125 1.125v9.75c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 0 0 1.125-1.125V5.625A1.125 1.125 0 0 0 19.125 4.5H16.5ZM16.5 4.5V2.25A2.25 2.25 0 0 0 14.25 0H5.25A2.25 2.25 0 0 0 3 2.25v9A2.25 2.25 0 0 0 5.25 13.5h3" />
        </svg>
        <span>Copiar</span>
      `

      button.addEventListener("click", () => {
        const codeElement = block.querySelector("code")
        if (!codeElement) return

        const textToCopy = codeElement.innerText

        navigator.clipboard.writeText(textToCopy).then(() => {
          button.classList.add("copied")
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span>Copiado</span>
          `

          setTimeout(() => {
            button.classList.remove("copied")
            button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125v-9.75A1.125 1.125 0 0 1 4.875 9.75H8.25M16.5 4.5h-3.375a1.125 1.125 0 0 0-1.125 1.125v9.75c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 0 0 1.125-1.125V5.625A1.125 1.125 0 0 0 19.125 4.5H16.5ZM16.5 4.5V2.25A2.25 2.25 0 0 0 14.25 0H5.25A2.25 2.25 0 0 0 3 2.25v9A2.25 2.25 0 0 0 5.25 13.5h3" />
              </svg>
              <span>Copiar</span>
            `
          }, 2000)
        }).catch(err => {
          console.error("Falha ao copiar código: ", err)
        })
      })

      block.appendChild(button)
    })
  }
}
