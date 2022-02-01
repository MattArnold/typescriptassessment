import React, { FC, useEffect } from 'react';

type ReceiptProps = {
  lineItems: string[],
  totalSalesTax: number,
  total: number,
}

const Receipt: FC<ReceiptProps> = ({lineItems, totalSalesTax, total }: ReceiptProps) => {
  return (
    lineItems.length ?
    <section>
      {lineItems.map((itemString, i) => <p key={i}>{itemString}</p>
      )}
      <p>
        Sales Taxes: {totalSalesTax.toFixed(2)}
      </p>
      <p>
        Total: {total.toFixed(2)}
      </p>
    </section>
    : <></>
  );
}

export default Receipt;
