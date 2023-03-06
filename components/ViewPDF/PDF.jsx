import React, { useState, useRef } from 'react'


import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PDF() {

  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  
  const newplugin = defaultLayoutPlugin()
  
  const fileType = ["application/pdf"];
  function handleChangePdf(e) {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        setPdfFile(null);
      }
    } else {
      console.log("Please select pdf");
    }
  }

  function handleSubmitPdf(e) {
    e.preventDefault();

    console.log('Hello! PDF');

    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setPdfFile(pdfFile);
    }
  }

  return (
    <div>
      <form className="input-pdf" onSubmit={handleSubmitPdf}>
        <button type="submit">
          View PDF
        </button>
        <input onChange={handleChangePdf} />
      </form>
      <h2>view PDF</h2>
      <div className="viewer-pdf">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
          {viewPdf 
          && 
          <>
            <Viewer fileUrl={viewPdf} plugins={[newplugin]} />  
          </>
          }
          {!viewPdf && <>No DPF</>}
        </Worker>
      </div>
    </div>
  )
}
