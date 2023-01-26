import {
  degrees,
  PDFDocument,
  PDFPage,
  PDFPageDrawImageOptions,
} from "pdf-lib";

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
      scaleOptions = { width: 40, height: (110 * 40) / 40 };
    }
    page.drawImage(newImg, {
      rotate: degrees(-90),
      ...options,
      ...scaleOptions,
    });
  }
};
