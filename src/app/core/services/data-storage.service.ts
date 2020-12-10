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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/poco-x3.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/redmi-note-9.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/redmi-note-9s.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/redmi-note-9-pro.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/mix-alpha.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/iphone-se.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/iphone-6s.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/iphone-x.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/iphone-11-pro.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/iphone-12-mini.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/iphone-12-pro.png',
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
        category: {
          id: 1,
          name: 'Phones',
        },
        mainImage: './../../assets/images/phones/iphone-12-pro-max.png',
        images: [
          '',
          '',
        ],
      },
    ];

    const tablets: IProductDataFormat[] = [
      {
        id: 13,
        name: 'iPad Pro 12.9"',
        brand: 'Apple',
        price: 99999,
        category: {
          id: 2,
          name: 'Tablets',
        },
        mainImage: './../../assets/images/tablets/ipad-pro-12,9.jpg',
        images: [
          '',
          '',
        ],
      },
      {
        id: 14,
        name: 'iPad Air 10.5"',
        brand: 'Apple',
        price: 79999,
        category: {
          id: 2,
          name: 'Tablets',
        },
        mainImage: './../../assets/images/tablets/ipad-air-10,5.jpg',
        images: [
          '',
          '',
        ],
      },
      {
        id: 15,
        name: 'iPad Mini 2019"',
        brand: 'Apple',
        price: 29999,
        category: {
          id: 2,
          name: 'Tablets',
        },
        mainImage: './../../assets/images/tablets/ipad-mini-2019.jpg',
        images: [
          '',
          '',
        ],
      },
    ];

    const laptops: IProductDataFormat[] = [
      {
        id: 16,
        name: 'Apple MacBook Air 13.3" 2019',
        brand: 'Apple',
        price: 89999,
        category: {
          id: 3,
          name: 'Laptops',
        },
        mainImage: './../../assets/images/laptops/macbook-13-2019.jpg',
        images: [
          '',
          '',
        ],
      },
      {
        id: 17,
        name: 'Apple MacBook Pro 13.3" M1',
        brand: 'Apple',
        price: 129999,
        category: {
          id: 3,
          name: 'Laptops',
        },
        mainImage: './../../assets/images/laptops/macbook-13-m1.jpg',
        images: [
          '',
          '',
        ],
      },
      {
        id: 18,
        name: 'Apple MacBook Pro 16"',
        brand: 'Apple',
        price: 99999,
        category: {
          id: 3,
          name: 'Laptops',
        },
        mainImage: './../../assets/images/laptops/macbook-16-2019.jpg',
        images: [
          '',
          '',
        ],
      },
    ];

    return { categories, phones, tablets, laptops };
  }

}
