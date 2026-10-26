import { appGlobal } from '~/composables/appGlobal';
const { handleResponse, throwError } = useResponse();

const { convertFullStringToDate } = useDateFunctions();

const { isInList } = useMiscFunctions();

const {
  getServiceDescriptionNoPrice,
  getLocationSalons
} = useKhsds();

const bookGlobal = reactive({

  book: {
    step: 'service-type',
    header: 'Select the service type you are looking for',
    serviceGroupShow: {
      hair: false,
      nail: false,
      esthetic: false,
      wax: false,
      massage: false,
      makeUp: false,
      bar: false
    },
    serviceGroupVisible: {
      hair: true,
      nail: true,
      esthetic: true,
      wax: true,
      massage: true,
      makeUp: true,
      bar: true
    },
    locations: [],
    showNext: true,
    showPrev: true,
    started: false,
    completed: false,
    serviceAndTechnician: '',
    hasConfirmError: false,
    confirmErrorMessage: '',
    sex: '',
    showSexQuestion: false,
    takeError: false
  },

  minDate: new Date(),
  maxDate: new Date(),
  weekDate: new Date(),

  //this holds arrays of service codes and description by group
  serviceGroups: {},

  //this holds arrays of bar addons, each array named after parentServiceCode
  barAddonGroups: {},

  generateBarAddonGroups() {
    let barAddOnGroups = {};
    for (const item of bookGlobal.serviceGroups.serviceAddons) {
      const code = item['parentServiceCode'];
      if (!barAddOnGroups[code]) {
        barAddOnGroups[code] = [];
      }
      barAddOnGroups[code].push(item);
    }

    bookGlobal.barAddonGroups = barAddOnGroups;
  },

  //***************************
  //Data used in each component
  profiledAppointments: [],

  serviceStep: {
    error: '',
    webDescription: '',
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    isStartPrice: 0,
    facialAddDisabled: true,
    maniAddDisabled: true,
    pediAddDisabled: true
  },

  technicianStep: {
    error: '',
    showStylist: false,
    showNailTech: false,
    showEsthetician: false,
    showWaxer: false,
    showTherapist: false,
    stylists: [],
    stylistLevels: [],
    nailTechs: [],
    estheticians: [],
    waxers: [],
    therapists: [],
    stylistServiceDescription: '',
    nailTechServiceDescription: '',
    estheticianServiceDescription: '',
    waxerServiceDescription: '',
    therapistsServiceDescription: ''
  },

  takeStep: {
    serviceAndTechnician: '',
    confirmMessage: '',
    fullName: '',
    fullNameDisabled: false,
  },
  //End Data used in each component
  //***************************

  //service codes
  service: {
    cut: '',
    color: '',
    weave: '',
    treatment: '',
    perm: '',
    extension: '',
    mani: '',
    pedi: '',
    maniAdd: '',
    nailEnhance: '',
    pediAdd: '',
    facial: '',
    hydraFacial: '',
    facialAdd: '',
    microderm: '',
    bodyTreatment: '',
    massage: '',
    tint: '',
    lashBrow: '',
    makeUp: '',
    facialBar: '',
    browBar: '',
    lashBar: '',
    headSpa: '',
    headSpaAdd: ''
  },

  multiSelectService: {
    facialBarAdds: [],
    barWaxings: [],
    faceWaxings: [],
    bodyWaxings: []
  },

  discountService: {
    serviceCode: '',
    description: ''
  },

  clearDiscountService() {
    this.discountService.serviceCode = '';
    this.discountService.description = '';
  },

  //technician
  technician: {
    stylist: '',
    stylistLevel: '',
    nailTech: '',
    esthetician: '',
    waxer: '',
    therapist: ''
  },

  clearTechnicians() {
    bookGlobal.technician.stylist = '';
    bookGlobal.technician.stylistLevel = '';
    bookGlobal.technician.nailTech = '';
    bookGlobal.technician.esthetician = '';
    bookGlobal.technician.waxer = '';
    bookGlobal.technician.therapist = '';
  },

  //location
  selectedLocation: {},

  showLocationFilter: true,
  //filtered location
  filteredLocationCode: 'AL',

  bookingLocations: [],

  async getLocationSalons() {
    if (bookGlobal.bookingLocations.length === 0) { 
      bookGlobal.bookingLocations = await getLocationSalons();

      bookGlobal.bookingLocations = bookGlobal.bookingLocations.filter(location => location.locationCode !== 'AT');

      let allLocation = {
        locationCode: 'AL',
        extendedDescription: 'All Locations'
      }

      bookGlobal.bookingLocations.unshift(allLocation)
    }
  },

  bookingParameters: {
    appointmentDate: null,
    customerCode: '',
    locationCode: '',
    stylist: '',
    stylistLevel: '',
    nailTech: '',
    esthetician: '',
    waxer: '',
    therapist: '',
    bodyTreatment: '',
    massage: '',
    wax: '',
    facial: '',
    microderm: '',
    pedi: '',
    mani: '',
    hair: '',
    makeUp: ''
  },

  currentWeekString: '',

  apptWeeklyOpens: [],

  selectedOpening: {},

  takeErrorMessage: '',

  apptInfo: '',

  scheduleServiceCode: '',

  webMarketing: {
    webMarketingDtId: 0,
    webMarketingHd: {},
    marketingServices: [],
    marketingLocations: [],
    mid: 0,
    app: '',
    sex: '',
    department: 'A',
    mustSelect: false,
    locationCode: '',
    location: {},
    technicianCode: '',
    technicianName: '',
    serviceCode: '',
    serviceDescription: '',
    byPassServicePage: '',
    isQuiz: false,
    quizTrackingId: 0,
    matchCode: '',
    quizData: '',
    customerCouponId: '',
    expireDate: null,
    level: '',
    byPassCustomerChecking: false,
    fromChairDate: '',
    showNoPreference: true,
    viewServiceType: '',
    marketingSubject: '',
    fromRoute: ''
  },

  clearWebMarketing() {
    this.webMarketing.webMarketingDtId = 0;
    this.webMarketing.webMarketingHd = {};
    this.webMarketing.marketingServices = [];
    this.webMarketing.marketingLocations = [];
    this.webMarketing.mid = 0;
    this.webMarketing.app = '';
    this.webMarketing.sex = '';
    this.webMarketing.department = 'A';
    this.webMarketing.mustSelect = false;
    this.webMarketing.locationCode = '';
    this.webMarketing.location = {};
    this.webMarketing.technicianCode = '';
    this.webMarketing.technicianName = '';
    this.webMarketing.serviceCode = '';
    this.webMarketing.serviceDescription = '';
    this.webMarketing.byPassServicePage = '';
    this.webMarketing.isQuiz = false;
    this.webMarketing.quizTrackingId = 0;
    this.webMarketing.matchCode = '';
    this.webMarketing.quizData = '';
    this.webMarketing.customerCouponId = '';
    this.webMarketing.expireDate = null;
    this.webMarketing.level = '';
    this.webMarketing.byPassCustomerChecking = false;
    this.webMarketing.fromChairDate = '';
    this.webMarketing.showNoPreference = true;
    this.webMarketing.viewServiceType = '';
    this.webMarketing.marketingSubject = '';
    this.webMarketing.fromRoute = '';
  },

  hasServiceGroups: true,

  isMarketing: false,

  clearBookingData() {

    //clear services
    for (const key in bookGlobal.service) {
      bookGlobal.service[key] = '';
    }

    //clear multi select services
    for (const key in bookGlobal.multiSelectService) {
      bookGlobal.multiSelectService[key] = [];
    }

    for (const key in bookGlobal.book.serviceGroupShow) {
      bookGlobal.book.serviceGroupShow[key] = false;
    }

    //clear technicians
    for (const key in bookGlobal.technician) {
      bookGlobal.technician[key] = '';
    }

    //this.selectedLocation = {};

    this.takeErrorMessage = '';

    this.apptInfo = '';

    this.scheduleServiceCode = '';

    this.webMarketing.webMarketingDtId = 0;
    this.webMarketing.webMarketingHd = {};
    this.webMarketing.marketingServices = [];
    this.webMarketing.marketingLocations = [];

    this.isMarketing = false;

  },

  getAllServices() {
    return bookGlobal.service.cut + bookGlobal.service.color + bookGlobal.service.weave + bookGlobal.service.treatment + bookGlobal.service.perm + bookGlobal.service.extension +
      bookGlobal.service.mani + bookGlobal.service.nailEnhance + bookGlobal.service.maniAdd + bookGlobal.service.pedi + bookGlobal.service.pediAdd +
      bookGlobal.service.facialBar + bookGlobal.multiSelectService.facialBarAdds.join('') + bookGlobal.service.facial + bookGlobal.service.hydraFacial + bookGlobal.service.facialAdd + bookGlobal.service.microderm +
      bookGlobal.multiSelectService.barWaxings.join('') + bookGlobal.multiSelectService.faceWaxings.join('') + bookGlobal.multiSelectService.bodyWaxings.join('') +
      bookGlobal.service.tint + bookGlobal.service.lashBrow + bookGlobal.service.makeUp + bookGlobal.service.browBar + bookGlobal.service.lashBar +
      bookGlobal.service.headSpa + bookGlobal.service.headSpaAdd +
      bookGlobal.service.massage;
  },

  getBarServices() {
    return bookGlobal.service.facialBar + bookGlobal.multiSelectService.barWaxings.join('') + bookGlobal.service.browBar + bookGlobal.service.lashBar + bookGlobal.service.headSpa + bookGlobal.service.headSpaAdd;
  },

  setShowServiceGroup() {
    if (bookGlobal.service.cut + bookGlobal.service.color + bookGlobal.service.weave + bookGlobal.service.treatment + bookGlobal.service.perm + bookGlobal.service.extension !== '') {
      bookGlobal.book.serviceGroupShow.hair = true;
    }

    if (bookGlobal.service.mani + bookGlobal.service.nailEnhance + bookGlobal.service.pedi + bookGlobal.service.maniAdd + bookGlobal.service.pediAdd !== '') {
      bookGlobal.book.serviceGroupShow.nail = true;
    }

    if (bookGlobal.service.facial + bookGlobal.service.hydraFacial + bookGlobal.service.facialAdd + bookGlobal.service.microderm !== '') {
      bookGlobal.book.serviceGroupShow.esthetic = true;
    }

    if (bookGlobal.multiSelectService.faceWaxings.join('') + bookGlobal.multiSelectService.bodyWaxings.join('') !== '') {
      bookGlobal.book.serviceGroupShow.wax = true;
    }

    if (bookGlobal.service.massage !== '') {
      bookGlobal.book.serviceGroupShow.massage = true;
    }

    if (bookGlobal.service.tint + bookGlobal.service.lashBrow + bookGlobal.service.makeUp !== '') {
      bookGlobal.book.serviceGroupShow.makeUp = true;
    }

    if (bookGlobal.service.facialBar + bookGlobal.multiSelectService.facialBarAdds.join('') + bookGlobal.multiSelectService.barWaxings.join('') + bookGlobal.service.browBar + bookGlobal.service.lashBar + bookGlobal.service.headSpa + bookGlobal.service.headSpaAdd !== '') {
      bookGlobal.book.serviceGroupShow.bar = true;
    }
  },

  setShowServiceGroupWhenListExists() {
    if (bookGlobal.book.serviceGroupVisible.hair === true) {
      bookGlobal.book.serviceGroupShow.hair = true;
    }

    if (bookGlobal.book.serviceGroupVisible.nail === true) {
      bookGlobal.book.serviceGroupShow.nail = true;
    }

    if (bookGlobal.book.serviceGroupVisible.esthetic === true) {
      bookGlobal.book.serviceGroupShow.esthetic = true;
    }

    if (bookGlobal.book.serviceGroupVisible.wax === true) {
      bookGlobal.book.serviceGroupShow.wax = true;
    }

    if (bookGlobal.book.serviceGroupVisible.massage === true) {
      bookGlobal.book.serviceGroupShow.massage = true;
    }

    if (bookGlobal.book.serviceGroupVisible.makeUp === true) {
      bookGlobal.book.serviceGroupShow.makeUp = true;
    }

    if (bookGlobal.book.serviceGroupVisible.bar === true) {
      bookGlobal.book.serviceGroupShow.bar = true;
    }
  },

  setSetShowServiceGroupForMarketing() {
    if (this.serviceGroups.cuts.length + this.serviceGroups.colors.length + this.serviceGroups.weaves.length + this.serviceGroups.treatments.length + this.serviceGroups.perms.length + this.serviceGroups.extensions.length === 0) {
      bookGlobal.book.serviceGroupShow.hair = false;
    } else {
      bookGlobal.book.serviceGroupShow.hair = true;
    }

    if (this.serviceGroups.manis.length + this.serviceGroups.nailEnhances.length + this.serviceGroups.pedis.length + this.serviceGroups.maniAdds.length + this.serviceGroups.pediAdds.length === 0) {
      bookGlobal.book.serviceGroupShow.nail = false;
    } else {
      bookGlobal.book.serviceGroupShow.nail = true;
    }


    if (this.serviceGroups.facials.length + this.serviceGroups.hydraFacials.length + this.serviceGroups.facialAdds.length + this.serviceGroups.microderms.length === 0) {
      this.book.serviceGroupShow.esthetic = false;
    } else {
      this.book.serviceGroupShow.esthetic = true;
    }


    if (this.serviceGroups.faceWaxings.length + this.serviceGroups.bodyWaxings.length === 0) {
      this.book.serviceGroupShow.wax = false;
    } else {
      this.book.serviceGroupShow.wax = true;
    }


    if (this.serviceGroups.massages.length === 0) {
      this.book.serviceGroupShow.massage = false;
    } else {
      this.book.serviceGroupShow.massage = true;
    }


    if (this.serviceGroups.tints.length + this.serviceGroups.lashBrows.length + this.serviceGroups.makeUps.length === 0) {
      this.book.serviceGroupShow.makeUp = false;
    } else {
      this.book.serviceGroupShow.makeUp = true;
    }

    if (this.serviceGroups.facialBars.length + this.serviceGroups.waxBars.length + this.serviceGroups.browBars.length + this.serviceGroups.lashBars.length + this.serviceGroups.headSpas.length === 0) {
      this.book.serviceGroupShow.bar = false;
    } else {
      this.book.serviceGroupShow.bar = true;
    }

  },

  setPassedInService() {

    let serviceGroup = '';
    let serviceProperty = '';

    //loop through each 3 character service in the scheduleServiceCode
    for (let i = 0; i < this.scheduleServiceCode.length; i += 3) {
      let serviceCode = this.scheduleServiceCode.substring(i, i + 3);
      let foundIt = false;

      //loop through each service list to see if service exists, if so select it, then show the service group
      for (const key in bookGlobal.serviceGroups) {

        bookGlobal.serviceGroups[key].forEach((a) => {
          if (a.serviceCode === serviceCode) {
            serviceProperty = key.slice(0, -1); //this strips off the last character of list name (always s), name of service property is non plural list name   
            if (serviceProperty === 'faceWaxing' || serviceProperty === 'bodyWaxing' || serviceProperty === 'waxBar') { //handle multiselected service group
              serviceProperty = serviceProperty + 's'; //add plural back, multiselect are arrays
              this.multiSelectService[serviceProperty].push(serviceCode);
            } else {
              this.service[serviceProperty] = serviceCode;
            }


            serviceGroup = this.getServiceGroupByServiceListName(key);  //get service group name so we can show on page
            this.book.serviceGroupShow[serviceGroup] = true;
            foundIt = true;
          }
        })

        if (foundIt === true) {
          break;
        }
      }
    }
  },

  getServiceGroupByServiceListName(listName) {

    if (isInList(listName, ['cuts', 'colors', 'weaves', 'treatments', 'perms', 'extensions'])) {
      return 'hair';
    }

    if (isInList(listName, ['manis', 'nailEnhances', 'pedis', 'maniAdds', 'pediAdds'])) {
      return 'nail';
    }

    if (isInList(listName, ['facials', 'hydraFacials', 'facialAdds', 'microderms'])) {
      return 'esthetic';
    }

    if (isInList(listName, ['faceWaxings', 'bodyWaxings'])) {
      return 'wax';
    }

    if (isInList(listName, ['massages'])) {
      return 'massage';
    }

    if (isInList(listName, ['tints', 'lashBrows', 'makeUps'])) {
      return 'makeUp';
    }

    if (isInList(listName, ['facialBars', 'waxBars', 'browBars', 'lashBars', 'headSpas'])) {
      return 'bar';
    }

    return '';

  },

  setServiceByAbCombo(serviceCode, comboName, technicianCode) {

    if (comboName === 'bodytreat') {
      bookGlobal.service.bodyTreatment += serviceCode;
      bookGlobal.technician.therapist = technicianCode;
    } else if (comboName === 'browandlash') {
      bookGlobal.service.lashBrow += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'color') {
      bookGlobal.service.color += serviceCode;
      bookGlobal.technician.stylist = technicianCode;
    } else if (comboName === 'cuts') {
      bookGlobal.service.cut += serviceCode;
      bookGlobal.technician.stylist = technicianCode;
    } else if (comboName === 'extension') {
      bookGlobal.service.extension += serviceCode;
      bookGlobal.technician.stylist = technicianCode;
    } else if (comboName === 'facialbar') {
      bookGlobal.service.facialBar += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'facialbaradd') {
      bookGlobal.multiSelectService.facialBarAdds.push(serviceCode);
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'facial') {
      bookGlobal.service.facial += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'facialao') {
      bookGlobal.service.facialAdd += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'foil') {
      bookGlobal.service.weave += serviceCode;
      bookGlobal.technician.stylist = technicianCode;
    } else if (comboName === 'hydrafacial') {
      bookGlobal.service.hydraFacial += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'makeup') {
      bookGlobal.service.makeUp += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'mani') {
      bookGlobal.service.mani += serviceCode;
      bookGlobal.technician.nailTech = technicianCode;
      // if (a.removeExtendedWear === true) {
      //   bookGlobal.service.mani += a.extendedWearRemovalCode;
      // }
    } else if (comboName === 'maniao') {
      bookGlobal.service.maniAdd += serviceCode;
      bookGlobal.technician.nailTech = technicianCode;
    } else if (comboName === 'massage') {
      bookGlobal.service.massage += serviceCode;
      bookGlobal.technician.therapist = technicianCode;
    } else if (comboName === 'microderm') {
      bookGlobal.service.microderm += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'nailenhance') {
      bookGlobal.service.nailEnhance += serviceCode;
      bookGlobal.technician.nailTech = technicianCode;
      // if (a.removeExtendedWear === true) {
      //   bookGlobal.service.nailEnhance += a.extendedWearRemovalCode;
      // }
    } else if (comboName === 'pedi') {
      bookGlobal.service.pedi += serviceCode;
      bookGlobal.technician.nailTech = technicianCode;
      // if (a.removeExtendedWear === true) {
      //   bookGlobal.service.pedi += a.extendedWearRemovalCode;
      // }
    } else if (comboName === 'pediao') {
      bookGlobal.service.pediAdd += serviceCode;
      bookGlobal.technician.nailTech = technicianCode;
    } else if (comboName === 'perms') {
      bookGlobal.service.perm += serviceCode;
      bookGlobal.technician.stylist = technicianCode;
    } else if (comboName === 'styl') {
      bookGlobal.service.cut += serviceCode;
      bookGlobal.technician.stylist = technicianCode;
    } else if (comboName === 'tints') {
      bookGlobal.service.tint += serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'treat') {
      bookGlobal.service.treatment += serviceCode;
      bookGlobal.technician.stylist = technicianCode;
    } else if (comboName === 'barWax') {
      bookGlobal.multiSelectService.barWaxings.push(serviceCode);
      bookGlobal.technician.waxer = technicianCode;
    } else if (comboName === 'wax') {
      bookGlobal.multiSelectService.faceWaxings.push(serviceCode);
      bookGlobal.technician.waxer = technicianCode;
    } else if (comboName === 'waxao') {
      bookGlobal.multiSelectService.bodyWaxings.push(serviceCode);
      bookGlobal.technician.waxer = technicianCode;
    } else if (comboName === 'browbar') {
      bookGlobal.service.browBar = serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'lashbar') {
      bookGlobal.service.lashBar = serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    } else if (comboName === 'headSpa') {
      bookGlobal.service.headSpa = serviceCode;
      bookGlobal.technician.esthetician = technicianCode;
    }

  },

  clearService(serviceType) {

    for (const key in bookGlobal.service) {
      if (key === serviceType) {
        bookGlobal.service[key] = '';
      }
    }

    if (serviceType === 'facialBar') { //if facial bar (now called Spa bar), go one level deeper and get rid of bar add ons
      serviceType = 'facialBarAdds';
    }

    for (const key in bookGlobal.multiSelectService) {
      if (key === serviceType) {
        bookGlobal.multiSelectService[key] = [];
      }
    }
  },

  async selectFirstServiceInServiceType() {

    //loop through each prop in serviceGroups (will be an arrary of service types)
    for (const key in bookGlobal.serviceGroups) {

      let serviceGroups = bookGlobal.serviceGroups[key];
      let serviceCode = '';

      //loop through each service type
      for (let i = 0; i < serviceGroups.length; i++) {
        serviceCode = serviceGroups[i].serviceCode;

        //loop through each selected service and set if find it
        for (const key2 in bookGlobal.service) {
          if (key2 === key.slice(0, -1)) {
            bookGlobal.service[key2] = serviceCode;
          }
        }

        break;
      }
    }
  },

  getServicesByGroup(group) {

    if (group === 'hair') {
      return bookGlobal.service.cut + bookGlobal.service.color + bookGlobal.service.weave + bookGlobal.service.treatment + bookGlobal.service.perm + bookGlobal.service.extension + bookGlobal.service.headSpaAdd;
    }

    if (group === 'hairNoHeadSpa') {
      return bookGlobal.service.cut + bookGlobal.service.color + bookGlobal.service.weave + bookGlobal.service.treatment + bookGlobal.service.perm + bookGlobal.service.extension;
    }

    if (group === 'nail') {
      return bookGlobal.service.mani + bookGlobal.service.maniAdd + bookGlobal.service.nailEnhance + bookGlobal.service.pedi + bookGlobal.service.pediAdd;
    }

    if (group === 'esthetics') {
      return bookGlobal.service.facialBar + bookGlobal.multiSelectService.facialBarAdds.join('') + bookGlobal.service.facial + bookGlobal.service.hydraFacial + bookGlobal.service.facialAdd + bookGlobal.service.microderm + bookGlobal.service.tint + bookGlobal.service.lashBrow + bookGlobal.service.makeUp + bookGlobal.service.browBar + bookGlobal.service.lashBar + bookGlobal.service.headSpa;;
    }

    if (group === 'esthByWaxer') {
      return bookGlobal.service.tint + bookGlobal.service.lashBrow + bookGlobal.service.browBar + bookGlobal.service.lashBar;
    }

    if (group === 'esthOnlyEsthetician') {
      return bookGlobal.service.facialBar + bookGlobal.multiSelectService.facialBarAdds.join('') + bookGlobal.service.headSpa + bookGlobal.service.facial + bookGlobal.service.hydraFacial + bookGlobal.service.facialAdd + bookGlobal.service.microderm + bookGlobal.service.makeUp;
    }

    if (group === 'wax') {
      return bookGlobal.multiSelectService.barWaxings.join('') + bookGlobal.multiSelectService.faceWaxings.join('') + bookGlobal.multiSelectService.bodyWaxings.join('');
    }

    if (group === 'massage') {
      return bookGlobal.service.massage;
    }

  },

  getTechnicianTypesFromSelectedServices() {

    let technicianTypes = {
      stylist: false,
      nailTech: false,
      waxer: false,
      esthetician: false,
      therapist: false
    }

    if (bookGlobal.getServicesByGroup('hairNoHeadSpa') !== '') {
      technicianTypes.stylist = true;
    }

    if (bookGlobal.getServicesByGroup('nail') !== '') {
      technicianTypes.nailTech = true;
    }

    if (bookGlobal.getServicesByGroup('wax') !== '') {
      technicianTypes.waxer = true;
    }

    if (bookGlobal.getServicesByGroup('esthetics') !== '') {
      technicianTypes.esthetician = true;
    }

    if (bookGlobal.getServicesByGroup('massage') !== '') {
      technicianTypes.therapist = true;
    }


    return technicianTypes;

  },

  setApptInfo() {
    this.apptInfo = '';
    if (this.service.cut !== '') {
      this.apptInfo = bookGlobal.serviceGroups.cuts.find(x => x.serviceCode === this.service.cut).abDescription;
    }

  },

  setServiceGroupVisible() {
    if (this.serviceGroups.cuts.length + this.serviceGroups.colors.length + this.serviceGroups.weaves.length + this.serviceGroups.treatments.length + this.serviceGroups.perms.length + this.serviceGroups.extensions.length === 0) {
      this.book.serviceGroupVisible.hair = false;
    } else {
      this.book.serviceGroupVisible.hair = true;
    }

    if (this.serviceGroups.manis.length + this.serviceGroups.nailEnhances.length + this.serviceGroups.pedis.length + this.serviceGroups.maniAdds.length + this.serviceGroups.pediAdds.length === 0) {
      this.book.serviceGroupVisible.nail = false;
    } else {
      this.book.serviceGroupVisible.nail = true;
    }


    if (this.serviceGroups.facials.length + this.serviceGroups.hydraFacials.length + this.serviceGroups.facialAdds.length + this.serviceGroups.microderms.length === 0) {
      this.book.serviceGroupVisible.esthetic = false;
    } else {
      this.book.serviceGroupVisible.esthetic = true;
    }


    if (this.serviceGroups.faceWaxings.length + this.serviceGroups.bodyWaxings.length === 0) {
      this.book.serviceGroupVisible.wax = false;
    } else {
      this.book.serviceGroupVisible.wax = true;
    }


    if (this.serviceGroups.massages.length === 0) {
      this.book.serviceGroupVisible.massage = false;
    } else {
      this.book.serviceGroupVisible.massage = true;
    }


    if (this.serviceGroups.tints.length + this.serviceGroups.lashBrows.length + this.serviceGroups.makeUps.length === 0) {
      this.book.serviceGroupVisible.makeUp = false;
    } else {
      this.book.serviceGroupVisible.makeUp = true;
    }

    if (this.serviceGroups.facialBars.length + this.serviceGroups.waxBars.length + this.serviceGroups.browBars.length + this.serviceGroups.lashBars.length + this.serviceGroups.headSpas.length === 0) {
      this.book.serviceGroupVisible.bar = false;
    } else {
      this.book.serviceGroupVisible.bar = true;
    }

  },

  async getTechniciansThatCanDoService(locationCode, services, technicianTypes, showNoPreference, priceLevel, fromChairDate) {
    const url = appGlobal.apiBaseUrl + '/AppointmentBook/TechniciansThatCanDoService/' + locationCode + '/' + services + '/' + technicianTypes + '/' + showNoPreference + '/' + priceLevel + '/' + fromChairDate;
    const array = ref([]);
    array.value = [];

    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.getTechniciansThatCanDoService");
        }

        array.value = data.techniciansViewModels;

      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        //Maybe do something
      })

    return array.value;
  },


  async getTechniciansForStep() {
    //first clear
    bookGlobal.technicianStep.showStylist = false;
    bookGlobal.technicianStep.showNailTech = false;
    bookGlobal.technicianStep.showEsthetician = false;
    bookGlobal.technicianStep.showWaxer = false;
    bookGlobal.technicianStep.showTherapist = false;


    //remove duplicate services
    bookGlobal.removeDuplicateServices();

    let showNoPreference = true;
    let priceLevel = null;
    let fromChairDate = null;

    //handle level marketing
    if (bookGlobal.webMarketing.level !== '') {
      priceLevel = bookGlobal.webMarketing.level;
      if (bookGlobal.webMarketing.fromChairDate !== '') {
        fromChairDate = bookGlobal.webMarketing.fromChairDate;
      }
      showNoPreference = bookGlobal.webMarketing.showNoPreference
    }


    let hair = bookGlobal.getServicesByGroup('hair');
    if (hair !== '') {
      bookGlobal.technicianStep.showStylist = true;
      bookGlobal.technicianStep.stylists = await bookGlobal.getTechniciansThatCanDoService(bookGlobal.selectedLocation.locationCode, hair, 'SO$', showNoPreference, priceLevel, fromChairDate); //pass O, for only own check
      bookGlobal.technicianStep.stylistServiceDescription = 'Select a Stylist for ' + await getServiceDescriptionNoPrice(hair);
    }

    let nail = bookGlobal.getServicesByGroup('nail');

    if (nail !== '') {
      bookGlobal.technicianStep.showNailTech = true;
      bookGlobal.technicianStep.nailTechs = await bookGlobal.getTechniciansThatCanDoService(bookGlobal.selectedLocation.locationCode, nail, 'NVO$', showNoPreference, priceLevel, fromChairDate); //pass O, for only own check
      bookGlobal.technicianStep.nailTechServiceDescription = 'Select a Nail Tech for ' + await getServiceDescriptionNoPrice(nail);
    }

    let esthByWaxer = bookGlobal.getServicesByGroup('esthByWaxer');
    let esthOnlyEsthetician = bookGlobal.getServicesByGroup('esthOnlyEsthetician');

    let esthetics = bookGlobal.getServicesByGroup('esthetics');
    if (esthetics !== '') {
      if (esthByWaxer !== '' && esthOnlyEsthetician === '') { //add waxers to list if just tint or lashes
        bookGlobal.technicianStep.estheticians = await bookGlobal.getTechniciansThatCanDoService(bookGlobal.selectedLocation.locationCode, esthetics, 'EVWO$', showNoPreference, priceLevel, fromChairDate); //pass O, for only own check
      } else {
        bookGlobal.technicianStep.estheticians = await bookGlobal.getTechniciansThatCanDoService(bookGlobal.selectedLocation.locationCode, esthetics, 'EVO$', showNoPreference, priceLevel, fromChairDate); //pass O, for only own check
      }
      bookGlobal.technicianStep.showEsthetician = true;
      bookGlobal.technicianStep.estheticianServiceDescription = 'Select an Esthetician for ' + await getServiceDescriptionNoPrice(esthetics);
    }

    let wax = bookGlobal.getServicesByGroup('wax');
    if (wax !== '') {
      bookGlobal.technicianStep.showWaxer = true;
      bookGlobal.technicianStep.waxers = await bookGlobal.getTechniciansThatCanDoService(bookGlobal.selectedLocation.locationCode, wax, 'WEVO$', showNoPreference, priceLevel, fromChairDate); //pass O, for only own check
      bookGlobal.technicianStep.waxerServiceDescription = 'Select a Waxologist for ' + await getServiceDescriptionNoPrice(wax);
    }

    let massage = bookGlobal.getServicesByGroup('massage');
    if (massage !== '') {
      bookGlobal.technicianStep.showTherapist = true;
      bookGlobal.technicianStep.therapists = await bookGlobal.getTechniciansThatCanDoService(bookGlobal.selectedLocation.locationCode, massage, 'TO$', showNoPreference, priceLevel, fromChairDate); //pass O, for only own check
      bookGlobal.technicianStep.therapistsServiceDescription = 'Select a Therapist for ' + await getServiceDescriptionNoPrice(massage);
    }
  },


  removeDuplicateServices() {

    //1st priority is multiselects
    for (const key in bookGlobal.multiSelectService) {

      for (const index in bookGlobal.multiSelectService[key]) {
        let srvc = bookGlobal.multiSelectService[key][index];

        for (const key2 in bookGlobal.service) {
          if (bookGlobal.service[key2] === srvc) {
            bookGlobal.service[key2] = '';
          }
        }

        for (const key3 in bookGlobal.multiSelectService) {
          if (key3 !== key) {
            if (bookGlobal.multiSelectService[key3].includes(srvc)) {
              bookGlobal.multiSelectService[key3] = bookGlobal.multiSelectService[key3].filter(item => item !== srvc);
            }
          }
        }
      }
    }

    //2nd is services
    for (const key in bookGlobal.service) {
      let srvc = bookGlobal.service[key];

      for (const key2 in bookGlobal.service) {
        if (key2 !== key) {
          if (bookGlobal.service[key2] === srvc) {
            bookGlobal.service[key2] = '';
          }
        }
      }

      for (const key3 in bookGlobal.multiSelectService) {
        if (bookGlobal.multiSelectService[key3].includes(srvc)) {
          bookGlobal.multiSelectService[key3] = bookGlobal.multiSelectService[key3].filter(item => item !== srvc);
        }
      }
    }
  },

  async getWeeklyOpenings() {
    //call this once you have services, locations, and technicians

    bookGlobal.bookingParameters.locationCode = bookGlobal.selectedLocation.locationCode;
    bookGlobal.bookingParameters.customerCode = '';
    bookGlobal.bookingParameters.stylist = bookGlobal.technician.stylist;
    bookGlobal.bookingParameters.stylistLevel = bookGlobal.technician.stylistLevel;
    bookGlobal.bookingParameters.nailTech = bookGlobal.technician.nailTech;
    bookGlobal.bookingParameters.esthetician = bookGlobal.technician.esthetician;
    bookGlobal.bookingParameters.waxer = bookGlobal.technician.waxer;
    bookGlobal.bookingParameters.therapist = bookGlobal.technician.therapist;
    bookGlobal.bookingParameters.bodyTreatment = bookGlobal.service.bodyTreatment;
    bookGlobal.bookingParameters.massage = bookGlobal.service.massage;
    bookGlobal.bookingParameters.wax = bookGlobal.multiSelectService.barWaxings.join('') + bookGlobal.multiSelectService.faceWaxings.join('') + bookGlobal.multiSelectService.bodyWaxings.join('');
    bookGlobal.bookingParameters.facial = bookGlobal.service.facialBar + bookGlobal.multiSelectService.facialBarAdds.join('') + bookGlobal.service.facial + bookGlobal.service.hydraFacial + bookGlobal.service.facialAdd;
    bookGlobal.bookingParameters.headSpa = bookGlobal.service.headSpa;
    bookGlobal.bookingParameters.microderm = bookGlobal.service.microderm;
    bookGlobal.bookingParameters.pedi = bookGlobal.service.pedi + bookGlobal.service.pediAdd;
    bookGlobal.bookingParameters.mani = bookGlobal.service.mani + bookGlobal.service.nailEnhance + bookGlobal.service.maniAdd;
    bookGlobal.bookingParameters.hair = bookGlobal.service.cut + bookGlobal.service.headSpaAdd + bookGlobal.service.color + bookGlobal.service.weave + bookGlobal.service.treatment + bookGlobal.service.perm + bookGlobal.service.extension;
    bookGlobal.bookingParameters.makeUp = bookGlobal.service.makeUp + bookGlobal.service.lashBrow + bookGlobal.service.tint + bookGlobal.service.browBar + bookGlobal.service.lashBar;

    bookGlobal.putWeeklyOpenings();
  },

  async putWeeklyOpenings() {
    const url = appGlobal.apiBaseUrl + '/AppointmentBook/WeeklyOpenings';

    appGlobal.isLoading = true;

    bookGlobal.noOpeningString = '';

    console.log('Booking Params', bookGlobal.bookingParameters)

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookGlobal.bookingParameters)
    };

    await fetch(url, options)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.putWeeklyOpenings");
        }
        bookGlobal.apptWeeklyOpens = data.apptWeeklyOpens;

      })
      .catch(function (e) {
        throwError(500, e.message);
      }).finally(function () {
        if (bookGlobal.isMarketing === true) {

          for (let i = bookGlobal.apptWeeklyOpens.length - 1; i >= 0; i--) {
            let apptDate = convertFullStringToDate(bookGlobal.apptWeeklyOpens[i].appointmentDate);
            if (apptDate < bookGlobal.minDate) {
              bookGlobal.apptWeeklyOpens.splice(i, 1);
            }
          }

          for (let i = bookGlobal.apptWeeklyOpens.length - 1; i >= 0; i--) {
            let apptDate = convertFullStringToDate(bookGlobal.apptWeeklyOpens[i].appointmentDate);
            if (apptDate > bookGlobal.maxDate) {
              bookGlobal.apptWeeklyOpens.splice(i, 1);
            }
          }
        }

        appGlobal.isLoading = false;
      })
  },

  async takeAppointment() {
    const url = appGlobal.apiBaseUrl + '/AppointmentBook/TakeAppointment';

    appGlobal.isLoading = true;

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookGlobal.selectedOpening.takeAppointmentParameters)
    };

    const errorMessage = 'There was an error trying to reserve this appointment.';

    try {
      const response = await fetch(url, options);

      if (response.status === 204) { //nocontent - API validation/collision, nothing was booked
        bookGlobal.takeErrorMessage = errorMessage;
        return { returnStatus: '-1' };
      }

      const body = await response.json();

      if (!handleResponse(body)) {
        bookGlobal.takeErrorMessage = errorMessage;
        return { returnStatus: '-1' };
      }

      return body.takeAppointmentViewModel;
    } catch {
      bookGlobal.takeErrorMessage = errorMessage;
      return { returnStatus: '-1' };
    } finally {
      appGlobal.isLoading = false;
    }
  },

  async hasAppointmentByPhone(phone) {

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/HasAppointmentByPhone/' + phone;

    const hasAppointment = ref(false);

    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.hasAppointmentByPhone");
        }

        hasAppointment.value = data;

      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        //Maybe do something
      })

    return hasAppointment.value;
  },

  async hasHistoryByPhoneAndName(phone, fullname) {

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/HasHistoryByPhoneAndName/' + phone + '/' + fullname;

    const hasHistory = ref(false);

    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.hasHistoryByPhoneAndName");  
        }

        hasHistory.value = data;

      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        //Maybe do something
      })

    return hasHistory.value;
  },

  async getLastAppointmentDate() {
    const url = appGlobal.apiBaseUrl + '/AppointmentBook/LastAppointmentDate';

    let lastAppointmentDate = null;

    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.getLastAppointmentDate");
        }

        lastAppointmentDate = data

      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        //Maybe do something
      })

    return lastAppointmentDate;

  },

  async getWebMarketing(webMarketingHdId, app) {
    const url = appGlobal.apiBaseUrl + '/AppointmentBook/WebMarketingTrackingWithApp/' + webMarketingHdId + '/' + app + '/' + 'WEBNEW';


    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.getWebMarketing");
        }

        bookGlobal.webMarketing.webMarketingDtId = data.webMarketingDtId;
        bookGlobal.webMarketing.webMarketingHd = data.webMarketingHdViewModel;
        bookGlobal.webMarketing.marketingServices = data.marketingServiceViewModels;
        bookGlobal.webMarketing.marketingLocations = data.marketingLocations;

      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        //Maybe do something
      })

    return this.webMarketing.webMarketingHd.webMarketingHdId !== 0

  },

  async GetWaxingThatCustomerHasNotHad(customerCode) {
    const url = appGlobal.apiBaseUrl + '/AppointmentBook/WaxingThatCustomerHasNotHad/' + customerCode;

    let marketingServices = [];

    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.GetWaxingThatCustomerHasNotHad");
        }

        marketingServices = data;

      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        //Maybe do something
      })

    return marketingServices;

  },

  //model booking
  async GetModelApptLink(modelApptLinkId) {
    const url = appGlobal.apiBaseUrl + '/AppointmentBook/' + modelApptLinkId + '/ModelApptLink';

    let modelApptLink = {};

    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in bookGlobal.GetModelApptLink");
        }

        modelApptLink = data;

      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        //Maybe do something
      })

    return modelApptLink

  },

  setServiceAccordianOpen(viewServiceType) {
    if (viewServiceType === '') {
      return;
    }

    if (viewServiceType !== undefined) {
      if (viewServiceType === 'HAIR') {
        bookGlobal.bookNew.serviceGroupShow.hair = true;
      } else if (viewServiceType === 'NAIL') {
        bookGlobal.bookNew.serviceGroupShow.nail = true;
      } else if (viewServiceType === 'ESTHETIC') {
        bookGlobal.bookNew.serviceGroupShow.esthetic = true;
      } else if (viewServiceType === 'WAX') {
        bookGlobal.bookNew.serviceGroupShow.wax = true;
      } else if (viewServiceType === 'MASSAGE') {
        bookGlobal.bookNew.serviceGroupShow.massage = true;
      } else if (viewServiceType === 'MAKEUP') {
        bookGlobal.bookNew.serviceGroupShow.makeUp = true;
      } else if (viewServiceType === 'BAR') {
        bookGlobal.bookNew.serviceGroupShow.bar = true;
      }
    }
  },

  modelConfirm: {
    hasConfirmError: false,
    confirmErrorMessage: '',
    serviceAndTechnician: '',
    appointmentDate: null,
    appointmentTime: '',
    locationDescription: '',
    address: '',
    cityStateZip: ''
  },

  clearModelConfirm() {
    bookGlobal.modelConfirm.hasConfirmError = false;
    bookGlobal.modelConfirm.confirmErrorMessage = '';
    bookGlobal.modelConfirm.serviceAndTechnician = '';
    bookGlobal.modelConfirm.appointmentDate = null;
    bookGlobal.modelConfirm.appointmentTime = '';
    bookGlobal.modelConfirm.locationDescription = '';
    bookGlobal.modelConfirm.address = '';
    bookGlobal.modelConfirm.cityStateZip = '';
  },

  findMaleServices(serviceCodeString) {
    if (!serviceCodeString || serviceCodeString.length % 3 !== 0) {
      return false;
    }

    // Split "HWCCRT" → ["HWC", "CRT"]
    const codes = serviceCodeString.match(/.{1,3}/g) || []

    // Loop through all service groups and services
    return Object.values(bookGlobal.serviceGroups).some(group =>
      group.some(service =>
        codes.includes(service.serviceCode) &&
        String(service.sex).toUpperCase() === 'M'
      )
    )
  }

});

export { bookGlobal }
