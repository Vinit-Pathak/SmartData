export interface Employee {
  employeeId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  primaryContactNumber: number;
  secondaryContactNumber: number;
  gender: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  department: string;
  jobTitle: string;
  salary: number;
  startDate: Date;
  employmentType: string;
  termsAccepted: boolean;
}