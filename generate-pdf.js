import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 14;

  const text = `
John Doe
Software Engineer

Experience:
- 5 years of experience in full-stack web development using React and Node.js.
- Developed scalable microservices in Go.
- Passionate about building great user experiences.

Education:
- B.S. in Computer Science from Example University.
  `;

  page.drawText(text, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.1, 0.4),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('sample-resume.pdf', pdfBytes);
}

createPdf().then(() => console.log('PDF created!'));
