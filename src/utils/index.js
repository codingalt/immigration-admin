import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, messaging } from "../firebase";
import { getToken } from "@firebase/messaging";

export const onCaptchaVerify = async() => {
   window.recaptchaVerifier = new RecaptchaVerifier(
     auth,
     "recaptcha-container",
     {
       size: "normal",
       callback: async(response) => {
     const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
      console.log("res", recaptchaResponse);
      return recaptchaResponse;
       },
       "expired-callback": () => {
         console.log("Caprcha expired");
        //  grecaptcha.reset(window.recaptchaWidgetId);
       },
     }
   );
   recaptchaVerifier.render().then(async(widgetId) => {
     window.recaptchaWidgetId = widgetId;
   });
};

export const onCaptchaVerify2 = async (contact) => {
  console.log(contact);
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
      callback: async (response) => {
        console.log(contact);
        const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
        // onSendOTP(contact);
      },
      "expired-callback": () => {
        console.log("Caprcha expired");
        // grecaptcha.reset(window.recaptchaWidgetId);
      },
    }
  );
 
};

export const onSendOTP = async (contact) => {
  const appVerifier = window.recaptchaVerifier;
  console.log("App Verifier", appVerifier);
  const formatPhone = "+" + contact;
  try {
    const data = await signInWithPhoneNumber(auth, formatPhone, appVerifier);
    window.confirmationResult = data;
    return data;
  } catch (error) {
    console.log(error);
    // grecaptcha.reset(window.recaptchaWidgetId);
    return error;
  }

  // .then((confirmationResult) => {
  //   console.log(confirmationResult);
  //   return true;
  // })
  // .catch((error) => {
  //   console.error(error);
  //   return false;
  // });
};

export const getNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    // Generate Token
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });
    return token;
  } else if (permission === "denied") {
  }
};

// Format Time 
export const formatTime = (time) => {
  if (time > 0) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `00:00`;
  }
};

export const applicationServiceTypes = {
      "Sponsor License": "SL",
      "Certificate of Sponsorship": "CS",
      "Certificate of Acceptance of Studies": "CAS",
      "Entry Clearance": "EC",
      "Leave to Remain": "LR",
      "EEUS Settlement": "ES",
      "University Placement": "UP",
      "Immigration Matter": "IM",
      "MN1 – Registration": "MN1",
      "FLR(FP)": "FLR",
      "FLR(M)": "FLR(M)",
      "SW – Skilled Worker": "SW",
      Student: "STD",
      "Student Child": "SC",
      "Graduate Visa": "GC",
      "ECS- Entry Clearance Spouse": "ESC",
      "ECV – Entry Clearance Visitor": "ECV",
      "ECD – Entry Clearance Dependant": "ECD",
      "PS – Pre Settled Status": "PS",
      "SS – Settled Status": "SS",
      "Others": "Others",
      "AN1 – Naturalisation": "AN1",
      "MN1 – Registration": "MN1",
      "ILR – Indefinite Leave to Remain": "ILR",
      "FLR – Further Leave to Remain": "FLR",
      "Indefinite Leave to Remain": "ILR",
      "Naturalisation": "AN1",
      "SL- Sponsor Licence": "SL"
}
