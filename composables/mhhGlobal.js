import { appGlobal } from '~/composables/appGlobal';
const { handleResponse, getRequestOptions, throwError } = useResponse();


const mhhGlobal = reactive({
    quizVisible: false,
    step: 'home',
    loggedIn: false,
    doingSurvey: false,
    surveyeeId: 0,
    surveyId: 1,
    employeeName: '',
    location: '',
    technicianLevel: '',
    alternateId: 0, 
    yearOfBirth: 0,
    customerResponses: [],
    questionProgress: 40,
    question: '',
    selectText: '',
    validationMessage: '',
    showValidationDialog: '',
    customerEmail: '',
    customerName: '',
    customerFirstName: '',
    customerLastName: '',
    selectedSurveyeeId: 0,
    selectedStylistName: '',
    isKhs: false,
    ref: '',
    refid: 0,
    custcd: '',
    showProgress: false,
    isProfile: false,
    csid: 0,
    esid: 0,

    responses: [],
    responsesAllowed: 0,
    status: '',

    tracking: {
        trackingId: 0
    },

    selectResult: {
        matchCode: '',
        locationDescription: '',
        locationWebDescription: '',
        address: '',
        cityState: '',
        expirationDate: ''
    },

    errorModel: {
        priority: 0,
        status: '',
        title: '',
        description: '',
        exceptionMessage: ''
    },

    customerStart() {
        mhhGlobal.doingSurvey = true;
        mhhGlobal.surveyeeId = 0;
        mhhGlobal.surveyId = 1;
        mhhGlobal.alternateId = 0;
        mhhGlobal.customerResponses = [];
        mhhGlobal.questionProgress = 10;
        mhhGlobal.customerEmail = '';
        mhhGlobal.customerName = '';
        mhhGlobal.customerFirstName = '';
        mhhGlobal.customerLastName = '';
        mhhGlobal.selectedSurveyeeId = 0;
        mhhGlobal.selectedStylistName = '';
        mhhGlobal.selectResult.matchCode = '';
        mhhGlobal.selectResult.locationDescription = '';
        mhhGlobal.selectResult.locationWebDescription = '';
        mhhGlobal.selectResult.address = '';
        mhhGlobal.selectResult.cityState = '';
        mhhGlobal.selectResult.expirationDate = ''
    },

    clearCustomerResponses(sqid) {
        var crs = mhhGlobal.customerResponses;

        for (var i = crs.length - 1; i >= 0; i--) {
            if (crs[i].sqId == sqid) {
                crs.splice(i, 1);
            }
        }
    },

    saveCustomerResponseState(responses, sqid) {
        var crs = mhhGlobal.customerResponses;

        responses.forEach(function (rsp) {
            if (rsp.selected == true) {
                crs.push({ sqId: sqid, sqpaId: rsp.id });
            }
        })
    },

    returnCustomerResponseState(responses) {
        var crs = mhhGlobal.customerResponses;

        crs.forEach(function (cr) {
            responses.forEach(function (rsp) {
                if (rsp.id == cr.sqpaId) {
                    rsp.selected = true;
                }
            })
        })
    },

    validateCustomerResponse(responses) {
        var didSelect = false;
        responses.forEach(function (ans) {
            if (ans.selected == true) {
                didSelect = true;
            }
        })

        if (didSelect == false) {
            return false;
        }

        return true;
    },

    selectCustomerResponse(responses, response, responsesAllowed) {
        if (responsesAllowed == 0) //select as many as they want
        {
            response.selected = (response.selected ? false : true);
            return '';
        }

        if (responsesAllowed == 1) //only select one, toggle any current selected off
        {
            response.selected = (response.selected ? false : true);

            if (response.selected == true) {
                responses.forEach(function (rsp) {
                    if (rsp.id != response.id && rsp.selected == true) {
                        rsp.selected = false;
                    }
                })
            }

            return '';
        }
        if (responsesAllowed > 1) //finite selection allowed, 
        {
            if (response.selected == true) {
                response.selected = false;
                return '';
            }

            //if already selected max, don't select unless deselecting
            var selectedCount = 0
            responses.forEach(function (rsp) {
                if (rsp.selected == true) {
                    selectedCount += 1;
                }
            })

            if (selectedCount >= responsesAllowed) {
                return 'Please deselected another answer before selecting this one.';
            }

            response.selected = (response.selected ? false : true);

            return '';
        }
    },

    getQuestionProgress(questionNumber) {
        var crs = mhhGlobal.customerResponses;
        var questionTotal = 10;

        var foundHairCut = false;
        var foundColor = false;
        crs.forEach(function (cr) {
            if (cr.sqpaId == '84') {
                questionTotal += 1;
                foundHairCut = true;
            } else if (cr.sqpaId == '85') {
                questionTotal += 1;
                foundColor = true;
            }
        })

        if (questionNumber == 1) {
            return 0;
        } else if (questionNumber == 2) {
            return (1 / 10) * 100;
        } else if (questionNumber == 3) {
            if (foundHairCut) {
                return (1.5 / 10) * 100;
            } else {
                return (1 / 9) * 100;
            }
        }

        if (foundHairCut == false) {
            questionNumber -= 1;
        }

        if (foundColor == false) {
            questionNumber -= 1;
        }

        return ((questionNumber) / questionTotal) * 100
    },

    getQuestionProgressString(questionNumber) {
        var crs = mhhGlobal.customerResponses;
        var questionTotal = 9

        var foundHairCut = false;
        var foundColor = false;
        crs.forEach(function (cr) {
            if (cr.sqpaId == '84') {
                foundHairCut = true;
                questionTotal += 1;
            } else if (cr.sqpaId == '85') {
                foundColor = true;
                questionTotal += 1;
            }
        })

        if (questionNumber == 1) {
            return '1 of 11';
        } else if (questionNumber == 2) {
            return '2 of 11';
        } else if (questionNumber == 3) {
            if (foundHairCut) {
                return '3 of 11'
            } else {
                return '2 of 10'
            }
        }

        if (foundHairCut == false) {
            questionNumber -= 1;
        }

        if (foundColor == false) {
            questionNumber -= 1;
        }

        return questionNumber.toString() + ' of ' + questionTotal.toString();
    },

    GetPreviousRoutingPage(currentPage) {
        var crs = mhhGlobal.customerResponses;
        var toPage = '';

        if (currentPage == '15') {
            //no previous
        } else if (currentPage == '16') {
            return '15';
        } else if (currentPage == '17') {
            toPage = '15';

            crs.forEach(function (cr) {
                if (cr.sqId == '16') {
                    toPage = '16';
                }
            })

            if (toPage == '16') {
                return toPage;
            }

            return toPage;
        } else if (currentPage == '18') {
            toPage = '15';

            crs.forEach(function (cr) {
                if (cr.sqId == '17') {
                    toPage = '17';
                }
            })

            if (toPage == '17') {
                return toPage;
            }

            crs.forEach(function (cr) {
                if (cr.sqId == 16) {
                    toPage = '16';
                }
            })

            if (toPage == '16') {
                return toPage;
            }

            return toPage;
        } else if (currentPage == '19') {
            return '18';
        } else if (currentPage == '20') {
            return '19';
        } else if (currentPage == '21') {
            return '20';
        } else if (currentPage == '22') {
            return '21';
        } else if (currentPage == '23') {
            return '22';
        } else if (currentPage == '24') {  //23-25 removed 
            return '23';
        } else if (currentPage == '25') {
            return '24';
        } else if (currentPage == '26') {
            return '22';
        } else if (currentPage == '27') {
            if (mhhGlobal.ref == "khs" || mhhGlobal.ref == "ttc") {
                return '26'; //26b
            } else {
                return '26';
            }
        } else if (currentPage == '28') {
            return '27';
        }
    },

    GetNextRoutingPage(currentPage) {
        var crs = mhhGlobal.customerResponses;
        var toPage = '';

        if (currentPage == '15') {
            //if removed haircut, make sure 
            var foundHairCut = false;
            var foundColor = false;
            crs.forEach(function (cr) {
                if (cr.sqpaId == '84') {
                    foundHairCut = true;
                } else if (cr.sqpaId == '85') {
                    foundColor = true;
                }
            })

            if (foundHairCut == false) {
                mhhGlobal.clearCustomerResponses(17);
            }

            if (foundColor == false) {
                mhhGlobal.clearCustomerResponses(16);
            }

            toPage = '18';
            crs.forEach(function (cr) {
                if (cr.sqpaId == '85') {
                    toPage = '16';
                }
            })

            if (toPage == '16') {
                return toPage;
            }

            crs.forEach(function (cr) {
                if (cr.sqpaId == '84') {
                    toPage = '17';
                }
            })

            if (toPage == '17') {
                return toPage;
            }

            return toPage;
        } else if (currentPage == '16') {

            toPage = '18';
            crs.forEach(function (cr) {
                if (cr.sqpaId == '84') {
                    toPage = '17';
                }
            })

            if (toPage == '17') {
                return toPage;
            }

            return toPage;
        } else if (currentPage == '17') {
            return '18';
        } else if (currentPage == '18') {
            return '19';
        } else if (currentPage == '19') {
            return '20';
        } else if (currentPage == '20') {
            return '21';
        } else if (currentPage == '21') {
            return '22';
        } else if (currentPage == '22') {
            if (mhhGlobal.ref == "khs" || mhhGlobal.ref == "ttc" || mhhGlobal.ref == "rtn") {
                return '26'; //26b
            } else {
                return '26';
            }
        } else if (currentPage == '23') {  //23-25 removed 
            return '24';
        } else if (currentPage == '24') {
            return '25';
        } else if (currentPage == '25') {
            if (mhhGlobal.ref == "khs") {
                return '26'; //26b
            } else {
                return '26';
            }
        } else if (currentPage == '26') {
            return '27';
        } else if (currentPage == '27') {
            return '28';
        }
    },

    async trackStart(ref, refid) {
        if (appGlobal.isDevMode) { //don't track while in development
            return
        }

        appGlobal.isLoading = true;

        const url = appGlobal.apiBaseUrl + "/Survey/" + mhhGlobal.surveyId + "/track/start?ref=" + ref + "&refid=" + refid;

        const options = getRequestOptions('POST',false);

        await fetch(url, options)
            .then(response => response.json())
            .then(function (data) {
                if (!handleResponse(data)) {
                    throwError(500, data.description);
                    return;
                }

                mhhGlobal.tracking = data;
            })
            .catch(function (e) {
                throwError(500, e.message);
                return
            })
            .finally(function () {
                appGlobal.isLoading = false;
            })

        return;
    },

    async track(value) {
        if (appGlobal.isDevMode) { //don't track while in development
            return
        }

        appGlobal.isLoading = true;

        const url = appGlobal.apiBaseUrl + "/Survey/" + mhhGlobal.surveyId + "/track/" + mhhGlobal.tracking.trackingId + "/" + value;

        const options = getRequestOptions('PUT', false);

        await fetch(url, options)
            .then(response => response.json())
            .then(function (data) {
                if (!handleResponse(data)) {
                    throwError(500, data.description);
                    return;
                }

            })
            .catch(function (e) {
                throwError(500, e.message);
                return
            })
            .finally(function () {
                appGlobal.isLoading = false;
            })

        return;
    },


    async saveResponses(surveyQuestionResponses) {
        appGlobal.isLoading = true;

        let returnResponse = 1;

        const url = appGlobal.apiBaseUrl + "/Survey/1/surveyee/" + mhhGlobal.surveyeeId + "/responses";

        let payload = { trackingId: mhhGlobal.tracking.trackingId, SurveyQuestionResponses: surveyQuestionResponses };

        const options = getRequestOptions('POST',false, payload);

        await fetch(url, options)
            .then(response => response.json())
            .then(function (data) {
                if (!handleResponse(data)) {
                    throwError(500, data.description);
                    returnResponse = -1
                }

                mhhGlobal.surveyeeId = data.surveyeeId;
            })
            .catch(function (e) {
                throwError(500, e.message);
                returnResponse = -1
            })
            .finally(function () {
                appGlobal.isLoading = false;
            })

        return returnResponse;
    },


    async updateSurveyee(surveyeeLiteViewModel) {
        appGlobal.isLoading = true;

        let returnResponse = 1;

        const url = appGlobal.apiBaseUrl + '/Survey/1/surveyee/' + mhhGlobal.surveyeeId;

        const options = getRequestOptions('PUT',false, surveyeeLiteViewModel);

        await fetch(url, options)
            .then(response => response.json())
            .then(function (data) {
                if (!handleResponse(data)) {
                    throwError(500, data.description);
                    returnResponse = -1
                }

            })
            .catch(function (e) {
                throwError(500, e.message);
                returnResponse = -1
            })
            .finally(function () {
                appGlobal.isLoading = false;
            })

        return returnResponse;
    },

    async postMatch(surveyeeId) {
        appGlobal.isLoading = true;

        let returnResponse = 1;

        const url = appGlobal.apiBaseUrl + '/Survey/1/surveyee/' + mhhGlobal.surveyeeId + '/selected/' + surveyeeId;

        const options = getRequestOptions('POST',false);

        await fetch(url, options)
            .then(response => response.json())
            .then(function (data) {
                if (!handleResponse(data)) {
                    throwError(500, data.description);
                    returnResponse = -1
                }

                mhhGlobal.selectResult.matchCode = data.selectResult.matchCode;
                mhhGlobal.selectResult.address = data.selectResult.address;
                mhhGlobal.selectResult.locationDescription = data.selectResult.locationDescription;
                mhhGlobal.selectResult.locationWebDescription = data.selectResult.locationWebDescription;
                mhhGlobal.selectResult.address = data.selectResult.address;
                mhhGlobal.selectResult.cityState = data.selectResult.cityState;
                mhhGlobal.selectResult.expirationDate = data.selectResult.expirationDate;

            })
            .catch(function (e) {
                throwError(500, e.message);
                returnResponse = -1
            })
            .finally(function () {
                appGlobal.isLoading = false;
            })

        return returnResponse;
    },


    async getSurveyResults() {
        appGlobal.isLoading = true;

        let returnResponse = {};

        const url = appGlobal.apiBaseUrl + '/Survey/1/surveyee/' + mhhGlobal.surveyeeId + '/results/2';

        const options = getRequestOptions('GET', false);

        await fetch(url, options)
            .then(response => response.json())
            .then(function (data) {
                if (!handleResponse(data)) {
                    throwError(500, data.description);
                    returnResponse = null;
                }

                returnResponse = data;

            })
            .catch(function (e) {
                throwError(500, e.message);
                returnResponse = null;
            })
            .finally(function () {
                appGlobal.isLoading = false;
            })

        return returnResponse;
    },


    async getSurveyView(csid, esid) {
        appGlobal.isLoading = true;

        let returnResponse = {};

        const url = appGlobal.apiBaseUrl + '/Survey/1/surveyee/' + csid + '/view/results/' + esid;

        const options = getRequestOptions('GET', false);

        await fetch(url, options)
            .then(response => response.json())
            .then(function (data) {
                if (!handleResponse(data)) {
                    throwError(500, data.description);
                    returnResponse = null;
                }

                returnResponse = data;

            })
            .catch(function (e) {
                throwError(500, e.message);
                returnResponse = null;
            })
            .finally(function () {
                appGlobal.isLoading = false;
            })

        return returnResponse;
    }

})

export { mhhGlobal };