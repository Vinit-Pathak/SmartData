
export interface Patient {
  patientId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  bloodGroup: string;
  allergies: string[];
  currentMedications: string[];
  termsAccepted: boolean; 
}