const title = "PN Clique Streaming";
const description =
  "O melhor site de streaming para sugestões de filmes e series.";

const SEO = {
  title,
  description,
  canonical: "https://pncliquestreaming.com",
  openGraph: {
    url: "https://pncliquestreaming.com",
    locale: 'pt_PT',
    title,
    type: 'Website',
    description,
    images: [
      {
        url: "https://pncliquestreaming.com/pncliquestreaming-image.png",
        width: 800,
        height: 600,
        alt: title,
        type: "image/png",
      },
    ],
    siteName: "PN Clique Streaming",
  },
};

export default SEO;