import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css'],
})
export class SearchProductsComponent implements OnInit {
  resData: any = [];
  searchProducts: ProductModel[] = [];

  constructor(
    private procuctServices: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    /// Search Prducts by query in search at home page

    /// Get query from paramMap

    let query = this.activatedRoute.snapshot.paramMap.get('query');

    /// If query is not null then search products by query input word

    query &&
      this.procuctServices.searchByQuery(query).subscribe((res) => {
        this.resData = res;
        if (!this.resData) {
          console.log('No Products');
        }
        this.searchProducts = this.resData.Products;
      });
  }
}
