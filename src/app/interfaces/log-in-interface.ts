import { FormControl } from '@angular/forms';

export interface LogInInterface {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}
