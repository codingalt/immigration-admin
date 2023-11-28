import React, { useEffect, useState, useRef } from "react";
import {
  useApprovePhase4Mutation,
  useGetApplicationByUserIdQuery,
  useGetApplicationDataByIdQuery,
} from "../services/api/applicationApi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Logo2 from "../assests/Ukimmigration-logo.png";
import "../style/buttons.css";
import GeneralForm from "../components/PhaseForms/GeneralForm";
import AccomodationForm from "../components/PhaseForms/AccomodationForm";
import moment from "moment";
import { format } from "date-fns";
import FamilyForm from "../components/PhaseForms/FamilyForm";
import LanguageProficiencyForm from "../components/PhaseForms/LanguageProficiencyForm";
import EducationForm from "../components/PhaseForms/EducationForm";
// import Navbar from "../components/Navbar";
import EmploymentForm from "../components/PhaseForms/EmploymentForm";
import MaintenanceForm from "../components/PhaseForms/MaintenanceForm";
import TravelForm from "../components/PhaseForms/TravelForm";
import CharacterForm from "../components/PhaseForms/CharacterForm";
import "../style/Genral.css";
import SideNavbar from "../components/SideNavbar";
import editpen from "../assests/edit-pen.png";
import Editimgapp from "../assests/Edit-file-img.svg";
import tick from "../assests/tick.png";
import cross from "../assests/cross.png";
import { toastError, toastSuccess } from "../components/Toast";
import { useMemo } from "react";
import MainContext from "../components/Context/MainContext";
import { useContext } from "react";
import Approvedimgapp from "../assests/Approved-img.svg";
import Rejectimgapp from "../assests/Delete-File-img.svg";
import Loader from "../components/Loader";
import { useGetGroupClientAppByIdQuery } from "../services/api/companyClient";
import GeneralFormGroup from "../components/Phase4GroupForms/GeneralFormGroup";
import AccomodationFormGroup from "../components/Phase4GroupForms/AccomodationFormGroup";
import FamilyFormGroup from "../components/Phase4GroupForms/FamilyFormGroup";
import LanguageProficiencyFormGroup from "../components/Phase4GroupForms/LanguageProficiencyFormGroup";
import EducationFormGroup from "../components/Phase4GroupForms/EducationFormGroup";
import EmploymentFormGroup from "../components/Phase4GroupForms/EmploymentFormGroup";
import MaintenanceFormGroup from "../components/Phase4GroupForms/MaintenanceFormGroup";
import TravelFormGroup from "../components/Phase4GroupForms/TravelFormGroup";
import CharacterFormGroup from "../components/Phase4GroupForms/CharacterFormGroup";

const Phase4GroupPage = () => {
  const { applicationId } = useParams();
  const { data, refetch } = useGetGroupClientAppByIdQuery(applicationId);
  const [isAllowed, setIsAllowed] = useState(false);
  const [childDetailsArr, setChildDetailsArr] = useState([]);
  const [lastVisitsToUk, setLastVisitsToUk] = useState([]);
  const navigate = useNavigate();
  const [isEditting, setIsEditting] = useState(true);
  const { socket } = useContext(MainContext);
  const [received, setReceived] = useState();

  useEffect(() => {
    socket.on("phase data received", (phaseData) => {
      if (phaseData) {
        setReceived(phaseData);
        console.log("phase data received", phaseData);
      }
    });
  }, [received]);

  useEffect(() => {
    if (received) {
      refetch();
    }
  }, [received]);

  console.log(data?.application);

  const [initialValues, setInitialValues] = useState({
    phase4: {
      general: {
        fullName: "",
        isKnownByOtherName: true,
        previousName: "",
        prevNameFrom: "",
        prevNameTo: "",
        countryOfBirth: "",
        placeOfBirth: "",
        currentNationality: "",
        isOtherNationality: true,
        otherNationality: "",
        nationalityFrom: "",
        nationalityUntill: "",
        currentPassportNumber: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        issuingAuthority: "",
        passportPlaceOfIssue: "",
        isNationalIDCard: true,
        idCardNumber: "",
        idCardIssueDate: "",
        isBrp: true,
        brpNumber: "",
        brpIssueDate: "",
        motherName: "",
        motherDob: "",
        motherNationality: "",
        motherCountry: "",
        motherPlaceOfBirth: "",
        fatherName: "",
        fatherDob: "",
        fatherNationality: "",
        fatherCountry: "",
        fatherPlaceOfBirth: "",
        isUKNINumber: true,
        ukNINumber: "",
        niNumberIssueDate: "",
        isUKDrivingLicense: true,
        ukDrivingLicenseNumber: "",
        ukLicenseIssueDate: "",
        email: "",
        mobileNumber: "",
      },
      accommodation: {
        address1: "",
        address2: "",
        locationName: "",
        locationCode: "",
        town: "",
        county: "",
        postCode: "",
        countryPrefix: "",
        country: "",
        fax: "",
        vatRate: "",
        moveInDate: null,
        timeLivedAtCurrentAddress: "",
        homeType: "",
        otherHomeDetails: "",
        landLordName: "",
        landLordEmail: "",
        landLordTelephone: "",
        landLordAddress1: "",
        landLordAddress2: "",
        landLordLocationName: "",
        landLordLocationCode: "",
        landLordCounty: "",
        landLordTown: "",
        landLordPostCode: "",
        landLordCountryPrefix: "",
        landLordCountry: "",
        landLordFax: null,
        landLordVatRate: null,
        bedrooms: 0,
        otherRooms: 0,
        otherWhoLives: "",
        previousHomeDetails: {
          address1: "",
          address2: "",
          locationName: "",
          locationCode: "",
          town: "",
          county: "",
          postCode: "",
          countryPrefix: "",
          country: "",
          fax: "",
          vatRate: "",
        },
      },
      family: {
        maritalStatus: "",
        spouseName: "",
        marriageDate: null,
        whereGotMarried: "",
        spouseDob: "",
        spouseNationality: "",
        spousePassportNumber: "",
        whereDidYouMeet: "",
        whenDidRelationshipBegan: "",
        whenLastSawEachOther: null,
        isLiveTogether: true,
        whichDateStartedLivingTogether: null,
        isChildren: true,
        numberOfChildren: 0,
        childDetails: null,
        isMarriedBefore: true,
        exName: null,
        exNationality: "",
        marriageDateWithEx: null,
        divorceDateWithEx: null,
        isCurrentPartnerMarriedBefore: null,
        currentPartnerExName: "",
        currentPartnerExDob: null,
        currentPartnerExNationality: "",
        currentPartnerExMarriageDate: null,
        currentPartnerExDivorceDate: null,
        isFamilyFriendsInHomeCountry: null,
        relativeName: "",
        relationship: "",
      },
      languageProficiency: {
        isDegreeTaughtInEnglish: true,
        isPassedAnyEnglishTest: true,
        testType: "",
      },
      education: {
        qualification: "",
        awardingInstitute: "",
        grade: "",
        courseSubject: "",
        courseLength: "",
        yearOfAward: "",
        countryOfAward: "",
        state: "",
      },
      employment: {
        isEmployed: true,
        jobStartDate: "",
        employerName: "",
        employerTelephone: "",
        employerEmail: "",
        annualSalary: "",
        jobTitle: "",
        employerAddress1: "",
        employerAddress2: "",
        employerLocation: "",
        employerLocationCode: "",
        employerTown: "",
        employerCounty: "",
        employerPostCode: "",
        employerCountryPrefix: "",
        employerCountry: "",
        employerFax: "",
        employerVatRate: "",
        unEmployedReason: "",
      },
      maintenance: {
        bankName: "",
        isRegisteredFinancialInstitute: "",
        countryFundsHeldIn: "",
        currencyFundsHeldIn: "",
        amountHeld: "",
        fundsDateHeldFrom: "",
      },
      travel: {
        areYouCurrentlyInUk: true,
        countryVisited: "",
        ukLeaveDate: "",
        returnDate: "",
        reasonForVisit: "",
        numberOfVisitsToUk: "",
        lastUkVisits: null,
        isVisitedUkIllegally: true,
        illegalVisitDetail: "",
        isStayedBeyondExpiryDateInUk: true,
        reasonForStayingExpiryDateInUk: "",
        everBeenToUkOrAnyCountry: "",
        isBreachedLeaveConditions: true,
        reasonForBreachedLeave: "",
        isWorkedWithoutPermission: true,
        reasonForWorkedWithoutPermission: "",
        isReceivedPublicFunds: true,
        detailsForPublicFunds: "",
        everGivenFalseInfoForApplyingVisa: true,
        reasonForFalseInformation: "",
        everUsedDeceptionInPrevVisaApplication: true,
        reasonForDeception: "",
        everBreachedOtherImmigrationLaws: true,
        reasonForBreachingImmigrationLaw: "",
        everRefusedVisaOrBorderEntry: true,
        reasonForRefusedEntry: "",
        everRefusedPermissionToStay: true,
        reasonForRefusedPermissionToStay: "",
        everRefusedAsylum: true,
        reasonForRefusedAsylum: "",
        everDeported: true,
        reasonForDeported: "",
        everBannedFromAnyCountry: true,
        reasonForBanned: "",
      },
      character: {
        everChargedWithCriminalOffence: true,
        reasonForCharged: "",
        isPendingProsecutions: true,
        reasonForPendingProsecutions: "",
        isTerroristViews: true,
        reasonForTerroristViews: "",
        isWorkedForJudiciary: true,
        reasonForJudiciaryWork: "",
      },
    },
  });

  // console.log(data);
  const app = data?.application?.phase4;
  const {
    general,
    accommodation,
    family,
    languageProficiency,
    education,
    employment,
    maintenance,
    travel,
  } = app ? app : {};
  // console.log("Application",app);
  const {
    fullName,
    isKnownByOtherName,
    previousName,
    prevNameFrom,
    prevNameTo,
    countryOfBirth,
    placeOfBirth,
    currentNationality,
    isOtherNationality,
    otherNationality,
    nationalityFrom,
    nationalityUntill,
    currentPassportNumber,
    passportIssueDate,
    passportExpiryDate,
    issuingAuthority,
    passportPlaceOfIssue,
    isNationalIDCard,
    idCardNumber,
    idCardIssueDate,
    isBrp,
    brpNumber,
    brpIssueDate,
    motherName,
    motherDob,
    motherNationality,
    motherCountry,
    motherPlaceOfBirth,
    fatherName,
    fatherDob,
    fatherNationality,
    fatherCountry,
    fatherPlaceOfBirth,
    isUKNINumber,
    ukNINumber,
    niNumberIssueDate,
    isUKDrivingLicense,
    ukDrivingLicenseNumber,
    ukLicenseIssueDate,
    email,
    mobileNumber,
  } = app?.general || {};

  const {
    address1,
    address2,
    locationName,
    locationCode,
    town,
    county,
    postCode,
    countryPrefix,
    country,
    fax,
    vatRate,
    moveInDate,
    timeLivedAtCurrentAddress,
    homeType,
    otherHomeDetails,
    landLordName,
    landLordEmail,
    landLordTelephone,
    landLordAddress1,
    landLordAddress2,
    landLordLocationName,
    landLordLocationCode,
    landLordTown,
    landLordCounty,
    landLordPostCode,
    landLordCountryPrefix,
    landLordCountry,
    landLordFax,
    landLordVatRate,
    bedrooms,
    otherRooms,
    otherWhoLives,
    previousHomeDetails,
  } = app?.accommodation || {};

  const {
    maritalStatus,
    spouseName,
    isMarried,
    marriageDate,
    whereGotMarried,
    spouseDob,
    spouseNationality,
    spousePassportNumber,
    whereDidYouMeet,
    whenDidRelationshipBegan,
    whenLastSawEachOther,
    isLiveTogether,
    whichDateStartedLivingTogether,
    isChildren,
    numberOfChildren,
    childDetails,
    isMarriedBefore,
    exName,
    exDob,
    exNationality,
    marriageDateWithEx,
    divorceDateWithEx,
    isCurrentPartnerMarriedBefore,
    currentPartnerExName,
    currentPartnerExDob,
    currentPartnerExNationality,
    currentPartnerExMarriageDate,
    currentPartnerExDivorceDate,
    isFamilyFriendsInHomeCountry,
    relativeName,
    relationship,
  } = app?.family || {};

  const { isDegreeTaughtInEnglish, isPassedAnyEnglishTest, testType } =
    app?.languageProficiency || {};

  const {
    qualification,
    awardingInstitute,
    grade,
    courseSubject,
    courseLength,
    yearOfAward,
    countryOfAward,
    state,
  } = app?.education || {};

  const {
    isEmployed,
    jobStartDate,
    employerName,
    employerTelephone,
    employerEmail,
    annualSalary,
    jobTitle,
    employerAddress1,
    employerAddress2,
    employerLocation,
    employerLocationCode,
    employerTown,
    employerCounty,
    employerPostCode,
    employerCountryPrefix,
    employerCountry,
    employerFax,
    employerVatRate,
    unEmployedReason,
  } = app?.employment || {};

  const {
    bankName,
    isRegisteredFinancialInstitute,
    countryFundsHeldIn,
    currencyFundsHeldIn,
    amountHeld,
    fundsDateHeldFrom,
  } = app?.maintenance || {};

  const {
    areYouCurrentlyInUk,
    countryVisited,
    ukLeaveDate,
    returnDate,
    reasonForVisit,
    numberOfVisitsToUk,
    lastUkVisits,
    isVisitedUkIllegally,
    illegalVisitDetail,
    isStayedBeyondExpiryDateInUk,
    reasonForStayingExpiryDateInUk,
    everBeenToUkOrAnyCountry,
    isBreachedLeaveConditions,
    reasonForBreachedLeave,
    isWorkedWithoutPermission,
    reasonForWorkedWithoutPermission,
    isReceivedPublicFunds,
    detailsForPublicFunds,
    everGivenFalseInfoForApplyingVisa,
    reasonForFalseInformation,
    everUsedDeceptionInPrevVisaApplication,
    reasonForDeception,
    everBreachedOtherImmigrationLaws,
    reasonForBreachingImmigrationLaw,
    everRefusedVisaOrBorderEntry,
    reasonForRefusedEntry,
    everRefusedPermissionToStay,
    reasonForRefusedPermissionToStay,
    everRefusedAsylum,
    reasonForRefusedAsylum,
    everDeported,
    reasonForDeported,
    everBannedFromAnyCountry,
    reasonForBanned,
  } = app?.travel || {};

  const {
    everChargedWithCriminalOffence,
    reasonForCharged,
    isPendingProsecutions,
    reasonForPendingProsecutions,
    isTerroristViews,
    reasonForTerroristViews,
    isWorkedForJudiciary,
    reasonForJudiciaryWork,
  } = app?.character || {};

  const formattedChildDetails = childDetails?.map((child) => ({
    ...child,
    childDob: format(new Date(child.childDob), "yyyy-MM-dd"),
    childPassportIssueDate: child.childPassportIssueDate
      ? format(new Date(child.childPassportIssueDate), "yyyy-MM-dd")
      : "",
    childPassportExpiryDate: child.childPassportExpiryDate
      ? format(new Date(child.childPassportExpiryDate), "yyyy-MM-dd")
      : "",
    childVisaIssueDate: child.childVisaIssueDate
      ? format(new Date(child.childVisaIssueDate), "yyyy-MM-dd")
      : "",
    childVisaExpiryDate: child.childVisaExpiryDate
      ? format(new Date(child.childVisaExpiryDate), "yyyy-MM-dd")
      : "",
  }));

  const formattedTravelDetails = lastUkVisits?.map((child) => ({
    entryDate: format(new Date(child.entryDate), "yyyy-MM-dd"),
    departureDate: format(new Date(child.departureDate), "yyyy-MM-dd"),
    reasonForVisit: child.reasonForVisit,
  }));

  // Genral Phase Date Formating
  const prevNameFromDate = new Date(prevNameFrom);
  const prevNameToDate = new Date(prevNameTo);
  const nationalityFromDate = new Date(nationalityFrom);
  const nationalityUntillDate = new Date(nationalityUntill);
  const passportIssueDateObj = new Date(passportIssueDate);
  const passportExpiryDateObj = new Date(passportExpiryDate);
  const idCardIssueDateObj = new Date(idCardIssueDate);
  const brpIssueDateObj = new Date(brpIssueDate);
  const motherDobObj = new Date(motherDob);
  const fatherDobObj = new Date(fatherDob);
  const niNumberIssueDateObj = new Date(niNumberIssueDate);
  const ukLicenseIssueDateObj = new Date(ukLicenseIssueDate);

  // const initialValues = {
  //   phase4: {
  //     general: {
  //       fullName: fullName ? fullName : "",
  //       isKnownByOtherName:
  //         isKnownByOtherName === true
  //           ? true
  //           : isKnownByOtherName === false
  //           ? false
  //           : true,
  //       previousName: previousName ? previousName : "",
  //       prevNameFrom: prevNameFrom
  //         ? format(prevNameFromDate, "yyyy-MM-dd")
  //         : "",
  //       prevNameTo: prevNameTo ? format(prevNameToDate, "yyyy-MM-dd") : "",
  //       countryOfBirth: countryOfBirth ? countryOfBirth : "",
  //       placeOfBirth: placeOfBirth ? placeOfBirth : "",
  //       currentNationality: currentNationality ? currentNationality : "",
  //       isOtherNationality:
  //         isOtherNationality === true
  //           ? true
  //           : isOtherNationality === false
  //           ? false
  //           : true,
  //       otherNationality: otherNationality ? otherNationality : "",
  //       nationalityFrom: nationalityFrom
  //         ? format(nationalityFromDate, "yyyy-MM-dd")
  //         : "",
  //       nationalityUntill: nationalityUntill
  //         ? format(nationalityUntillDate, "yyyy-MM-dd")
  //         : "",
  //       currentPassportNumber: currentPassportNumber
  //         ? currentPassportNumber
  //         : "",
  //       passportIssueDate: passportIssueDate
  //         ? format(passportIssueDateObj, "yyyy-MM-dd")
  //         : "",
  //       passportExpiryDate: passportExpiryDate
  //         ? format(passportExpiryDateObj, "yyyy-MM-dd")
  //         : "",
  //       issuingAuthority: issuingAuthority ? issuingAuthority : "",
  //       passportPlaceOfIssue: passportPlaceOfIssue ? passportPlaceOfIssue : "",
  //       isNationalIDCard:
  //         isNationalIDCard === true
  //           ? true
  //           : isNationalIDCard === false
  //           ? false
  //           : true,
  //       idCardNumber: idCardNumber ? idCardNumber : "",
  //       idCardIssueDate: idCardIssueDate
  //         ? format(idCardIssueDateObj, "yyyy-MM-dd")
  //         : "",
  //       isBrp: isBrp === true ? true : isBrp === false ? false : true,
  //       brpNumber: brpNumber ? brpNumber : "",
  //       brpIssueDate: brpIssueDate ? format(brpIssueDateObj, "yyyy-MM-dd") : "",
  //       motherName: motherName ? motherName : "",
  //       motherDob: motherDob ? format(motherDobObj, "yyyy-MM-dd") : "",
  //       motherNationality: motherNationality ? motherNationality : "",
  //       motherCountry: motherCountry ? motherCountry : "",
  //       motherPlaceOfBirth: motherPlaceOfBirth ? motherPlaceOfBirth : "",
  //       fatherName: fatherName ? fatherName : "",
  //       fatherDob: fatherDob ? format(fatherDobObj, "yyyy-MM-dd") : "",
  //       fatherNationality: fatherNationality ? fatherNationality : "",
  //       fatherCountry: fatherCountry ? fatherCountry : "",
  //       fatherPlaceOfBirth: fatherPlaceOfBirth ? fatherPlaceOfBirth : "",
  //       isUKNINumber:
  //         isUKNINumber === true ? true : isUKNINumber === false ? false : true,
  //       ukNINumber: ukNINumber ? ukNINumber : "",
  //       niNumberIssueDate: niNumberIssueDate
  //         ? format(niNumberIssueDateObj, "yyyy-MM-dd")
  //         : "",
  //       isUKDrivingLicense:
  //         isUKDrivingLicense === true
  //           ? true
  //           : isUKDrivingLicense === false
  //           ? false
  //           : true,
  //       ukDrivingLicenseNumber: ukDrivingLicenseNumber
  //         ? ukDrivingLicenseNumber
  //         : "",
  //       ukLicenseIssueDate: ukLicenseIssueDate
  //         ? format(ukLicenseIssueDateObj, "yyyy-MM-dd")
  //         : "",
  //       email: email ? email : "",
  //       mobileNumber: mobileNumber ? mobileNumber : "",
  //     },
  //     accommodation: {
  //       address1: address1 ? address1 : "",
  //       address2: address2 ? address2 : "",
  //       locationName: locationName ? locationName : "",
  //       locationCode: locationCode ? locationCode : "",
  //       town: town ? town : "",
  //       county: county ? county : "",
  //       postCode: postCode ? postCode : "",
  //       countryPrefix: countryPrefix ? countryPrefix : "",
  //       country: country ? country : "",
  //       fax: fax ? fax : "",
  //       vatRate: vatRate ? vatRate : "",
  //       moveInDate: moveInDate
  //         ? format(new Date(moveInDate), "yyyy-MM-dd")
  //         : null,
  //       timeLivedAtCurrentAddress: timeLivedAtCurrentAddress
  //         ? timeLivedAtCurrentAddress
  //         : "",
  //       homeType: homeType ? homeType : "",
  //       otherHomeDetails: otherHomeDetails ? otherHomeDetails : "",
  //       landLordName: landLordName ? landLordName : "",
  //       landLordEmail: landLordEmail ? landLordEmail : "",
  //       landLordTelephone: landLordTelephone ? landLordTelephone : "",
  //       landLordAddress1: landLordAddress1 ? landLordAddress1 : "",
  //       landLordAddress2: landLordAddress2 ? landLordAddress2 : "",
  //       landLordLocationName: landLordLocationName ? landLordLocationName : "",
  //       landLordLocationCode: landLordLocationCode ? landLordLocationCode : "",
  //       landLordCounty: landLordCounty ? landLordCounty : "",
  //       landLordTown: landLordTown ? landLordTown : "",
  //       landLordPostCode: landLordPostCode ? landLordPostCode : "",
  //       landLordCountryPrefix: landLordCountryPrefix
  //         ? landLordCountryPrefix
  //         : "",
  //       landLordCountry: landLordCountry ? landLordCountry : "",
  //       landLordFax: landLordFax ? landLordFax : null,
  //       landLordVatRate: landLordVatRate ? landLordVatRate : null,
  //       bedrooms: bedrooms ? bedrooms : 0,
  //       otherRooms: otherRooms ? otherRooms : 0,
  //       otherWhoLives: otherWhoLives ? otherWhoLives : "",
  //       previousHomeDetails: {
  //         address1:
  //           previousHomeDetails && previousHomeDetails.address1
  //             ? previousHomeDetails.address1
  //             : "",
  //         address2:
  //           previousHomeDetails && previousHomeDetails.address2
  //             ? previousHomeDetails.address2
  //             : "",
  //         locationName:
  //           previousHomeDetails && previousHomeDetails.locationName
  //             ? previousHomeDetails.locationName
  //             : "",
  //         locationCode:
  //           previousHomeDetails && previousHomeDetails.locationCode
  //             ? previousHomeDetails.locationCode
  //             : "",
  //         town:
  //           previousHomeDetails && previousHomeDetails.town
  //             ? previousHomeDetails.town
  //             : "",
  //         county:
  //           previousHomeDetails && previousHomeDetails.county
  //             ? previousHomeDetails.county
  //             : "",
  //         postCode:
  //           previousHomeDetails && previousHomeDetails.postCode
  //             ? previousHomeDetails.postCode
  //             : "",
  //         countryPrefix:
  //           previousHomeDetails && previousHomeDetails.countryPrefix
  //             ? previousHomeDetails.countryPrefix
  //             : "",
  //         country:
  //           previousHomeDetails && previousHomeDetails.country
  //             ? previousHomeDetails.country
  //             : "",
  //         fax:
  //           previousHomeDetails && previousHomeDetails.fax
  //             ? previousHomeDetails.fax
  //             : "",
  //         vatRate:
  //           previousHomeDetails && previousHomeDetails.vatRate
  //             ? previousHomeDetails.vatRate
  //             : "",
  //       },
  //     },
  //     family: {
  //       maritalStatus: maritalStatus ? maritalStatus : "",
  //       spouseName: spouseName ? spouseName : "",
  //       marriageDate: marriageDate
  //         ? format(new Date(marriageDate), "yyyy-MM-dd")
  //         : null,
  //       whereGotMarried: whereGotMarried ? whereGotMarried : "",
  //       spouseDob: spouseDob ? format(new Date(spouseDob), "yyyy-MM-dd") : "",
  //       spouseNationality: spouseNationality ? spouseNationality : "",
  //       spousePassportNumber: spousePassportNumber ? spousePassportNumber : "",
  //       whereDidYouMeet: whereDidYouMeet ? whereDidYouMeet : "",
  //       whenDidRelationshipBegan: whenDidRelationshipBegan
  //         ? whenDidRelationshipBegan
  //         : "",
  //       whenLastSawEachOther: whenLastSawEachOther
  //         ? format(new Date(whenLastSawEachOther), "yyyy-MM-dd")
  //         : null,
  //       isLiveTogether:
  //         isLiveTogether === true
  //           ? true
  //           : isLiveTogether === false
  //           ? false
  //           : true,
  //       whichDateStartedLivingTogether: whichDateStartedLivingTogether
  //         ? format(new Date(whichDateStartedLivingTogether), "yyyy-MM-dd")
  //         : null,
  //       isChildren:
  //         isChildren === true ? true : isChildren === false ? false : true,
  //       numberOfChildren: numberOfChildren ? numberOfChildren : 0,
  //       childDetails:
  //         childDetails?.length > 0 ? formattedChildDetails : childDetailsArr,
  //       isMarriedBefore:
  //         isMarriedBefore === true
  //           ? true
  //           : isMarriedBefore === false
  //           ? false
  //           : true,
  //       exName: exName ? exName : "",
  //       exDob: exDob ? format(new Date(exDob), "yyyy-MM-dd") : null,
  //       exNationality: exNationality ? exNationality : "",
  //       marriageDateWithEx: marriageDateWithEx
  //         ? format(new Date(marriageDateWithEx), "yyyy-MM-dd")
  //         : null,
  //       divorceDateWithEx: divorceDateWithEx
  //         ? format(new Date(divorceDateWithEx), "yyyy-MM-dd")
  //         : null,
  //       isCurrentPartnerMarriedBefore: isCurrentPartnerMarriedBefore
  //         ? isCurrentPartnerMarriedBefore
  //         : null,
  //       currentPartnerExName: currentPartnerExName ? currentPartnerExName : "",
  //       currentPartnerExDob: currentPartnerExDob
  //         ? format(new Date(currentPartnerExDob), "yyyy-MM-dd")
  //         : null,
  //       currentPartnerExNationality: currentPartnerExNationality
  //         ? currentPartnerExNationality
  //         : "",
  //       currentPartnerExMarriageDate: currentPartnerExMarriageDate
  //         ? format(new Date(currentPartnerExMarriageDate), "yyyy-MM-dd")
  //         : null,
  //       currentPartnerExDivorceDate: currentPartnerExDivorceDate
  //         ? format(new Date(currentPartnerExDivorceDate), "yyyy-MM-dd")
  //         : null,
  //       isFamilyFriendsInHomeCountry: isFamilyFriendsInHomeCountry
  //         ? isFamilyFriendsInHomeCountry
  //         : null,
  //       relativeName: relativeName ? relativeName : "",
  //       relationship: relationship ? relationship : "",
  //     },
  //     languageProficiency: {
  //       isDegreeTaughtInEnglish:
  //         isDegreeTaughtInEnglish === true
  //           ? true
  //           : isDegreeTaughtInEnglish === false
  //           ? false
  //           : true,
  //       isPassedAnyEnglishTest:
  //         isPassedAnyEnglishTest === true
  //           ? true
  //           : isPassedAnyEnglishTest === false
  //           ? false
  //           : true,
  //       testType: testType ? testType : "",
  //     },
  //     education: {
  //       qualification: qualification ? qualification : "",
  //       awardingInstitute: awardingInstitute ? awardingInstitute : "",
  //       grade: grade ? grade : "",
  //       courseSubject: courseSubject ? courseSubject : "",
  //       courseLength: courseLength ? courseLength : "",
  //       yearOfAward: yearOfAward ? yearOfAward : "",
  //       countryOfAward: countryOfAward ? countryOfAward : "",
  //       state: state ? state : "",
  //     },
  //     employment: {
  //       isEmployed:
  //         isEmployed === true ? true : isEmployed === false ? false : true,
  //       jobStartDate: jobStartDate
  //         ? format(new Date(jobStartDate), "yyyy-MM-dd")
  //         : "",
  //       employerName: employerName ? employerName : "",
  //       employerTelephone: employerTelephone ? employerTelephone : "",
  //       employerEmail: employerEmail ? employerEmail : "",
  //       annualSalary: annualSalary ? annualSalary : "",
  //       jobTitle: jobTitle ? jobTitle : "",
  //       employerAddress1: employerAddress1 ? employerAddress1 : "",
  //       employerAddress2: employerAddress2 ? employerAddress2 : "",
  //       employerLocation: employerLocation ? employerLocation : "",
  //       employerLocationCode: employerLocationCode ? employerLocationCode : "",
  //       employerTown: employerTown ? employerTown : "",
  //       employerCounty: employerCounty ? employerCounty : "",
  //       employerPostCode: employerPostCode ? employerPostCode : "",
  //       employerCountryPrefix: employerCountryPrefix
  //         ? employerCountryPrefix
  //         : "",
  //       employerCountry: employerCountry ? employerCountry : "",
  //       employerFax: employerFax ? employerFax : "",
  //       employerVatRate: employerVatRate ? employerVatRate : "",
  //       unEmployedReason: unEmployedReason ? unEmployedReason : "",
  //     },
  //     maintenance: {
  //       bankName: bankName ? bankName : "",
  //       isRegisteredFinancialInstitute: isRegisteredFinancialInstitute
  //         ? isRegisteredFinancialInstitute
  //         : "",
  //       countryFundsHeldIn: countryFundsHeldIn ? countryFundsHeldIn : "",
  //       currencyFundsHeldIn: currencyFundsHeldIn ? currencyFundsHeldIn : "",
  //       amountHeld: amountHeld ? amountHeld : "",
  //       fundsDateHeldFrom: fundsDateHeldFrom
  //         ? format(new Date(fundsDateHeldFrom), "yyyy-MM-dd")
  //         : "",
  //     },
  //     travel: {
  //       areYouCurrentlyInUk:
  //         areYouCurrentlyInUk == true
  //           ? true
  //           : areYouCurrentlyInUk == false
  //           ? false
  //           : true,
  //       countryVisited: countryVisited ? countryVisited : "",
  //       ukLeaveDate: ukLeaveDate
  //         ? format(new Date(ukLeaveDate), "yyyy-MM-dd")
  //         : "",
  //       returnDate: returnDate
  //         ? format(new Date(returnDate), "yyyy-MM-dd")
  //         : "",
  //       reasonForVisit: reasonForVisit ? reasonForVisit : "",
  //       numberOfVisitsToUk: numberOfVisitsToUk > 0 ? numberOfVisitsToUk : "",
  //       lastUkVisits:
  //         lastUkVisits?.length > 0 ? formattedTravelDetails : lastVisitsToUk,
  //       isVisitedUkIllegally:
  //         isVisitedUkIllegally === true
  //           ? true
  //           : isVisitedUkIllegally === false
  //           ? false
  //           : true,
  //       illegalVisitDetail: illegalVisitDetail ? illegalVisitDetail : "",
  //       isStayedBeyondExpiryDateInUk:
  //         isStayedBeyondExpiryDateInUk === true
  //           ? true
  //           : isStayedBeyondExpiryDateInUk === false
  //           ? false
  //           : true,
  //       reasonForStayingExpiryDateInUk: reasonForStayingExpiryDateInUk
  //         ? reasonForStayingExpiryDateInUk
  //         : "",
  //       everBeenToUkOrAnyCountry: everBeenToUkOrAnyCountry
  //         ? everBeenToUkOrAnyCountry
  //         : "",
  //       isBreachedLeaveConditions:
  //         isBreachedLeaveConditions === true
  //           ? true
  //           : isBreachedLeaveConditions === false
  //           ? false
  //           : true,
  //       reasonForBreachedLeave: reasonForBreachedLeave
  //         ? reasonForBreachedLeave
  //         : "",
  //       isWorkedWithoutPermission:
  //         isWorkedWithoutPermission === true
  //           ? true
  //           : isWorkedWithoutPermission === false
  //           ? false
  //           : true,
  //       reasonForWorkedWithoutPermission: reasonForWorkedWithoutPermission
  //         ? reasonForWorkedWithoutPermission
  //         : "",
  //       isReceivedPublicFunds:
  //         isReceivedPublicFunds === true
  //           ? true
  //           : isReceivedPublicFunds === false
  //           ? false
  //           : true,
  //       detailsForPublicFunds: detailsForPublicFunds
  //         ? detailsForPublicFunds
  //         : "",
  //       everGivenFalseInfoForApplyingVisa:
  //         everGivenFalseInfoForApplyingVisa === true
  //           ? true
  //           : everGivenFalseInfoForApplyingVisa === false
  //           ? false
  //           : true,
  //       reasonForFalseInformation: reasonForFalseInformation
  //         ? reasonForFalseInformation
  //         : "",
  //       everUsedDeceptionInPrevVisaApplication:
  //         everUsedDeceptionInPrevVisaApplication === true
  //           ? true
  //           : everUsedDeceptionInPrevVisaApplication === false
  //           ? false
  //           : true,
  //       reasonForDeception: reasonForDeception ? reasonForDeception : "",
  //       everBreachedOtherImmigrationLaws:
  //         everBreachedOtherImmigrationLaws === true
  //           ? true
  //           : everBreachedOtherImmigrationLaws === false
  //           ? false
  //           : true,
  //       reasonForBreachingImmigrationLaw: reasonForBreachingImmigrationLaw
  //         ? reasonForBreachingImmigrationLaw
  //         : "",
  //       everRefusedVisaOrBorderEntry:
  //         everRefusedVisaOrBorderEntry === true
  //           ? true
  //           : everRefusedVisaOrBorderEntry === false
  //           ? false
  //           : true,
  //       reasonForRefusedEntry: reasonForRefusedEntry
  //         ? reasonForRefusedEntry
  //         : "",
  //       everRefusedPermissionToStay:
  //         everRefusedPermissionToStay === true
  //           ? true
  //           : everRefusedPermissionToStay === false
  //           ? false
  //           : true,
  //       reasonForRefusedPermissionToStay: reasonForRefusedPermissionToStay
  //         ? reasonForRefusedPermissionToStay
  //         : "",
  //       everRefusedAsylum:
  //         everRefusedAsylum === true
  //           ? true
  //           : everRefusedAsylum === false
  //           ? false
  //           : true,
  //       reasonForRefusedAsylum: reasonForRefusedAsylum
  //         ? reasonForRefusedAsylum
  //         : "",
  //       everDeported:
  //         everDeported === true ? true : everDeported === false ? false : true,
  //       reasonForDeported: reasonForDeported ? reasonForDeported : "",
  //       everBannedFromAnyCountry:
  //         everBannedFromAnyCountry === true
  //           ? true
  //           : everBannedFromAnyCountry === false
  //           ? false
  //           : true,
  //       reasonForBanned: reasonForBanned ? reasonForBanned : "",
  //     },
  //     character: {
  //       everChargedWithCriminalOffence:
  //         everChargedWithCriminalOffence === true
  //           ? true
  //           : everChargedWithCriminalOffence === false
  //           ? false
  //           : true,
  //       reasonForCharged: reasonForCharged ? reasonForCharged : "",
  //       isPendingProsecutions:
  //         isPendingProsecutions === true
  //           ? true
  //           : isPendingProsecutions === false
  //           ? false
  //           : true,
  //       reasonForPendingProsecutions: reasonForPendingProsecutions
  //         ? reasonForPendingProsecutions
  //         : "",
  //       isTerroristViews:
  //         isTerroristViews === true
  //           ? true
  //           : isTerroristViews === false
  //           ? false
  //           : true,
  //       reasonForTerroristViews: reasonForTerroristViews
  //         ? reasonForTerroristViews
  //         : "",
  //       isWorkedForJudiciary:
  //         isWorkedForJudiciary === true
  //           ? true
  //           : isWorkedForJudiciary === false
  //           ? false
  //           : true,
  //       reasonForJudiciaryWork: reasonForJudiciaryWork
  //         ? reasonForJudiciaryWork
  //         : "",
  //     },
  //   },
  // };

  const topDivRef = useRef();

  // const [activeTab, setActiveTab] = useState(
  //   !general
  //     ? "/phase4"
  //     : !accommodation
  //     ? "/accommodation"
  //     : !family
  //     ? "/family"
  //     : !languageProficiency
  //     ? "/languageprofeciency"
  //     : !education
  //     ? "/education"
  //     : !employment
  //     ? "/employement"
  //     : !maintenance
  //     ? "/maintenance"
  //     : !travel
  //     ? "/travel"
  //     : "/character"
  // );
  const [activeTab, setActiveTab] = useState("/phase4");

  useEffect(() => {
    if (topDivRef.current) {
      topDivRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    if (data?.application) {
      setIsAllowed(true);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.application) {
      setInitialValues({
        phase4: {
          general: {
            fullName: fullName ? fullName : "",
            isKnownByOtherName:
              isKnownByOtherName === true
                ? true
                : isKnownByOtherName === false
                ? false
                : true,
            previousName: previousName ? previousName : "",
            prevNameFrom: prevNameFrom
              ? format(prevNameFromDate, "yyyy-MM-dd")
              : "",
            prevNameTo: prevNameTo ? format(prevNameToDate, "yyyy-MM-dd") : "",
            countryOfBirth: countryOfBirth ? countryOfBirth : "",
            placeOfBirth: placeOfBirth ? placeOfBirth : "",
            currentNationality: currentNationality ? currentNationality : "",
            isOtherNationality:
              isOtherNationality === true
                ? true
                : isOtherNationality === false
                ? false
                : true,
            otherNationality: otherNationality ? otherNationality : "",
            nationalityFrom: nationalityFrom
              ? format(nationalityFromDate, "yyyy-MM-dd")
              : "",
            nationalityUntill: nationalityUntill
              ? format(nationalityUntillDate, "yyyy-MM-dd")
              : "",
            currentPassportNumber: currentPassportNumber
              ? currentPassportNumber
              : "",
            passportIssueDate: passportIssueDate
              ? format(passportIssueDateObj, "yyyy-MM-dd")
              : "",
            passportExpiryDate: passportExpiryDate
              ? format(passportExpiryDateObj, "yyyy-MM-dd")
              : "",
            issuingAuthority: issuingAuthority ? issuingAuthority : "",
            passportPlaceOfIssue: passportPlaceOfIssue
              ? passportPlaceOfIssue
              : "",
            isNationalIDCard:
              isNationalIDCard === true
                ? true
                : isNationalIDCard === false
                ? false
                : true,
            idCardNumber: idCardNumber ? idCardNumber : "",
            idCardIssueDate: idCardIssueDate
              ? format(idCardIssueDateObj, "yyyy-MM-dd")
              : "",
            isBrp: isBrp === true ? true : isBrp === false ? false : true,
            brpNumber: brpNumber ? brpNumber : "",
            brpIssueDate: brpIssueDate
              ? format(brpIssueDateObj, "yyyy-MM-dd")
              : "",
            motherName: motherName ? motherName : "",
            motherDob: motherDob ? format(motherDobObj, "yyyy-MM-dd") : "",
            motherNationality: motherNationality ? motherNationality : "",
            motherCountry: motherCountry ? motherCountry : "",
            motherPlaceOfBirth: motherPlaceOfBirth ? motherPlaceOfBirth : "",
            fatherName: fatherName ? fatherName : "",
            fatherDob: fatherDob ? format(fatherDobObj, "yyyy-MM-dd") : "",
            fatherNationality: fatherNationality ? fatherNationality : "",
            fatherCountry: fatherCountry ? fatherCountry : "",
            fatherPlaceOfBirth: fatherPlaceOfBirth ? fatherPlaceOfBirth : "",
            isUKNINumber:
              isUKNINumber === true
                ? true
                : isUKNINumber === false
                ? false
                : true,
            ukNINumber: ukNINumber ? ukNINumber : "",
            niNumberIssueDate: niNumberIssueDate
              ? format(niNumberIssueDateObj, "yyyy-MM-dd")
              : "",
            isUKDrivingLicense:
              isUKDrivingLicense === true
                ? true
                : isUKDrivingLicense === false
                ? false
                : true,
            ukDrivingLicenseNumber: ukDrivingLicenseNumber
              ? ukDrivingLicenseNumber
              : "",
            ukLicenseIssueDate: ukLicenseIssueDate
              ? format(ukLicenseIssueDateObj, "yyyy-MM-dd")
              : "",
            email: email ? email : "",
            mobileNumber: mobileNumber ? mobileNumber : "",
          },
          accommodation: {
            address1: address1 ? address1 : "",
            address2: address2 ? address2 : "",
            locationName: locationName ? locationName : "",
            locationCode: locationCode ? locationCode : "",
            town: town ? town : "",
            county: county ? county : "",
            postCode: postCode ? postCode : "",
            countryPrefix: countryPrefix ? countryPrefix : "",
            country: country ? country : "",
            fax: fax ? fax : "",
            vatRate: vatRate ? vatRate : "",
            moveInDate: moveInDate
              ? format(new Date(moveInDate), "yyyy-MM-dd")
              : null,
            timeLivedAtCurrentAddress: timeLivedAtCurrentAddress
              ? timeLivedAtCurrentAddress
              : "",
            homeType: homeType ? homeType : "",
            otherHomeDetails: otherHomeDetails ? otherHomeDetails : "",
            landLordName: landLordName ? landLordName : "",
            landLordEmail: landLordEmail ? landLordEmail : "",
            landLordTelephone: landLordTelephone ? landLordTelephone : "",
            landLordAddress1: landLordAddress1 ? landLordAddress1 : "",
            landLordAddress2: landLordAddress2 ? landLordAddress2 : "",
            landLordLocationName: landLordLocationName
              ? landLordLocationName
              : "",
            landLordLocationCode: landLordLocationCode
              ? landLordLocationCode
              : "",
            landLordCounty: landLordCounty ? landLordCounty : "",
            landLordTown: landLordTown ? landLordTown : "",
            landLordPostCode: landLordPostCode ? landLordPostCode : "",
            landLordCountryPrefix: landLordCountryPrefix
              ? landLordCountryPrefix
              : "",
            landLordCountry: landLordCountry ? landLordCountry : "",
            landLordFax: landLordFax ? landLordFax : null,
            landLordVatRate: landLordVatRate ? landLordVatRate : null,
            bedrooms: bedrooms ? bedrooms : 0,
            otherRooms: otherRooms ? otherRooms : 0,
            otherWhoLives: otherWhoLives ? otherWhoLives : "",
            previousHomeDetails: {
              address1:
                previousHomeDetails && previousHomeDetails.address1
                  ? previousHomeDetails.address1
                  : "",
              address2:
                previousHomeDetails && previousHomeDetails.address2
                  ? previousHomeDetails.address2
                  : "",
              locationName:
                previousHomeDetails && previousHomeDetails.locationName
                  ? previousHomeDetails.locationName
                  : "",
              locationCode:
                previousHomeDetails && previousHomeDetails.locationCode
                  ? previousHomeDetails.locationCode
                  : "",
              town:
                previousHomeDetails && previousHomeDetails.town
                  ? previousHomeDetails.town
                  : "",
              county:
                previousHomeDetails && previousHomeDetails.county
                  ? previousHomeDetails.county
                  : "",
              postCode:
                previousHomeDetails && previousHomeDetails.postCode
                  ? previousHomeDetails.postCode
                  : "",
              countryPrefix:
                previousHomeDetails && previousHomeDetails.countryPrefix
                  ? previousHomeDetails.countryPrefix
                  : "",
              country:
                previousHomeDetails && previousHomeDetails.country
                  ? previousHomeDetails.country
                  : "",
              fax:
                previousHomeDetails && previousHomeDetails.fax
                  ? previousHomeDetails.fax
                  : "",
              vatRate:
                previousHomeDetails && previousHomeDetails.vatRate
                  ? previousHomeDetails.vatRate
                  : "",
            },
          },
          family: {
            maritalStatus: maritalStatus ? maritalStatus : "",
            spouseName: spouseName ? spouseName : "",
            marriageDate: marriageDate
              ? format(new Date(marriageDate), "yyyy-MM-dd")
              : null,
            whereGotMarried: whereGotMarried ? whereGotMarried : "",
            spouseDob: spouseDob
              ? format(new Date(spouseDob), "yyyy-MM-dd")
              : "",
            spouseNationality: spouseNationality ? spouseNationality : "",
            spousePassportNumber: spousePassportNumber
              ? spousePassportNumber
              : "",
            whereDidYouMeet: whereDidYouMeet ? whereDidYouMeet : "",
            whenDidRelationshipBegan: whenDidRelationshipBegan
              ? whenDidRelationshipBegan
              : "",
            whenLastSawEachOther: whenLastSawEachOther
              ? format(new Date(whenLastSawEachOther), "yyyy-MM-dd")
              : null,
            isLiveTogether:
              isLiveTogether === true
                ? true
                : isLiveTogether === false
                ? false
                : true,
            whichDateStartedLivingTogether: whichDateStartedLivingTogether
              ? format(new Date(whichDateStartedLivingTogether), "yyyy-MM-dd")
              : null,
            isChildren:
              isChildren === true ? true : isChildren === false ? false : true,
            numberOfChildren: numberOfChildren ? numberOfChildren : 0,
            childDetails:
              childDetails?.length > 0
                ? formattedChildDetails
                : childDetailsArr,
            isMarriedBefore:
              isMarriedBefore === true
                ? true
                : isMarriedBefore === false
                ? false
                : true,
            exName: exName ? exName : "",
            exDob: exDob ? format(new Date(exDob), "yyyy-MM-dd") : null,
            exNationality: exNationality ? exNationality : "",
            marriageDateWithEx: marriageDateWithEx
              ? format(new Date(marriageDateWithEx), "yyyy-MM-dd")
              : null,
            divorceDateWithEx: divorceDateWithEx
              ? format(new Date(divorceDateWithEx), "yyyy-MM-dd")
              : null,
            isCurrentPartnerMarriedBefore: isCurrentPartnerMarriedBefore
              ? isCurrentPartnerMarriedBefore
              : null,
            currentPartnerExName: currentPartnerExName
              ? currentPartnerExName
              : "",
            currentPartnerExDob: currentPartnerExDob
              ? format(new Date(currentPartnerExDob), "yyyy-MM-dd")
              : null,
            currentPartnerExNationality: currentPartnerExNationality
              ? currentPartnerExNationality
              : "",
            currentPartnerExMarriageDate: currentPartnerExMarriageDate
              ? format(new Date(currentPartnerExMarriageDate), "yyyy-MM-dd")
              : null,
            currentPartnerExDivorceDate: currentPartnerExDivorceDate
              ? format(new Date(currentPartnerExDivorceDate), "yyyy-MM-dd")
              : null,
            isFamilyFriendsInHomeCountry: isFamilyFriendsInHomeCountry
              ? isFamilyFriendsInHomeCountry
              : null,
            relativeName: relativeName ? relativeName : "",
            relationship: relationship ? relationship : "",
          },
          languageProficiency: {
            isDegreeTaughtInEnglish:
              isDegreeTaughtInEnglish === true
                ? true
                : isDegreeTaughtInEnglish === false
                ? false
                : true,
            isPassedAnyEnglishTest:
              isPassedAnyEnglishTest === true
                ? true
                : isPassedAnyEnglishTest === false
                ? false
                : true,
            testType: testType ? testType : "",
          },
          education: {
            qualification: qualification ? qualification : "",
            awardingInstitute: awardingInstitute ? awardingInstitute : "",
            grade: grade ? grade : "",
            courseSubject: courseSubject ? courseSubject : "",
            courseLength: courseLength ? courseLength : "",
            yearOfAward: yearOfAward ? yearOfAward : "",
            countryOfAward: countryOfAward ? countryOfAward : "",
            state: state ? state : "",
          },
          employment: {
            isEmployed:
              isEmployed === true ? true : isEmployed === false ? false : true,
            jobStartDate: jobStartDate
              ? format(new Date(jobStartDate), "yyyy-MM-dd")
              : "",
            employerName: employerName ? employerName : "",
            employerTelephone: employerTelephone ? employerTelephone : "",
            employerEmail: employerEmail ? employerEmail : "",
            annualSalary: annualSalary ? annualSalary : "",
            jobTitle: jobTitle ? jobTitle : "",
            employerAddress1: employerAddress1 ? employerAddress1 : "",
            employerAddress2: employerAddress2 ? employerAddress2 : "",
            employerLocation: employerLocation ? employerLocation : "",
            employerLocationCode: employerLocationCode
              ? employerLocationCode
              : "",
            employerTown: employerTown ? employerTown : "",
            employerCounty: employerCounty ? employerCounty : "",
            employerPostCode: employerPostCode ? employerPostCode : "",
            employerCountryPrefix: employerCountryPrefix
              ? employerCountryPrefix
              : "",
            employerCountry: employerCountry ? employerCountry : "",
            employerFax: employerFax ? employerFax : "",
            employerVatRate: employerVatRate ? employerVatRate : "",
            unEmployedReason: unEmployedReason ? unEmployedReason : "",
          },
          maintenance: {
            bankName: bankName ? bankName : "",
            isRegisteredFinancialInstitute: isRegisteredFinancialInstitute
              ? isRegisteredFinancialInstitute
              : "",
            countryFundsHeldIn: countryFundsHeldIn ? countryFundsHeldIn : "",
            currencyFundsHeldIn: currencyFundsHeldIn ? currencyFundsHeldIn : "",
            amountHeld: amountHeld ? amountHeld : "",
            fundsDateHeldFrom: fundsDateHeldFrom
              ? format(new Date(fundsDateHeldFrom), "yyyy-MM-dd")
              : "",
          },
          travel: {
            areYouCurrentlyInUk:
              areYouCurrentlyInUk == true
                ? true
                : areYouCurrentlyInUk == false
                ? false
                : true,
            countryVisited: countryVisited ? countryVisited : "",
            ukLeaveDate: ukLeaveDate
              ? format(new Date(ukLeaveDate), "yyyy-MM-dd")
              : "",
            returnDate: returnDate
              ? format(new Date(returnDate), "yyyy-MM-dd")
              : "",
            reasonForVisit: reasonForVisit ? reasonForVisit : "",
            numberOfVisitsToUk:
              numberOfVisitsToUk > 0 ? numberOfVisitsToUk : "",
            lastUkVisits:
              lastUkVisits?.length > 0
                ? formattedTravelDetails
                : lastVisitsToUk,
            isVisitedUkIllegally:
              isVisitedUkIllegally === true
                ? true
                : isVisitedUkIllegally === false
                ? false
                : true,
            illegalVisitDetail: illegalVisitDetail ? illegalVisitDetail : "",
            isStayedBeyondExpiryDateInUk:
              isStayedBeyondExpiryDateInUk === true
                ? true
                : isStayedBeyondExpiryDateInUk === false
                ? false
                : true,
            reasonForStayingExpiryDateInUk: reasonForStayingExpiryDateInUk
              ? reasonForStayingExpiryDateInUk
              : "",
            everBeenToUkOrAnyCountry: everBeenToUkOrAnyCountry
              ? everBeenToUkOrAnyCountry
              : "",
            isBreachedLeaveConditions:
              isBreachedLeaveConditions === true
                ? true
                : isBreachedLeaveConditions === false
                ? false
                : true,
            reasonForBreachedLeave: reasonForBreachedLeave
              ? reasonForBreachedLeave
              : "",
            isWorkedWithoutPermission:
              isWorkedWithoutPermission === true
                ? true
                : isWorkedWithoutPermission === false
                ? false
                : true,
            reasonForWorkedWithoutPermission: reasonForWorkedWithoutPermission
              ? reasonForWorkedWithoutPermission
              : "",
            isReceivedPublicFunds:
              isReceivedPublicFunds === true
                ? true
                : isReceivedPublicFunds === false
                ? false
                : true,
            detailsForPublicFunds: detailsForPublicFunds
              ? detailsForPublicFunds
              : "",
            everGivenFalseInfoForApplyingVisa:
              everGivenFalseInfoForApplyingVisa === true
                ? true
                : everGivenFalseInfoForApplyingVisa === false
                ? false
                : true,
            reasonForFalseInformation: reasonForFalseInformation
              ? reasonForFalseInformation
              : "",
            everUsedDeceptionInPrevVisaApplication:
              everUsedDeceptionInPrevVisaApplication === true
                ? true
                : everUsedDeceptionInPrevVisaApplication === false
                ? false
                : true,
            reasonForDeception: reasonForDeception ? reasonForDeception : "",
            everBreachedOtherImmigrationLaws:
              everBreachedOtherImmigrationLaws === true
                ? true
                : everBreachedOtherImmigrationLaws === false
                ? false
                : true,
            reasonForBreachingImmigrationLaw: reasonForBreachingImmigrationLaw
              ? reasonForBreachingImmigrationLaw
              : "",
            everRefusedVisaOrBorderEntry:
              everRefusedVisaOrBorderEntry === true
                ? true
                : everRefusedVisaOrBorderEntry === false
                ? false
                : true,
            reasonForRefusedEntry: reasonForRefusedEntry
              ? reasonForRefusedEntry
              : "",
            everRefusedPermissionToStay:
              everRefusedPermissionToStay === true
                ? true
                : everRefusedPermissionToStay === false
                ? false
                : true,
            reasonForRefusedPermissionToStay: reasonForRefusedPermissionToStay
              ? reasonForRefusedPermissionToStay
              : "",
            everRefusedAsylum:
              everRefusedAsylum === true
                ? true
                : everRefusedAsylum === false
                ? false
                : true,
            reasonForRefusedAsylum: reasonForRefusedAsylum
              ? reasonForRefusedAsylum
              : "",
            everDeported:
              everDeported === true
                ? true
                : everDeported === false
                ? false
                : true,
            reasonForDeported: reasonForDeported ? reasonForDeported : "",
            everBannedFromAnyCountry:
              everBannedFromAnyCountry === true
                ? true
                : everBannedFromAnyCountry === false
                ? false
                : true,
            reasonForBanned: reasonForBanned ? reasonForBanned : "",
          },
          character: {
            everChargedWithCriminalOffence:
              everChargedWithCriminalOffence === true
                ? true
                : everChargedWithCriminalOffence === false
                ? false
                : true,
            reasonForCharged: reasonForCharged ? reasonForCharged : "",
            isPendingProsecutions:
              isPendingProsecutions === true
                ? true
                : isPendingProsecutions === false
                ? false
                : true,
            reasonForPendingProsecutions: reasonForPendingProsecutions
              ? reasonForPendingProsecutions
              : "",
            isTerroristViews:
              isTerroristViews === true
                ? true
                : isTerroristViews === false
                ? false
                : true,
            reasonForTerroristViews: reasonForTerroristViews
              ? reasonForTerroristViews
              : "",
            isWorkedForJudiciary:
              isWorkedForJudiciary === true
                ? true
                : isWorkedForJudiciary === false
                ? false
                : true,
            reasonForJudiciaryWork: reasonForJudiciaryWork
              ? reasonForJudiciaryWork
              : "",
          },
        },
      });
    }
  }, [data]);

  const buttonRef = useRef(null);

  const handleUpdateData = () => {
    buttonRef.current.click();
    setIsEditting(true);
    toastSuccess("Data Updated.");
    setActiveTab(activeTab);
    buttonRef.current = null;
  };

  const [approvePhase4, result] = useApprovePhase4Mutation();
  const {
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    error: approveErr,
  } = result;

  const handleApprove = async () => {
    await approvePhase4({ applicationId: applicationId });
    socket.emit("phase notification", {
      userId: data?.application?.userId,
      applicationId: applicationId,
      phase: 4,
      phaseStatus: "approved",
    });
  };

  useMemo(() => {
    if (approveErr) {
      toastError(approveErr?.data?.message);
    }
  }, [approveErr]);

  useMemo(() => {
    if (approveSuccess) {
      toastSuccess("Phase 4 Approved");
      navigate(`/admin/prescreening/${applicationId}`);
    }
  }, [approveSuccess]);

  return (
    <>
      {isAllowed && (
        <>
          <div className="Phase-2-main-container">
            <SideNavbar />
            <h2 className="Pre-screening-text-2">Pre-Screening</h2>
            <div className="Buttons-preescreening">
              {isEditting && (
                <button
                  style={{ cursor: "pointer" }}
                  className="Edit-appliction-btn"
                  onClick={() => setIsEditting(false)}
                >
                  Edit <img src={Editimgapp} alt="" />
                </button>
              )}

              {!isEditting && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <button
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0",
                      fontSize: ".5rem",
                      gap: "4px",
                    }}
                    className="Approved-appliction-btn"
                    onClick={() => setIsEditting(true)}
                  >
                    {" "}
                    <img style={{ width: ".9rem" }} src={cross} alt="" /> Cancel
                  </button>
                  <button
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0",
                      fontSize: ".5rem",
                      gap: "4px",
                    }}
                    className="Approved-appliction-btn"
                    onClick={handleUpdateData}
                  >
                    {" "}
                    <img style={{ width: ".9rem" }} src={tick} alt="" />
                    Update
                  </button>
                </div>
              )}

              {!data?.application?.isManual &&
                data?.application?.phase < 4 &&
                data?.application?.applicationStatus != "rejected" && (
                  <>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleApprove}
                      className="Approved-appliction-btn"
                    >
                      {approveLoading ? <Loader /> : "Approve"}{" "}
                      <img src={Approvedimgapp} alt="" />
                    </button>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/admin/reject/${applicationId}`)}
                      className="Reject-appliction-btn"
                    >
                      {" "}
                      Reject <img src={Rejectimgapp} alt="" />
                    </button>
                  </>
                )}
            </div>
            <button
              onClick={() => navigate(`/admin/group/prescreening/${applicationId}`)}
              className="back-btn"
            >
              Back
            </button>

            <div className="phase-4-all-phase">
              <span
                className={`link-hover-effect ${
                  activeTab === "/phase4" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/phase4")}
              >
                <span>General</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/Accomodation" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/Accomodation")}
              >
                <span>Accomodation</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/family" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/family")}
              >
                <span>Family</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/languageprofeciency" ? "link-active" : ""
                }`}
                style={{ width: "7.5rem", cursor: "pointer" }}
                onClick={() => setActiveTab("/languageprofeciency")}
              >
                <span style={{ width: "7.5rem" }}>Language Proficiency</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/education" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/education")}
              >
                <span>Education</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/employement" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/employement")}
              >
                <span>Employment</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/maintenance" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/maintenance")}
              >
                <span>Maintenance</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/travel" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/travel")}
              >
                <span>Travel</span>
              </span>
              <span
                className={`link-hover-effect ${
                  activeTab === "/character" ? "link-active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("/character")}
              >
                <span>Character</span>
              </span>
            </div>

            <div className="phase-1 phase4-total-form">
              {activeTab === "/phase4" && data && initialValues && (
                <GeneralFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}
              {activeTab === "/Accomodation" && data && initialValues && (
                <AccomodationFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}

              {activeTab === "/family" && data && initialValues && (
                <FamilyFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  setChildDetailsArr={setChildDetailsArr}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}

              {activeTab === "/languageprofeciency" &&
                data &&
                initialValues && (
                  <LanguageProficiencyFormGroup
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                    refetch={refetch}
                    isEditting={isEditting}
                    buttonRef={buttonRef}
                  />
                )}

              {activeTab === "/education" && data && initialValues && (
                <EducationFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}

              {activeTab === "/employement" && data && initialValues && (
                <EmploymentFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}

              {activeTab === "/maintenance" && data && initialValues && (
                <MaintenanceFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}

              {activeTab === "/travel" && data && initialValues && (
                <TravelFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  setLastVisitsToUk={setLastVisitsToUk}
                  lastVisitsToUk={lastVisitsToUk}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}

              {activeTab === "/character" && data && initialValues && (
                <CharacterFormGroup
                  data={data}
                  setActiveTab={setActiveTab}
                  initialValues={initialValues}
                  refetch={refetch}
                  isEditting={isEditting}
                  buttonRef={buttonRef}
                />
              )}
            </div>
          </div>
        </>
      )}
      {/* {isAllowed && (
        <div className="Container-forgetpassword-phase1">
          <Navbar />
          <div className="Forgetpassword-sub-2">
            <div className="left-side-forget-password-2">
              <p className="Required-data-text">Required Data*</p>
              <NavLink to="/filldata">
                <button type="submit" className="back-button">
                  back
                </button>
              </NavLink>

              <div className="phase-4-all-phase">
                <span
                  className={`link-hover-effect ${
                    activeTab === "/phase4" ? "link-active" : ""
                  }`}
                >
                  <span>General</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/Accomodation" ? "link-active" : ""
                  }`}
                >
                  <span>Accomodation</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/family" ? "link-active" : ""
                  }`}
                >
                  <span>Family</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/languageprofeciency" ? "link-active" : ""
                  }`}
                >
                  <span>Language Proficiency</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/education" ? "link-active" : ""
                  }`}
                >
                  <span>Education</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/employement" ? "link-active" : ""
                  }`}
                >
                  <span>Employment</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/maintenance" ? "link-active" : ""
                  }`}
                >
                  <span>Maintenance</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/travel" ? "link-active" : ""
                  }`}
                >
                  <span>Travel</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/character" ? "link-active" : ""
                  }`}
                >
                  <span>Character</span>
                </span>
              </div>

              <div className="Main-form" ref={topDivRef}>
                {activeTab === "/phase4" && data && initialValues && (
                  <GeneralForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                  />
                )}
                {activeTab === "/Accomodation" && data && initialValues && (
                  <AccomodationForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                  />
                )}

                {activeTab === "/family" && data && initialValues && (
                  <FamilyForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                    setChildDetailsArr={setChildDetailsArr}
                  />
                )}

                {activeTab === "/languageprofeciency" &&
                  data &&
                  initialValues && (
                    <LanguageProficiencyForm
                      data={data}
                      setActiveTab={setActiveTab}
                      initialValues={initialValues}
                    />
                  )}

                {activeTab === "/education" && data && initialValues && (
                  <EducationForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                  />
                )}

                {activeTab === "/employement" && data && initialValues && (
                  <EmploymentForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                  />
                )}

                {activeTab === "/maintenance" && data && initialValues && (
                  <MaintenanceForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                  />
                )}

                {activeTab === "/travel" && data && initialValues && (
                  <TravelForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                    setLastVisitsToUk={setLastVisitsToUk}
                    lastVisitsToUk={lastVisitsToUk}
                  />
                )}

                {activeTab === "/character" && data && initialValues && (
                  <CharacterForm
                    data={data}
                    setActiveTab={setActiveTab}
                    initialValues={initialValues}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Phase4GroupPage;
