import "./style/index.scss"
import { documentReady } from "../src/scripts"
import "../src/modals/index.styl"

import "./style/index.styl"
import "./style/index.less"

documentReady(() => {
  const faqTabs = [...document?.querySelectorAll(".faq-list__faq")]

  if (faqTabs.length > 0) {
    faqTabs.forEach(targetDetail => {
      targetDetail.addEventListener("click", () => {
        faqTabs.forEach(detail => {
          if (detail !== targetDetail) {
            detail.removeAttribute("open")
          }
        })
      })
    })
  }

  const getHeaderHeight = () => {
    const headerHeight = document.querySelector(".header")?.offsetHeight
    document
      .querySelector(":root")
      .style.setProperty("--header-height", `${headerHeight}px`)
  }

  window.addEventListener("resize", () => {
    getHeaderHeight()
  })

  const headerHide = () => {
    const doc = document.documentElement
    const w = window

    let curScroll
    let prevScroll = w.scrollY || doc.scrollTop
    let curDirection = 0
    let prevDirection = 0

    const header = document.querySelector(".header")
    let toggled
    const threshold = 200

    const checkScroll = function () {
      curScroll = w.scrollY || doc.scrollTop
      if (curScroll > prevScroll) {
        curDirection = 2
      } else {
        curDirection = 1
      }

      if (curDirection !== prevDirection) {
        toggled = toggleHeader()
      }

      prevScroll = curScroll
      if (toggled) {
        prevDirection = curDirection
      }
    }

    const toggleHeader = function () {
      toggled = true
      if (curDirection === 2 && curScroll > threshold) {
        header.classList.add("hide")
      } else if (curDirection === 1) {
        header.classList.remove("hide")
      } else {
        toggled = false
      }
      return toggled
    }

    window.addEventListener("scroll", checkScroll)
  }

  headerHide()
  getHeaderHeight()
})

documentReady()
