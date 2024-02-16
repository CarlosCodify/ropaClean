import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserPerson } from '../../auth/interfaces/user-person.interface';
import { Observable, map, switchMap } from 'rxjs';

interface menuItem{
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );
  public userPerson?: UserPerson;

  onLogout():void {
    this.authService.logout();
  }

  public menuItems: menuItem[] = [];

  ngOnInit(): void {
    this.load().subscribe(() => {
      console.log(this.userPerson);
      if (!this.userPerson) return;
      if (this.userPerson!.person.role === 'customer') {
        this.menuItems = [
          {
            label: 'Mis ordenes',
            icon: 'pi pi-fw pi-home',
            routerLink: 'customers/orders'
          },
          {
            label: 'Nueva orden',
            icon: 'pi pi-fw pi-home',
            routerLink: 'customers/order/new'
          },
        ];
      } else if (this.userPerson!.person.role === 'driver') {
        this.menuItems = [
          {
            label: 'Mis ordenes',
            icon: 'pi pi-fw pi-home',
            routerLink: 'drivers/orders'
          },
          {
            label: 'Nueva orden',
            icon: 'pi pi-fw pi-home',
            routerLink: 'drivers/new-orders'
          },
        ];
      } else if (this.userPerson!.person.role === 'admin') {
        this.menuItems = [
          {
            label: 'Dashboard',
            icon: 'mdi mdi-gauge',
            routerLink: 'home'
          },
          {
            label: 'Ordenes',
            icon: 'fa fa-list',
            routerLink: 'admin/orders'
          },
          {
            label: 'Conductores',
            icon: 'fa fa-drivers-license-o',
            routerLink: 'admin/drivers'
          },
          {
            label: 'Motos',
            icon: 'fa fa-motorcycle',
            routerLink: 'admin/motorcycles'
          },
        ];
      }else{
        this.menuItems = [
          {
            label: 'Mis ordenes',
            icon: 'fa fa-list',
            routerLink: 'customers/orders'
          },
          {
            label: 'Nueva orden',
            icon: 'fa fa-plus-square-o',
            routerLink: 'customers/order/new'
          },
          {
            label: 'Mis ordenes',
            icon: 'fa fa-list',
            routerLink: 'drivers/orders'
          },
          {
            label: 'Nuevas ordenes',
            icon: 'fa fa-plus-square-o',
            routerLink: 'drivers/new-orders'
          },
          {
            label: 'Dashboard',
            icon: 'mdi mdi-gauge',
            routerLink: 'home'
          },
          {
            label: 'Ordenes',
            icon: 'fa fa-list',
            routerLink: 'admin/orders'
          },
          {
            label: 'Conductores',
            icon: 'fa fa-drivers-license-o',
            routerLink: 'admin/drivers'
          },
          {
            label: 'Motos',
            icon: 'fa fa-motorcycle',
            routerLink: 'admin/motorcycles'
          },
        ];
      }
    });
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
