<template>
  <div class="w-full">
    <!-- Center the form area -->
    <div class="flex justify-center">
      <div class="w-full max-w-5xl px-4">
        <!-- Row: First + Last -->
        <div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 md:w-4/5 md:mx-auto">
          <div>
            <InputText
              type="text"
              class="p-inputtext-lg w-full"
              v-model="state.firstName"
              placeholder="First Name"
            />
          </div>

          <div>
            <InputText
              type="text"
              class="p-inputtext-lg w-full"
              v-model="state.lastName"
              placeholder="Last Name"
            />
          </div>
        </div>

        <!-- Row: Email -->
        <div class="mt-4 grid grid-cols-1 md:w-4/5 md:mx-auto">
          <div>
            <InputText
              type="text"
              class="p-inputtext-lg w-full"
              v-model="state.email"
              placeholder="Email"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-3 flex justify-center text-center">
           <Button class="customerNavButton px-6" @click="submit" tabindex="98">
            Find Your Match!
          </Button>
        </div>

        <div class="mt-2 flex justify-center text-center">
          <Button class="goBackNavButton" @click="previous" tabindex="99">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
    import { mhhGlobal } from '~/composables/mhhGlobal';

    import Button from '@/volt/Button';
    import InputText from '@/volt/InputText';

    mhhGlobal.question = 'Almost Done!';
    mhhGlobal.selectText = 'We just need a few details to find your perfect match.';

    const state = reactive({
      responsesAllowed: 1,
      sqid: 0,
      questionNumber: 29,
      showProgress: false,
      fullName: '',
      firstName: '',
      lastName: '',
      email: '',
      validationMessage: "test",
      status: "",
      sqids: [15,16,17,18,19,20,21,22,23,24,25,26,27,28],
        sqrsp: [],
        surveyee: {
            surveyeeId: 0
        },
        surveyeeLiteViewModel: {
            isComplete: false,
            bioImage: '',
            bioImagePhysicalPath: '',
            userDefinedValue1: '',
            bioDescription: '',
            fullName: '',
            firstName: '',
            lastName: '',
            email: '',
            mobilePhoneNumber: ''
        }
    });

    onMounted(() => {

        mhhGlobal.track('NE');
        mhhGlobal.questionProgress = mhhGlobal.getQuestionProgress(state.questionNumber);
        mhhGlobal.showProgress = state.showProgress;

        state.firstName = mhhGlobal.customerFirstName;
        state.lastName = mhhGlobal.customerLastName;
        state.fullName = mhhGlobal.customerName;
        state.email = mhhGlobal.customerEmail;

        window.scrollTo(0, 0);
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function previous() {
        mhhGlobal.customerFirstName = state.firstName;
        mhhGlobal.customerLastName = state.lastName;
        mhhGlobal.customerName = state.fullName;
        mhhGlobal.customerEmail = state.email;
        mhhGlobal.step = '28';
    }

    async function submit() {
        //validation
        if (state.firstName == '') {
            mhhGlobal.validationMessage = 'Please enter your first name';
            mhhGlobal.dialog = true;
            return
        }
        if (state.lastName == '') {
            mhhGlobal.validationMessage = 'Please enter your last name';
            mhhGlobal.dialog = true;
            return
        }
        if (state.email == '') {
            mhhGlobal.validationMessage = 'Please enter your email';
            mhhGlobal.dialog = true;
            return
        }
        if (state.email != '') {
            if (validateEmail(state.email) == false) {
                mhhGlobal.validationMessage = 'Please enter a valid email';
                mhhGlobal.dialog = true;
                return
            }
        }

        let surveyQuestionResponses = [];

        state.sqids.forEach(function (sqid) {
            let sqpaIds = [];

            mhhGlobal.customerResponses.forEach(function(crs) {
                if (crs.sqId == sqid)   {     
                    
                    sqpaIds.push(crs.sqpaId);
                    
                }
            })

            surveyQuestionResponses.push({SurveyQuestionId: sqid, SurveyQuestionPossibleAnswerIds: sqpaIds });
        });

        //update questions
        let returnStatus = await mhhGlobal.saveResponses(surveyQuestionResponses)

        if (returnStatus === -1) {
            return;
        }

        //update surveyee
        state.surveyeeLiteViewModel.fullName = state.firstName + ' ' + state.lastName;
        state.surveyeeLiteViewModel.firstName = state.firstName;
        state.surveyeeLiteViewModel.lastName = state.lastName;
        state.surveyeeLiteViewModel.email = state.email;

        mhhGlobal.customerName = state.firstName + ' ' + state.lastName;
        mhhGlobal.customerFirstName = state.firstName;
        mhhGlobal.customerLastName = state.lastName;
        mhhGlobal.customerEmail = state.email;

        returnStatus = await mhhGlobal.updateSurveyee(state.surveyeeLiteViewModel);

        if (returnStatus === -1) {
            return;
        }

        mhhGlobal.step = '30'; //found-your-match page
    }

</script>

<style scoped>

</style>