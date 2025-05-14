import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFiltersComponent } from './components/task-filters/task-filters.component';
import { NgIf, NgFor } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatDialogModule,
    AddTaskModalComponent,
    TaskItemComponent,
    TaskFiltersComponent,
    PaginationComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected tasks = [
    {
      name: 'Zrobić zakupy spożywcze',
      status: 'Completed',
      date: '2025-05-01',
      description: 'Muszę kupić mleko, mąkę i jajka.',
      showDescription: false,
    },
    {
      name: 'Opłacić rachunki',
      status: 'Pending',
      date: '2025-05-10',
      description: 'Tylko nie odkładaj tego na inny dzień!',
      showDescription: false,
    },
    {
      name: 'Urodziny mamy',
      status: 'Pending',
      date: '2025-05-15',
      description: 'Kupić kwiaty i tort.',
      showDescription: false,
    },
  ];

  constructor(private dialog: MatDialog) {}

  public filters = {
    name: '',
    date: '',
    status: '',
  };
  get filteredTasks() {
    return this.tasks.filter((task) => {
      const nameMatch = task.name
        .toLowerCase()
        .includes(this.filters.name.toLowerCase());

      const dateMatch =
        !this.filters.date ||
        this.normalizeDate(task.date) === this.filters.date;

      const statusMatch =
        !this.filters.status || task.status === this.filters.status;

      return nameMatch && dateMatch && statusMatch;
    });
  }

  public currentPage: number = 1;
  public pageSize: number = 5;

  get pagedTasks() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredTasks.slice(start, end);
  }
  get totalPages() {
    return Math.ceil(this.filteredTasks.length / this.pageSize);
  }

  normalizeDate(dateStr: string): string {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleCompleted(task: any) {
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
  }

  toggleDescription(task: any) {
    task.showDescription = !task.showDescription;
  }

  onFiltersChanged(filters: { name: string; date: string; status: string }) {
    this.filters = filters;
  }

  onPageChanged(page: number) {
    this.currentPage = page;
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.push({
          name: result.name,
          date: result.date,
          description: result.description,
          status: 'Pending',
          showDescription: false,
        });
      }
    });
  }
}
