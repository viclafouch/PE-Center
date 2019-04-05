;(() => {
  setTimeout(() => import('./popup-imported').then(m => m.default()), 0)
})()
