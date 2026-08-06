export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  basePrice: number;
  image?: string;
  description: string;
  inStock: boolean;
}

// 16 Unique Produkte - Billbee bereinigt, shop-gerechte Titel
export const products: Product[] = [
  {
    id: '1',
    sku: 'IN-Y5CY-G7RS',
    name: 'Wassertest-Tabletten 100er Set (pH + Chlor)',
    category: 'Wassertests',
    price: 9.97,
    basePrice: 9.97,
    image: 'https://images.pexels.com/photos/3826487/pexels-photo-3826487.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Genaue Wasseranalyse für optimale Poolchemie - schnell und zuverlässig',
    inStock: false,
  },
  {
    id: '2',
    sku: '2P-7TGB-F6W0',
    name: 'Gaming Mousepad XXL - Premium Oberfläche',
    category: 'Gaming',
    price: 7.99,
    basePrice: 7.99,
    image: undefined,
    description: 'Ergonomisches Gaming Zubehör - komfortabel und präzise',
    inStock: true,
  },
  {
    id: '3',
    sku: '64-7W5Q-EH06',
    name: 'Pfefferspray 40ml - 5m Reichweite',
    category: 'Selbstverteidigung',
    price: 10.97,
    basePrice: 10.97,
    image: undefined,
    description: 'Zuverlässiger Schutz für Ihre Sicherheit - wirksam und einfach anzuwenden',
    inStock: false,
  },
  {
    id: '4',
    sku: 'IN-282H-9RE1',
    name: 'Tiefengrund Entferner 50ml',
    category: 'Sonstiges',
    price: 17.97,
    basePrice: 17.97,
    image: 'https://m.media-amazon.com/images/I/41g5NBC5dNL.jpg',
    description: 'Qualitätsprodukt mit hohem Standard - zuverlässig und langlebig',
    inStock: false,
  },
  {
    id: '5',
    sku: '05-KG8C-RQ36',
    name: 'Herdanschlussdose - Flache Bauweise 12mm',
    category: 'Elektrozubehör',
    price: 8.97,
    basePrice: 8.97,
    image: 'https://m.media-amazon.com/images/I/41yJtuYNdKS.jpg',
    description: 'Hochwertiges Elektrozubehör - sicher und zuverlässig',
    inStock: false,
  },
  {
    id: '6',
    sku: '7E-686C-MHFG',
    name: 'Tomatentopf 29cm mit Wasserspeicher',
    category: 'Sonstiges',
    price: 25.97,
    basePrice: 25.97,
    image: 'https://images.pexels.com/photos/4196604/pexels-photo-4196604.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Qualitätsprodukt mit hohem Standard - zuverlässig und langlebig',
    inStock: false,
  },
  {
    id: '7',
    sku: '7O-VQCV-LY1N',
    name: 'Küchenanschlussbox 2-fach mit 1m Kabel',
    category: 'Elektrozubehör',
    price: 40.97,
    basePrice: 40.97,
    image: undefined,
    description: 'Hochwertiges Elektrozubehör - sicher und zuverlässig',
    inStock: false,
  },
  {
    id: '8',
    sku: 'B4-1DKB-QU0R',
    name: 'Stranger Things Logo-Leuchte',
    category: 'Sonstiges',
    price: 9.99,
    basePrice: 9.99,
    image: undefined,
    description: 'Qualitätsprodukt mit hohem Standard - zuverlässig und langlebig',
    inStock: false,
  },
  {
    id: '9',
    sku: 'F3-0F4C-6S4O',
    name: 'Poolpflege Konzentrat 2L - 3in1',
    category: 'Poolpflege',
    price: 19.97,
    basePrice: 19.97,
    image: 'https://images.pexels.com/photos/3826487/pexels-photo-3826487.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Kristallklares Poolwasser leicht gemacht - wirksam und zuverlässig',
    inStock: false,
  },
  {
    id: '10',
    sku: 'F6-QC1D-YB3G',
    name: 'Pfefferspray 2er Pack - 40ml',
    category: 'Selbstverteidigung',
    price: 18.97,
    basePrice: 18.97,
    image: undefined,
    description: 'Zuverlässiger Schutz für Ihre Sicherheit - wirksam und einfach anzuwenden',
    inStock: false,
  },
  {
    id: '11',
    sku: '47-9BMA-FPJ7',
    name: 'PoolLab 2.0 - Digitales Wassertestgerät',
    category: 'Wassertests',
    price: 149.00,
    basePrice: 149.00,
    image: 'https://images.pexels.com/photos/3826487/pexels-photo-3826487.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Genaue Wasseranalyse für optimale Poolchemie - schnell und zuverlässig',
    inStock: false,
  },
  {
    id: '12',
    sku: 'HR-BV3P-DRBM',
    name: 'Reparaturrasen 1kg mit Dünger',
    category: 'Rasensamen',
    price: 12.97,
    basePrice: 12.97,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium Rasensamen für schnelle Reparatur - ideal für kahle Stellen',
    inStock: false,
  },
  {
    id: '13',
    sku: 'NN-IK54-4FG4',
    name: 'Premium Rasensamen 2kg - Schnellkeimend',
    category: 'Rasensamen',
    price: 19.97,
    basePrice: 19.97,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium Rasensamen für einen dichten, grünen Rasen - schnellkeimend',
    inStock: false,
  },
  {
    id: '14',
    sku: 'OX-BI7C-LGGF',
    name: 'Turbo Nachsaatrasen 1kg',
    category: 'Rasensamen',
    price: 14.97,
    basePrice: 14.97,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Schnellkeimender Rasen für intensive Nachsaat - extra kraftvoll',
    inStock: false,
  },
  {
    id: '15',
    sku: 'OZ-5L9K-FQEA',
    name: 'Premium Rosenbogen 240x140cm',
    category: 'Rankgerüste',
    price: 18.97,
    basePrice: 18.97,
    image: 'https://images.pexels.com/photos/1618178/pexels-photo-1618178.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Hochwertiger Rankgerüst für Kletterpflanzen - stabil und wetterfest',
    inStock: false,
  },
  {
    id: '16',
    sku: 'QA-WCS1-UOCO',
    name: 'Küchenanschlussbox 2-fach mit 2m Kabel',
    category: 'Elektrozubehör',
    price: 46.97,
    basePrice: 46.97,
    image: undefined,
    description: 'Hochwertiges Elektrozubehör - sicher und zuverlässig',
    inStock: false,
  },
];

export function getProductBySku(sku: string | undefined): Product | undefined {
  if (!sku) return undefined;
  return products.find(p => p.sku?.toUpperCase() === sku.toUpperCase());
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories).sort();
}

export interface PriceResult {
  unitPrice: number;
  totalPrice: number;
  discount: number;
}

export function getProductPrice(product: Product, quantity: number): PriceResult {
  const basePrice = product.basePrice;

  // Staffelrabatt: ab 15 Stück 10%
  const discountPercentage = quantity >= 15 ? 10 : 0;
  const unitPrice = basePrice * (1 - discountPercentage / 100);
  const discount = (basePrice - unitPrice) * quantity;
  const totalPrice = unitPrice * quantity;

  return {
    unitPrice,
    totalPrice,
    discount,
  };
}
