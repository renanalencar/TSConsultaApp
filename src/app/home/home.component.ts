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

  users: User[];
  allUsers: any[];
  selectedUser: number;
  user: User;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private usersService: UsersService) {
    this.usersService.getAllUsers().subscribe(data => this.allUsers = data);
  }

  ngOnInit(): void {
    // this.users = this.usersService.getUsers();
    // this.usersService.getAllUsers().subscribe(data => this.allUsers = data);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onEditClick(user: any) {
    // console.log('skill name', user);
    // console.log('selectedUser', this.selectedUser);
    this.usersService.getUser(this.selectedUser).subscribe(data => { this.user = data; });
    // console.log('User', this.user);
  }

  closeCard() {
    this.user = null;
  }
}
