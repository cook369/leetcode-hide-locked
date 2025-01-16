/* eslint-env greasemonkey, browser */
// ==UserScript==
// @name         Hide locked Leetcode problems
// @namespace    http://tampermonkey.net/
// @version      2025-01-16
// @description  Hides locked Leetcode problems
// @author       likp
// @match        https://leetcode.com/problemset/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict'
  function removeLocked () {
    console.log("Begin remove")
    const all = document.querySelectorAll('div[role="rowgroup"]:last-child > div[role="row"]')
    Array.prototype.forEach.call(all, row => { row.style.display = 'flex' })
	const locked = document.querySelectorAll('div:first-child > svg.text-brand-orange');
    Array.prototype.forEach.call(locked, item => {
      item.parentNode.parentNode.style.display = 'none'
    })
    console.log("End remove,", "Total:", all.length, "Hide:", locked.length)
  }

  const observerRoot = new MutationObserver((mutationsList, observer) => {
      const problemList = document.querySelector('div[role="rowgroup"]:last-child')
      if (problemList != null) {
          console.log('ProblemList node has appeared')
          const observerProblem = new MutationObserver(removeLocked)
          observerProblem.observe(problemList, { childList: true, subtree: true })
          removeLocked()
          observerRoot.disconnect();
      }
  });

  observerRoot.observe(document.body,{ childList: true, subtree: true })
})();
