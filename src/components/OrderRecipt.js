import JsPDF from "jspdf";

const OrderReceipt = () => {
  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "A4");
    report.html(document.querySelector(".orderedItemsList")).then(() => {
      report.save("receipt.pdf");
    });
  };

  const products = JSON.parse(localStorage.getItem("products"));

  const listOfProducts = products.products.map((product) => {
    return (
      <div>
        {product.title} - <span>${product.price}</span>
      </div>
    );
  });

  return (
    <div className="thankyou-section">
      <div className="thank-you-div">
        <h1>Thank you for your Order!</h1>
        <div className="orderedItemsList">
          <h2>Order Number: {products.order}</h2> <br />
          <h3>List of ordered items</h3>
          {listOfProducts} <br />
        </div>
        <button onClick={generatePDF}>Download Receipt</button>
      </div>
    </div>
  );
};

export default OrderReceipt;
