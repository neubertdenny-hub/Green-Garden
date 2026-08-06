import { Metadata } from 'next';
import { products, getProductBySku } from '@/lib/products';

interface Props {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params;
  const product = getProductBySku(sku);

  if (!product) {
    return { title: 'Produkt nicht gefunden' };
  }

  const url = `https://greengarden.de/shop/${product.sku}`;

  return {
    title: `${product.name} | GreenGarden Shop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      type: 'website',
      images: product.image
        ? [
            {
              url: product.image,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.image ? [product.image] : [],
    },
    keywords: [
      product.name,
      product.category,
      'GreenGarden',
      'Shop',
      'Online Bestellen',
      'Premium Qualität',
    ],
  };
}

export function generateStaticParams() {
  return products
    .filter((product) => product.sku)
    .map((product) => ({
      sku: product.sku,
    }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
