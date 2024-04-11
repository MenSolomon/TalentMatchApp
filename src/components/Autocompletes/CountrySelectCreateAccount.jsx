import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

export default function CountrySelectCreateAccount({
  selectLabel,
  styles,
  selectValue,
  selectCountryCode,
  defaultValue,
  ImplememtCountryCode,
}) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleAutoSelect = (e, v) => {
    console.log(v.label);
    selectValue(v.label);
    selectCountryCode(v.code);
    setSelectedCountry(v);
  };

  useEffect(() => {
    // alert(ImplememtCountryCode);
    // Update selected country when ImplememtCountryCode changes

    const matchedCountry = countries.find(
      (country) => country.mrzCode === ImplememtCountryCode
    );
    setSelectedCountry(matchedCountry);
    selectCountryCode(matchedCountry?.code);
    selectValue(matchedCountry?.label);
  }, [ImplememtCountryCode]);

  return (
    <Autocomplete
      id="country-select-demo"
      className="sm:w-[100%] md:w-[90%]"
      sx={{ color: "black" }}
      options={countries}
      // value={countries.find(
      //   (country) => country.mrzCode === ImplememtCountryCode
      // )}
      value={selectedCountry}
      autoHighlight
      onChange={handleAutoSelect}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 }, color: "black" }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          size="small"
          sx={styles}
          {...params}
          label={selectLabel}
          // onChange={(e) => {
          //   alert(e.target.value);
          // }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

// const countries = [
//   { code: "AF", label: "Afghanistan", phone: "93" },
//   { code: "AL", label: "Albania", phone: "355" },
//   { code: "DZ", label: "Algeria", phone: "213" },
//   { code: "AS", label: "American Samoa", phone: "1-684" },
//   { code: "AD", label: "Andorra", phone: "376" },
//   { code: "AO", label: "Angola", phone: "244" },
//   { code: "AI", label: "Anguilla", phone: "1-264" },
//   { code: "AQ", label: "Antarctica", phone: "672" },
//   { code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
//   { code: "AR", label: "Argentina", phone: "54" },
//   { code: "AM", label: "Armenia", phone: "374" },
//   { code: "AW", label: "Aruba", phone: "297" },
//   { code: "AU", label: "Australia", phone: "61", suggested: true },
//   { code: "AT", label: "Austria", phone: "43" },
//   { code: "AZ", label: "Azerbaijan", phone: "994" },
//   { code: "BS", label: "Bahamas", phone: "1-242" },
//   { code: "BH", label: "Bahrain", phone: "973" },
//   { code: "BD", label: "Bangladesh", phone: "880" },
//   { code: "BB", label: "Barbados", phone: "1-246" },
//   { code: "BY", label: "Belarus", phone: "375" },
//   { code: "BE", label: "Belgium", phone: "32" },
//   { code: "BZ", label: "Belize", phone: "501" },
//   { code: "BJ", label: "Benin", phone: "229" },
//   { code: "BM", label: "Bermuda", phone: "1-441" },
//   { code: "BT", label: "Bhutan", phone: "975" },
//   { code: "BO", label: "Bolivia", phone: "591" },
//   { code: "BA", label: "Bosnia and Herzegovina", phone: "387" },
//   { code: "BW", label: "Botswana", phone: "267" },
//   { code: "BR", label: "Brazil", phone: "55" },
//   { code: "IO", label: "British Indian Ocean Territory", phone: "246" },
//   { code: "VG", label: "British Virgin Islands", phone: "1-284" },
//   { code: "BN", label: "Brunei Darussalam", phone: "673" },
//   { code: "BG", label: "Bulgaria", phone: "359" },
//   { code: "BF", label: "Burkina Faso", phone: "226" },
//   { code: "BI", label: "Burundi", phone: "257" },
//   { code: "KH", label: "Cambodia", phone: "855" },
//   { code: "CM", label: "Cameroon", phone: "237" },
//   { code: "CA", label: "Canada", phone: "1", suggested: true },
//   { code: "CV", label: "Cape Verde", phone: "238" },
//   { code: "KY", label: "Cayman Islands", phone: "1-345" },
//   { code: "CF", label: "Central African Republic", phone: "236" },
//   { code: "TD", label: "Chad", phone: "235" },
//   { code: "CL", label: "Chile", phone: "56" },
//   { code: "CN", label: "China", phone: "86" },
//   { code: "CX", label: "Christmas Island", phone: "61" },
//   { code: "CC", label: "Cocos (Keeling) Islands", phone: "61" },
//   { code: "CO", label: "Colombia", phone: "57" },
//   { code: "KM", label: "Comoros", phone: "269" },
//   { code: "CG", label: "Congo, Republic of the", phone: "242" },
//   { code: "CD", label: "Congo, Democratic Republic of the", phone: "243" },
//   { code: "CK", label: "Cook Islands", phone: "682" },
//   { code: "CR", label: "Costa Rica", phone: "506" },
//   { code: "HR", label: "Croatia", phone: "385" },
//   { code: "CU", label: "Cuba", phone: "53" },
//   { code: "CW", label: "Curacao", phone: "599" },
//   { code: "CY", label: "Cyprus", phone: "357" },
//   { code: "CZ", label: "Czech Republic", phone: "420" },
//   { code: "DK", label: "Denmark", phone: "45" },
//   { code: "DJ", label: "Djibouti", phone: "253" },
//   { code: "DM", label: "Dominica", phone: "1-767" },
//   { code: "DO", label: "Dominican Republic", phone: "1-809" },
//   { code: "EC", label: "Ecuador", phone: "593" },
//   { code: "EG", label: "Egypt", phone: "20" },
//   { code: "SV", label: "El Salvador", phone: "503" },
//   { code: "GQ", label: "Equatorial Guinea", phone: "240" },
//   { code: "ER", label: "Eritrea", phone: "291" },
//   { code: "EE", label: "Estonia", phone: "372" },
//   { code: "ET", label: "Ethiopia", phone: "251" },
//   { code: "FO", label: "Faroe Islands", phone: "298" },
//   { code: "FJ", label: "Fiji", phone: "679" },
//   { code: "FI", label: "Finland", phone: "358" },
//   { code: "FR", label: "France", phone: "33", suggested: true },
//   { code: "GF", label: "French Guiana", phone: "594" },
//   { code: "PF", label: "French Polynesia", phone: "689" },
//   { code: "GA", label: "Gabon", phone: "241" },
//   { code: "GM", label: "Gambia", phone: "220" },
//   { code: "GE", label: "Georgia", phone: "995" },
//   { code: "DE", label: "Germany", phone: "49", suggested: true },
//   { code: "GH", label: "Ghana", phone: "233" },
//   { code: "GI", label: "Gibraltar", phone: "350" },
//   { code: "GR", label: "Greece", phone: "30" },
//   { code: "GL", label: "Greenland", phone: "299" },
//   { code: "GD", label: "Grenada", phone: "1-473" },
//   { code: "GP", label: "Guadeloupe", phone: "590" },
//   { code: "GU", label: "Guam", phone: "1-671" },
//   { code: "GT", label: "Guatemala", phone: "502" },
//   { code: "GG", label: "Guernsey", phone: "44" },
//   { code: "GN", label: "Guinea", phone: "224" },
//   { code: "GW", label: "Guinea-Bissau", phone: "245" },
//   { code: "GY", label: "Guyana", phone: "592" },
//   { code: "HT", label: "Haiti", phone: "509" },
//   { code: "HM", label: "Heard Island and McDonald Islands", phone: "672" },
//   { code: "VA", label: "Holy See (Vatican City State)", phone: "379" },
//   { code: "HN", label: "Honduras", phone: "504" },
//   { code: "HK", label: "Hong Kong", phone: "852" },
//   { code: "HU", label: "Hungary", phone: "36" },
//   { code: "IS", label: "Iceland", phone: "354" },
//   { code: "IN", label: "India", phone: "91" },
//   { code: "ID", label: "Indonesia", phone: "62" },
//   { code: "IR", label: "Iran, Islamic Republic of", phone: "98" },
//   { code: "IQ", label: "Iraq", phone: "964" },
//   { code: "IE", label: "Ireland", phone: "353" },
//   { code: "IM", label: "Isle of Man", phone: "44" },
//   { code: "IL", label: "Israel", phone: "972" },
//   { code: "IT", label: "Italy", phone: "39" },
//   { code: "JM", label: "Jamaica", phone: "1-876" },
//   { code: "JP", label: "Japan", phone: "81", suggested: true },
//   { code: "JE", label: "Jersey", phone: "44" },
//   { code: "JO", label: "Jordan", phone: "962" },
//   { code: "KZ", label: "Kazakhstan", phone: "7" },
//   { code: "KE", label: "Kenya", phone: "254" },
//   { code: "KI", label: "Kiribati", phone: "686" },
//   { code: "KP", label: "Korea, Democratic People's Republic of", phone: "850" },
//   { code: "KR", label: "Korea, Republic of", phone: "82" },
//   { code: "KW", label: "Kuwait", phone: "965" },
//   { code: "KG", label: "Kyrgyzstan", phone: "996" },
//   { code: "LA", label: "Lao People's Democratic Republic", phone: "856" },
//   { code: "LV", label: "Latvia", phone: "371" },
//   { code: "LB", label: "Lebanon", phone: "961" },
//   { code: "LS", label: "Lesotho", phone: "266" },
//   { code: "LR", label: "Liberia", phone: "231" },
//   { code: "LY", label: "Libya", phone: "218" },
//   { code: "LI", label: "Liechtenstein", phone: "423" },
//   { code: "LT", label: "Lithuania", phone: "370" },
//   { code: "LU", label: "Luxembourg", phone: "352" },
//   { code: "MO", label: "Macao", phone: "853" },
//   {
//     code: "MK",
//     label: "Macedonia, the Former Yugoslav Republic of",
//     phone: "389",
//   },
//   { code: "MG", label: "Madagascar", phone: "261" },
//   { code: "MW", label: "Malawi", phone: "265" },
//   { code: "MY", label: "Malaysia", phone: "60" },
//   { code: "MV", label: "Maldives", phone: "960" },
//   { code: "ML", label: "Mali", phone: "223" },
//   { code: "MT", label: "Malta", phone: "356" },
//   { code: "MH", label: "Marshall Islands", phone: "692" },
//   { code: "MQ", label: "Martinique", phone: "596" },
//   { code: "MR", label: "Mauritania", phone: "222" },
//   { code: "MU", label: "Mauritius", phone: "230" },
//   { code: "YT", label: "Mayotte", phone: "262" },
//   { code: "MX", label: "Mexico", phone: "52" },
//   { code: "FM", label: "Micronesia, Federated States of", phone: "691" },
//   { code: "MD", label: "Moldova, Republic of", phone: "373" },
//   { code: "MC", label: "Monaco", phone: "377" },
//   { code: "MN", label: "Mongolia", phone: "976" },
//   { code: "ME", label: "Montenegro", phone: "382" },
//   { code: "MS", label: "Montserrat", phone: "1-664" },
//   { code: "MA", label: "Morocco", phone: "212" },
//   { code: "MZ", label: "Mozambique", phone: "258" },
//   { code: "MM", label: "Myanmar", phone: "95" },
//   { code: "NA", label: "Namibia", phone: "264" },
//   { code: "NR", label: "Nauru", phone: "674" },
//   { code: "NP", label: "Nepal", phone: "977" },
//   { code: "NL", label: "Netherlands", phone: "31" },
//   { code: "NC", label: "New Caledonia", phone: "687" },
//   { code: "NZ", label: "New Zealand", phone: "64" },
//   { code: "NI", label: "Nicaragua", phone: "505" },
//   { code: "NE", label: "Niger", phone: "227" },
//   { code: "NG", label: "Nigeria", phone: "234" },
//   { code: "NU", label: "Niue", phone: "683" },
//   { code: "NF", label: "Norfolk Island", phone: "672" },
//   { code: "MP", label: "Northern Mariana Islands", phone: "1-670" },
//   { code: "NO", label: "Norway", phone: "47" },
//   { code: "OM", label: "Oman", phone: "968" },
//   { code: "PK", label: "Pakistan", phone: "92" },
//   { code: "PW", label: "Palau", phone: "680" },
//   { code: "PS", label: "Palestine, State of", phone: "970" },
//   { code: "PA", label: "Panama", phone: "507" },
//   { code: "PG", label: "Papua New Guinea", phone: "675" },
//   { code: "PY", label: "Paraguay", phone: "595" },
//   { code: "PE", label: "Peru", phone: "51" },
//   { code: "PH", label: "Philippines", phone: "63" },
//   { code: "PN", label: "Pitcairn", phone: "870" },
//   { code: "PL", label: "Poland", phone: "48" },
//   { code: "PT", label: "Portugal", phone: "351" },
//   { code: "PR", label: "Puerto Rico", phone: "1" },
//   { code: "QA", label: "Qatar", phone: "974" },
//   { code: "RE", label: "Reunion", phone: "262" },
//   { code: "RO", label: "Romania", phone: "40" },
//   { code: "RU", label: "Russian Federation", phone: "7" },
//   { code: "RW", label: "Rwanda", phone: "250" },
//   { code: "BL", label: "Saint Barthelemy", phone: "590" },
//   { code: "SH", label: "Saint Helena", phone: "290" },
//   { code: "KN", label: "Saint Kitts and Nevis", phone: "1-869" },
//   { code: "LC", label: "Saint Lucia", phone: "1-758" },
//   { code: "MF", label: "Saint Martin (French part)", phone: "590" },
//   { code: "PM", label: "Saint Pierre and Miquelon", phone: "508" },
//   { code: "VC", label: "Saint Vincent and the Grenadines", phone: "1-784" },
//   { code: "WS", label: "Samoa", phone: "685" },
//   { code: "SM", label: "San Marino", phone: "378" },
//   { code: "ST", label: "Sao Tome and Principe", phone: "239" },
//   { code: "SA", label: "Saudi Arabia", phone: "966" },
//   { code: "SN", label: "Senegal", phone: "221" },
//   { code: "RS", label: "Serbia", phone: "381" },
//   { code: "SC", label: "Seychelles", phone: "248" },
//   { code: "SL", label: "Sierra Leone", phone: "232" },
//   { code: "SG", label: "Singapore", phone: "65" },
//   { code: "SX", label: "Sint Maarten (Dutch part)", phone: "1-721" },
//   { code: "SK", label: "Slovakia", phone: "421" },
//   { code: "SI", label: "Slovenia", phone: "386" },
//   { code: "SB", label: "Solomon Islands", phone: "677" },
//   { code: "SO", label: "Somalia", phone: "252" },
//   { code: "ZA", label: "South Africa", phone: "27" },
//   {
//     code: "GS",
//     label: "South Georgia and the South Sandwich Islands",
//     phone: "500",
//   },
//   { code: "SS", label: "South Sudan", phone: "211" },
//   { code: "ES", label: "Spain", phone: "34" },
//   { code: "LK", label: "Sri Lanka", phone: "94" },
//   { code: "SD", label: "Sudan", phone: "249" },
//   { code: "SR", label: "Suriname", phone: "597" },
//   { code: "SJ", label: "Svalbard and Jan Mayen", phone: "47" },
//   { code: "SZ", label: "Swaziland", phone: "268" },
//   { code: "SE", label: "Sweden", phone: "46" },
//   { code: "CH", label: "Switzerland", phone: "41" },
//   { code: "SY", label: "Syrian Arab Republic", phone: "963" },
//   { code: "TW", label: "Taiwan, Republic of China", phone: "886" },
//   { code: "TJ", label: "Tajikistan", phone: "992" },
//   { code: "TZ", label: "United Republic of Tanzania", phone: "255" },
//   { code: "TH", label: "Thailand", phone: "66" },
//   { code: "TL", label: "Timor-Leste", phone: "670" },
//   { code: "TG", label: "Togo", phone: "228" },
//   { code: "TK", label: "Tokelau", phone: "690" },
//   { code: "TO", label: "Tonga", phone: "676" },
//   { code: "TT", label: "Trinidad and Tobago", phone: "1-868" },
//   { code: "TN", label: "Tunisia", phone: "216" },
//   { code: "TR", label: "Turkey", phone: "90" },
//   { code: "TM", label: "Turkmenistan", phone: "993" },
//   { code: "TC", label: "Turks and Caicos Islands", phone: "1-649" },
//   { code: "TV", label: "Tuvalu", phone: "688" },
//   { code: "UG", label: "Uganda", phone: "256" },
//   { code: "UA", label: "Ukraine", phone: "380" },
//   { code: "AE", label: "United Arab Emirates", phone: "971" },
//   { code: "GB", label: "United Kingdom", phone: "44" },
//   { code: "US", label: "United States", phone: "1" },
//   { code: "UM", label: "United States Minor Outlying Islands", phone: "1" },
//   { code: "UY", label: "Uruguay", phone: "598" },
//   { code: "VI", label: "US Virgin Islands", phone: "1-340" },
//   { code: "UZ", label: "Uzbekistan", phone: "998" },
//   { code: "VU", label: "Vanuatu", phone: "678" },
//   { code: "VE", label: "Venezuela", phone: "58" },
//   { code: "VN", label: "Vietnam", phone: "84" },
//   { code: "WF", label: "Wallis and Futuna", phone: "681" },
//   { code: "EH", label: "Western Sahara", phone: "212" },
//   { code: "YE", label: "Yemen", phone: "967" },
//   { code: "ZM", label: "Zambia", phone: "260" },
//   { code: "ZW", label: "Zimbabwe", phone: "263" },
// ];
// with MRZ CODE
export const countries = [
  { code: "AF", label: "Afghanistan", phone: "93", mrzCode: "AFG" },
  { code: "AL", label: "Albania", phone: "355", mrzCode: "ALB" },
  { code: "DZ", label: "Algeria", phone: "213", mrzCode: "DZA" },
  { code: "AS", label: "American Samoa", phone: "1-684", mrzCode: "ASM" },
  { code: "AD", label: "Andorra", phone: "376", mrzCode: "AND" },
  { code: "AO", label: "Angola", phone: "244", mrzCode: "AGO" },
  { code: "AI", label: "Anguilla", phone: "1-264", mrzCode: "AIA" },
  { code: "AQ", label: "Antarctica", phone: "672", mrzCode: "ATA" },
  { code: "AG", label: "Antigua and Barbuda", phone: "1-268", mrzCode: "ATG" },
  { code: "AR", label: "Argentina", phone: "54", mrzCode: "ARG" },
  { code: "AM", label: "Armenia", phone: "374", mrzCode: "ARM" },
  { code: "AW", label: "Aruba", phone: "297", mrzCode: "ABW" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
    mrzCode: "AUS",
  },
  { code: "AT", label: "Austria", phone: "43", mrzCode: "AUT" },
  { code: "AZ", label: "Azerbaijan", phone: "994", mrzCode: "AZE" },
  { code: "BS", label: "Bahamas", phone: "1-242", mrzCode: "BHS" },
  { code: "BH", label: "Bahrain", phone: "973", mrzCode: "BHR" },
  { code: "BD", label: "Bangladesh", phone: "880", mrzCode: "BGD" },
  { code: "BB", label: "Barbados", phone: "1-246", mrzCode: "BRB" },
  { code: "BY", label: "Belarus", phone: "375", mrzCode: "BLR" },
  { code: "BE", label: "Belgium", phone: "32", mrzCode: "BEL" },
  { code: "BZ", label: "Belize", phone: "501", mrzCode: "BLZ" },
  { code: "BJ", label: "Benin", phone: "229", mrzCode: "BEN" },
  { code: "BM", label: "Bermuda", phone: "1-441", mrzCode: "BMU" },
  { code: "BT", label: "Bhutan", phone: "975", mrzCode: "BTN" },
  { code: "BO", label: "Bolivia", phone: "591", mrzCode: "BOL" },
  { code: "BA", label: "Bosnia and Herzegovina", phone: "387", mrzCode: "BIH" },
  { code: "BW", label: "Botswana", phone: "267", mrzCode: "BWA" },
  { code: "BR", label: "Brazil", phone: "55", mrzCode: "BRA" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246",
    mrzCode: "IOT",
  },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
    mrzCode: "VGB",
  },
  { code: "BN", label: "Brunei Darussalam", phone: "673", mrzCode: "BRN" },
  { code: "BG", label: "Bulgaria", phone: "359", mrzCode: "BGR" },
  { code: "BF", label: "Burkina Faso", phone: "226", mrzCode: "BFA" },
  { code: "BI", label: "Burundi", phone: "257", mrzCode: "BDI" },
  { code: "KH", label: "Cambodia", phone: "855", mrzCode: "KHM" },
  { code: "CM", label: "Cameroon", phone: "237", mrzCode: "CMR" },
  { code: "CA", label: "Canada", phone: "1", suggested: true, mrzCode: "CAN" },
  { code: "CV", label: "Cape Verde", phone: "238", mrzCode: "CPV" },
  { code: "KY", label: "Cayman Islands", phone: "1-345", mrzCode: "CYM" },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
    mrzCode: "CAF",
  },
  { code: "TD", label: "Chad", phone: "235", mrzCode: "TCD" },
  { code: "CL", label: "Chile", phone: "56", mrzCode: "CHL" },
  { code: "CN", label: "China", phone: "86", mrzCode: "CHN" },
  { code: "CX", label: "Christmas Island", phone: "61", mrzCode: "CXR" },
  { code: "CC", label: "Cocos (Keeling) Islands", phone: "61", mrzCode: "CCK" },
  { code: "CO", label: "Colombia", phone: "57", mrzCode: "COL" },
  { code: "KM", label: "Comoros", phone: "269", mrzCode: "COM" },
  { code: "CG", label: "Congo, Republic of the", phone: "242", mrzCode: "COG" },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
    mrzCode: "COD",
  },
  { code: "CK", label: "Cook Islands", phone: "682", mrzCode: "COK" },
  { code: "CR", label: "Costa Rica", phone: "506", mrzCode: "CRI" },
  { code: "HR", label: "Croatia", phone: "385", mrzCode: "HRV" },
  { code: "CU", label: "Cuba", phone: "53", mrzCode: "CUB" },
  { code: "CW", label: "Curacao", phone: "599", mrzCode: "CUW" },
  { code: "CY", label: "Cyprus", phone: "357", mrzCode: "CYP" },
  { code: "CZ", label: "Czech Republic", phone: "420", mrzCode: "CZE" },
  { code: "DK", label: "Denmark", phone: "45", mrzCode: "DNK" },
  { code: "DJ", label: "Djibouti", phone: "253", mrzCode: "DJI" },
  { code: "DM", label: "Dominica", phone: "1-767", mrzCode: "DMA" },
  { code: "DO", label: "Dominican Republic", phone: "1-809", mrzCode: "DOM" },
  { code: "EC", label: "Ecuador", phone: "593", mrzCode: "ECU" },
  { code: "EG", label: "Egypt", phone: "20", mrzCode: "EGY" },
  { code: "SV", label: "El Salvador", phone: "503", mrzCode: "SLV" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240", mrzCode: "GNQ" },
  { code: "ER", label: "Eritrea", phone: "291", mrzCode: "ERI" },
  { code: "EE", label: "Estonia", phone: "372", mrzCode: "EST" },
  { code: "ET", label: "Ethiopia", phone: "251", mrzCode: "ETH" },
  { code: "FO", label: "Faroe Islands", phone: "298", mrzCode: "FRO" },
  { code: "FJ", label: "Fiji", phone: "679", mrzCode: "FJI" },
  { code: "FI", label: "Finland", phone: "358", mrzCode: "FIN" },
  { code: "FR", label: "France", phone: "33", suggested: true, mrzCode: "FRA" },
  { code: "GF", label: "French Guiana", phone: "594", mrzCode: "GUF" },
  { code: "PF", label: "French Polynesia", phone: "689", mrzCode: "PYF" },
  { code: "GA", label: "Gabon", phone: "241", mrzCode: "GAB" },
  { code: "GM", label: "Gambia", phone: "220", mrzCode: "GMB" },
  { code: "GE", label: "Georgia", phone: "995", mrzCode: "GEO" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
    mrzCode: "DEU",
  },
  { code: "GH", label: "Ghana", phone: "233", mrzCode: "GHA" },
  { code: "GI", label: "Gibraltar", phone: "350", mrzCode: "GIB" },
  { code: "GR", label: "Greece", phone: "30", mrzCode: "GRC" },
  { code: "GL", label: "Greenland", phone: "299", mrzCode: "GRL" },
  { code: "GD", label: "Grenada", phone: "1-473", mrzCode: "GRD" },
  { code: "GP", label: "Guadeloupe", phone: "590", mrzCode: "GLP" },
  { code: "GU", label: "Guam", phone: "1-671", mrzCode: "GUM" },
  { code: "GT", label: "Guatemala", phone: "502", mrzCode: "GTM" },
  { code: "GG", label: "Guernsey", phone: "44", mrzCode: "GGY" },
  { code: "GN", label: "Guinea", phone: "224", mrzCode: "GIN" },
  { code: "GW", label: "Guinea-Bissau", phone: "245", mrzCode: "GNB" },
  { code: "GY", label: "Guyana", phone: "592", mrzCode: "GUY" },
  { code: "HT", label: "Haiti", phone: "509", mrzCode: "HTI" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672",
    mrzCode: "HMD",
  },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
    mrzCode: "VAT",
  },
  { code: "HN", label: "Honduras", phone: "504", mrzCode: "HND" },
  { code: "HK", label: "Hong Kong", phone: "852", mrzCode: "HKG" },
  { code: "HU", label: "Hungary", phone: "36", mrzCode: "HUN" },
  { code: "IS", label: "Iceland", phone: "354", mrzCode: "ISL" },
  { code: "IN", label: "India", phone: "91", mrzCode: "IND" },
  { code: "ID", label: "Indonesia", phone: "62", mrzCode: "IDN" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98",
    mrzCode: "IRN",
  },
  { code: "IQ", label: "Iraq", phone: "964", mrzCode: "IRQ" },
  { code: "IE", label: "Ireland", phone: "353", mrzCode: "IRL" },
  { code: "IM", label: "Isle of Man", phone: "44", mrzCode: "IMN" },
  { code: "IL", label: "Israel", phone: "972", mrzCode: "ISR" },
  { code: "IT", label: "Italy", phone: "39", mrzCode: "ITA" },
  { code: "JM", label: "Jamaica", phone: "1-876", mrzCode: "JAM" },
  { code: "JP", label: "Japan", phone: "81", suggested: true, mrzCode: "JPN" },
  { code: "JE", label: "Jersey", phone: "44", mrzCode: "JEY" },
  { code: "JO", label: "Jordan", phone: "962", mrzCode: "JOR" },
  { code: "KZ", label: "Kazakhstan", phone: "7", mrzCode: "KAZ" },
  { code: "KE", label: "Kenya", phone: "254", mrzCode: "KEN" },
  { code: "KI", label: "Kiribati", phone: "686", mrzCode: "KIR" },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
    mrzCode: "PRK",
  },
  { code: "KR", label: "Korea, Republic of", phone: "82", mrzCode: "KOR" },
  { code: "KW", label: "Kuwait", phone: "965", mrzCode: "KWT" },
  { code: "KG", label: "Kyrgyzstan", phone: "996", mrzCode: "KGZ" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
    mrzCode: "LAO",
  },
  { code: "LV", label: "Latvia", phone: "371", mrzCode: "LVA" },
  { code: "LB", label: "Lebanon", phone: "961", mrzCode: "LBN" },
  { code: "LS", label: "Lesotho", phone: "266", mrzCode: "LSO" },
  { code: "LR", label: "Liberia", phone: "231", mrzCode: "LBR" },
  { code: "LY", label: "Libya", phone: "218", mrzCode: "LBY" },
  { code: "LI", label: "Liechtenstein", phone: "423", mrzCode: "LIE" },
  { code: "LT", label: "Lithuania", phone: "370", mrzCode: "LTU" },
  { code: "LU", label: "Luxembourg", phone: "352", mrzCode: "LUX" },
  { code: "MO", label: "Macao", phone: "853", mrzCode: "MAC" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
    mrzCode: "MKD",
  },
  { code: "MG", label: "Madagascar", phone: "261", mrzCode: "MDG" },
  { code: "MW", label: "Malawi", phone: "265", mrzCode: "MWI" },
  { code: "MY", label: "Malaysia", phone: "60", mrzCode: "MYS" },
  { code: "MV", label: "Maldives", phone: "960", mrzCode: "MDV" },
  { code: "ML", label: "Mali", phone: "223", mrzCode: "MLI" },
  { code: "MT", label: "Malta", phone: "356", mrzCode: "MLT" },
  { code: "MH", label: "Marshall Islands", phone: "692", mrzCode: "MHL" },
  { code: "MQ", label: "Martinique", phone: "596", mrzCode: "MTQ" },
  { code: "MR", label: "Mauritania", phone: "222", mrzCode: "MRT" },
  { code: "MU", label: "Mauritius", phone: "230", mrzCode: "MUS" },
  { code: "YT", label: "Mayotte", phone: "262", mrzCode: "MYT" },
  { code: "MX", label: "Mexico", phone: "52", mrzCode: "MEX" },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691",
    mrzCode: "FSM",
  },
  { code: "MD", label: "Moldova, Republic of", phone: "373", mrzCode: "MDA" },
  { code: "MC", label: "Monaco", phone: "377", mrzCode: "MCO" },
  { code: "MN", label: "Mongolia", phone: "976", mrzCode: "MNG" },
  { code: "ME", label: "Montenegro", phone: "382", mrzCode: "MNE" },
  { code: "MS", label: "Montserrat", phone: "1-664", mrzCode: "MSR" },
  { code: "MA", label: "Morocco", phone: "212", mrzCode: "MAR" },
  { code: "MZ", label: "Mozambique", phone: "258", mrzCode: "MOZ" },
  { code: "MM", label: "Myanmar", phone: "95", mrzCode: "MMR" },
  { code: "NA", label: "Namibia", phone: "264", mrzCode: "NAM" },
  { code: "NR", label: "Nauru", phone: "674", mrzCode: "NRU" },
  { code: "NP", label: "Nepal", phone: "977", mrzCode: "NPL" },
  { code: "NL", label: "Netherlands", phone: "31", mrzCode: "NLD" },
  { code: "NC", label: "New Caledonia", phone: "687", mrzCode: "NCL" },
  { code: "NZ", label: "New Zealand", phone: "64", mrzCode: "NZL" },
  { code: "NI", label: "Nicaragua", phone: "505", mrzCode: "NIC" },
  { code: "NE", label: "Niger", phone: "227", mrzCode: "NER" },
  { code: "NG", label: "Nigeria", phone: "234", mrzCode: "NGA" },
  { code: "NU", label: "Niue", phone: "683", mrzCode: "NIU" },
  { code: "NF", label: "Norfolk Island", phone: "672", mrzCode: "NFK" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670",
    mrzCode: "MNP",
  },
  { code: "NO", label: "Norway", phone: "47", mrzCode: "NOR" },
  { code: "OM", label: "Oman", phone: "968", mrzCode: "OMN" },
  { code: "PK", label: "Pakistan", phone: "92", mrzCode: "PAK" },
  { code: "PW", label: "Palau", phone: "680", mrzCode: "PLW" },
  { code: "PS", label: "Palestine, State of", phone: "970", mrzCode: "PSE" },
  { code: "PA", label: "Panama", phone: "507", mrzCode: "PAN" },
  { code: "PG", label: "Papua New Guinea", phone: "675", mrzCode: "PNG" },
  { code: "PY", label: "Paraguay", phone: "595", mrzCode: "PRY" },
  { code: "PE", label: "Peru", phone: "51", mrzCode: "PER" },
  { code: "PH", label: "Philippines", phone: "63", mrzCode: "PHL" },
  { code: "PN", label: "Pitcairn", phone: "870", mrzCode: "PCN" },
  { code: "PL", label: "Poland", phone: "48", mrzCode: "POL" },
  { code: "PT", label: "Portugal", phone: "351", mrzCode: "PRT" },
  { code: "PR", label: "Puerto Rico", phone: "1", mrzCode: "PRI" },
  { code: "QA", label: "Qatar", phone: "974", mrzCode: "QAT" },
  { code: "RE", label: "Reunion", phone: "262", mrzCode: "REU" },
  { code: "RO", label: "Romania", phone: "40", mrzCode: "ROU" },
  { code: "RU", label: "Russian Federation", phone: "7", mrzCode: "RUS" },
  { code: "RW", label: "Rwanda", phone: "250", mrzCode: "RWA" },
  { code: "BL", label: "Saint Barthelemy", phone: "590", mrzCode: "BLM" },
  { code: "SH", label: "Saint Helena", phone: "290", mrzCode: "SHN" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
    mrzCode: "KNA",
  },
  { code: "LC", label: "Saint Lucia", phone: "1-758", mrzCode: "LCA" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590",
    mrzCode: "MAF",
  },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
    mrzCode: "SPM",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
    mrzCode: "VCT",
  },
  { code: "WS", label: "Samoa", phone: "685", mrzCode: "WSM" },
  { code: "SM", label: "San Marino", phone: "378", mrzCode: "SMR" },
  { code: "ST", label: "Sao Tome and Principe", phone: "239", mrzCode: "STP" },
  { code: "SA", label: "Saudi Arabia", phone: "966", mrzCode: "SAU" },
  { code: "SN", label: "Senegal", phone: "221", mrzCode: "SEN" },
  { code: "RS", label: "Serbia", phone: "381", mrzCode: "SRB" },
  { code: "SC", label: "Seychelles", phone: "248", mrzCode: "SYC" },
  { code: "SL", label: "Sierra Leone", phone: "232", mrzCode: "SLE" },
  { code: "SG", label: "Singapore", phone: "65", mrzCode: "SGP" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
    mrzCode: "SXM",
  },
  { code: "SK", label: "Slovakia", phone: "421", mrzCode: "SVK" },
  { code: "SI", label: "Slovenia", phone: "386", mrzCode: "SVN" },
  { code: "SB", label: "Solomon Islands", phone: "677", mrzCode: "SLB" },
  { code: "SO", label: "Somalia", phone: "252", mrzCode: "SOM" },
  { code: "ZA", label: "South Africa", phone: "27", mrzCode: "ZAF" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
    mrzCode: "SGS",
  },
  { code: "SS", label: "South Sudan", phone: "211", mrzCode: "SSD" },
  { code: "ES", label: "Spain", phone: "34", mrzCode: "ESP" },
  { code: "LK", label: "Sri Lanka", phone: "94", mrzCode: "LKA" },
  { code: "SD", label: "Sudan", phone: "249", mrzCode: "SDN" },
  { code: "SR", label: "Suriname", phone: "597", mrzCode: "SUR" },
  { code: "SJ", label: "Svalbard and Jan Mayen", phone: "47", mrzCode: "SJM" },
  { code: "SZ", label: "Swaziland", phone: "268", mrzCode: "SWZ" },
  { code: "SE", label: "Sweden", phone: "46", mrzCode: "SWE" },
  { code: "CH", label: "Switzerland", phone: "41", mrzCode: "CHE" },
  { code: "SY", label: "Syrian Arab Republic", phone: "963", mrzCode: "SYR" },
  {
    code: "TW",
    label: "Taiwan, Republic of China",
    phone: "886",
    mrzCode: "TWN",
  },
  { code: "TJ", label: "Tajikistan", phone: "992", mrzCode: "TJK" },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255",
    mrzCode: "TZA",
  },
  { code: "TH", label: "Thailand", phone: "66", mrzCode: "THA" },
  { code: "TL", label: "Timor-Leste", phone: "670", mrzCode: "TLS" },
  { code: "TG", label: "Togo", phone: "228", mrzCode: "TGO" },
  { code: "TK", label: "Tokelau", phone: "690", mrzCode: "TKL" },
  { code: "TO", label: "Tonga", phone: "676", mrzCode: "TON" },
  { code: "TT", label: "Trinidad and Tobago", phone: "1-868", mrzCode: "TTO" },
  { code: "TN", label: "Tunisia", phone: "216", mrzCode: "TUN" },
  { code: "TR", label: "Turkey", phone: "90", mrzCode: "TUR" },
  { code: "TM", label: "Turkmenistan", phone: "993", mrzCode: "TKM" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
    mrzCode: "TCA",
  },
  { code: "TV", label: "Tuvalu", phone: "688", mrzCode: "TUV" },
  { code: "UG", label: "Uganda", phone: "256", mrzCode: "UGA" },
  { code: "UA", label: "Ukraine", phone: "380", mrzCode: "UKR" },
  { code: "AE", label: "United Arab Emirates", phone: "971", mrzCode: "ARE" },
  { code: "GB", label: "United Kingdom", phone: "44", mrzCode: "GBR" },
  { code: "US", label: "United States", phone: "1", mrzCode: "USA" },
  {
    code: "UM",
    label: "United States Minor Outlying Islands",
    phone: "1",
    mrzCode: "UMI",
  },
  { code: "UY", label: "Uruguay", phone: "598", mrzCode: "URY" },
  { code: "VI", label: "US Virgin Islands", phone: "1-340", mrzCode: "VIR" },
  { code: "UZ", label: "Uzbekistan", phone: "998", mrzCode: "UZB" },
  { code: "VU", label: "Vanuatu", phone: "678", mrzCode: "VUT" },
  { code: "VE", label: "Venezuela", phone: "58", mrzCode: "VEN" },
  { code: "VN", label: "Vietnam", phone: "84", mrzCode: "VNM" },
  { code: "WF", label: "Wallis and Futuna", phone: "681", mrzCode: "WLF" },
  { code: "EH", label: "Western Sahara", phone: "212", mrzCode: "ESH" },
  { code: "YE", label: "Yemen", phone: "967", mrzCode: "YEM" },
  { code: "ZM", label: "Zambia", phone: "260", mrzCode: "ZMB" },
  { code: "ZW", label: "Zimbabwe", phone: "263", mrzCode: "ZWE" },
];

console.log(countries);
