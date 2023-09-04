export interface Vehicle {
  id: number;
  vehicle_name: string;
  capacity: number;
  vehicle_type: string;
  vehicle_image: string;
  status: string;
}

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: any;
  type: string;
}

interface DropdownProps {
  onChange: (selectedOption: string) => void;
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
