import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  public Data: any;
  public image: any;
  public kd: string = '';
  public nik: string = '';
  public kk: string = '';
  public nama: string = '';
  public tmpt_lhr: string = '';
  public jk: string = '';
  public tgl_lhr: string = '';
  public agama: string = '';
  public stts_prkwn: string = '';
  public stts_klrg: string = '';
  public stts_kwngn: string = '';
  public stts_pkrjan: string = '';
  public stts_kvlng: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['nik'] == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.getKeluarga(params['nik']);
      }
    });
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

  async getFile(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  async getKeluarga(nik: string) {
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
        this._apiService.getKeluarga(nik).then((res) => {
          if (res.msg == 'ok') {
            this.Data = Array(res.data);
            if (res.data !== null) {
              this.kd = res.data.kd_penduduk;
              this.nik = res.data.nik;
              this.nama = res.data.nama;
              this.jk = res.data.jenis_kelamin;
              this.kk = res.data.kk;
              this.tmpt_lhr = res.data.tempat_lahir;
              this.tgl_lhr = res.data.tgl_lahir;
              this.agama = res.data.agama;
              this.stts_prkwn = res.data.status_perkawinan;
              this.stts_pkrjan = res.data.status_pekerjaan;
              this.stts_kwngn = res.data.status_kewarganegaraan;
              this.stts_kvlng = res.data.status_kavling;
              this.stts_klrg = res.data.status_keluarga;
            }
          } else if (res.msg == 'err') {
            this.presentToast(
              'Something went wrong',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    });
  }

  async Update() {
    if (
      this.kd == '' &&
      this.nik == '' &&
      this.kk == '' &&
      this.nama == '' &&
      this.tgl_lhr == '' &&
      this.agama == '' &&
      this.tmpt_lhr == '' &&
      this.jk == '' &&
      this.stts_prkwn == '' &&
      this.stts_pkrjan == '' &&
      this.stts_kwngn == '' &&
      this.stts_kvlng == '' &&
      this.stts_klrg == ''
    ) {
      this.presentToast(
        'Tidak boleh ada form yang kosong, harap isi semua form!',
        'warning',
        'alert-circle-outline'
      );
    } else {
      const data = {
        'kd': this.kd,
        'nik': this.nik,
        'kk': this.kk,
        'nama': this.nama,
        'jenis_kelamin': this.jk,
        'tempat_lahir': this.tmpt_lhr,
        'tgl_lahir': this.tgl_lhr,
        'agama': this.agama,
        'status_perkawinan': this.stts_prkwn,
        'status_keluarga': this.stts_klrg,
        'status_pekerjaan': this.stts_pkrjan,
        'status_kewarganegaraan': this.stts_kwngn,
        'status_kavling': this.stts_kvlng,
      }
      const formData = new FormData();
      formData.append('kd', this.kd);
      formData.append('nik', this.nik);
      formData.append('kk', this.kk);
      formData.append('nama', this.nama);
      formData.append('jenis_kelamin', this.jk);
      formData.append('tempat_lahir', this.tmpt_lhr);
      formData.append('tgl_lahir', this.tgl_lhr);
      formData.append('agama', this.agama);
      formData.append('status_perkawinan', this.stts_prkwn);
      formData.append('status_keluarga', this.stts_klrg);
      formData.append('status_pekerjaan', this.stts_pkrjan);
      formData.append('status_kewarganegaraan', this.stts_kwngn);
      formData.append('status_kavling', this.stts_kvlng);
      if(this.image !== undefined || this.image !== null){
        formData.append('foto_warga', this.image);
      }
      this._apiService.updatePenduduk(formData).then((res) => {
        if (res.msg == 'ok') {
          this.presentToast(
            'Data berhasil diubah !',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/tabs/tab2');
        } else if (res.msg == 'notOk') {
          this.presentToast(
            'Data gagal diubah !',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg == 'err') {
          this.presentToast(
            'Something went wrong !',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    }
  }

  ngOnInit() {}
}