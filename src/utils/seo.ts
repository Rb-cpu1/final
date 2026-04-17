export const SEO = {
  title: "Portal do Governo de Moçambique | Apoio ao Empreendedorismo",
  description: "Portal Oficial do Programa de Apoio ao Micro-Empreendedorismo do Governo de Moçambique. Acesso a financiamento para micro, pequenas e médias empresas.",
  keywords: [
    "empreendedorismo",
    "empresas",
    "financiamento",
    "empréstimo",
    "governo de Moçambique",
    "MPMEs",
    "microempresas",
    "pequenas empresas",
    "médias empresas",
    "economia",
    "desenvolvimento económico"
  ],
  author: "Governo de Moçambique",
  url: "https://seu-dominio.com",
  ogImage: "/logo-governo-oficial",
  twitterCard: "summary_large_image",
  twitterHandle: "@govmz"
};

export const generateMetaTags = () => {
  const { title, description, keywords, author, url, ogImage, twitterCard, twitterHandle } = SEO;
  
  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords.join(', ')}">
    <meta name="author" content="${author}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${url}${ogImage}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${title}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="${twitterCard}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${url}${ogImage}">
    <meta name="twitter:site" content="${twitterHandle}">
    
    <!-- Additional meta tags -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <link rel="canonical" href="${url}">
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
  `;
};