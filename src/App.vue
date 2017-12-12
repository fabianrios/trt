<template>
  <div id="app">
    <div id="progress-bar" v-bind:style="{ width: progressWidth + '%', background: progressColor }"></div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      cloudinary: {
        uploadPreset: 'nufipcxu',
        apiKey: '126896252395396',
        cloudName: 'trt-tv'
      },
      info: [],
      errors: [],
      series: [],
      root: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
      este: 'este',
      progressWidth: 0,
      progressColor: 'orange',
      countries: [
        { text: 'AF', value: 'Afghanistan' },
        { text: 'AX', value: 'Åland Islands' },
        { text: 'AL', value: 'Albania' },
        { text: 'DZ', value: 'Algeria' },
        { text: 'AS', value: 'American Samoa' },
        { text: 'AD', value: 'Andorra' },
        { text: 'AO', value: 'Angola' },
        { text: 'AI', value: 'Anguilla' },
        { text: 'AQ', value: 'Antarctica' },
        { text: 'AG', value: 'Antigua and Barbuda' },
        { text: 'AR', value: 'Argentina' },
        { text: 'AM', value: 'Armenia' },
        { text: 'AW', value: 'Aruba' },
        { text: 'AU', value: 'Australia' },
        { text: 'AT', value: 'Austria' },
        { text: 'AZ', value: 'Azerbaijan' },
        { text: 'BS', value: 'Bahamas' },
        { text: 'BH', value: 'Bahrain' },
        { text: 'BD', value: 'Bangladesh' },
        { text: 'BB', value: 'Barbados' },
        { text: 'BY', value: 'Belarus' },
        { text: 'BE', value: 'Belgium' },
        { text: 'BZ', value: 'Belize' },
        { text: 'BJ', value: 'Benin' },
        { text: 'BM', value: 'Bermuda' },
        { text: 'BT', value: 'Bhutan' },
        { text: 'BO', value: 'Bolivia, Plurinational State of' },
        { text: 'BQ', value: 'Bonaire, Sint Eustatius and Saba' },
        { text: 'BA', value: 'Bosnia and Herzegovina' },
        { text: 'BW', value: 'Botswana' },
        { text: 'BV', value: 'Bouvet Island' },
        { text: 'BR', value: 'Brazil' },
        { text: 'IO', value: 'British Indian Ocean Territory' },
        { text: 'BN', value: 'Brunei Darussalam' },
        { text: 'BG', value: 'Bulgaria' },
        { text: 'BF', value: 'Burkina Faso' },
        { text: 'BI', value: 'Burundi' },
        { text: 'KH', value: 'Cambodia' },
        { text: 'CM', value: 'Cameroon' },
        { text: 'CA', value: 'Canada' },
        { text: 'CV', value: 'Cape Verde' },
        { text: 'KY', value: 'Cayman Islands' },
        { text: 'CF', value: 'Central African Republic' },
        { text: 'TD', value: 'Chad' },
        { text: 'CL', value: 'Chile' },
        { text: 'CN', value: 'China' },
        { text: 'CX', value: 'Christmas Island' },
        { text: 'CC', value: 'Cocos (Keeling) Islands' },
        { text: 'CO', value: 'Colombia' },
        { text: 'KM', value: 'Comoros' },
        { text: 'CG', value: 'Congo' },
        { text: 'CD', value: 'Congo, the Democratic Republic of the' },
        { text: 'CK', value: 'Cook Islands' },
        { text: 'CR', value: 'Costa Rica' },
        { text: 'CI', value: `Côte d'Ivoire` },
        { text: 'HR', value: 'Croatia' },
        { text: 'CU', value: 'Cuba' },
        { text: 'CW', value: 'Curaçao' },
        { text: 'CY', value: 'Cyprus' },
        { text: 'CZ', value: 'Czech Republic' },
        { text: 'DK', value: 'Denmark' },
        { text: 'DJ', value: 'Djibouti' },
        { text: 'DM', value: 'Dominica' },
        { text: 'DO', value: 'Dominican Republic' },
        { text: 'EC', value: 'Ecuador' },
        { text: 'EG', value: 'Egypt' },
        { text: 'SV', value: 'El Salvador' },
        { text: 'GQ', value: 'Equatorial Guinea' },
        { text: 'ER', value: 'Eritrea' },
        { text: 'EE', value: 'Estonia' },
        { text: 'ET', value: 'Ethiopia' },
        { text: 'FK', value: 'Falkland Islands (Malvinas)' },
        { text: 'FO', value: 'Faroe Islands' },
        { text: 'FJ', value: 'Fiji' },
        { text: 'FI', value: 'Finland' },
        { text: 'FR', value: 'France' },
        { text: 'GF', value: 'French Guiana' },
        { text: 'PF', value: 'French Polynesia' },
        { text: 'TF', value: 'French Southern Territories' },
        { text: 'GA', value: 'Gabon' },
        { text: 'GM', value: 'Gambia' },
        { text: 'GE', value: 'Georgia' },
        { text: 'DE', value: 'Germany' },
        { text: 'GH', value: 'Ghana' },
        { text: 'GI', value: 'Gibraltar' },
        { text: 'GR', value: 'Greece' },
        { text: 'GL', value: 'Greenland' },
        { text: 'GD', value: 'Grenada' },
        { text: 'GP', value: 'Guadeloupe' },
        { text: 'GU', value: 'Guam' },
        { text: 'GT', value: 'Guatemala' },
        { text: 'GG', value: 'Guernsey' },
        { text: 'GN', value: 'Guinea' },
        { text: 'GW', value: 'Guinea-Bissau' },
        { text: 'GY', value: 'Guyana' },
        { text: 'HT', value: 'Haiti' },
        { text: 'HM', value: 'Heard Island and McDonald Islands' },
        { text: 'VA', value: 'Holy See (Vatican City State)' },
        { text: 'HN', value: 'Honduras' },
        { text: 'HK', value: 'Hong Kong' },
        { text: 'HU', value: 'Hungary' },
        { text: 'IS', value: 'Iceland' },
        { text: 'IN', value: 'India' },
        { text: 'ID', value: 'Indonesia' },
        { text: 'IR', value: 'Iran, Islamic Republic of' },
        { text: 'IQ', value: 'Iraq' },
        { text: 'IE', value: 'Ireland' },
        { text: 'IM', value: 'Isle of Man' },
        { text: 'IL', value: 'Israel' },
        { text: 'IT', value: 'Italy' },
        { text: 'JM', value: 'Jamaica' },
        { text: 'JP', value: 'Japan' },
        { text: 'JE', value: 'Jersey' },
        { text: 'JO', value: 'Jordan' },
        { text: 'KZ', value: 'Kazakhstan' },
        { text: 'KE', value: 'Kenya' },
        { text: 'KI', value: 'Kiribati' },
        { text: 'KP', value: `Korea, Democratic People's Republic of` },
        { text: 'KR', value: 'Korea, Republic of' },
        { text: 'KW', value: 'Kuwait' },
        { text: 'KG', value: 'Kyrgyzstan' },
        { text: 'LA', value: `Lao People's Democratic Republic` },
        { text: 'LV', value: 'Latvia' },
        { text: 'LB', value: 'Lebanon' },
        { text: 'LS', value: 'Lesotho' },
        { text: 'LR', value: 'Liberia' },
        { text: 'LY', value: 'Libya' },
        { text: 'LI', value: 'Liechtenstein' },
        { text: 'LT', value: 'Lithuania' },
        { text: 'LU', value: 'Luxembourg' },
        { text: 'MO', value: 'Macao' },
        { text: 'MK', value: 'Macedonia, the Former Yugoslav Republic of' },
        { text: 'MG', value: 'Madagascar' },
        { text: 'MW', value: 'Malawi' },
        { text: 'MY', value: 'Malaysia' },
        { text: 'MV', value: 'Maldives' },
        { text: 'ML', value: 'Mali' },
        { text: 'MT', value: 'Malta' },
        { text: 'MH', value: 'Marshall Islands' },
        { text: 'MQ', value: 'Martinique' },
        { text: 'MR', value: 'Mauritania' },
        { text: 'MU', value: 'Mauritius' },
        { text: 'YT', value: 'Mayotte' },
        { text: 'MX', value: 'Mexico' },
        { text: 'FM', value: 'Micronesia, Federated States of' },
        { text: 'MD', value: 'Moldova, Republic of' },
        { text: 'MC', value: 'Monaco' },
        { text: 'MN', value: 'Mongolia' },
        { text: 'ME', value: 'Montenegro' },
        { text: 'MS', value: 'Montserrat' },
        { text: 'MA', value: 'Morocco' },
        { text: 'MZ', value: 'Mozambique' },
        { text: 'MM', value: 'Myanmar' },
        { text: 'NA', value: 'Namibia' },
        { text: 'NR', value: 'Nauru' },
        { text: 'NP', value: 'Nepal' },
        { text: 'NL', value: 'Netherlands' },
        { text: 'NC', value: 'New Caledonia' },
        { text: 'NZ', value: 'New Zealand' },
        { text: 'NI', value: 'Nicaragua' },
        { text: 'NE', value: 'Niger' },
        { text: 'NG', value: 'Nigeria' },
        { text: 'NU', value: 'Niue' },
        { text: 'NF', value: 'Norfolk Island' },
        { text: 'MP', value: 'Northern Mariana Islands' },
        { text: 'NO', value: 'Norway' },
        { text: 'OM', value: 'Oman' },
        { text: 'PK', value: 'Pakistan' },
        { text: 'PW', value: 'Palau' },
        { text: 'PS', value: 'Palestine, State of' },
        { text: 'PA', value: 'Panama' },
        { text: 'PG', value: 'Papua New Guinea' },
        { text: 'PY', value: 'Paraguay' },
        { text: 'PE', value: 'Peru' },
        { text: 'PH', value: 'Philippines' },
        { text: 'PN', value: 'Pitcairn' },
        { text: 'PL', value: 'Poland' },
        { text: 'PT', value: 'Portugal' },
        { text: 'PR', value: 'Puerto Rico' },
        { text: 'QA', value: 'Qatar' },
        { text: 'RE', value: 'Réunion' },
        { text: 'RO', value: 'Romania' },
        { text: 'RU', value: 'Russian Federation' },
        { text: 'RW', value: 'Rwanda' },
        { text: 'BL', value: 'Saint Barthélemy' },
        { text: 'SH', value: 'Saint Helena, Ascension and Tristan da Cunha' },
        { text: 'KN', value: 'Saint Kitts and Nevis' },
        { text: 'LC', value: 'Saint Lucia' },
        { text: 'MF', value: 'Saint Martin (French part)' },
        { text: 'PM', value: 'Saint Pierre and Miquelon' },
        { text: 'VC', value: 'Saint Vincent and the Grenadines' },
        { text: 'WS', value: 'Samoa' },
        { text: 'SM', value: 'San Marino' },
        { text: 'ST', value: 'Sao Tome and Principe' },
        { text: 'SA', value: 'Saudi Arabia' },
        { text: 'SN', value: 'Senegal' },
        { text: 'RS', value: 'Serbia' },
        { text: 'SC', value: 'Seychelles' },
        { text: 'SL', value: 'Sierra Leone' },
        { text: 'SG', value: 'Singapore' },
        { text: 'SX', value: 'Sint Maarten (Dutch part)' },
        { text: 'SK', value: 'Slovakia' },
        { text: 'SI', value: 'Slovenia' },
        { text: 'SB', value: 'Solomon Islands' },
        { text: 'SO', value: 'Somalia' },
        { text: 'ZA', value: 'South Africa' },
        { text: 'GS', value: 'South Georgia and the South Sandwich Islands' },
        { text: 'SS', value: 'South Sudan' },
        { text: 'ES', value: 'Spain' },
        { text: 'LK', value: 'Sri Lanka' },
        { text: 'SD', value: 'Sudan' },
        { text: 'SR', value: 'Suriname' },
        { text: 'SJ', value: 'Svalbard and Jan Mayen' },
        { text: 'SZ', value: 'Swaziland' },
        { text: 'SE', value: 'Sweden' },
        { text: 'CH', value: 'Switzerland' },
        { text: 'SY', value: 'Syrian Arab Republic' },
        { text: 'TW', value: 'Taiwan, Province of China' },
        { text: 'TJ', value: 'Tajikistan' },
        { text: 'TZ', value: 'Tanzania, United Republic of' },
        { text: 'TH', value: 'Thailand' },
        { text: 'TL', value: 'Timor-Leste' },
        { text: 'TG', value: 'Togo' },
        { text: 'TK', value: 'Tokelau' },
        { text: 'TO', value: 'Tonga' },
        { text: 'TT', value: 'Trinidad and Tobago' },
        { text: 'TN', value: 'Tunisia' },
        { text: 'TR', value: 'Turkey' },
        { text: 'TM', value: 'Turkmenistan' },
        { text: 'TC', value: 'Turks and Caicos Islands' },
        { text: 'TV', value: 'Tuvalu' },
        { text: 'UG', value: 'Uganda' },
        { text: 'UA', value: 'Ukraine' },
        { text: 'AE', value: 'United Arab Emirates' },
        { text: 'GB', value: 'United Kingdom' },
        { text: 'US', value: 'United States' },
        { text: 'UM', value: 'United States Minor Outlying Islands' },
        { text: 'UY', value: 'Uruguay' },
        { text: 'UZ', value: 'Uzbekistan' },
        { text: 'VU', value: 'Vanuatu' },
        { text: 'VE', value: 'Venezuela, Bolivarian Republic of' },
        { text: 'VN', value: 'Viet Nam' },
        { text: 'VG', value: 'Virgin Islands, British' },
        { text: 'VI', value: 'Virgin Islands, U.S.' },
        { text: 'WF', value: 'Wallis and Futuna' },
        { text: 'EH', value: 'Western Sahara' },
        { text: 'YE', value: 'Yemen' },
        { text: 'ZM', value: 'Zambia' },
        { text: 'ZW', value: 'Zimbabw' }]
    }
  },
  created () {
    this.fetchData()
    this.getAllSeries()
  },
  methods: {
    isAdmin: function isAdmin () {
      if (this.$session.get('jwt').admin !== true) {
        console.log('not an admin')
        this.$router.push(`/`)
      }
    },
    parseBody: function parseBody (form) {
      const sendBody = {}
      for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type !== 'submit') {
          if (form.elements[i].name === 'publish') {
            sendBody[form.elements[i].name] = form.elements[i].checked
          } else if (form.elements[i].name === 'file' && form.elements[i].files.length > 0) {
            sendBody[form.elements[i].name] = form.elements[i].files
          } else if (form.elements[i].value !== '') {
            sendBody[form.elements[i].name] = form.elements[i].value
          }
        }
      }
      return sendBody
    },
    fetchData: async function fetchData (e) {
      const vm = this
      const url = `${vm.root}/api/call`
      try {
        const response = await axios.get(url)
        vm.info = response.data
        // console.log(vm.info)
      } catch (e) {
        vm.errors.push(e)
      }
    },
    getAllSeries: async function getAllSeries (e) {
      const vm = this
      const url = `${vm.root}/serie`
      try {
        const response = await axios.get(url)
        // console.log('response', response.data)
        vm.series = response.data
      } catch (e) {
        console.log('error', e.response.data)
        vm.errors.push(e)
      }
    }
  }
}
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700";
</style>

<style lang="scss">
@import "./styles/style.scss";
</style>
