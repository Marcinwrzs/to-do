import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: any = {};
  @Input() toggleCompleted!: (task: any) => void;
  @Input() toggleDescription!: (task: any) => void;

  get formattedDate(): string {
    const d = new Date(this.task.date);
    return d.toLocaleDateString('pl-PL').replace(/\./g, '-').replace(/\s/g, '');
  }
}
