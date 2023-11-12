import { Component, OnInit, ViewChild } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('username') focusUsername: any;
  public nik: string = '';

  constructor(
    private toastCtrl: ToastController,
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
  ) {}


  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  default() {
    this.nik = '';
  }

  async login() {
    if (this.nik === '') {
      this.presentToast('NIK cannot be empty!', 'danger', "alert-circle-outline");
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: "lines",
      });
      loader.present();

      this._apiService.login(this.nik).then((res) => {
        if (res == 'success') {
          loader.dismiss();
          this.navCtrl.navigateRoot(['/tabs/tab1']);
          this.presentToast('Login Success...', 'success', "checkmark-circle-outline");
        } else if (res == 'notAllowed') {
          loader.dismiss();
          this.presentToast('Account is not allowed to login !', 'danger', "alert-circle-outline");
        } else if( res == 'notActive'){
          loader.dismiss();
          this.presentToast('Account is not active !', 'danger', "alert-circle-outline");
        } else if (res == 'notFound') {
          loader.dismiss();
          this.presentToast('Account not found !', 'danger', "alert-circle-outline");
        } else if (res == 'err') {
          loader.dismiss();
          this.presentToast('Something went wrong !', 'danger', "alert-circle-outline");
        }
        this.default();
      });
    }
  }

  ngOnInit(): void {}
}