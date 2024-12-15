const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { create, get, list, edit, destroy } = require('../products'); 
const productTestHelper = require('./test-utils/productTestHelper');



jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  // Set up and clean up test data
  beforeEach(() => {
    jest.clearAllMocks();
});

  it('should list all products', async () => {
    const products = await list();
    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
    expect(products[1].description).toBe('Product 2');
  });
  describe('get', () => {
  it('should get a product by id', async () => {
    mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
    const product = await get('product-id');
    expect(product.description).toBe('Product 1');
    expect(mockModel.findById).toHaveBeenCalledWith('product-id');
  });
});
describe('destroy', () => {
    it('should delete a product by id', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({
        deletedCount: 1
      });
      const result = await destroy('product-id');
      expect(mockModel.deleteOne).toHaveBeenCalledWith({
        _id: 'product-id'
      });
      expect(result.deletedCount).toBe(1);
    });
  });
});