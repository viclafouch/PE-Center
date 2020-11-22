import produce from 'immer'

export default produce((draft, action) => {
  switch (action.type) {
    case 'test':
      action.products.forEach(product => {
        draft[product.id] = product
      })
  }
})
