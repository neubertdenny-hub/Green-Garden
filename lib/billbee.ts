interface BillbeeProduct {
  Id: string;
  SKU: string;
  Title: Array<{ Text: string; LanguageCode: string }>;
  Price: number;
  VatIndex: number;
  StockCurrent: number;
  Images?: Array<{ Url: string }>;
}

interface BillbeeApiResponse {
  Data: BillbeeProduct[];
  Paging: {
    Page: number;
    TotalPages: number;
    TotalRows: number;
    PageSize: number;
  };
  ErrorCode: number;
  ErrorMessage: string | null;
}

class BilbeeClient {
  private baseUrl = 'https://api.billbee.io/api/v1';
  private username = process.env.BILLBEE_USERNAME;
  private password = process.env.BILLBEE_PASSWORD;
  private apiKey = process.env.BILLBEE_API_KEY;

  async getProductBySku(sku: string): Promise<BillbeeProduct | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/products?sku=${encodeURIComponent(sku)}&pageSize=1`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        console.error(`Billbee API error: ${response.status}`);
        return null;
      }

      const data = (await response.json()) as BillbeeApiResponse;

      if (data.ErrorCode !== 0) {
        console.error(`Billbee API error: ${data.ErrorMessage}`);
        return null;
      }

      if (!data.Data || data.Data.length === 0) {
        return null;
      }

      return data.Data[0];
    } catch (error) {
      console.error('Error fetching product from Billbee:', error);
      return null;
    }
  }

  async getProducts(pageIndex = 1, pageSize = 100): Promise<BillbeeProduct[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/products?page=${pageIndex}&pageSize=${pageSize}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        console.error(`Billbee API error: ${response.status}`);
        return [];
      }

      const data = (await response.json()) as BillbeeApiResponse;
      return data.Data || [];
    } catch (error) {
      console.error('Error fetching products from Billbee:', error);
      return [];
    }
  }

  private getAuthHeaders(): HeadersInit {
    const auth = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    return {
      'Authorization': `Basic ${auth}`,
      'X-Billbee-Api-Key': this.apiKey || '',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }
}

export function calculatePrice(
  product: BillbeeProduct,
  quantity: number
): { unitPrice: number; totalPrice: number; discount: number } {
  let unitPrice = product.Price;
  let discount = 0;

  // Volume discount: 15+ pieces = 10% discount
  if (quantity >= 15) {
    unitPrice = product.Price * 0.9;
    discount = (product.Price - unitPrice) * quantity;
  }

  const totalPrice = unitPrice * quantity;

  return {
    unitPrice,
    totalPrice,
    discount,
  };
}

export default BilbeeClient;
