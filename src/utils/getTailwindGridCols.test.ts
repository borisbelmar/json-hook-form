import getTailwindGridCols from './getTailwindGridCols'

describe('getTailwindGridByCols', () => {
  it('should return grid-cols-1 for cols <= 1', () => {
    expect(getTailwindGridCols(-1)).toBe('grid-cols-1')
    expect(getTailwindGridCols(0)).toBe('grid-cols-1')
    expect(getTailwindGridCols(1)).toBe('grid-cols-1')
  })

  it('should return grid-cols-1 md:grid-cols-2 for cols === 2', () => {
    expect(getTailwindGridCols(2)).toBe('grid-cols-1 md:grid-cols-2')
  })

  it('should return grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for cols >= 3', () => {
    expect(getTailwindGridCols(3)).toBe('grid-cols-1 md:grid-cols-2 lg:grid-cols-3')
    expect(getTailwindGridCols(4)).toBe('grid-cols-1 md:grid-cols-2 lg:grid-cols-3')
    expect(getTailwindGridCols(100)).toBe('grid-cols-1 md:grid-cols-2 lg:grid-cols-3')
  })
})
