export interface Vehicle {
  [key: string]: any;
  plate_number?: any;
  vehicle_name?: any;
  vehicle_type?: any;
  capacity?: any;
  status?: string;
  is_vip?: any;
  vehicle_image?: any;
  vip_assigned_to: any;
  driver_assigned_to: any;
  merge_trip?: any;
  request_id?: any;
}

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: any;
  value?: any;
  type?: any;
  checked?: any;
  accept?: any;
}

export interface DropdownParams {
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
  vip: any;
}

interface DropdownProps {
  onChange: (selectedOption: string) => void;
  selectedAccount?: DropdownParams | undefined;
  selectedVehicle?: Vehicle | undefined;
}

export interface HeaderProps {
  isDropDownHide?: boolean;
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
  vipDropdownProps: DropdownProps;
  isVipProps?: any;
  driverDropdownProps: DropdownProps;
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
  passenger_name?: string[];
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
  vehicle_driver_status?: any;
  role?: any;
  merge_trip?: any;
  date_reserved?: any;
  departure_time_from_office?: any;
  arrival_time_to_office?: any;
  driver_id?: any;
  requester_id?: any;
  vehicle_capacity?: any;
  driver_name?: any;
  merged_with?: any;
  main_merge?: any;
  vehicle_model?: any;
}

export interface RequestFormDetailsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedRequest: RequestFormProps | null;
  onApprove?: (driverId: string | null) => void;
  onComplete: () => void;
  errorMessages?: any[];
  setErrorMessages?: any;
  setIsOpen: any;
  fetchRequestOfficeStaffAPI: any;
  setRequestList: any;
}
export interface CheckScheduleProps {
  travel_date?: any;
  return_date?: any;
  travel_time?: any;
  return_time?: any;
  type?: any;
  purpose?: any;
  passenger_name?: string[];
  vehicle_capacity?: any;
}

export interface TimeInputProps {
  onChange: (time: string | null) => void;
  selectedDate?: string | null;
  handleDateChange?: (date: Date | null) => void;
  timeSelected?: any;
}

export interface CalendarInputProps {
  containerClassName?: string;
  calendarClassName?: string;
  iconClassName?: string;
  onChange: (date: Date | null) => void;
  disableDaysBefore?: any;
  selectedDate?: Date | null;
}

export interface ModalProps {
  isOpen: boolean;
  header?: string;
  content?: string;
  footer?: string;
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
  onProceed?: any;
  selectedRequest?: RequestFormProps | null;
  fetchRequestOfficeStaffAPI?: any;
  setRequestList?: any;
  travelDateDayGap?: any;
}

export interface ButtonProps {
  onClick?: (text: string) => void;
  text?: any;
  primaryStyle?: any;
  secondaryStyle?: any;
  tertiaryStyle?: any;
  underlinedStyle?: any;
  width?: any;
  height?: any;
  whiteStyle?: any;
}

export interface QuestionProps {
  onNext: () => void;
  data: {
    client_type: string;
    region_of_residence: string;
    service_availed: string;
    questions: {
      question_number: string;
      answers: string;
    }[];
    suggestions: string;
    email_address: string;
  };
  setData: (
    value: React.SetStateAction<{
      client_type: string;
      region_of_residence: string;
      service_availed: string;
      questions: {
        question_number: string;
        answers: string;
      }[];
      suggestions: string;
      email_address: string;
    }>
  ) => void;
  questions: any[];
  setQuestions?: (question: any) => void;
}

export interface InitialFormVipProps {
  isOpen: any;
  onRequestClose: any;
  plateNumber: any;
  vehicleName: any;
  capacity: any;
}

export interface RequesterTripMergingFormProps {
  isOpen: any;
  onRequestClose: any;
  given_capacity?: any;
  requestId?: any;
}

export interface HoverDescriptionProps {
  description: string;
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
  width?: number;
  height?: number;
}

export interface SchedulePickerProps {
  isOpen?: any;
  selectedVehicleExisitingSchedule?: any;
  setIsScheduleClick?: any;
  selectedVehicleCapacity?: any;
  selectedVehiclePlateNumber?: any;
  selectedVehicleModel?: any;
  selectedVehicleDriver?: any;
  selectedVehicleIsVIP?: any;
  setIsAnotherVehicle?: any;
}
