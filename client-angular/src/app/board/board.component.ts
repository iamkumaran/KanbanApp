import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: any;
  addTaskInput: string;
  showForm: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.showForm = false;
  }

  showAddForm(e) {
    this.showForm = true
    setTimeout(function () {
      e.path[2].querySelector('.add-board-form input').focus();
    }.bind(this), 100)
  }

  addTask (e) {
    // e.preventDefault();
    if (!this.addTaskInput) {
      e.path[2].querySelector('.add-board-form input').focus();
      return false;
    }
    this.dataService.addTask({boardId: this.board._id, taskName: this.addTaskInput});
    this.showForm = false;
  }

  updateBoard (e) {
    e.target.blur();
    let newTitle = e.target.innerText.trim()
    if (!newTitle || this.board.name === newTitle) {
      e.target.innerText = this.board.name
      return false
    }

    this.dataService.updateBoard({ boardId: this.board._id, newTitle: newTitle })
  }

  deleteBoard () {
    this.dataService.removeBoard({boardId: this.board._id})
  }

}
