export interface User {
  id:                    number;
  email:                 string;
  uid:                   string;
  provider:              string;
  allow_password_change: boolean;
  name:                  null;
  nickname:              null;
  image:                 null;
}
