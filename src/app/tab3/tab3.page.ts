import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  isMenuOpen= false;
  infoData: any;
  constructor(
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private http: HttpClient
  ) {
    this.getInfoData();
  }

  async logout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/tabs']);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  getInfoData() {
    this.http.get('https://greenland-foresthill.id/rest-api/index.php/info').subscribe((data: any) => {
      // Sorting the data by 'tgl_info' in descending order (newest first)
      this.infoData = data.result.sort((a:any, b:any) => {
        return new Date(b.tgl_info).getTime() - new Date(a.tgl_info).getTime();
      });
    });
  }

  // Implement actions for the floating menu
  action1() {
    this.router.navigate(['/iuran']);
  }

  action2() {
    this.router.navigate(['/']);
  }

  action3() {
    this.router.navigate(['']);
  }

  action4() {
    this.router.navigate(['']);
  }
  
}