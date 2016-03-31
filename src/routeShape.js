
export const mkShape = (self, child) => ({ self, child })

export const validateShape = (shape) => (shape && shape.self && shape.child) ? shape : false
