import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

const siteUrl = 'https://www.xn--sveabilarochdck-dlb.se';

export default function SEO({
  title,
  description,
  path,
  noIndex = false,
}: SEOProps) {
  const canonicalUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title} | Sveabilar och Däck</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {noIndex && (
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      )}

      <meta
        property="og:title"
        content={`${title} | Sveabilar och Däck`}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="Sveabilar och Däck"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />
    </Helmet>
  );
}