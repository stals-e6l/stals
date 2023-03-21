const PDFDocument = require('pdfkit');
const fs = require('fs');
const { connect } = require('./db');

// Import the schemas
const Accommodation = require('./Accommodation/accommodationSchema');
const Report = require('./Report/reportSchema');
const ReportAccommodation = require('./Report/reportAccommodationSchema');
const ReportFilter = require('./Report/reportFilterSchema');
const ReportFilterValue = require('./Report/reportFilterValuesSchema');
const FilterValueAccommodation = require('./Report/filterValueAccommodationSchema');

async function generateReport() {
  // Connect to the database
  await connect();

  // Set up the PDF document
  const doc = new PDFDocument();
  const reportName = 'Accommodation Report';
  doc.pipe(fs.createWriteStream(`${reportName}.pdf`));

  // Define the filters to be applied to the accommodations
  const filters = [
    { filterName: 'Price Range', filterValues: ['5000-10000', '10000-15000'] },
    { filterName: 'Location', filterValues: ['within campus'] },
    { filterName: 'Landmarks', filterValues: ['near gym', 'near library'] },
  ];

  // Build the Mongoose query to retrieve the accommodations based on the filters
  const query = {
    $and: [
      { price_min: { $gte: 5000, $lte: 15000 } },
      { location: { $eq: 'within campus' } },
      { landmarks: { $in: ['near gym', 'near library'] } },
    ]
  };

  try {
    const accommodations = await Accommodation.find(query).populate('owner_id', 'email');

    // Create a new report document in the database
    const report = new Report({
      user_id: mongoose.Types.ObjectId('123456789012'), // Replace with actual user ID
      report_name: reportName,
      report_file: `${reportName}.pdf`,
    });
    await report.save();

    // Add the accommodations to the report
    await Promise.all(accommodations.map(async (accommodation) => {
      const reportAccommodation = neweportAccommodation({
        report_id: report._id,
        accommodation_id: accommodation._id,
        price: accommodation.price_min,
        location: accommodation.location,
        landmarks: accommodation.landmarks,
        owner_email: accommodation.owner_id.email,
      });
      await reportAccommodation.save();
    }));
    // Add the filter values used to the report
    await Promise.all(filters.map(async (filter) => {
      const reportFilter = new ReportFilter({
        report_id: report._id,
        filter_name: filter.filterName,
      });
      await reportFilter.save();

      await Promise.all(filter.filterValues.map(async (value) => {
        const reportFilterValue = new ReportFilterValue({
          report_filter_id: reportFilter._id,
          value,
        });
        await reportFilterValue.save();

        // Add the accommodations that matched this filter value to the report filter value
        const filterValueAccommodations = accommodations.filter(accommodation =>
          accommodation[reportFilter.filter_name.toLowerCase()].includes(value),
        );
        await Promise.all(filterValueAccommodations.map(async (accommodation) => {
          const filterValueAccommodation = new FilterValueAccommodation({
            report_filter_value_id: reportFilterValue._id,
            accommodation_id: accommodation._id,
          });
          await filterValueAccommodation.save();
        }));
      }));
    }));

    // Generate the report
    doc.fontSize(20).text(reportName, { align: 'center' }).moveDown();
    accommodations.forEach((accommodation, index) => {
      doc.fontSize(14).text(`Accommodation ${index + 1}`).moveDown();
      doc.fontSize(12).text(`Price: ${accommodation.price_min}`).moveDown();
      doc.fontSize(12).text(`Location: ${accommodation.location}`).moveDown();
      doc.fontSize(12).text(`Landmarks: ${accommodation.landmarks.join(', ')}`).moveDown();
      doc.fontSize(12).text(`Owner email: ${accommodation.owner_id.email}`).moveDown();
      doc.moveDown();
    });
    doc.end();

    console.log('Report generated successfully!');
  } catch (err) {
    console.error('Could not generate report...', err);
  } finally {
    mongoose.disconnect();
  }
}

generateReport();
