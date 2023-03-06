import React from "react";

import { Worker } from '@react-pdf-viewer/core' ;  

// Import the styles provided by the react-pdf-viewer packages
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// SEO
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo-config";

// FONT POPPINS
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
</style>

// STYLES
import '../styles/globalStyles.css';

// Modal.setAppElements("#root");


function MyApp({ Component, pageProps }) {
  return (
    <>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        < Worker workerUrl = "https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js" > ... </ Worker >
        </>
    )
}

export default MyApp;