export interface IProductDataFormat {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: ICategoryFormat;
  mainImage: string;
  images: string[];
  isInCart: boolean;
  isInWishlist: boolean;
}

export interface ICategoryFormat {
  id: number;
  name: string;
}

export interface IProductResponseFormat {
  data: IProductDataFormat[];
  paging: {
    records: number;
    limit: number;
    offset: number;
  };
}

export interface ICartItemFormat extends IProductDataFormat {
  quantity: number;
  totalPrice: number;
}

export interface ICartResponseFormat {
  items: ICartItemFormat[];
  totalPrice: number;
}
