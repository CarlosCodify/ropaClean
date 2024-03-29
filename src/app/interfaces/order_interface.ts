// Generated by https://quicktype.io

export interface Order {
  id:                   number;
  pickup_address_id:    number;
  delivery_address_id:  number;
  scheduled_date_time:  string;
  pickup_date_time:     string;
  delivery_date_time:   string;
  total_amount:         string;
  notes:                string;
  driver_id:            number;
  order_status_id:      number;
  payment_status_id:    number;
  created_at:           string;
  updated_at:           string;
  order_status:         OrderStatus;
  payment_status:       OrderStatus;
  pickup_address:       Address;
  delivery_address:     Address;
  payments?:             Payment[];
  clothing_inventories?: ClothingInventory[];
  driver:               Driver;
  customer:             Customer;
}

export interface ClothingInventory {
  id:               number;
  quantity:         number;
  clothing_type_id: number;
  order_id:         number;
  created_at:       string;
  updated_at:       string;
  clothing_type:    ClothingInventoryType;
}

export interface OrderStatus {
  id:         number;
  name:       string;
  created_at: string;
  updated_at: string;
}

export interface ClothingInventoryType {
  id:         number;
  name:       string;
  unit_price: number;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id:         number;
  code:       string;
  person_id:  number;
  created_at: string;
  updated_at: string;
  person:     Person;
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

export interface Address {
  id:          number;
  address:     string;
  latitude:    string;
  longitude:   string;
  customer_id: number;
  created_at:  string;
  updated_at:  string;
}

export interface Driver {
  id:             number;
  driver_license: string;
  identity_card:  string;
  motorcycle_id:  number;
  person_id:      number;
  created_at:     string;
  updated_at:     string;
  status:         boolean;
  latitude:       string;
  longitude:      string;
  person:         Person;
}

export interface Payment {
  id:         number;
  amount:     string;
  date:       string;
  order_id:   number;
  created_at: string;
  updated_at: string;
}
