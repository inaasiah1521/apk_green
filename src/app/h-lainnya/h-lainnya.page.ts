import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-h-lainnya',
  templateUrl: './h-lainnya.page.html',
  styleUrls: ['./h-lainnya.page.scss'],
})
export class HLainnyaPage {


  public Data:any;
  public listKas: any[] = [];
  public tahunList: any[] = [];
  public currentYear: string = String((new Date()).getFullYear());
  public searchYear: string = '';

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) { 
    let currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i < currentYear + 1; i++){
      var tahunObj = {
        tahun: i
      }
      this.tahunList.push(tahunObj)
    } 
    for (let i = currentYear + 1; i < currentYear + 6; i++){
      var tahunObj = {
        tahun: i
      }
      this.tahunList.push(tahunObj)
    } 
    this.getPayment();
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

  ionViewWillEnter(): void {
    try {
      this.getPayment();
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getPayment();
      event.target.complete();
    }, 2000);
  }

  async getPayment(){
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
        if(this.searchYear == ''){
          this._apiService.getPayment(val.kd_blok, this.currentYear, 'KAS').then((res) => {
            if (res.msg == 'ok') {
              this.Data = res.data;
            }else if (res.msg == 'notFound') {
              this.presentToast(
                'Belum ada transaksi !',
                'warning',
                'alert-circle-outline'
              );
            } else if (res.msg == 'err') {
              this.presentToast(
                'Something went wrong',
                'danger',
                'alert-circle-outline'
              );
            }
          });
        } else {
          this._apiService.getPayment(val.kd_blok, this.searchYear, 'KAS').then((res) => {
            if (res.msg == 'ok') {
              this.Data = res.data;
              this.presentToast(
                'Berhasil menampilkan data !',
                'success',
                'checkmark-circle-outline'
              );
            }else if (res.msg == 'notFound') {
              this.presentToast(
                'Belum ada transaksi di tahun tersebut !',
                'warning',
                'alert-circle-outline'
              );
            } else if (res.msg == 'err') {
              this.presentToast(
                'Something went wrong',
                'danger',
                'alert-circle-outline'
              );
            }
          });
        }
      }
    });
  }

}