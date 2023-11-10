export interface Vehicle {
  [key: string]: any;
  plate_number?: any;
  vehicle_name?: any;
  vehicle_type?: any;
  capacity?: any;
  status?: string;
  is_vip?: any;
  vehicle_image?: any;
}

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: any;
  value?: any;
  type?: any;
  checked?: any;
  accept?: any;
}

interface DropdownProps {
  onChange: (selectedOption: string) => void;
  selectedAccount?: SignupParams | undefined;
}

export interface AddEditProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  header?: string;
  buttonText?: string;
  onRequestAddEdit?: () => void;
  lastNameProps?: InputProps;
  firstNameProps?: InputProps;
  middleNameProps?: InputProps;
  emailProps?: InputProps;
  usernameProps?: InputProps;
  contactNumberProps?: InputProps;
  roleDropdownProps: DropdownProps;
  errorMessages?: string[];
  officeDropdownProps: DropdownProps;
}
export interface AddEditVehicleProps {
  isOpen: boolean;
  onRequestClose: () => void;
  header: string;
  buttonText: string;
  onRequestAddEdit: () => void;
  plateNoProps?: InputProps;
  modelProps?: InputProps;
  seatingCapacityProps?: InputProps;
  typeProps?: InputProps;
  vipProps?: InputProps;
  uploadImageProps?: InputProps;
  vehicleErrorMessages?: string[];
}
export interface SigninParams {
  username: string;
  password: string;
}

export interface SignupParams {
  id?: any;
  username: string;
  password?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: any;
  role: any;
  status?: any;
  user?: any;
  office: any;
}

export type SidebarItem = {
  icon: any;
  text: string;
  path: string;
  notification?: any;
};

export interface AddressInputProps {
  onPlaceSelect?: (value: any) => void;
}

export interface RequestFormProps {
  office?: any;
  purpose?: any;
  passenger_name: string[];
  vehicle?: any;
  destination?: any;
  travel_date?: any;
  travel_time?: any;
  return_date?: any;
  return_time?: any;
  number_of_passenger?: any;
  status?: any;
  request_id?: any;
  requester_full_name?: any;
  requester_name?: any;
  driver_full_name?: any;
  category?: any;
  sub_category?: any;
  distance?: any;
  type?: any;
}

export interface RequestFormDetailsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedRequest: RequestFormProps | null;
  onApprove: (driverId: string | null) => void;
  onComplete: () => void;
}

export interface TimeInputProps {
  onChange: (time: string | null) => void;
  selectedDate?: string | null;
  handleDateChange?: (date: Date | null) => void;
}

export interface CalendarInputProps {
  className?: string;
  onChange: (date: Date | null) => void;
  disableDaysBefore?: any;
  selectedDate?: Date | null;
}

export interface ModalProps {
  isOpen: boolean;
  content?: string;
  buttonText1?: string;
  buttonText2?: string;
  onRequestClose?: () => void;
  onRequestDelete?: () => void;
  selectedVehicle?: any;
  setIsVehicleMaintenanceOpen?: any;
  setIsConfirmationOpenVehicleMaintenance?: any;
  setLoadingBarProgress?: any;
  setIsDriverAbsenceOpen?: any;
  setIsConfirmationOpenDriverAbsence?: any;
  selectedDriver?: any;
}

export interface ButtonProps {
  onClick?: () => void;
  text?: any;
  primaryStyle?: any;
  secondaryStyle?: any;
  tertiaryStyle?: any;
  width?: any;
  height?: any;
}
