import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ICategoryFormat, IProductDataFormat } from '../interfaces/data-formats';

@Injectable({
  providedIn: 'root',
})

export class DataStorageService implements InMemoryDbService {

  public createDb(): {} {
    const categories: ICategoryFormat[] = [
      {
        id: 1,
        name: 'Phones',
      },
      {
        id: 2,
        name: 'Tablets',
      },
      {
        id: 3,
        name: 'Laptops',
      },
    ];

    const phones: IProductDataFormat[] = [
      {
        id: 1,
        name: 'Xiaomi POCO X3',
        brand: 'Xiaomi',
        price: 19999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 2,
        name: 'Xiaomi Redmi Note 9',
        brand: 'Xiaomi',
        price: 12999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 3,
        name: 'Xiaomi Redmi Note 9S',
        brand: 'Xiaomi',
        price: 14999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 4,
        name: 'Xiaomi Redmi Note 9 Pro',
        brand: 'Xiaomi',
        price: 18999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 5,
        name: 'Xiaomi Mi Mix Alpha',
        brand: 'Xiaomi',
        price: 199990,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 6,
        name: 'Apple iPhone SE',
        brand: 'Apple',
        price: 19999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 7,
        name: 'Apple iPhone 6s',
        brand: 'Apple',
        price: 24999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 8,
        name: 'Apple iPhone X',
        brand: 'Apple',
        price: 39999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 9,
        name: 'Apple iPhone 11 Pro',
        brand: 'Apple',
        price: 79999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 10,
        name: 'Apple iPhone 12 Mini',
        brand: 'Apple',
        price: 69999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 11,
        name: 'Apple iPhone 12 Pro',
        brand: 'Apple',
        price: 79999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 12,
        name: 'Apple iPhone 12 Pro Max',
        brand: 'Apple',
        price: 99999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
    ];

    const tablets: IProductDataFormat[] = [
      {
        id: 1,
        name: 'iPad Pro 12.9"',
        brand: 'Apple',
        price: 99999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 2,
        name: 'iPad Air 10.5"',
        brand: 'Apple',
        price: 79999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 3,
        name: 'iPad Mini 4"',
        brand: 'Apple',
        price: 29999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
    ];

    const laptops: IProductDataFormat[] = [
      {
        id: 1,
        name: 'Lenovo ThinkPad T410',
        brand: 'Lenovo',
        price: 49999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 2,
        name: 'Lenovo ThinkPad T420',
        brand: 'Lenovo',
        price: 59999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 3,
        name: 'Apple MacBook Air 13"',
        brand: 'Apple',
        price: 79999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 4,
        name: 'Apple MacBook Pro 13"',
        brand: 'Apple',
        price: 89999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 5,
        name: 'Apple MacBook Air 16"',
        brand: 'Apple',
        price: 89999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
      {
        id: 6,
        name: 'Apple MacBook Pro 16"',
        brand: 'Apple',
        price: 99999,
        mainImage: '',
        images: [
          '',
          '',
        ],
      },
    ];

    return { categories, phones, tablets, laptops };
  }

}
