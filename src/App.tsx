import React, { FC, useEffect, useState } from 'react';
import InputField from './components/InputField';
import Receipt from './components/Receipt';
import { CartItem, parseInput, generateLineItems, getTotalSalesTax, getTotal } from './controllers/ItemPriceController'
import './App.css';

const App: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lineItems, setLineItems] = useState<string[]>([]);
  const [totalSalesTax, setTotalSalesTax] = useState(0);
  const [total, setTotal] = useState(0);

  const generateReceipt = () => {
    const parsedCartItems: CartItem[] = parseInput(inputValue);
    setCartItems(parsedCartItems);

    const generatedLineItems: string[] = generateLineItems(cartItems);
    setLineItems(generatedLineItems);

    const generatedSalesTax: number = getTotalSalesTax(cartItems);
    setTotalSalesTax(generatedSalesTax);

    const generatedTotal: number = getTotal(cartItems);
    setTotal(generatedTotal);

  }

  return (
    <div className='App'>
      <header className='App-header'>
        <ul>
          <li>
            "Book" counts as a book.
          </li>
          <li>
            "chocolate bar" and "box of chocolates" count as food.
          </li>
          <li>
            "packet of headache pills" counts as medical products.
          </li>
        </ul>
        <p>
          Your shopping basket:
        </p>
        <InputField
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <button
          className='enter-button'
          onClick={generateReceipt}
        >
          Calculate Tax
        </button>
        <p>
          Your receipt with tax:
        </p>
        <Receipt
          lineItems={lineItems}
          totalSalesTax={totalSalesTax}
          total={total}
        />
      </header>
    </div>
  );
}

export default App;
