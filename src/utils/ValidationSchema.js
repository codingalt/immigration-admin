import * as Yup from "yup";

const signupSchema = Yup.object({
  name: Yup.string().min(3).required("Name is Required"),
  email: Yup.string()
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  contact: Yup.string().required("Contact is Required"),
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password not matched"),
  referringAgent: Yup.string(), 
});

export const createCaseWorkerSchema = Yup.object({
  firstName: Yup.string().min(3).required("First Name is Required"),
  lastName: Yup.string().min(3).required("Last Name is Required"),
  email: Yup.string()
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  contact: Yup.string().required("Contact is Required"),
  country: Yup.string().required("Country is Required"),
  birthDate: Yup.string().required("Birth Date is Required"),
  state: Yup.string().required("State is Required"),
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password not matched"
  ),
});

export const createCompanySchema = Yup.object({
  name: Yup.string().min(3).required("Name is Required"),
  fullName: Yup.string().min(3).required("Full Name is Required"),
  address: Yup.string().min(3).required("Address is Required"),
  telephone: Yup.string().min(3).required("Telephone is Required"),
  confirmIndustry: Yup.string().min(3).required("Confirm Industry is Required"),
  email: Yup.string()
    .email("Please Enter a valid email address")
    .required("Email is Required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password not matched"
  ),
});

export const changePasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password not matched"
  ),
  currentPassword: Yup.string().min(6),
});

// Phases 1 Schema
export const phase1Schema = Yup.object().shape({
  phase1: Yup.object().shape({
    name: Yup.string().min(3).required("Name is Required"),
    email: Yup.string()
      .email("Please Enter a valid email address")
      .required("Email is Required"),
    contact: Yup.string().required("Contact is Required"),
    birthDate: Yup.date().required("Date of Birth is Required"),
    country: Yup.string().required("Country is Required"),
    sameResidence: Yup.boolean().required(
      "Do you have residence in this country?"
    ),
    speakEnglish: Yup.boolean().required("Do you Speak English?"),
    otherLanguagesSpeak: Yup.array().required(
      "What Other Languages do you speak?"
    ),
    isRefusedVisaEntry: Yup.boolean().required("Please check this option."),
    refusedVisaType: Yup.string(),
    refusedVisaDate: Yup.date(),
    refusedVisaReason: Yup.string(),
    message: Yup.string().required(
      "Please provide in your own words how we can help you?*"
    ),
    permissionInCountry: Yup.string().when(
      "sameResidence",
      (sameResidence, schema) => {
        sameResidence ? Yup.string().required() : schema;
      }
    ),
  }),
});

// Genral Phase Schema 
export const generalSchema = Yup.object().shape({
  phase4: Yup.object().shape({
    general: Yup.object().shape({
      fullName: Yup.string().min(3).required("Full Name is Required"),
      currentPassportNumber: Yup.string().required(
        "Current Passport Number is Required"
      ),
      passportIssueDate: Yup.string()
        .min(3)
        .required("Passport Issue date is Required"),
      passportExpiryDate: Yup.string()
        .min(3)
        .required("Passport Expiry date is Required"),
      issuingAuthority: Yup.string()
        .min(3)
        .required("Issuing Authority is Required"),
      motherName: Yup.string().min(3).required("Mother Name is Required"),
      motherDob: Yup.string().required("Mother Date of Birth is Required"),
      fatherName: Yup.string().min(3).required("Father Name is Required"),
      fatherDob: Yup.string().required("Father Date of Birth is Required"),
      email: Yup.string()
        .email("Please Enter a valid email address")
        .min(3)
        .required("Email is Required"),
      mobileNumber: Yup.string().min(3).required("Mobile Number is Required"),
    }),
  }),
});

// Accomodation Phase Schema 

export const accommodationSchema = Yup.object().shape({
  phase4: Yup.object().shape({
    accommodation: Yup.object().shape({
      address1: Yup.string().min(3).required("Address 1 is Required"),
      address2: Yup.string().min(3).required("Address 2 is Required"),
      locationName: Yup.string().min(3).required("Location Name is Required"),
      locationCode: Yup.string().min(3).required("Location Code is Required"),
      town: Yup.string().min(3).required("Town is Required"),
      county: Yup.string().min(3).required("County is Required"),
      postCode: Yup.string().min(3).required("Post Code is Required"),
      countryPrefix: Yup.string().required("Country Prefix is Required"),
      fax: Yup.string(),
      vatRate: Yup.string(),
      moveInDate: Yup.date().required("Move In Date is Required"),
      timeLivedAtCurrentAddress: Yup.string().required(
        "Time Lived is Required"
      ),
      homeType: Yup.string(),
      bedrooms: Yup.number().required("Number of Bedrooms is Required"),
      otherRooms: Yup.number().required("Number of Other Rooms is Required"),
      otherWhoLives: Yup.string().required("Others Who Live is Required"),
    }),
  }),
});

const childDetailsSchema = Yup.array().of(
  Yup.object().shape({
    childName: Yup.string().required("Child Name is required"),
    childGender: Yup.string().required("Child Gender is required"),
    childDob: Yup.string().required(),
    childNationality: Yup.string().required(),
    // isChildPassport: Yup.boolean().required("Do you have passport is required"),
    // childPassportNumber: Yup.string().when(
    //   "isChildPassport",
    //   ([isChildPassport], schema) => {
    //     if (isChildPassport) return Yup.string().required("Field is required");
    //     return schema;
    //   }
    // ),
    // childPassportIssueDate: Yup.string().when(
    //   "isChildPassport",
    //   ([isChildPassport], schema) => {
    //     if (isChildPassport) return Yup.string().required("Field is required");
    //     return schema;
    //   }
    // ),
    // childPassportExpiryDate: Yup.string().when(
    //   "isChildPassport",
    //   ([isChildPassport], schema) => {
    //     if (isChildPassport) return Yup.string().required("Field is required");
    //     return schema;
    //   }
    // ),
    // isChildVisa: Yup.boolean().required("Do you have Visa is required"),
    // childVisaType: Yup.string().when("isChildVisa", ([isChildVisa], schema) => {
    //   if (isChildVisa) return Yup.string().required("Field is required");
    //   return schema;
    // }),
    // childVisaIssueDate: Yup.string().when(
    //   "isChildVisa",
    //   ([isChildVisa], schema) => {
    //     if (isChildVisa) return Yup.string().required("Field is required");
    //     return schema;
    //   }
    // ),
    // childVisaExpiryDate: Yup.string().when(
    //   "isChildVisa",
    //   ([isChildVisa], schema) => {
    //     if (isChildVisa) return Yup.string().required("Field is required");
    //     return schema;
    //   }
    // ),
  })
);

// Family Phase Schema 
export const familySchema = Yup.object().shape({
  phase4: Yup.object().shape({
    family: Yup.object().shape({
      maritalStatus: Yup.string().required("Marital Status is Required"),
      childDetails: childDetailsSchema,
    }),
  }),
});

// Education Phase Schema 
export const educationSchema = Yup.object().shape({
  phase4: Yup.object().shape({
    education: Yup.object().shape({
      qualification: Yup.string().required("Qualification is Required"),
      awardingInstitute: Yup.string().required(
        "Awarding Institute is Required"
      ),
      grade: Yup.string().required("Grades is Required"),
      courseSubject: Yup.string().required("Course Subject is Required"),
      courseLength: Yup.string().required("Course Length is Required"),
      yearOfAward: Yup.number().required("Year of Award is Required"),
      state: Yup.string().required("State is Required"),
    }),
  }),
});

// Maintenance Phase Schema 
export const maintenanceSchema = Yup.object().shape({
  phase4: Yup.object().shape({
    maintenance: Yup.object().shape({
      bankName: Yup.string().required("Field is Required"),
      isRegisteredFinancialInstitute:
        Yup.string().required("Field is Required"),
      countryFundsHeldIn: Yup.string().required("Field is Required"),
      currencyFundsHeldIn: Yup.string().required("Field is Required"),
      amountHeld: Yup.string().required("Field is Required"),
      fundsDateHeldFrom: Yup.string().required("Field is Required"),
    }),
  }),
});

// Employment Phase Schema 
const validationSchema = Yup.object().shape({
  phase4: Yup.object().shape({
    employment: Yup.object().shape({
      jobStartDate: Yup.date().required("This field is required"),
      employerName: Yup.string().required("This field is required"),
      employerTelephone: Yup.string().required("This field is required"),
      employerEmail: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      annualSalary: Yup.string().required("This field is required"),
      jobTitle: Yup.string().required("This field is required"),
      employerAddress1: Yup.string().required("This field is required"),
      employerAddress2: Yup.string().required("This field is required"),
      employerLocation: Yup.string().required("This field is required"),
      employerLocationCode: Yup.string().required("This field is required"),
      employerTown: Yup.string().required("This field is required"),
      employerCounty: Yup.string().required("This field is required"),
      employerPostCode: Yup.string().required("This field is required"),
      employerCountryPrefix: Yup.number().required("This field is required"),
      employerCountry: Yup.string().required("This field is required"),
      employerFax: Yup.string(),
      employerVatRate: Yup.string(),
    }),
  }),
});





export default signupSchema