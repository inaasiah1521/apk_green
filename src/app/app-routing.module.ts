import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
   path: '',
   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
 },
 {
   path: 'login',
   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
 },
 {
   path: 'register',
   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
 },
 {
  path: 'splash',
  loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
},
  
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'iuran',
    loadChildren: () => import('./iuran/iuran.module').then( m => m.IuranPageModule)
  },
  {
    path: 'd-iuran',
    loadChildren: () => import('./d-iuran/d-iuran.module').then( m => m.DIuranPageModule)
  },
  {
    path: 'h-lainnya',
    loadChildren: () => import('./h-lainnya/h-lainnya.module').then( m => m.HLainnyaPageModule)
  },
  
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'insert-iuran',
    loadChildren: () => import('./insert-iuran/insert-iuran.module').then( m => m.InsertIuranPageModule)
  }
];
@NgModule({
 imports: [
   RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
 ],
 exports: [RouterModule]
})
export class AppRoutingModule {}
