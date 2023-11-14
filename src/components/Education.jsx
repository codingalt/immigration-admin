import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from './SideNavbar'
import editpen from "../assests/edit-pen.png"
import { Link , NavLink } from 'react-router-dom';
import "../style/Education.css"
import "../style/Genral.css"
import Editimgapp from "../assests/Edit-file-img.svg"

const Education = () => {
  const links = [
    { to: "/phase4", label: "General" },
    { to: "/accommodation", label: "Accommodation" },
    { to: "/family", label: "Family" },
    { to: "/languageproficiency", label: "Language Proficiency" },
    { to: "/education", label: "Education" },
    { to: "/employment", label: "Employement" },
    { to: "/maintenance", label: "Mainteance" },
    { to: "/travel", label: "travel" },
    { to: "/character", label: "Character" },
    // Add more links as needed
];

const [activeLink, setActiveLink] = useState(null);

useEffect(() => {
    // Get the current path from window.location.pathname
    const currentPath = window.location.pathname;

    // Find the matching label from the links array based on the current path
    const matchedLink = links.find((link) => link.to === currentPath);

    if (matchedLink) {
        setActiveLink(matchedLink.label);
    }
}, [links]);

const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
};
  return (
    <div className='Phase-2-main-container'>
    <SideNavbar />
    <h2 className='Pre-screening-text'>Pre-Screening</h2>
    <div className='Buttons-preescreening'>
              <button className='Edit-appliction-btn' >Edit <img src={Editimgapp} alt="" /></button>

              </div>
    <img src={editpen} alt="" className='edit-pen' />
    <Link to="/phase1">
            <button className='back-btn'>Back</button>
</Link>

    
<div className='phase-4-all-phase'>
        {links.map((link, index) => (
            <NavLink
                key={index}
                to={link.to}
                className={`link-hover-effect ${activeLink === link.label ? 'link-active' : ''}`}
                onClick={() => handleLinkClick(link.label)}
                style={link.to === "/languageproficiency"? {width:'8rem'}: {}}
            >
       <span className='routes-all'>{link.label}</span>
            </NavLink>
        ))}
    </div>
 
   
      <div className='education-main '>
        <form action="">
          <div className='left-side-general-family'>
       

            <p className='full-name-text-accc-left-edu'>1.Qualification*</p>
            <input type="text" className='input-full-name-acc-left-edu' placeholder='Type Address' />

            <p className='full-name-text-accc-left-edu'>2.Awarding Institute*</p>
            <input type="text" className='input-full-name-acc-left-edu' placeholder='Type Address' />

            <p className='full-name-text-accc-left-edu'>3.Grade*</p>
            <input type="text" className='input-full-name-acc-left-edu' placeholder='Type Address' />

            <p className='full-name-text-accc-left-edu'>4.Course Subject*</p>
            <input type="text" className='input-full-name-acc-left-edu' placeholder='Type Address' />

            <p className='full-name-text-accc-left-edu'>5.Course Length*</p>
            <input type="text" className='input-full-name-acc-left-edu' placeholder='Type Address' />

            <p className='full-name-text-accc-left-edu'>6.Year of Award*</p>
            <select class="form-select" placeholder='Select' className='input-full-name-acc-left-edu'  >
              <p className='select-country-11' >16.Select Country*</p>
              <option>Select</option>
              <option value="YE">2016</option>
              <option value="ZM">2017</option>
              <option value="ZW">2023</option>
            </select>

  
            <p className='full-name-text-accc-left-edu'>7.Country of Award*</p>
            <select class="form-select" placeholder='Select' className='input-full-name-acc-left-edu'  >
              <p className='select-country-11' >16.Select Country*</p>
              <option>Select</option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Aland Islands</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AS">American Samoa</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AI">Anguilla</option>
              <option value="AQ">Antarctica</option>
              <option value="AG">Antigua and Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AW">Aruba</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BM">Bermuda</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="BV">Bouvet Island</option>
              <option value="BR">Brazil</option>
              <option value="IO">British Indian Ocean Territory</option>
              <option value="BN">Brunei Darussalam</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="KH">Cambodia</option>
              <option value="CM">Cameroon</option>
              <option value="CA">Canada</option>
              <option value="CV">Cape Verde</option>
              <option value="KY">Cayman Islands</option>
              <option value="CF">Central African Republic</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CX">Christmas Island</option>
              <option value="CC">Cocos (Keeling) Islands</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoros</option>
              <option value="CG">Congo</option>
              <option value="CD">Congo, Democratic Republic of the Congo</option>
              <option value="CK">Cook Islands</option>
              <option value="CR">Costa Rica</option>
              <option value="CI">Cote D'Ivoire</option>
              <option value="HR">Croatia</option>
              <option value="CU">Cuba</option>
              <option value="CW">Curacao</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egypt</option>
              <option value="SV">El Salvador</option>
              <option value="GQ">Equatorial Guinea</option>
              <option value="ER">Eritrea</option>
              <option value="EE">Estonia</option>
              <option value="ET">Ethiopia</option>
              <option value="FK">Falkland Islands (Malvinas)</option>
              <option value="FO">Faroe Islands</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="GF">French Guiana</option>
              <option value="PF">French Polynesia</option>
              <option value="TF">French Southern Territories</option>
              <option value="GA">Gabon</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="DE">Germany</option>
              <option value="GH">Ghana</option>
              <option value="GI">Gibraltar</option>
              <option value="GR">Greece</option>
              <option value="GL">Greenland</option>
              <option value="GD">Grenada</option>
              <option value="GP">Guadeloupe</option>
              <option value="GU">Guam</option>
              <option value="GT">Guatemala</option>
              <option value="GG">Guernsey</option>
              <option value="GN">Guinea</option>
              <option value="GW">Guinea-Bissau</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HM">Heard Island and Mcdonald Islands</option>
              <option value="VA">Holy See (Vatican City State)</option>
              <option value="HN">Honduras</option>
              <option value="HK">Hong Kong</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IR">Iran, Islamic Republic of</option>
              <option value="IQ">Iraq</option>
              <option value="IE">Ireland</option>
              <option value="IM">Isle of Man</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JE">Jersey</option>
              <option value="JO">Jordan</option>
              <option value="KZ">Kazakhstan</option>
              <option value="KE">Kenya</option>
              <option value="KI">Kiribati</option>
              <option value="KP">Korea, Democratic People's Republic of</option>
              <option value="KR">Korea, Republic of</option>
              <option value="XK">Kosovo</option>
              <option value="KW">Kuwait</option>
              <option value="KG">Kyrgyzstan</option>
              <option value="LA">Lao People's Democratic Republic</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libyan Arab Jamahiriya</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MO">Macao</option>
              <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MH">Marshall Islands</option>
              <option value="MQ">Martinique</option>
              <option value="MR">Mauritania</option>
              <option value="MU">Mauritius</option>
              <option value="YT">Mayotte</option>
              <option value="MX">Mexico</option>
              <option value="FM">Micronesia, Federated States of</option>
              <option value="MD">Moldova, Republic of</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MS">Montserrat</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="AN">Netherlands Antilles</option>
              <option value="NC">New Caledonia</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Niger</option>
              <option value="NG">Nigeria</option>
              <option value="NU">Niue</option>
              <option value="NF">Norfolk Island</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PW">Palau</option>
              <option value="PS">Palestinian Territory, Occupied</option>
              <option value="PA">Panama</option>
              <option value="PG">Papua New Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PN">Pitcairn</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="PR">Puerto Rico</option>
              <option value="QA">Qatar</option>
              <option value="RE">Reunion</option>
              <option value="RO">Romania</option>
              <option value="RU">Russian Federation</option>
              <option value="RW">Rwanda</option>
              <option value="BL">Saint Barthelemy</option>
              <option value="SH">Saint Helena</option>
              <option value="KN">Saint Kitts and Nevis</option>
              <option value="LC">Saint Lucia</option>
              <option value="MF">Saint Martin</option>
              <option value="PM">Saint Pierre and Miquelon</option>
              <option value="VC">Saint Vincent and the Grenadines</option>
              <option value="WS">Samoa</option>
              <option value="SM">San Marino</option>
              <option value="ST">Sao Tome and Principe</option>
              <option value="SA">Saudi Arabia</option>
              <option value="SN">Senegal</option>
              <option value="RS">Serbia</option>
              <option value="CS">Serbia and Montenegro</option>
              <option value="SC">Seychelles</option>
              <option value="SL">Sierra Leone</option>
              <option value="SG">Singapore</option>
              <option value="SX">Sint Maarten</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="SB">Solomon Islands</option>
              <option value="SO">Somalia</option>
              <option value="ZA">South Africa</option>
              <option value="GS">South Georgia and the South Sandwich Islands</option>
              <option value="SS">South Sudan</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudan</option>
              <option value="SR">Suriname</option>
              <option value="SJ">Svalbard and Jan Mayen</option>
              <option value="SZ">Swaziland</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="SY">Syrian Arab Republic</option>
              <option value="TW">Taiwan, Province of China</option>
              <option value="TJ">Tajikistan</option>
              <option value="TZ">Tanzania, United Republic of</option>
              <option value="TH">Thailand</option>
              <option value="TL">Timor-Leste</option>
              <option value="TG">Togo</option>
              <option value="TK">Tokelau</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad and Tobago</option>
              <option value="TN">Tunisia</option>
              <option value="TR">Turkey</option>
              <option value="TM">Turkmenistan</option>
              <option value="TC">Turks and Caicos Islands</option>
              <option value="TV">Tuvalu</option>
              <option value="UG">Uganda</option>
              <option value="UA">Ukraine</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="UM">United States Minor Outlying Islands</option>
              <option value="UY">Uruguay</option>
              <option value="UZ">Uzbekistan</option>
              <option value="VU">Vanuatu</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Viet Nam</option>
              <option value="VG">Virgin Islands, British</option>
              <option value="VI">Virgin Islands, U.s.</option>
              <option value="WF">Wallis and Futuna</option>
              <option value="EH">Western Sahara</option>
              <option value="YE">Yemen</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
         
          
            </select>


            
            <p className='full-name-text-accc-left-edu'>8.State*</p>
            <select class="form-select" placeholder='Select' className='input-full-name-acc-left-edu'  >
              <p className='select-country-11' >16.Select Country*</p>
              <option value="">Select state</option>
    <option value="LND">London, City of</option>
    <option value="ABE">Aberdeen City</option>
    <option value="ABD">Aberdeenshire</option>
    <option value="ANS">Angus</option>
    <option value="AGB">Argyll and Bute</option>
    <option value="CLK">Clackmannanshire</option>
    <option value="DGY">Dumfries and Galloway</option>
    <option value="DND">Dundee City</option>
    <option value="EAY">East Ayrshire</option>
    <option value="EDU">East Dunbartonshire</option>
    <option value="ELN">East Lothian</option>
    <option value="ERW">East Renfrewshire</option>
    <option value="EDH">Edinburgh, City of</option>
    <option value="ELS">Eilean Siar</option>
    <option value="FAL">Falkirk</option>
    <option value="FIF">Fife</option>
    <option value="GLG">Glasgow City</option>
    <option value="HLD">Highland</option>
    <option value="IVC">Inverclyde</option>
    <option value="MLN">Midlothian</option>
    <option value="MRY">Moray</option>
    <option value="NAY">North Ayrshire</option>
    <option value="NLK">North Lanarkshire</option>
    <option value="ORK">Orkney Islands</option>
    <option value="PKN">Perth and Kinross</option>
    <option value="RFW">Renfrewshire</option>
    <option value="SCB">Scottish Borders</option>
    <option value="ZET">Shetland Islands</option>
    <option value="SAY">South Ayrshire</option>
    <option value="SLK">South Lanarkshire</option>
    <option value="STG">Stirling</option>
    <option value="WDU">West Dunbartonshire</option>
    <option value="WLN">West Lothian</option>
    <option value="ANN">Antrim and Newtownabbey</option>
    <option value="AND">Ards and North Down</option>
    <option value="ABC">Armagh City, Banbridge and Craigavon</option>
    <option value="BFS">Belfast City</option>
    <option value="CCG">Causeway Coast and Glens</option>
    <option value="DRS">Derry and Strabane</option>
    <option value="FMO">Fermanagh and Omagh</option>
    <option value="LBC">Lisburn and Castlereagh</option>
    <option value="MEA">Mid and East Antrim</option>
    <option value="MUL">Mid-Ulster</option>
    <option value="NMD">Newry, Mourne and Down</option>
    <option value="BDG">Barking and Dagenham</option>
    <option value="BNE">Barnet</option>
    <option value="BEX">Bexley</option>
    <option value="BEN">Brent</option>
    <option value="BRY">Bromley</option>
    <option value="CMD">Camden</option>
    <option value="CRY">Croydon</option>
    <option value="EAL">Ealing</option>
    <option value="ENF">Enfield</option>
    <option value="GRE">Greenwich</option>
    <option value="HCK">Hackney</option>
    <option value="HMF">Hammersmith and Fulham</option>
    <option value="HRY">Haringey</option>
    <option value="HRW">Harrow</option>
    <option value="HAV">Havering</option>
    <option value="HIL">Hillingdon</option>
    <option value="HNS">Hounslow</option>
    <option value="ISL">Islington</option>
    <option value="KEC">Kensington and Chelsea</option>
    <option value="KTT">Kingston upon Thames</option>
    <option value="LBH">Lambeth</option>
    <option value="LEW">Lewisham</option>
    <option value="MRT">Merton</option>
    <option value="NWM">Newham</option>
    <option value="RDB">Redbridge</option>
    <option value="RIC">Richmond upon Thames</option>
    <option value="SWK">Southwark</option>
    <option value="STN">Sutton</option>
    <option value="TWH">Tower Hamlets</option>
    <option value="WFT">Waltham Forest</option>
    <option value="WND">Wandsworth</option>
    <option value="WSM">Westminster</option>
    <option value="BNS">Barnsley</option>
    <option value="BIR">Birmingham</option>
    <option value="BOL">Bolton</option>
    <option value="BRD">Bradford</option>
    <option value="BUR">Bury</option>
    <option value="CLD">Calderdale</option>
    <option value="COV">Coventry</option>
    <option value="DNC">Doncaster</option>
    <option value="DUD">Dudley</option>
    <option value="GAT">Gateshead</option>
    <option value="KIR">Kirklees</option>
    <option value="KWL">Knowsley</option>
    <option value="LDS">Leeds</option>
    <option value="LIV">Liverpool</option>
    <option value="MAN">Manchester</option>
    <option value="NET">Newcastle upon Tyne</option>
    <option value="NTY">North Tyneside</option>
    <option value="OLD">Oldham</option>
    <option value="RCH">Rochdale</option>
    <option value="ROT">Rotherham</option>
    <option value="SLF">Salford</option>
    <option value="SAW">Sandwell</option>
    <option value="SFT">Sefton</option>
    <option value="SHF">Sheffield</option>
    <option value="SOL">Solihull</option>
    <option value="STY">South Tyneside</option>
    <option value="SHN">St. Helens</option>
    <option value="SKP">Stockport</option>
    <option value="SND">Sunderland</option>
    <option value="TAM">Tameside</option>
    <option value="TRF">Trafford</option>
    <option value="WKF">Wakefield</option>
    <option value="WLL">Walsall</option>
    <option value="WGN">Wigan</option>
    <option value="WRL">Wirral</option>
    <option value="WLV">Wolverhampton</option>
    <option value="BKM">Buckinghamshire</option>
    <option value="CAM">Cambridgeshire</option>
    <option value="CMA">Cumbria</option>
    <option value="DBY">Derbyshire</option>
    <option value="DEV">Devon</option>
    <option value="DOR">Dorset</option>
    <option value="ESX">East Sussex</option>
    <option value="ESS">Essex</option>
    <option value="GLS">Gloucestershire</option>
    <option value="HAM">Hampshire</option>
    <option value="HRT">Hertfordshire</option>
    <option value="KEN">Kent</option>
    <option value="LAN">Lancashire</option>
    <option value="LEC">Leicestershire</option>
    <option value="LIN">Lincolnshire</option>
    <option value="NFK">Norfolk</option>
    <option value="NYK">North Yorkshire</option>
    <option value="NTH">Northamptonshire</option>
    <option value="NTT">Nottinghamshire</option>
    <option value="OXF">Oxfordshire</option>
    <option value="SOM">Somerset</option>
    <option value="STS">Staffordshire</option>
    <option value="SFK">Suffolk</option>
    <option value="SRY">Surrey</option>
    <option value="WAR">Warwickshire</option>
    <option value="WSX">West Sussex</option>
    <option value="WOR">Worcestershire</option>
    <option value="BAS">Bath and North East Somerset</option>
    <option value="BDF">Bedford</option>
    <option value="BBD">Blackburn with Darwen</option>
    <option value="BPL">Blackpool</option>
    <option value="BGW">Blaenau Gwent</option>
    <option value="BCP">Bournemouth, Christchurch and Poole</option>
    <option value="BRC">Bracknell Forest</option>
    <option value="BGE">Bridgend [Pen-y-bont ar Ogwr GB-POG]</option>
    <option value="BNH">Brighton and Hove</option>
    <option value="BST">Bristol, City of</option>
    <option value="CAY">Caerphilly [Caerffili GB-CAF]</option>
    <option value="CRF">Cardiff [Caerdydd GB-CRD]</option>
    <option value="CMN">Carmarthenshire [Sir Gaerfyrddin GB-GFY]</option>
    <option value="CBF">Central Bedfordshire</option>
    <option value="CGN">Ceredigion [Sir Ceredigion]</option>
    <option value="CHE">Cheshire East</option>
    <option value="CHW">Cheshire West and Chester</option>
    <option value="CWY">Conwy</option>
    <option value="CON">Cornwall</option>
    <option value="DAL">Darlington</option>
    <option value="DEN">Denbighshire [Sir Ddinbych GB-DDB]</option>
    <option value="DER">Derby</option>
    <option value="DUR">Durham, County</option>
    <option value="ERY">East Riding of Yorkshire</option>
    <option value="FLN">Flintshire [Sir y Fflint GB-FFL]</option>
    <option value="GWN">Gwynedd</option>
    <option value="HAL">Halton</option>
    <option value="HPL">Hartlepool</option>
    <option value="HEF">Herefordshire</option>
    <option value="AGY">Isle of Anglesey [Sir Ynys Môn GB-YNM]</option>
    <option value="IOW">Isle of Wight</option>
    <option value="IOS">Isles of Scilly</option>
    <option value="KHL">Kingston upon Hull</option>
    <option value="LCE">Leicester</option>
    <option value="LUT">Luton</option>
    <option value="MDW">Medway</option>
    <option value="MTY">Merthyr Tydfil [Merthyr Tudful GB-MTU]</option>
    <option value="MDB">Middlesbrough</option>
    <option value="MIK">Milton Keynes</option>
    <option value="MON">Monmouthshire [Sir Fynwy GB-FYN]</option>
    <option value="NTL">Neath Port Talbot [Castell-nedd Port Talbot GB-CTL]</option>
    <option value="NWP">Newport [Casnewydd GB-CNW]</option>
    <option value="NEL">North East Lincolnshire</option>
    <option value="NLN">North Lincolnshire</option>
    <option value="NSM">North Somerset</option>
    <option value="NBL">Northumberland</option>
    <option value="NGM">Nottingham</option>
    <option value="PEM">Pembrokeshire [Sir Benfro GB-BNF]</option>
    <option value="PTE">Peterborough</option>
    <option value="PLY">Plymouth</option>
    <option value="POR">Portsmouth</option>
    <option value="POW">Powys</option>
    <option value="RDG">Reading</option>
    <option value="RCC">Redcar and Cleveland</option>
    <option value="RCT">Rhondda Cynon Taff [Rhondda CynonTaf]</option>
    <option value="RUT">Rutland</option>
    <option value="SHR">Shropshire</option>
    <option value="SLG">Slough</option>
    <option value="SGC">South Gloucestershire</option>
    <option value="STH">Southampton</option>
    <option value="SOS">Southend-on-Sea</option>
    <option value="STT">Stockton-on-Tees</option>
    <option value="STE">Stoke-on-Trent</option>
    <option value="SWA">Swansea [Abertawe GB-ATA]</option>
    <option value="SWD">Swindon</option>
    <option value="TFW">Telford and Wrekin</option>
    <option value="THR">Thurrock</option>
    <option value="TOB">Torbay</option>
    <option value="TOF">Torfaen [Tor-faen]</option>
    <option value="VGL">Vale of Glamorgan, The [Bro Morgannwg GB-BMG]</option>
    <option value="WRT">Warrington</option>
    <option value="WBK">West Berkshire</option>
    <option value="WIL">Wiltshire</option>
    <option value="WNM">Windsor and Maidenhead</option>
    <option value="WOK">Wokingham</option>
    <option value="WRX">Wrexham [Wrecsam GB-WRC]</option>
    <option value="YOR">York</option>
            </select>


            <button className='Download-button-edu'>Download</button>

 
          </div>

       
          <div className="All-button-containers-eduction">
          <Link to="/languageproficiency">
                 <button className='Back-butnnn'>Back</button>
                 </Link>
                 <Link to="">
                <button className='Save-btnn'>Save</button>
                </Link>
                <Link to="/employment">
                <button className='Next-btnnnn'>Next</button>  
                </Link>      
                 </div>  
      
        </form>
      </div>
</div>
  )
}

export default Education