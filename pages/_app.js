import React from "react";

// SEO
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo-config";

// FONT POPPINS
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
</style>

// STYLES
import '../styles/globalStyles.css';


function MyApp({ Component, pageProps }) {
    return (
        <>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        </>
    )
}

export default MyApp;