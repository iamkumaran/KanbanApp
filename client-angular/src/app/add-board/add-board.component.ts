import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }

  addBoard (e, type) {
    let inputElem = (type === 'submit') ? e.target.closest('.kanban.new').querySelector('.kanban_title') : e.target;
    let newTitle = inputElem.innerText.trim()
    if (!newTitle) {
      inputElem.focus();
      return false
    }

    this.dataService.addBoard({ boardName: newTitle });
    setTimeout(function(){
      inputElem.innerHTML = '';
    }, 100)
  }

}
