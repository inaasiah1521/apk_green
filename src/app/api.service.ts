import { ErrorHandler, Injectable } from '@angular/core';
import axios, { Axios, HttpStatusCode, isAxiosError } from 'axios';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public uriApi: string = 'https://greenland-foresthill.id/rest-api/index.php/';
  private fotoApi: string = 'https://greenland-foresthill.id/rest-api/uploads/';

  constructor(private storage: Storage) {}

  async login(nik: string) {
    try {
      let url = this.uriApi + 'penduduk?nik=' + nik;
      const res = await axios.get(url);
      if (res.data.status == 'Ok') {
        let data = res.data.result[0];
        if (data.status_huni == 'Aktif') {
          if (
            data.status_keluarga == 'Istri' ||
            data.status_keluarga == 'Kepala Keluarga'
          ) {
            const storage = await this.storage.create();
            storage.set('isLoggedIn', data);
            localStorage.setItem('isLoggedIn', data);
            return 'success';
          } else {
            return 'notAllowed';
          }
        } else {
          return 'notActive';
        }
      } else {
        return 'notFound';
      }
    } catch (err) {
      return 'err';
    }
  }

  async getWarga(nik: string) {
    try {
      let url = this.uriApi + 'penduduk?nik=' + nik;
      const res = await axios.get(url);
      let data = res.data.result[0];
      if (data.status_huni == 'Aktif') {
        if (data.foto == 'nofoto.png'){
          data.bg = 'assets/img/greenland_house.jpg';
        }else{
          data.bg = 'https://greenland-foresthill.id/rest-api/uploads/warga/' + data.foto;
        }
        data.foto = 'https://greenland-foresthill.id/rest-api/uploads/warga/' + data.foto;
        return {
          msg: 'ok',
          data: data,
        };
      } else {
        return {
          msg: 'notActive',
        };
      }
    } catch (err) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createPenduduk(data: any) {
    try {
      let url = this.uriApi + 'penduduk';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }

async getBlok() {
  try {
    let url = this.uriApi + 'blok';
    const res = await axios.get(url);
    let data = res.data.result;
    return {
      msg: 'ok',
      data: data,
    };
  } catch (err: any) {
    return {
      msg: 'err',
      err: err,
    };
    }
  }

  async getKeluarga(nik: string) {
    try {
      let url = this.uriApi + 'penduduk?nik=' + nik;
      const res = await axios.get(url);
      let data = res.data.result[0];
      data.foto = 'http://localhost/rest-api/uploads/warga/' + data.foto;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getKK(kk: string) {
    try {
      let url = this.uriApi + 'penduduk?kk=' + kk;
      const res = await axios.get(url);
      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getInfo() {
    try {
      let url = this.uriApi + 'info';
      const res = await axios.get(url);
      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getPayment(kd: string, year: string, jenis:string) {
    try {
      let url = 
      this.uriApi + 'iuran?kd=' + kd + '&thn='+ year + '&jenis=' + jenis;
      const res = await axios.get(url);
      let data = res.data.result;
      console.log(res.data);
      for ( let i in data){
        data[i].bukti_iuran = this.fotoApi + 'uploads/iuran/' + data[i].bukti_iuran;
        if(data[i].status == '1'){
          data[i].status = 'Selesai';
        }else{
          data[i].status = 'Proses';
        }
      }
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      console.log(err);
      if (err.response.data.status == 'Err') {
        return {
          msg: 'notFound',
        };
      } else {
        return {
          msg: 'err',
          err: err,
        };
      }
    }
  }

  async getPesan(nik: string) {
    try {
      let url = this.uriApi + 'pesan?nik=' + nik;
      const res = await axios.get(url);
      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      if (err.response.data.message == 'Pesan not found') {
        return {
          msg: 'notFound',
        };
      } else {
        return {
          msg: 'err',
          err: err,
        };
      }
    }
  }

  async sendPesan(msg: string, nik: string) {
    try {
      var dateTime = new Date().toISOString();
      let url = this.uriApi + 'pesan';
      const formData = new FormData();
      formData.append('nik', nik);
      formData.append('pesan', msg);
      formData.append('tgl_pesan', dateTime);
      const res = await axios.post(url, formData);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async updatePenduduk(data: any) {
    try {
        let url = this.uriApi + 'update_penduduk';

        const formData = new FormData();
        formData.append('kd', data.get('kd'));
        formData.append('nik', data.get('nik'));
        formData.append('kk', data.get('kk'));
        formData.append('nama', data.get('nama'));
        formData.append('jenis_kelamin', data.get('jenis_kelamin'));
        formData.append('tempat_lahir', data.get('tempat_lahir'));
        formData.append('tgl_lahir', data.get('tgl_lahir'));
        formData.append('agama', data.get('agama'));
        formData.append('status_perkawinan', data.get('status_perkawinan'));
        formData.append('status_keluarga', data.get('status_keluarga'));
        formData.append('status_pekerjaan', data.get('status_pekerjaan'));
        formData.append('status_kewarganegaraan', data.get('status_kewarganegaraan'));
        formData.append('status_kavling', data.get('status_kavling'));

        // Memeriksa apakah ada gambar yang diunggah
        if (data.get('foto_warga')) {
            formData.append('foto_warga', data.get('foto_warga'));
        }

        const res = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Pastikan header sesuai dengan unggahan gambar
            },
        });

        if (res.data.status == 'Ok') {
            return {
                msg: 'ok',
            };
        } else {
            return {
                msg: 'notOk',
            };
        }
    } catch (err: any) {
        return {
            msg: 'err',
            err: err,
        };
    }
}


  async insertIuran(data: any) {
    try {
      let url = this.uriApi + 'iuran';
      
      const res = await axios.post(url, data);
      console.log(res);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
}