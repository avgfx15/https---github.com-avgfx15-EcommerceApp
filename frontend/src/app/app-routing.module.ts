import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerAuthComponent },
  {
    path: 'sellerhome',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'selleraddproduct',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sellerproductlist',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sellerupdateproduct/:id',
    component: UpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:query',
    component: SearchProductsComponent,
  },
  {
    path: 'productdetails/:productId',
    component: ProductDetailsComponent,
  },
  { path: 'user', component: UserAuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
