import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { faBox } from '@fortawesome/free-solid-svg-icons';

import { ProductService } from '../../auth/product.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { ProductsFormModalComponent } from '../products-form-modal/products-form-modal.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TopbarComponent,
    StatsCardsComponent,
    ProductsTableComponent,
    ProductsFormModalComponent,
  ],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  private productService = inject(ProductService);

  products: any[] = [];
  stats: { label: string; value: number; icon: any; color: string }[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  search = {
    name: '',
    type: ''
  };

  modalVisible = false;
  modalIsEdit = false;
  modalInitialData: any = null;

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchProductStats();
  }

  fetchProducts(page = 0) {
    this.productService.getProducts(page, this.size).subscribe(res => {
      this.products = res.content;
      this.page = res.page;
      this.totalPages = res.totalPages;
    });
  }

  fetchProductStats() {
    this.productService.getProductStats().subscribe(stats => {
      this.stats = [
        { label: 'Total Productos', value: stats.total, icon: faBox, color: 'text-blue-500' },
        { label: 'Tipos Únicos', value: stats.tiposUnicos, icon: faBox, color: 'text-green-500' },
        { 
          label: 'Precio Promedio', 
          value: this.truncateTo2Decimals(stats.precioPromedio), 
          icon: faBox, 
          color: 'text-purple-500' 
        },
      ];
    });
  }

  truncateTo2Decimals(num: number): number {
    return Math.trunc(num * 100) / 100;
  }

  openNewProductForm() {
    this.modalIsEdit = false;
    this.modalInitialData = null;
    this.modalVisible = true;
  }

  editProduct(product: any) {
    this.modalIsEdit = true;
    this.modalInitialData = { ...product };
    this.modalVisible = true;
  }

  handleModalClose() {
    this.modalVisible = false;
    this.modalInitialData = null;
  }

  handleModalSubmit(data: any) {
    if (this.modalIsEdit && this.modalInitialData) {
      this.productService.updateProduct(this.modalInitialData.id, data).subscribe(() => {
        Swal.fire('Actualizado', 'Producto actualizado correctamente', 'success');
        this.fetchProducts();
        this.fetchProductStats();
      });
    } else {
      this.productService.createProduct(data).subscribe(() => {
        Swal.fire('Éxito', 'Producto creado correctamente', 'success');
        this.fetchProducts();
        this.fetchProductStats();
      });
    }
    this.modalVisible = false;
    this.modalInitialData = null;
  }

  handleDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el producto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          Swal.fire('Eliminado', 'Producto eliminado correctamente', 'success');
          this.fetchProducts();
          this.fetchProductStats();
        });
      }
    });
  }

  onSearch(event: Event) {
    event.preventDefault();
    this.productService.searchProducts(this.search, this.page, this.size).subscribe(res => {
      this.products = res.content;
      this.page = res.page;
      this.totalPages = res.totalPages;
    });
  }

  resetSearch() {
    this.search = { name: '', type: '' };
    this.fetchProducts();
  }
}