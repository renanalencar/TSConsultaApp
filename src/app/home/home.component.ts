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
  selectedOption: string;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  names: string[];

  constructor(private usersService: UsersService) {
    this.usersService.getAllUsers().subscribe(data => {
      this.allUsers = data;
      this.names = this.allUsers.map(x => x.name);
      console.log('Names: ', this.names);
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
    console.warn('teste');
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(option => option.toLowerCase().includes(filterValue));
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
    this.selectedOption = '';
  }
}
