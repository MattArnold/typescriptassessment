import { CartItem, parseInput, getTotalSalesTax, getTotal } from './controllers/ItemPriceController';

const mockInput: string = `1 Book at 2.30
1 Imported Book at 2.30
1 Sock at 1.00`;

const mockCart: CartItem[] = [
  {
    'quantity': 1,
    'name': 'Book',
    'basePrice': 2.30,
    'imported': false,
    'taxFreeCategory': true,
  },
  {
    'quantity': 1,
    'name': 'Book',
    'basePrice': 2.30,
    'imported': true,
    'taxFreeCategory': true,
  },
  {
    'quantity': 1,
    'name': 'Sock',
    'basePrice': 1.00,
    'imported': false,
    'taxFreeCategory': false,
  },
]

test('parse input', () => {
  const cartItems = parseInput(mockInput);
  expect (cartItems).toEqual(mockCart);
})

test('get total sales tax', () => {
  const total = getTotalSalesTax(mockCart);
  expect (total).toEqual(0.10);
})

test('get total price of the order', () => {
  const total = getTotal(mockCart);
  expect (total).toEqual(5.8149999999999995);
})
