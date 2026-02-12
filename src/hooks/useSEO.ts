import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  schema?: Record<string, any>;
}

export const useSEO = ({
  title,
  description,
  keywords,
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url,
  type = "website",
  schema,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} — Reelcraft.store`;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      let element = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    updateMeta("description", description);
    if (keywords) {
      updateMeta("keywords", keywords);
    }

    // Open Graph tags
    updateMeta("og:title", `${title} — Reelcraft.store`, true);
    updateMeta("og:description", description, true);
    updateMeta("og:image", image, true);
    updateMeta("og:type", type, true);
    if (url) {
      updateMeta("og:url", url, true);
    }

    // Twitter tags
    updateMeta("twitter:title", `${title} — Reelcraft.store`);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href;

    // JSON-LD Schema
    if (schema) {
      let scriptElement = document.getElementById("schema-org-json-ld") as HTMLScriptElement;
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = "schema-org-json-ld";
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup is not needed here as we're just updating existing elements
    };
  }, [title, description, keywords, image, url, type, schema]);
};
