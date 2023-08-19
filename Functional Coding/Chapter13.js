function shoesAndSocksInventory_origin(products) {
  let inventory = 0
  for (let p = 0; p < products.length; p++) {
    const product = products[p]
    if (product.type === 'shoes' || product.type === 'socks') {
      inventory += product.numberInInventory
    }
  }
  return inventory
}

function shoesAndSocksInventory(products) {
  return products
    .filter(p => p.type === 'shoes' || p.type === 'socks')
    .map(p => p.numberInInventory)
    .reduce((acc, cur) => acc + cur, 0)
}

const roster = evaluations.reduce((roster, eval) => {
  const position = eval.position
  if (roster[position]) {
    return roster
  }
  return {
    ...roster,
    [position]: eval.name
  }
}, {})
