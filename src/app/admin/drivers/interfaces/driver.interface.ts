export interface Driver {
  id:             number;
  driver_license: string;
  identity_card:  string;
  motorcycle_id:  number;
  person_id:      number;
  status:         boolean;
  latitude?:       string;
  longitude?:      string;
  first_name:     string;
  last_name:      string;
  phone:          string;
  email:          string;
  user_id:        number;
  role:           string;
}
