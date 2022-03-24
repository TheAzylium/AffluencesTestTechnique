import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';
import { Hours } from './shared/hours';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  Hours = Hours;
  form: FormGroup = new FormGroup({
    date: new FormControl(),
    hours: new FormControl(),
  });

  title = 'cleanAngularApp';

  constructor(
    private _appService: AppService,
    private _toastr: ToastrService
  ) {}

  submit() {

    const time = moment(this.form.getRawValue().date).format('YYYY-MM-DD');

    const hours = this.form.getRawValue().hours.split('h').join(':');

    const datetime = `${time}T${hours}:00Z`;

    this._appService.checkIfRessourceAvailable(datetime).subscribe((res) => {
      if (res.available) {
        this._toastr.success(
          'Vous pouvez dès à présent commencer le processus de réservation.',
          'La ressource est disponible.',
          {
            positionClass: 'toast-top-center',
            progressBar: true,
          }
        );
      } else {
        this._toastr.error(
          'Vous ne pouvez donc pas commencer le processus de réservation.',
          "La ressource n'est pas disponible.",
          {
            positionClass: 'toast-top-center',
            progressBar: true,
          }
        );
      }
    });
  }
}
