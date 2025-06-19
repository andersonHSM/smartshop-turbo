export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  embedding: number[];
  similarity: number;
}
