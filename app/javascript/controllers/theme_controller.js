import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  toggle() {
    const isDark = document.documentElement.classList.contains("theme-dark")
    if (isDark) {
      document.documentElement.classList.remove("theme-dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("theme-dark")
      localStorage.setItem("theme", "dark")
    }
  }
}
