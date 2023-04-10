const getTailwindGridByCols = (cols: number) => {
  if (cols <= 1) {
    return 'grid-cols-1'
  }
  if (cols === 2) {
    return 'grid-cols-1 md:grid-cols-2'
  }
  if (cols >= 3) {
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }
}

export default getTailwindGridByCols
