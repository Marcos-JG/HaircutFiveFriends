import PDFDocument from 'pdfkit';

export default function generateInvoicePDF(data) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.fontSize(20).text('HAIRCUT FIVE FRIENDS', { align: 'center' });
        doc.moveDown();

        doc.fontSize(16).text(`Invoice: ${data.invoiceNumber}`);
        doc.text(`Date: ${new Date(data.date).toLocaleDateString()}`);
        doc.text(`Client: ${data.clientName}`);
        doc.moveDown();

        data.items?.forEach((item) => {
            const name = item.product
                ? item.product.name
                : item.service?.name;

            doc.text(`${name} | Qty: ${item.quantity} | Price: $${item.price}`);
        });

        doc.moveDown();
        doc.text(`Subtotal: $${data.subtotal}`);
        doc.text(`Tax: $${data.tax}`);
        doc.text(`Total: $${data.total}`);

        doc.end();
    });
}