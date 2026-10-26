<template>
    <div class="w-full flex flex-col items-center">
        <!-- Map + overlays (relative container) -->
        <div class="relative w-full max-w-[554px] p-0 m-0">
            <img ref="mapImgEl" id="location-image-map" class="block w-full h-auto p-0 m-0"
                src="/images/quiz/location/locations-map.webp?20260106" border="0" usemap="#image-maps-khs"
                alt="Interactive map - Screen Readers - Use list below the map for accessibility" tabindex="1"
                @load="handleMapImageLoad" />

            <map name="image-maps-khs" id="image-maps-khs">
                <area v-for="(location, index) in mhhGlobal.responses" :key="index" :shape="location.shape"
                    :coords="location.scaledCoords || location.coords" class="cursor-pointer"
                    @click="selectLocation(location)" />
            </map>

            <!-- Selected overlays (checkmarks) -->
            <img v-for="(location, index) in mhhGlobal.responses" :key="location.id" v-show="location.selected"
                class="absolute cursor-pointer" :style="location.checkBoxPostion"
                src="/images/quiz/shared/check-mark-dark.png"
                :alt="location.locationName + ' Selected - Click to Unselect'"
                :aria-label="location.locationName + ' Selected'" :tabindex="index + 1"
                @click="selectLocation(location)" />
        </div>

        <!-- Next button (top) -->
        <div class="flex justify-center text-center mt-3">
            <Button class="customerNavButton" @click="next" tabindex="97">
                Next Question &#9658;
            </Button>
        </div>

        <!-- Location list/cards -->
        <div class="mt-1 w-full flex justify-center">
            <div class="w-full max-w-[554px]">
                <div v-for="(response, index) in mhhGlobal.responses" :key="index"
                    class="mt-2 w-full bg-[var(--p-primary-900,#3A5B50)] text-primary-100 px-3 py-3">
                    <!-- Row layout -->
                    <div class="flex items-stretch justify-between gap-4">
                        <!-- LEFT: Location text -->
                        <div class="flex-1 text-left">
                            <div class="text-xl leading-tight">
                                {{ response.locationName }}
                            </div>

                            <div class="text-sm leading-snug mt-1">
                                <div>{{ response.addr1 }}</div>
                                <div>{{ response.addr2 }}</div>
                                <div>{{ response.addr3 }}</div>
                            </div>
                        </div>

                        <!-- RIGHT: Checkbox (vertically centered) -->
                        <div class="flex items-center justify-end">
                            <label
                                class="inline-flex items-center gap-3 px-3 py-2 text-lg cursor-pointer bg-[var(--p-primary-900,#3A5B50)] text-white">
                                <span>Select</span>
                                <input type="checkbox" v-model="response.selected" :aria-label="'Select to include ' +
                                    response.locationName + ', ' +
                                    response.addr1 + ', ' +
                                    response.addr2 + ', ' +
                                    response.addr3
                                    " class="h-5 w-5 accent-white" @click="selectLocation(response)" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Next Button -->
        <div class="flex justify-center text-center mt-3">
            <Button class="customerNavButton" @click="next" tabindex="98">
                Next Question &#9658;
            </Button>
        </div>

        <!-- Go Back Button -->
        <div class="flex justify-center text-center mt-2">
            <Button class="goBackNavButton" @click="previous" tabindex="99">
                Go Back
            </Button>
        </div>
    </div>
</template>

<script setup>
//import { reactive, onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { mhhGlobal } from '~/composables/mhhGlobal'
import Button from '@/volt/Button'

mhhGlobal.question = 'Select what location(s) you would like from the map'
mhhGlobal.selectText = '(Select all that apply)'

const mapImgEl = ref(null)

/**
 * Scale coords based on rendered image size vs natural size.
 * Supports: circle, rect, poly/polygon
 */
function scaleCoords(shape, coordsStr, scaleX, scaleY) {
    const nums = coordsStr
        .split(',')
        .map((n) => Number.parseFloat(n.trim()))
        .filter((n) => Number.isFinite(n))

    if (!nums.length) return coordsStr

    const round = (n) => Math.round(n)

    if (shape === 'circle') {
        // circle: x,y,r
        const [x, y, r] = nums
        const scaledR = r * ((scaleX + scaleY) / 2)
        return [round(x * scaleX), round(y * scaleY), round(scaledR)].join(',')
    }

    if (shape === 'rect') {
        // rect: x1,y1,x2,y2
        const [x1, y1, x2, y2] = nums
        return [
            round(x1 * scaleX),
            round(y1 * scaleY),
            round(x2 * scaleX),
            round(y2 * scaleY)
        ].join(',')
    }

    // poly / polygon: x1,y1,x2,y2,...
    const scaled = nums.map((val, idx) => {
        const isX = idx % 2 === 0
        return round(val * (isX ? scaleX : scaleY))
    })
    return scaled.join(',')
}

function updateScaledMapAreas() {
    const img = mapImgEl.value
    if (!img) return

    const naturalW = img.naturalWidth
    const naturalH = img.naturalHeight
    const renderedW = img.clientWidth
    const renderedH = img.clientHeight

    if (!naturalW || !naturalH || !renderedW || !renderedH) return

    const scaleX = renderedW / naturalW
    const scaleY = renderedH / naturalH

    // ensure every response has a stable "original coords"
    mhhGlobal.responses.forEach((loc) => {
        if (!loc.originalCoords) loc.originalCoords = loc.coords
        loc.scaledCoords = scaleCoords(loc.shape, loc.originalCoords, scaleX, scaleY)
    })
}

function handleMapImageLoad() {
    // wait a tick so clientWidth is correct after layout
    nextTick(() => {
        updateScaledMapAreas()
    })
}

function onResize() {
    updateScaledMapAreas()
}

const state = reactive({
    responsesAllowed: 0,
    sqid: 26,
    questionNumber: 9,
    showProgress: true,
    responses: [
        {
            id: 143,
            coords: '47,130,40',
            shape: 'circle',
            selected: false,
            locationName: 'Dublin',
            addr1: 'Avery Square Center',
            addr2: '7056 Hospital Dr.',
            addr3: 'Dublin, OH 43016',
            checkBoxPostion: { position: 'absolute', top: '17%', left: '4%' }
        },
        {
            id: 144,
            coords: '275,40,40',
            shape: 'circle',
            selected: false,
            locationName: 'Polaris',
            addr1: 'Oak Creek Center',
            addr2: '1305 Cameron Ave.',
            addr3: 'Lewis Center, OH 43035',
            checkBoxPostion: { position: 'absolute', top: '3%', left: '42%' }
        },
        {
            id: 145,
            coords: '113,268,40',
            shape: 'circle',
            selected: false,
            locationName: 'Arlington-Hilliard',
            addr1: 'TruePointe',
            addr2: '4525 Wathen Dr',
            addr3: 'Hilliard, OH 43026',
            checkBoxPostion: { position: 'absolute', top: '39%', left: '15%' }
        },
        {
            id: 146,
            coords: '222,537,40',
            shape: 'circle',
            selected: false,
            locationName: 'Grove City',
            addr1: 'Parkway Centre North',
            addr2: '1582 Stringtown Rd.',
            addr3: 'Grove City, OH 43123',
            checkBoxPostion: { position: 'absolute', top: '81%', left: '33%' }
        },
        {
            id: 147,
            coords: '570,440,40',
            shape: 'circle',
            selected: false,
            locationName: 'Pickerington',
            addr1: 'Taylor Square Center',
            addr2: '2865 Taylor Road Extension',
            addr3: 'Reynoldsburg, OH 43068',
            checkBoxPostion: { position: 'absolute', top: '64%', left: '91%' }
        },
        {
            id: 148,
            coords: '469,217,40',
            shape: 'circle',
            selected: false,
            locationName: 'New Albany',
            addr1: 'New Albany Square',
            addr2: '4942 Morse Rd.',
            addr3: 'Columbus, OH 43230',
            checkBoxPostion: { position: 'absolute', top: '31%', left: '74%' }
        },
        {
            id: 149,
            coords: '382,55,40',
            shape: 'circle',
            selected: false,
            locationName: 'Westerville',
            addr1: 'Northridge Center',
            addr2: '726 N. State St.',
            addr3: 'Westerville, OH 43082',
            checkBoxPostion: { position: 'absolute', top: '5%', left: '60%' }
        },
        {
            id: 150,
            coords: '125,30,40',
            shape: 'circle',
            selected: false,
            locationName: 'Powell',
            addr1: 'Powell Crossing Center',
            addr2: '9868 Brewster Ln.',
            addr3: 'Powell, OH 43065',
            checkBoxPostion: { position: 'absolute', top: '2%', left: '20%' }
        },
        {
            id: 151,
            coords: '192,281,40',
            shape: 'circle',
            selected: false,
            locationName: 'Kingsdale',
            addr1: 'Kingsdale Center',
            addr2: '3134 Kingsdale Center',
            addr3: 'Upper Arlington, OH 43221',
            checkBoxPostion: { position: 'absolute', top: '41%', left: '28%' }
        }
    ]
})

onMounted(() => {
    mhhGlobal.track(state.sqid)
    mhhGlobal.returnCustomerResponseState(state.responses)
    mhhGlobal.questionProgress = mhhGlobal.getQuestionProgress(state.questionNumber)
    mhhGlobal.showProgress = state.showProgress;
    mhhGlobal.responses = state.responses
    mhhGlobal.responsesAllowed = state.responsesAllowed

    window.addEventListener('resize', onResize, { passive: true })

    // If the image is already cached and load didn't fire:
    nextTick(() => updateScaledMapAreas())

    window.scrollTo(0, 0)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})

function selectLocation(response) {
    response.selected = !response.selected
    // optional: keep coords in sync if selection changes triggers layout shifts
    // updateScaledMapAreas()
}

function saveState() {
    mhhGlobal.clearCustomerResponses(state.sqid)
    mhhGlobal.saveCustomerResponseState(mhhGlobal.responses, state.sqid)
}

function previous() {
    saveState()
    mhhGlobal.step = mhhGlobal.GetPreviousRoutingPage(state.sqid.toString())
}

function next() {
    mhhGlobal.status = ''

    if (mhhGlobal.validateCustomerResponse(mhhGlobal.responses) === false) {
        mhhGlobal.validationMessage = 'Please select at least one response'
        mhhGlobal.showValidationDialog = true
        return
    }

    saveState()
    mhhGlobal.step = mhhGlobal.GetNextRoutingPage(state.sqid.toString())
}
</script>

<style scoped></style>
