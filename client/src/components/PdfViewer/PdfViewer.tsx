import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import styles from "./PdfViewer.module.scss";
import IconButton from "../Utils/IconButton/IconButton";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  url: string;
  closeModal: () => void;
}

const PdfViewer = ({ url, closeModal }: Props) => {
  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  useEffect(() => {}, []);
  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <IconButton
          name="xmark"
          onClick={closeModal}
          style={{
            zIndex: "100",
            background: "transparent",
            position: "absolute",
            top: 0,
            right: 0,
          }}
          rounded
        />

        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className={styles.pdf}
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
          <div className={styles.pagination}>
            <IconButton
              name="chevron-left"
              disabled={pageNumber == 1 ? true : false}
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
            />
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <IconButton
              name="chevron-right"
              disabled={pageNumber == numPages ? true : false}
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            />
          </div>
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
