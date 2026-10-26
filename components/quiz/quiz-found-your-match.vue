<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-full">
        <!-- Title row -->
        <div v-if="state.isResults===false" class="flex justify-center w-full mb-0 pb-15 md:pb-25">
          <div class="w-full pt-0 pb-0 mb-0 text-center text-[1.25rem] md:text-[1.75rem]">
             
          </div>
        </div>


        <template
          v-for="(result, index) in state.surveyeeSurveyResultViewModel"
          :key="index"
        >
          <!-- Header -->
          <div class="flex justify-center w-full m-0 p-0">
            <div class="w-full relative min-h-[85px] bg-primary-900">
              <div class="flex items-start">
                <!-- Left: image -->
                <div
                  class="w-2/5 max-w-[225px] overflow-hidden mt-[25px] mr-[15px] mb-[-65px] ml-[25px]"
                >
                  <img
                    :src="result.bioImage"
                    class="max-w-full h-auto"
                    :aria-label="'Bio Image of ' + result.alias"
                  />
                </div>

                <!-- Right: text -->
                <div class="flex-1 self-stretch flex flex-col justify-center py-4">
                  <h6 class="text-white">
                    <div
                      class="font-bold text-left mr-[10px] text-[3rem] md:text-[4.5rem]"
                    >
                      {{ result.alias }}
                    </div>
                  </h6>

                  <div class="text-white italic text-[1rem] md:text-[1.25rem]">
                    Kenneth's Hair Salon
                  </div>
                  <!-- <div>{{ result.price }}</div> -->
                </div>
              </div>
            </div>
          </div>

          <!-- Spacer -->
          <div class="flex justify-center w-full text-right mt-2 h-[65px]"></div>

          <!-- Row 1 -->
          <div class="flex justify-center w-full py-0">
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
              <!-- Coupon -->
              <div
                class="bg-white text-left border-[5px] border-[#FDEFEF] p-[15px] h-[280px] text-[1rem] md:text-[1.2rem]"
              >
                <div v-if="result.expirationDate != ''">
                  <div>
                    <img
                      class="h-7 md:h-9 w-auto"
                      src="/images/quiz/match/coupon.png"
                      :aria-label="result.alias + ' is offering 20% off your first visit.'"
                    />
                  </div>
                  <div class="font-bold text-[1rem] md:text-[1.25rem]">
                    {{ result.alias }} is offering 20% off your first visit.
                  </div>
                  

                  <div class="mt-1.5 mb-2">
                    Please call 614-538-5800 to schedule and be sure to mention
                    code {{ result.matchCode }} when scheduling to claim offer or&nbsp;
                    <a
                      class="underline text-blue-500"
                      :aria-label="'Book Now Online with ' + result.alias + ' with code: ' + result.matchCode"
                      :href="'/book/new/promo?mid=2&mc=' + result.matchCode + '&qti=' + mhhGlobal.tracking.trackingId + '&c=' + state.mhhCustId"
                    >
                      Book Now Online
                    </a>.
                    &nbsp;Expires {{ result.expirationDate }}
                  </div>

                  <div class="mt-3 ml-1 text-[.8rem] md:text-[1rem]">
                    This offer is valid on all hair services except for hair extentions.
                    My Hair Harmony discount may only be used once and it cannot be
                    combined with any other offers.
                  </div>
                </div>

                <div v-else></div>
              </div>

              <!-- HWC -->
              <div
                class="bg-white text-left border-[5px] border-[#FDEFEF] p-[15px] h-[280px] text-[1rem] md:text-[1.2rem]"
              >
                <div>
                  <img
                    class="h-7 md:h-9 w-auto"
                    src="/images/quiz/match/womens-hair-cut.png"
                    :aria-label="'Womens Hair Cut with ' + result.alias + ' - $' + result.hwc"
                  />
                </div>

                <div class="font-bold text-[1rem] md:text-[1.25rem]">
                  Women's Hair Cut ${{ result.hwc }}
                </div>

                <div class="pt-2.5">
                  {{ result.yearsOfExperience }}
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="flex justify-center w-full py-0">
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
              <!-- About -->
              <div
                class="bg-white text-left border-[5px] border-[#FDEFEF] p-[15px] h-[300px] text-[1rem] md:text-[1.2rem]"
              >
                <div class="h-[215px]">
                  <img
                    class="h-7 md:h-9 w-auto"
                    src="/images/quiz/match/about-me.png"
                    :aria-label="'About ' + result.alias"
                  />

                  <div class="ml-[3px] font-bold text-[1rem] md:text-[1.25rem]">
                    About Me
                  </div>

                  <div
                    class="inline-block mt-2.5 h-[80%] overflow-y-auto px-2 pl-[5px]"
                    tabindex="0"
                  >
                    "{{ result.bioDescription }}"
                  </div>
                </div>
              </div>

              <!-- Availability -->
              <div
                class="bg-white text-left border-[5px] border-[#FDEFEF] p-[15px] h-[300px] text-[1rem] md:text-[1.2rem]"
              >
                <img
                  class="h-7 md:h-9 w-auto"
                  src="/images/quiz/match/availability.png"
                  :aria-label="'Availability for ' + result.alias"
                />

                <div class="ml-1 font-bold text-[1rem] md:text-[1.25rem]">
                  Availability
                </div>

                <div class="inline-block mt-2.5">
                  <div
                    class="pb-1"
                    v-for="(schedule, i) in result.availability"
                    :key="i"
                  >
                    {{ schedule }}
                  </div>

                  <div class="text-[1rem] md:text-[1.25rem]">
                    <a
                      class="underline text-blue-500"
                      :aria-label="'Book Now with ' + result.alias + ' with code: ' + result.matchCode"
                      :href="'/book/new/promo?mid=2&mc=' + result.matchCode + '&qti=' + mhhGlobal.tracking.trackingId + '&c=' + state.mhhCustId"
                    >
                      Book Now
                    </a>
                  </div>

                  <p
                    v-if="result.availabilityException"
                    class="text-[1rem] md:text-[1.2rem]"
                  >
                    *Works every other week
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="flex justify-center w-full py-0">
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
              <!-- Location -->
              <div
                class="bg-white text-left border-[5px] border-[#FDEFEF] p-[15px] h-[257px] text-[1rem] md:text-[1.2rem]"
              >
                <img
                  class="h-7 md:h-9 w-auto"
                  src="/images/quiz/match/location.png"
                  :aria-label="result.alias + ' is available at Kenneths Hair Salons & Day Spa ' + result.address + ' ' + result.cityState"
                />

                <div class="font-bold text-[1rem] md:text-[1.25rem]">
                  Location
                </div>

                <div>Kenneth's Hair Salons & Day Spas</div>
                <div>{{ result.locationWebDescription }}</div>
                <div>{{ result.address }}</div>
                <div>{{ result.cityState }}</div>
                <div>614-538-5800</div>
              </div>

              <!-- Map -->
              <div
                class="bg-white text-left border-[5px] border-[#FDEFEF] h-[257px] text-[1rem] md:text-[1.2rem] pt-[5px] px-[5px] pb-0"
              >
                <div v-html="result.googleMap"></div>
              </div>
            </div>
          </div>

          <!-- Share -->
          <div class="flex justify-center w-full py-0">
            <div class="w-full">
              <!-- <ShareNetwork
                network="facebook"
                :url="state.fbShareUrl"
                title="My Hair Harmony - Central Ohio"
                description="Do you know the formula for finding the perfect hairstylist for you? We do!"
                quote="I found my perfect hair stylist on My Hair Harmony - Central Ohio"
                hashtags="hair stylist"
              >
                <img
                  class="w-[220px] cursor-pointer"
                  src="/images/quiz/shared/facebook-share.png"
                  :aria-label="'Share ' + result.alias + ' on Facebook'"
                />
              </ShareNetwork> -->
            </div>
          </div>

          <!-- Spacer -->
          <div class="flex justify-center w-full text-right mt-2 h-[65px]"></div>
        </template>
      </div>
    </div>
  </div>
</template>


<script setup>
    import { mhhGlobal } from '~/composables/mhhGlobal';

    mhhGlobal.question = 'We found your match!';
    mhhGlobal.selectText = '';

    const state = reactive({
        sqid: 0,
        questionNumber: 30,
        showProgress: false,
        dialog: false,
        busy: false,
        validationMessage: "",
        status: '',
        ref: '',
        surveyeeResultSummary: {
            emailExists: false,
            emailSent: false,
            surveyeeSurveyResultViewModel: [],
        },
        surveyeeSurveyResultViewModel: [],
        showStats: false,
        surveyeeComparisonViewModel: [],
        selectResult: {
            matchCode: '',
            locationDescription: '',
            locationWebDescription: '',
            address: '',
            cityState: '',
            expirationDate: ''
        },
        threeImages: 3,
        imageCount: 24,
        isResults: true,
        fbShareUrl: '',
        customerEmail: '',
        mhhCustId: 'NEWCUSTOMER'
    });

    onMounted(() => {

        var csid = null;
        var esid =  null;
        var custid = null;

        if (mhhGlobal.isProfile === true) {
          csid = mhhGlobal.csid;
          esid = mhhGlobal.esid;
        }

        state.ref = mhhGlobal.ref;

        if (custid != null) {
            state.mhhCustId = custid;
        }
       

        if (mhhGlobal.custcd != "") { //this is when we know who customer is for remarketing
            state.mhhCustId = mhhGlobal.custcd;
        }

        if (csid != null) {
            surveyView(csid,esid);
            state.isResults = false;
            state.fbShareUrl = 'https://kenneths.com/hair-quiz?ref=fbs&refid=' + csid
            return;
        }


        mhhGlobal.track('RE');

        state.customerEmail = mhhGlobal.customerEmail;
        state.fbShareUrl = 'https://kenneths.com.com/hair-quiz?ref=fbs&refid=' + mhhGlobal.surveyeeId;

        window.scrollTo(0, 0);

        //prevent from going back from here
        mhhGlobal.doingSurvey = false;

        surveyResults();
    });

    async function surveyResults() {

        state.surveyeeResultSummary = await mhhGlobal.getSurveyResults();

        if (state.surveyeeResultSummary === null) {
            return
        }

        state.surveyeeSurveyResultViewModel = state.surveyeeResultSummary.results;
        
        if (state.surveyeeResultSummary.emailExists == true && state.surveyeeResultSummary.emailSent == false) {
            state.customerEmail = '';
        }

        // state.surveyeeSurveyResultViewModel.forEach(function(result) {
        //     result.bioImage = 'https://api.kenneths.com/wwwroot/' + result.bioImage
        // });

    }

    // async function selectMatch(index) {

    //     mhhGlobal.selectedSurveyeeId = state.surveyeeSurveyResultViewModel[index].surveyeeId;
    //     mhhGlobal.selectedStylistName = state.surveyeeSurveyResultViewModel[index].alias;

    //     let returnStatus = await mhhGlobal.postMatch(state.surveyeeSurveyResultViewModel[index].surveyeeId)

    //     if (returnStatus === -1) {
    //         return;
    //     }

    //     router.push('/survey/1/conf');
    // }

    async function surveyView(csid, esid) {

        state.surveyeeSurveyResultViewModel = await mhhGlobal.getSurveyView(csid, esid);

        if (state.surveyeeSurveyResultViewModel === null) {
            return
        }

        state.surveyeeSurveyResultViewModel.forEach(function(result) {
            result.bioImage = result.bioImage
        });

    }

</script>

<style scoped>
</style>