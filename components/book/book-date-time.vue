<template>
  <Button label="<" class="absolute top-1 px-4 left-3 lg:left-1/8 xl:left-1/4" rounded severity="secondary"
    aria-label="Back" @click="navigateBack" />
     
  <div class="grid grid-cols-1 text-center justify-center w-full">
     <div v-if="bookGlobal.selectedLocation.locationCode === 'MR'" class="text-sm text-red-600 px-1">
            <br />
            <span class="text-sm text-red">*After 4/12/2026 Mill Run appointments will be at our new TruePointe Location</span>
            <br />
            4525 Wathen Dr, Hilliard, OH 43026
     </div>
    <div class="grid col-span-12 grid-cols-12 justify-center px-2 mx-auto w-full md:w-[600px] lg:w-[800px] mt-4">
      
      <div class="col-span-3 text-left pt-3">
        <div v-show="bookGlobal.book.showPrev">
          <i class="pi pi-chevron-left cursor-pointer" @click="navigateWeek('P')"></i>
          <span class="cursor-pointer " style="vertical-align: bottom;" @click="navigateWeek('P')">Prev</span>
        </div>
      </div>
      <div class="col-span-6 text-center">
        <div>
          <div class="cursor-pointer text-blue-600 flex justify-center items-center" style="font-size: 2rem; font-weight: bold;" @click="toggleWeek">
            <IconsCalendar />
          </div>
          <div class="text-xs text-blue-600 mb-2 cursor-pointer underline decoration-solid" @click="toggleWeek">Month View</div>
          <!-- <Button icon="pi pi-calendar" class="bg-green-500" aria-label="Appointment Calendar" @click="toggleWeek" /> -->
          <Popover ref="opWeek" class="">
            <div class="mb-1">Select the week you want to jump to</div>
            <DatePicker v-model="bookGlobal.weekDate" inline :minDate="bookGlobal.minDate" :maxDate="bookGlobal.maxDate"
              @date-select="selectWeekDate()" @month-change="handleMonthChange" :selectOtherMonths="true">
              <template #date="slotProps">
                <template
                  v-if="getDayStatus(slotProps.date.year, slotProps.date.month, slotProps.date.day) === 'S'">
                    <span class="text-gray-300">{{ slotProps.date.day }}</span>
                </template>
                <template
                  v-if="getDayStatus(slotProps.date.year, slotProps.date.month, slotProps.date.day) === '<'">
                    {{  }}
                </template>
                <template
                  v-if="getDayStatus(slotProps.date.year, slotProps.date.month, slotProps.date.day) === 'A'">
                    <span class="font-bold text-green-600">{{ slotProps.date.day }}</span>
                </template>
                <template
                  v-if="getDayStatus(slotProps.date.year, slotProps.date.month, slotProps.date.day) === 'N'">
                    <span class="line-through">{{ slotProps.date.day }}</span>
                </template>
                <template
                  v-if="getDayStatus(slotProps.date.year, slotProps.date.month, slotProps.date.day) === '>'">
                    {{  }}
                </template>
              </template>
            </DatePicker>
          </Popover>
        </div>

        {{ bookGlobal.currentWeekString }}
      </div>
      <div class="col-span-3 text-right pt-3">
        <div v-show="bookGlobal.book.showNext">
          <span class="cursor-pointer " style="vertical-align: bottom;" @click="navigateWeek('N')">Next</span>
          <i class="pi pi-chevron-right cursor-pointer" @click="navigateWeek('N')"></i>
        </div>
      </div>
    </div>

    <div v-if="bookGlobal.apptWeeklyOpens.length === 0"
      class="col-span-12 text-center justify-center items-center mx-auto md:w-[600px] lg:w-[800px] font-bold mt-8">
      No Times Available For This Week
    </div>

    <div class="col-span-12 justify-center items-center mx-auto w-full md:w-[600px] lg:w-[800px] px-2 mt-4"
      v-for="appt in bookGlobal.apptWeeklyOpens" :key="appt.appointmentDate">
      <Accordion class="text-left" value="null">
        <AccordionPanel>
          <AccordionHeader>{{ appt.dateString }}</AccordionHeader>
          <AccordionContent>
            <div class="grid grid-cols-12">
              <div class="col-span-4 text-center justify-center">
                <table class="appt-table w-full" aria-label="Morning Appointment">
                  <thead>
                    <tr>
                      <th>Morning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(opening, index) in appt.morning" :key='index'>
                      <td class="pb-1"><span aria-label="Select Morning Time Opening" class="select-time cursor-pointer"
                          @click="selectTime(opening)">{{ opening.apptTime
                          }}</span></td>
                    </tr>
                  </tbody>

                </table>
              </div>
              <div class="col-span-4 text-center justify-center">
                <table class="appt-table w-full" aria-label="Afternoon Appointment">
                  <thead>
                    <tr>
                      <th>Afternoon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(opening, index) in appt.afternoon" :key='index'>
                      <td class="pb-1"><span aria-label="Select Afternoon Time Opening"
                          class="select-time cursor-pointer" @click="selectTime(opening)">{{ opening.apptTime
                          }}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-span-4 text-center justify-center">
                <table class="appt-table w-full" aria-label="Evening Appointment">
                  <thead>
                    <tr>
                      <th>Evening</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(opening, index) in appt.evening" :key='index'>
                      <td class="pb-1"><span aria-label="Select Evening Time Opening" class="select-time cursor-pointer"
                          @click="selectTime(opening)">{{ opening.apptTime }}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

  </div>

</template>

<script setup>
import { bookGlobal } from '~/composables/bookGlobal';

import Button from '@/volt/Button';
import Accordion from '@/volt/Accordion';
import AccordionPanel from '@/volt/AccordionPanel';
import AccordionHeader from '@/volt/AccordionHeader';
import AccordionContent from '@/volt/AccordionContent';
import DatePicker from '@/volt/DatePicker';
import Popover from '@/volt/Popover';

const router = useRouter();

const {
  addDay,
  convertDateToDateNoTime,
  convertDateToString,
  convertDateToApiString,
  convertStringToDate,
  getBeginningOfWeek,
  getEndOfWeek
} = useDateFunctions();


const {
    putDaysThatTechsHaveOpenings
    } = useAppointmentBook();


const opWeek = ref();

const toggleWeek = async (event) => {
  let curDate = new Date(bookGlobal.bookingParameters.appointmentDate);
  curDate.setDate(curDate.getDate() + 1);

  bookGlobal.weekDate = curDate;
  opWeek.value.toggle(event);

  await getDayWithOpenings(curDate);
}

const toggleWeekOff = (event) => {

  opWeek.value.toggle(event);
}

const state = reactive({
  techDays: [],
  allNoPref: false,
});

async function getDayWithOpenings(apptDt) {

  state.allNoPref = false;

  let stylist = '';

  if (bookGlobal.technician.stylist === 'N') {
    stylist = bookGlobal.technician.stylistLevel === 'N' ? '' : bookGlobal.technician.stylistLevel;
  } else  {
    stylist = bookGlobal.technician.stylist;
  }

  let nailTech = bookGlobal.technician.nailTech.length > 3 ? bookGlobal.technician.nailTech : '';
  let esthetician = bookGlobal.technician.esthetician.length > 3 ? bookGlobal.technician.esthetician : '';
  let waxer = bookGlobal.technician.waxer.length > 3 ? bookGlobal.technician.waxer : '';
  let therapist = bookGlobal.technician.therapist.length > 3 ? bookGlobal.technician.therapist : '';


  if (stylist + nailTech + esthetician + waxer + therapist === '') {
    state.allNoPref = true;
    state.techDays = [];
    return;
  }

  let params = {
    apptYear: apptDt.getFullYear(),
    apptMonth: apptDt.getMonth() + 1,
    locationCode: bookGlobal.selectedLocation.locationCode,
    stylist: stylist,
    hairService: bookGlobal.getServicesByGroup('hair'),
    nailTech: nailTech,
    nailService: bookGlobal.getServicesByGroup('nail'),
    esthetician: esthetician,
    esthService: bookGlobal.getServicesByGroup('esthetics'),
    waxer: waxer,
    waxService: bookGlobal.getServicesByGroup('wax'),
    therapist: therapist,
    therService: bookGlobal.getServicesByGroup('massage'),
  }

  console.log('Getting days with openings', params);

  state.techDays = await putDaysThatTechsHaveOpenings(params)
}

function getDayStatus(year, month, day) {
  //bookGlobal.maxDate minDate
  let date = new Date(year, month, day);

  if (date < bookGlobal.minDate) {
    return '<'; //before books
  }
  if (date > bookGlobal.maxDate) {
    return '>'; //after books
  }

  if (date.getDay() === 0) {
    return 'S'; //sunday
  }

  if (state.allNoPref === true) {
    return 'A'; //available
  }

  let searchDate = `${year}-${String(month+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  searchDate += 'T00:00:00'

  const techDay = state.techDays.find(td => td.appointmentDate === searchDate);

  if (techDay === undefined) {
    return 'N' //not available
  }

  //if got here, techDay appointmentDate is available, return A
  return 'A'; //available

}


const handleMonthChange = async (event) => {

  let curDate = new Date(event.year, event.month - 1, 1);

  await getDayWithOpenings(curDate)
};


onMounted(async () => {

  let technicianCode = '';
  let techCount = 0

  if (bookGlobal.technician.stylist.length > 3) {
    technicianCode = bookGlobal.technician.stylist;
    techCount += 1;
  }

  if (bookGlobal.technician.nailTech.length > 3) {
    technicianCode = bookGlobal.technician.nailTech;
    techCount += 1;
  }

  if (bookGlobal.technician.esthetician.length > 3) {
    technicianCode = bookGlobal.technician.esthetician;
    techCount += 1;
  }

  if (bookGlobal.technician.waxer.length > 3) {
    technicianCode = bookGlobal.technician.waxer;
    techCount += 1;
  }

  if (bookGlobal.technician.therapist.length > 3) {
    technicianCode = bookGlobal.technician.therapist;
    techCount += 1;
  }

});

async function navigateWeek(direction) {

  let apptDate = convertStringToDate(bookGlobal.bookingParameters.appointmentDate);

  if (direction === 'N') {
    apptDate = addDay(apptDate, 7);
    apptDate = getBeginningOfWeek(apptDate);
  } else { // direction === 'P' //previous
    apptDate = addDay(apptDate, -7);
    let today = convertDateToDateNoTime(new Date);
    if (apptDate < today) {
      apptDate = today;
    } else {
      apptDate = getBeginningOfWeek(apptDate);
    }
  }

  bookGlobal.bookingParameters.appointmentDate = convertDateToApiString(apptDate);
  setCurrentWeekString(apptDate);
  bookGlobal.putWeeklyOpenings();
}

function setCurrentWeekString(apptDate) {

  let eow = getEndOfWeek(apptDate);

  let nextWeek = addDay(eow, 7);
  let maxEow = getEndOfWeek(bookGlobal.maxDate);

  if (nextWeek > maxEow) {
    bookGlobal.book.showNext = false;
  } else {
    bookGlobal.book.showNext = true;
  }

  let today = convertDateToDateNoTime(new Date);
  let aDate = convertDateToDateNoTime(apptDate)

  if (today.getTime() === aDate.getTime()) {
    bookGlobal.book.showPrev = false;
  } else {
    let lastWeek = addDay(eow, -7)

    if (lastWeek < bookGlobal.minDate) {
      bookGlobal.book.showPrev = false;
    } else {
      bookGlobal.book.showPrev = true;
    }
  }

  bookGlobal.currentWeekString = convertDateToString(apptDate) + ' through ' + convertDateToString(eow);
}

async function selectWeekDate() {
  toggleWeekOff()

  let apptDate = getBeginningOfWeek(bookGlobal.weekDate);
  let today = convertDateToDateNoTime(new Date);
  if (apptDate < today) {
    apptDate = today;
  }

  bookGlobal.bookingParameters.appointmentDate = convertDateToApiString(apptDate);
  setCurrentWeekString(apptDate);
  bookGlobal.putWeeklyOpenings();
}

async function selectTime(opening) {

  bookGlobal.takeErrorMessage = '';
  bookGlobal.selectedOpening = opening;

  bookGlobal.takeStep.serviceAndTechnician = '';
  bookGlobal.takeStep.confirmMessage = '';

  opening.takeAppointmentParameters.forEach((a) => {
    if (a.serviceCode !== 'LBR') {
      bookGlobal.takeStep.serviceAndTechnician += a.serviceDescription + ' w/ ' + a.technicianName + '<br />';
      bookGlobal.takeStep.confirmMessage += a.serviceDescription + ' w/ ' + a.technicianName + ', '
    }
  })

  bookGlobal.takeStep.confirmMessage += ' at our ' + bookGlobal
  //plug to bybass verification
  //accountGlobal.verifySuccess = true;


  if (accountGlobal.loginSuccessful === true) { //if logged in, no need to verify
    router.push('/book/new/take');
  } else {  //already verified
    router.push('/book/new/take');
  }
}


function navigateBack() {
  if (bookGlobal.webMarketing.fromRoute !== '') {
    router.push(bookGlobal.webMarketing.fromRoute);
    return;
  }

  router.go(-1);
}

</script>

<style scoped>
.select-time {
  cursor: pointer;
  color: blue;
}


</style>
