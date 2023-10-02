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
  onRequestClose: () => void;
  header: string;
  buttonText: string;
  onRequestAddEdit: () => void;
  lastNameProps?: InputProps;
  firstNameProps?: InputProps;
  middleNameProps?: InputProps;
  emailProps?: InputProps;
  usernameProps?: InputProps;
  contactNumberProps?: InputProps;
  roleDropdownProps: DropdownProps;
  errorMessages?: string[];
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
}

export type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

export interface AddressInputProps {
  onPlaceSelect?: (value: any) => void;
}

export interface RequestFormProps {
  office_or_dept?: any;
  purpose?: any;
  passenger_names: string[];
  vehicle?: any;
  destination?: any;
  travel_date?: any;
  travel_time?: any;
  number_of_passenger?: any;
  status?: any;
  request_id?: any;
  requester_last_name?: any;
  requester_first_name?: any;
  requester_middle_name?: any;
  requester_name?: any;
}

export interface RequestFormDetailsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedRequest: RequestFormProps | null;
  showButtons: boolean;
  onApprove: () => void;
}

export interface TimeInputProps {
  onChange: (time: string | null) => void;
}

export interface CalendarInputProps {
  className?: string;
  onChange: (date: Date | null) => void;
}
