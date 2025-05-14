import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss'],
})
export class TaskFiltersComponent {
  name = '';
  date = '';
  status = '';

  @Output() filtersChanged = new EventEmitter<{
    name: string;
    date: string;
    status: string;
  }>();

  emitFilters() {
    this.filtersChanged.emit({
      name: this.name,
      date: this.date,
      status: this.status,
    });
  }
}
