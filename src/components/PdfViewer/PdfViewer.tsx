import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import styles from "./PdfViewer.module.scss";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  url: string;
}
const url =
  "https://firebasestorage.googleapis.com/v0/b/YourPROJECT_ID.appspot.com/o/4.40-TYBSC-Syllabus-Computer-Science-2018-19.pdf?alt=media&token=be6cb733-98db-4d34-9b6e-592a070f2686";

const PdfViewer = ({ url }: Props) => {
  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className={styles.pdfBox}
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
        <div className={styles.actionBtns}>
          <button disabled={pageNumber == 1 ? true : false}>
            <i
              className="fa-regular fa-chevron-left"
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
            ></i>
          </button>
          <button disabled={pageNumber == numPages ? true : false}>
            {" "}
            <i
              className="fa-regular fa-chevron-right"
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            ></i>
          </button>
        </div>
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </>
  );
};

export default PdfViewer;
