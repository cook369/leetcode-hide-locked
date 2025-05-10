/* eslint-env greasemonkey, browser */
// ==UserScript==
// @name         Hide locked Leetcode problems
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Hides locked Leetcode problems
// @author       likp
// @match        https://leetcode.com/problemset/
// @match        https://leetcode.com/problemset/*
// @icon         https://leetcode.com/favicon.ico
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/cook369/leetcode-hide-locked
// @downloadURL https://github.moeyy.xyz/https://raw.githubusercontent.com/cook369/leetcode-hide-locked/refs/heads/master/leetcode-hide-locked.js
// @updateURL https://github.moeyy.xyz/https://raw.githubusercontent.com/cook369/leetcode-hide-locked/refs/heads/master/leetcode-hide-locked.js
// ==/UserScript==

(function () {
  "use strict";
  function removeLocked() {
    console.log("Begin remove");
    const all = document
      .getElementById("radix-:ri:")
      .parentNode.parentNode.parentNode.lastElementChild.firstElementChild.querySelectorAll(
        "a",
      );
    Array.prototype.forEach.call(all, (row) => {
      row.style.display = "flex";
    });
    const locked = document.querySelectorAll(
      "div:first-child > div.text-brand-orange > svg",
    );
    Array.prototype.forEach.call(locked, (item) => {
      item.parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
    });
    console.log("End remove,", "Total:", all.length, "Hide:", locked.length);
  }

  let observerProblem = null;

  const observerRoot = new MutationObserver((mutationsList, observer) => {
    const problemList =
      document.getElementById("radix-:ri:")?.parentNode?.parentNode?.parentNode;
    if (problemList) {
      console.log("ProblemList node has appeared");
      observerProblem = new MutationObserver((mutationsList, observer) =>
        removeLocked(),
      );
      observerProblem.observe(problemList, { childList: true, subtree: true });
      observerRoot.disconnect();
    }
  });

  observerRoot.observe(document.body, { childList: true, subtree: true });
})();
