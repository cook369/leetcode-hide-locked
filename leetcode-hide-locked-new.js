/* eslint-env greasemonkey, browser */
// ==UserScript==
// @name         Hide locked Leetcode problems
// @namespace    http://tampermonkey.net/
// @version      2024-11-28
// @description  Hides locked Leetcode problems
// @author       cook369
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

  const problemList = document.querySelector('div[role="rowgroup"]:last-child')
  const observer = new MutationObserver(removeLocked)
  observer.observe(problemList, { childList: true, subtree: true })
  removeLocked()
})();
