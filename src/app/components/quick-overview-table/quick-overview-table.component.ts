import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../auth/client.service';

@Component({
  selector: 'app-quick-overview-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quick-overview-table.component.html',
})
export class QuickOverviewTableComponent implements OnInit {
  private clientService = inject(ClientService);
  latestClients: any[] = [];

  ngOnInit() {
    this.clientService.getLastClients().subscribe(res => this.latestClients = res.content);
  }
}
