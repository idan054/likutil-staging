// Add to existing types
export interface LineItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: string;
  total: string;
  image?: {
    src: string;
    alt: string;
  };
  permalink: string; // Add this field
  product_id: number;
}

export interface OrderSummary {
  id: number;
  status: string;
  total: string;
  line_items: LineItem[];
  billing: {
    first_name: string;
    last_name: string;
    city: string;
  };
  date_created: string;
  shipping_lines: Array<{
    method_title: string;
  }>;
}