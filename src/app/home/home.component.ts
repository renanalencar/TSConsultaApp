import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allUsers: any[];
  user: User;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private usersService: UsersService) {
    this.usersService.getAllUsers().subscribe(data => this.allUsers = data);
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  filter(value: string): string[] {
    if (this.allUsers != null) {
      return this.allUsers.map(x => x.name).filter(option =>
        option.toLowerCase().includes(value.toLowerCase()));
    }
    return null;
  }

  getId(name: string): number {
    return this.allUsers.find(user => user.name === name).id;
  }

  onEditClick(name: any) {
    const id = this.getId(name);
    this.usersService.getUser(id).subscribe(data => { this.user = data; });
  }

  closeCard() {
    this.user = null;
  }
}
