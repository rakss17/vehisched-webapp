export interface Vehicle {
  plate_number?: string;
  vehicle_name?: string;
  vehicle_type?: string;
  capacity?: any;
  status?: string;
  is_vip?: any;
}

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: any;
  value: any;
  type: any;
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
}
