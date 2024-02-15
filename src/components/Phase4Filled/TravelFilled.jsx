import React, { useRef } from 'react'
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const TravelFilled = ({data}) => {
    const app = data?.travel;
    console.log("Travel filled", app);

     const pdfRef = useRef(null);
     const exportPDFWithComponent = () => {
       if (pdfRef.current) {
         pdfRef.current.save();
       }
     };
  return (
    <div className="fill-data-border-phase4">
      <button
        type="button"
        onClick={exportPDFWithComponent}
        className="download-btn"
      >
        Download File
      </button>

      {/* Travel */}
      <PDFExport
        forcePageBreak=".page-break"
        scale={0.8}
        paperSize="A2"
        margin="2cm"
        ref={pdfRef}
        fileName="UkImmigration-Phase4-Travel"
      >
        <div className="phase-1">
          <p className="Form-data-heading">Travel</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Are you currently in the UK?*</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.areYouCurrentlyInUk ? "Yes" : "No"}
            </p>
          </div>

          {app?.areYouCurrentlyInUk && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">
                  What countries have you visited – please provide the date you
                  entered the country and the date you left and the reason for
                  your visit*
                </p>
                <p className="Name-text"></p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Country Visited*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.countryVisited}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">
                  ii. What date did you leave the UK?*
                </p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.ukLeaveDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. What date did you return*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.returnDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iv. What permission do you have to stay in UK? *</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.reasonForVisit}</p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Please list the last 5 visits to the UK – date entered/date left
              and the reasons for your visit
            </p>
            <p className="Name-text"></p>
          </div>

          {app?.lastUkVisits?.map((item, index) => (
            <div key={item.entryDate}>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">{index + 1} UK Visit Details</p>
                <p className="Name-text">{item?.reasonForVisit}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Date of Entry*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(item?.entryDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of Departure*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(item?.departureDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. Reason for Visit*</p>
                <div className="border-y"></div>
                <p className="Name-text">{item?.reasonForVisit}</p>
              </div>
            </div>
          ))}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever been to the UK or any other country?
            </p>
            <div className="border-y"></div>
          </div>
          {app?.everBeenToUkOrAnyCountry?.map((item, index) => (
            <div key={item.entryDate}>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">{index + 1} Country name </p>
                <p className="Name-text">{item?.country}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Date of Entry*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(item?.entryDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of Departure*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(item?.departureDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. Reason for Visit*</p>
                <div className="border-y"></div>
                <p className="Name-text">{item?.reasonForVisit}</p>
              </div>
            </div>
          ))}


          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever entered the UK illegally?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isVisitedUkIllegally ? "Yes" : "No"}
            </p>
          </div>
          {app?.isVisitedUkIllegally && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.illegalVisitDetail}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever stayed beyond the expiry date of your visa in the
              UK?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isStayedBeyondExpiryDateInUk ? "Yes" : "No"}
            </p>
          </div>
          {app?.isStayedBeyondExpiryDateInUk && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForStayingExpiryDateInUk}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever breached the conditions of your leave?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isBreachedLeaveConditions ? "Yes" : "No"}
            </p>
          </div>
          {app?.isBreachedLeaveConditions && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForBreachedLeave}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever worked without permission?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isWorkedWithoutPermission ? "Yes" : "No"}
            </p>
          </div>
          {app?.isWorkedWithoutPermission && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">
                {app?.reasonForWorkedWithoutPermission}
              </p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title"> Have you ever received public funds?*</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isReceivedPublicFunds ? "Yes" : "No"}
            </p>
          </div>
          {app?.isReceivedPublicFunds && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.detailsForPublicFunds}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever given false information when applying for a visa?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.everGivenFalseInfoForApplyingVisa ? "Yes" : "No"}
            </p>
          </div>
          {app?.everGivenFalseInfoForApplyingVisa && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForFalseInformation}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever used deception in a previous visa application?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.everUsedDeceptionInPrevVisaApplication ? "Yes" : "No"}
            </p>
          </div>
          {app?.everUsedDeceptionInPrevVisaApplication && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForDeception}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever breached any other immigration laws?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.everBreachedOtherImmigrationLaws ? "Yes" : "No"}
            </p>
          </div>
          {app?.everBreachedOtherImmigrationLaws && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">
                {app?.reasonForBreachingImmigrationLaw}
              </p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever been refused a visa or refused entry at the border?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.everRefusedVisaOrBorderEntry ? "Yes" : "No"}
            </p>
          </div>
          {app?.everRefusedVisaOrBorderEntry && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForRefusedEntry}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you been refused permission to stay or remain ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.everRefusedPermissionToStay ? "Yes" : "No"}
            </p>
          </div>
          {app?.everRefusedPermissionToStay && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">
                {app?.reasonForRefusedPermissionToStay}
              </p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title"> Have you ever been refused asylum?*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.everRefusedAsylum ? "Yes" : "No"}</p>
          </div>
          {app?.everRefusedAsylum && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForRefusedAsylum}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you ever been deported, removed or been required to leave any
              country?*{" "}
            </p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.everDeported ? "Yes" : "No"}</p>
          </div>
          {app?.everDeported && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForDeported}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              {" "}
              Have you been excluded or banned from any country?*{" "}
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.everBannedFromAnyCountry ? "Yes" : "No"}
            </p>
          </div>
          {app?.everBannedFromAnyCountry && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title"> i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForBanned}</p>
            </div>
          )}

          {/* Phase 1 div ends  */}
        </div>
      </PDFExport>
    </div>
  );
}

export default TravelFilled