
import React from 'react';

const bookList = ['book'];
const foodList = ['chocolate bar', 'box of chocolates',];
const medicalList = ['packet of headache pills'];

/*
  I considered making tax-free categories an Enum, as shown below,
  and giving CartItem category: ProductCategory.
  I decided against it because the categories are not different.
  Current project requirements only involve a single boolean fact:
  "Is this not in any tax-free category?" An Enum might become
  useful later if business requirements change. (Or I could make
  an object literal followed by "as const" which makes its properties
  read-only, and this would basically do the same thing.)
*/
// import { EnumType } from 'typescript';
// enum ProductCategory {
//   Book,
//   Food,
//   Medical,
//   Other,
// }


export type CartItem = {
  quantity: number,
  name: string,
  basePrice: number,
  imported: boolean,
  taxFreeCategory: boolean,
}

export const parseInput = (inputValue: string) => {
  const inputLines: string[] = inputValue.split(/\r?\n/);

  const parsedCartItems: CartItem[] = inputLines.map(line => {
    const itemAndPrice: string[] = line.split(' at ');
    const basePrice: number = parseFloat(itemAndPrice[1])
    const quantityAndItemName: string[] = itemAndPrice[0].split(' ');
    const nameWordsList: string[] = quantityAndItemName.slice(1);
    const productName: string = nameWordsList
      .filter(word => {
        return word !== 'Imported' && word !== 'imported'
      })
      .join(' ');
    const taxFreeCategory: boolean = productName === 'Book' || productName === 'book'
      || foodList.includes(productName.toLowerCase())
      || medicalList.includes(productName.toLowerCase());

    const cartItem: CartItem = {
      'quantity': parseInt(quantityAndItemName[0]),
      'name': productName,
      'basePrice': basePrice,
      'imported': nameWordsList.includes('Imported') || nameWordsList.includes('imported'),
      'taxFreeCategory': taxFreeCategory,
    };

    return cartItem
  });

  return parsedCartItems;
}

export const generateLineItems = (cartItems: CartItem[]) => {
  let productNamesInReceipt: string[] = [];

  cartItems.forEach(cartItem => {
    if (!productNamesInReceipt.includes(cartItem.name)) {
      productNamesInReceipt.push(cartItem.name);
    }
  })

  const lineItems: string[] = productNamesInReceipt.map(productName => {
    const itemsOfThisProduct: CartItem[] = cartItems.filter(cartItem => cartItem.name === productName);

    const totalProductPrice: number = itemsOfThisProduct.reduce((accumulator: number, item: CartItem) => {
      return accumulator + item.basePrice
    }, 0);

    const quantityStatement: string = (itemsOfThisProduct.length > 1) ? ` (${itemsOfThisProduct.length} @ ${itemsOfThisProduct[0].basePrice.toFixed(2)})` : ''


    return `${productName}: ${totalProductPrice.toFixed(2)}${quantityStatement}`
  });

  return lineItems
}

export const getTotalSalesTax = (cartItems: CartItem[]) => {
  const salesTaxTotal: number = cartItems.reduce((accumulator: number, cartItem: CartItem) => {
    let salesTax: number = cartItem.taxFreeCategory ? 0 : cartItem.basePrice * 0.1;
    // On each item, round up the sales tax to the nearest five cents.
    salesTax = Math.ceil(salesTax * 20) / 20;
    return accumulator + salesTax;
  }, 0)

  return salesTaxTotal
}

export const getTotal = (cartItems: CartItem[]) => {
  let total: number = cartItems.reduce((accumulator: number, cartItem: CartItem) => {
    const basePrice: number = cartItem.basePrice;
    const duty: number = cartItem.imported ? basePrice * 0.05 : 0;
    return accumulator + basePrice + duty;
  }, 0)

  total = total + getTotalSalesTax(cartItems)

  return total;
}
