import { FormControl } from '@angular/forms';

export interface SignUpInterface {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}
