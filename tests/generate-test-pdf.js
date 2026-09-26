const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createTestPDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  page.drawText('CLINICAL DISCHARGE & DEATH SUMMARY', { x: 50, y: 750, size: 16 });
  page.drawText('Patient: Rahul Deshmukh', { x: 50, y: 720, size: 12 });
  page.drawText('Age: 45 | Gender: Male', { x: 50, y: 700, size: 12 });
  page.drawText('Hospital: Apollo Hospital, Mumbai', { x: 50, y: 680, size: 12 });
  page.drawText('Admission Date: 2024-01-10', { x: 50, y: 660, size: 12 });
  page.drawText('Discharge Date: 2024-01-20', { x: 50, y: 640, size: 12 });
  page.drawText('', { x: 50, y: 620, size: 12 });
  page.drawText('DIAGNOSIS:', { x: 50, y: 600, size: 12 });
  page.drawText('1. Acute Myocardial Infarction (STEMI)', { x: 70, y: 580, size: 12 });
  page.drawText('2. Delayed Treatment - ECG performed 6 hours post-admission', { x: 70, y: 560, size: 12 });
  page.drawText('3. Permanent Cardiac Dysfunction (LVEF 30%)', { x: 70, y: 540, size: 12 });
  page.drawText('', { x: 50, y: 520, size: 12 });
  page.drawText('TREATMENT GIVEN:', { x: 50, y: 500, size: 12 });
  page.drawText('- Aspirin 300mg, Clopidogrel 75mg', { x: 70, y: 480, size: 12 });
  page.drawText('- Heparin infusion', { x: 70, y: 460, size: 12 });
  page.drawText('- Delayed thrombolysis (administered 8 hours post-symptom onset)', { x: 70, y: 440, size: 12 });
  page.drawText('', { x: 50, y: 420, size: 12 });
  page.drawText('CONDITION AT DISCHARGE:', { x: 50, y: 400, size: 12 });
  page.drawText('Stable but with permanent left ventricular dysfunction.', { x: 70, y: 380, size: 12 });
  page.drawText('Requires lifelong cardiac medication and follow-up.', { x: 70, y: 360, size: 12 });
  page.drawText('', { x: 50, y: 340, size: 12 });
  page.drawText('Dr. A. Kumar (MMC-12345)', { x: 50, y: 320, size: 12 });
  page.drawText('Consultant Cardiologist', { x: 50, y: 300, size: 12 });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'fixtures', 'test-document.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Test PDF created at:', outputPath);
}

createTestPDF().catch(console.error);