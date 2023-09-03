import ToyotaHilux from "../../components/images/toyota-hilux.jpg";
import MitsubishiMontero from "../../components/images/mitsubishi-montero.jpg";
import Fortuner from "../../components/images/fortuner.jpg";
import ToyotaHiace from "../../components/images/toyota-hiace.png";
import { Vehicle } from "../../interfaces/interfaces";

export const fetchedVehicles: Vehicle[] = [
  {
    id: 1,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: ToyotaHilux,
    status: "On Trip",
  },
  {
    id: 2,
    vehicle_name: "KCU 2522 Montero Sport",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: MitsubishiMontero,
    status: "Available",
  },
  {
    id: 3,
    vehicle_name: "KAB 2855 Fortuner",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: Fortuner,
    status: "On Trip",
  },
  {
    id: 4,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: ToyotaHiace,
    status: "Available",
  },
  {
    id: 5,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: ToyotaHilux,
    status: "Unavailable",
  },
  {
    id: 6,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: ToyotaHiace,
    status: "Unavailable",
  },
];

export const fetchedAccountData = [
  {
    id_number: "VIP20230001",
    email: "alice.smith@example.com",
    last_name: "Smith",
    first_name: "Alice",
    middle_name: "Marie",
    contact_number: "09111223344",
    role: "requester",
  },
  {
    id_number: "VIP20230002",
    email: "robert.johnson@example.com",
    last_name: "Johnson",
    first_name: "Robert",
    middle_name: "Lewis",
    contact_number: "09222334455",
    role: "requester",
  },
  {
    id_number: "VIP20230003",
    email: "sophia.garcia@example.com",
    last_name: "Garcia",
    first_name: "Sophia",
    middle_name: "Natalie",
    contact_number: "09333445566",
    role: "vip",
  },
  {
    id_number: "VIP20230004",
    email: "michael.lee@example.com",
    last_name: "Lee",
    first_name: "Michael",
    middle_name: "James",
    contact_number: "09444556677",
    role: "office staff",
  },
  {
    id_number: "VIP20230005",
    email: "lily.wang@example.com",
    last_name: "Wang",
    first_name: "Lily",
    middle_name: "Katherine",
    contact_number: "09555667788",
    role: "gate guard",
  },
  {
    id_number: "VIP20230006",
    email: "emma.johnson@example.com",
    last_name: "Johnson",
    first_name: "Emma",
    middle_name: "Anne",
    contact_number: "09666778899",
    role: "driver",
  },
];
