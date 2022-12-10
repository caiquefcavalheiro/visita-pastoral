import { PDFDocument, PDFPage, PDFPageDrawImageOptions } from "pdf-lib";

type drawImageProps = {
  pdfDoc: PDFDocument;
  img?: string;
  page: PDFPage;
  options: PDFPageDrawImageOptions;
  scale?: number;
};

export const drawImage = async ({
  pdfDoc,
  img,
  page,
  options,
  scale,
}: drawImageProps) => {
  if (img) {
    const newImg = await pdfDoc.embedPng(img);
    let scaleOptions = {};
    if (scale) {
      const { width, height } = newImg.scale(scale);

      scaleOptions = { width, height };
    }
    page.drawImage(newImg, { ...options, ...scaleOptions });
  }
};
