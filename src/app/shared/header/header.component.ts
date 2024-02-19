import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, map } from 'rxjs';
import { UserPerson } from '../../auth/interfaces/user-person.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject( AuthService );
  public user = computed(() => this.authService.currentUser() );
  public userPerson?: UserPerson;

  onLogout():void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.load().subscribe(() => {})
  }

  load(): Observable<null> {
    return this.authService.userPerson(this.user()!.id).pipe(
      map(data => {
        this.userPerson = data;
        return null;
      })
    );
  }
}
