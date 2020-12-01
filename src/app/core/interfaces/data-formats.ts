export interface IProductDataFormat {
  id: number;
  name: string;
  brand: string;
  price: number;
  mainImage: string;
  images: string[];
}

export interface ICategoryFormat {
  id: number;
  name: string;
}

export interface IProductResponceFormat {
  data: IProductDataFormat[];
  paging: {
    records: number;
    limit: number;
    offset: number;
  };
}
