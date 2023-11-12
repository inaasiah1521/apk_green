import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  public Data: any;
  public msg: string = '';
  public pesan: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this.getPesan();
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.getPesan();
      event.target.complete();
    }, 2000);

    
  }
  ionViewWillEnter(): void {
    try {
      this.getPesan();
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
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

  async getPesan() {
    await this.storage.create();
    this.storage.get('isLoggedIn').then(async (val) => {
      if (val == null) {
        this.presentToast(
          "You're not logged in, please login !",
          'danger',
          'alert-circle-outline'
        );
        this.navCtrl.navigateRoot('/login');
      } else {
        this._apiService.getPesan(val.nik).then((res) => {
          if (res.msg == 'ok') {
            // Filter pesan sesuai dengan nik pengguna yang login
            const filteredData = res.data
              .filter((pesan: { nik: any }) => pesan.nik === val.nik);
  
            // Urutkan pesan berdasarkan timestamp dari yang terbaru
            this.Data = filteredData.sort((a: { timestamp: number; }, b: { timestamp: number; }) => b.timestamp - a.timestamp);
          } else if (res.msg == 'notFound') {
            this.Data = null;
            this.presentToast(
              'Belum ada pesan!',
              'warning',
              'alert-circle-outline'
            );
          } else if (res.msg == 'err') {
            this.Data = null;
            this.presentToast(
              'Something went wrong!',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    });
  }
  

  async send() {
    await this.storage.create();
    this.storage.get('isLoggedIn').then((val) => {
      if (this.msg.trim() !== '') {
        this._apiService.sendPesan(this.msg, val.nik).then((res) => {
          if (res.msg == 'ok') {
            this.getPesan();
            this.msg = '';
            this.presentToast(
              'Pesan berhasil dikirim!',
              'success',
              'checkmark-circle-outline'
            );
          } else if (res.msg == 'notOk') {
            this.msg = '';
            this.presentToast(
              'Pesan gagal dikirim!',
              'danger',
              'alert-circle-outline'
            );
          } else if (res.msg == 'err') {
            this.presentToast(
              'Something went wrong!',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      } else {
        this.presentToast(
          'Pesan tidak boleh kosong!',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }

  async logout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/tabs/tab1']);
  }
}