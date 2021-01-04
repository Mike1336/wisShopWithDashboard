// import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';

// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

// import { IProductDataFormat } from 'src/app/core/interfaces/data-formats';
// import { CartService } from 'src/app/core/services/cart.service';
// import { WishlistService } from 'src/app/core/services/wishlist.service';
// import { ItemDetailsComponent } from 'src/app/layouts/item-details/components/item-details.component';
// import { DeleteConfirmingComponent } from 'src/app/main/cart/components/delete-confirming/delete-confirming.component';

// @Component({
//   selector: 'app-wishlist',
//   templateUrl: './wishlist.container.html',
//   styleUrls: ['./wishlist.container.scss']
// })
// export class WishlistContainer implements OnInit, OnDestroy {

//   private _destroy$ = new Subject<void>();

//   constructor(
//     public dialog: MatDialog,
//     private _cartService: CartService,
//     private _wishlistService: WishlistService,
//     private _cdRef: ChangeDetectorRef,
//   ) { }

//   public get wishlist(): WishlistService {
//     return this._wishlistService;
//   }

//   public ngOnInit(): void {
//     this._listenWishlistChanges();
//   }

//   public ngOnDestroy(): void {
//     this._destroy$.next();
//     this._destroy$.complete();
//   }

//   public openDeleteConfirming(item: IProductDataFormat): void {
//   // отправление данных в компонент модалки после открытия
//     const confirmModal = this.dialog.open(DeleteConfirmingComponent, {
//       data: {
//         name: item.name,
//       },
//     });
//     confirmModal.afterClosed()
//       .pipe(
//         takeUntil(this._destroy$),
//         )
//       .subscribe((result) => { // получение данных после закрытия
//         if (!result) {
//           return;
//         }
//         // this.deleteItem(item);
//       });
//   }

//   public openItemDetails({ id, name, brand, price, mainImage, images }: IProductDataFormat): void {
//   // отправление данных в компонент модалки после открытия
//     this.dialog.open(ItemDetailsComponent, {
//       data: {
//         id,
//         name,
//         brand,
//         price,
//         mainImage,
//         images,
//       },
//     });
//   }

//   // public deleteItem(item: IProductDataFormat): void {
//   //   this.wishlist.updateList(item);
//   //   this._snackBar.open(`${name} was deleted from your favorites`, 'OK', {
//   //     duration: 2000,
//   //   });
//   // }

//   public checkInCart(item: IProductDataFormat): void {
//     // this.cart.updateList(item);

//     // if (this.cart.isExist(item)) {
//     //   this._snackBar.open(`${item.name} was successfully deleted from your cart`, 'OK', {
//     //     duration: 2000,
//     //   });

//     //   return;
//     // }
//     // this._snackBar.open(`${item.name} was successfully added to your cart`, 'OK', {
//     //   duration: 2000,
//     // });
//   }

//   // private _listenWishlistChanges(): void {
//   //   this.wishlist.change$
//   //     .pipe(
//   //       takeUntil(this._destroy$),
//   //     )
//   //     .subscribe(
//   //       () => {
//   //         this._cdRef.markForCheck();
//   //       },
//   //     );
//   // }

// }
