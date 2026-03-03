import PDFDocument from 'pdfkit';

export default function generateStatisticsPDF(data) {
    return new Promise((resolve) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.fontSize(20).text('HAIRCUT FIVE FRIENDS', { align: 'center' });
        doc.moveDown();

        doc.fontSize(16).text('STATISTICS REPORT');
        doc.moveDown();

        doc.text(`Total Sales: ${data.totalSales}`);
        doc.text(`Total Revenue: $${data.totalRevenue}`);
        doc.text(`Top Service: ${data.topService}`);
        doc.text(`Top Product: ${data.topProduct}`);

        doc.end();
    });
}