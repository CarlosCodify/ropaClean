export interface UserPerson {
  id:                    number;
  provider:              string;
  uid:                   string;
  allow_password_change: boolean;
  name:                  null;
  nickname:              null;
  image:                 null;
  email:                 string;
  created_at:            string;
  updated_at:            string;
  person:                Person;
}

export interface Person {
  id:         number;
  first_name: string;
  last_name:  string;
  phone:      string;
  email:      string;
  created_at: string;
  updated_at: string;
  user_id:    number;
  role:       string;
}
