import generateStatisticsPDF from './statistics.pdf.js';

export const downloadStatistics = async (req, res) => {
    try {

        const statistics = {
            totalSales: 45,
            totalRevenue: 3500,
            topService: 'Classic Haircut',
            topProduct: 'Hair Gel'
        };

        const pdfBuffer = await generateStatisticsPDF(statistics);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=statistics.pdf',
        });

        res.send(pdfBuffer);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};