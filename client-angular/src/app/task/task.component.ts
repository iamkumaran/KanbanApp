import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: any;
  @Input() boardId: any;
  payload: object;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  editFocus (e) {
    e.target.closest('.dd-item').querySelector('.title').focus();
  }

  updateTask (e) {
    e.target.blur();
    let newTitle = e.target.innerText.trim()
    if (!newTitle || this.task.title === newTitle) {
      e.target.innerText = this.task.title
      return false
    }
    this.dataService.updateTask({ boardId: this.boardId, taskId: this.task._id, newTitle: newTitle })
  }

  deleteTask () {
    this.dataService.deleteTask({ boardId: this.boardId, taskId: this.task._id })
  }

}
