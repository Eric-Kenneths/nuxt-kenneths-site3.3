<template>
  <div v-if="bookGlobal.showLocationFilter" class="grid grid-cols-1 text-center justify-center">
    <div class="col-span-12 items-center mt-3 text-sm md:text-base">
      Location Filter
      <Select v-model="bookGlobal.filteredLocationCode" :options="bookGlobal.bookingLocations"
        optionLabel="extendedDescription" optionValue="locationCode" class="w-2/3 md:w-1/4"
        @change="filteredLocationChange()" />
      <div v-if="bookGlobal.filteredLocationCode === 'MR'" class="text-sm text-red-600 p-1">
        <span class="text-sm text-red">
          *After 4/12/2026 Mill Run appointments will be at our new TruePointe Location
        </span>
        <br />
        4525 Wathen Dr, Hilliard, OH 43026
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 text-center justify-center pb-10">
    <!--Hair Services-->
    <div v-show="bookGlobal.book.serviceGroupVisible.hair"
      class="col-span-12 items-center md:mx-auto md:w-[800px] py-2">
      <Accordion :value="getAccordionValue(bookGlobal.book.serviceGroupShow.hair)" class="text-left">
        <AccordionPanel value="0">
          <AccordionHeader><span class="text-xl text-bold uppercase">Hair</span></AccordionHeader>
          <AccordionContent>
            <div class="bg-primary-100 pr-2 pb-2 rounded-md">
              <div v-if="cuts.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Cuts + Styles</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false" @click="bookGlobal.clearService('cut')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in cuts" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.cut"
                            @change="cutChanged()" name="cut" :value="service.serviceCode"
                            :aria-label="'Cuts and Styles - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="colors.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Colors</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false" @click="bookGlobal.clearService('color')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in colors" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.color"
                            name="color" :value="service.serviceCode"
                            :aria-label="'Colors - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="weaves.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Highlighting</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false" @click="bookGlobal.clearService('weave')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in weaves" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.weave"
                            name="color" :value="service.serviceCode"
                            :aria-label="'Highlighting - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="treatments.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Treatments</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('treatment')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in treatments" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.treatment"
                            name="treatment" :value="service.serviceCode"
                            :aria-label="'Treatment - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="perms.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Smoothing/Perm</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false" @click="bookGlobal.clearService('perm')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in perms" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.perm"
                            name="perm" :value="service.serviceCode"
                            :aria-label="'Smoothing/Perm - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="extensions.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Extensions</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('extension')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in extensions" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.extension"
                            name="extension" :value="service.serviceCode"
                            :aria-label="'Extensions - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!--Nail Services-->
    <div v-show="bookGlobal.book.serviceGroupVisible.nail"
      class="col-span-12 items-center md:mx-auto md:w-[800px] py-2">
      <Accordion :value="getAccordionValue(bookGlobal.book.serviceGroupShow.nail)" class="text-left">
        <AccordionPanel value="0">
          <AccordionHeader><span class="text-xl text-bold uppercase">Nails</span></AccordionHeader>
          <AccordionContent>
            <div class="bg-primary-100 pr-2 pb-2 rounded-md">
              <div v-if="manis.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Manicures</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('mani'); maniChanged('M')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in manis" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" @change="maniChanged('M')"
                            v-model="bookGlobal.service.mani" name="mani" :value="service.serviceCode"
                            :aria-label="'Manicure - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="nailEnhances.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">
                        Enhancements<span class="text-base"></span>
                      </span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('nailEnhance'); maniChanged('E')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in nailEnhances" :key="service.serviceCode"
                      class="rounded-sm border border-solid py-2 pl-2 border-primary-200 bg-white">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" @change="maniChanged('E')"
                            v-model="bookGlobal.service.nailEnhance" name="nailEnhance" :value="service.serviceCode"
                            :aria-label="'Manicure Enhancements - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="maniAdds.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">
                        Add-Ons
                        <span class="text-base">(Must have manicure or enhancement selected)</span>
                      </span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('maniAdd')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in maniAdds" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1"
                            :disabled="bookGlobal.serviceStep.maniAddDisabled" v-model="bookGlobal.service.maniAdd"
                            name="maniAdd" :value="service.serviceCode"
                            :aria-label="'Manicure Add-On - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="pedis.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Pedicures</span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('pedi'); pediChanged()">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in pedis" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" @change="pediChanged()"
                            v-model="bookGlobal.service.pedi" name="pedi" :value="service.serviceCode"
                            :aria-label="'Pedicure - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="pediAdds.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">
                        Add-Ons
                        <span class="text-base">(Must have pedicure selected)</span>
                      </span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('pediAdd')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in pediAdds" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1"
                            :disabled="bookGlobal.serviceStep.pediAddDisabled" v-model="bookGlobal.service.pediAdd"
                            name="pediAdd" :value="service.serviceCode"
                            :aria-label="'Pedicure Add-On - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!--Bar Services-->
    <div v-show="bookGlobal.book.serviceGroupVisible.bar" class="col-span-12 items-center md:mx-auto md:w-[800px] py-2">
      <Accordion :value="getAccordionValue(bookGlobal.book.serviceGroupShow.bar)" class="text-left">
        <AccordionPanel value="0">
          <AccordionHeader>
            <span class="text-xl text-bold">
              SPA BAR + HEAD SPA <span class="text-base">(Polaris + Hilliard)</span>
            </span>
          </AccordionHeader>
          <AccordionContent>
            <div class="bg-primary-100 pr-2 pb-2 rounded-md">
              <div v-if="facialBars.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Bar Facials</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('facialBar'); facialChanged('B')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in facialBars" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div class="grid grid-cols-1">
                        <div class="col-span-12">
                          <div>
                            <div class="my-0 float-left">
                              {{ service.abDescription }}
                              <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                                @click="toggle($event, service)">
                                $
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="pr-3 float-right leading-none">
                              <RadioButton :id="service.serviceCode" class="mb-1"
                                @change="barChanged(service.serviceCode); facialChanged('B')"
                                v-model="bookGlobal.service.facialBar" name="facialBar" :value="service.serviceCode"
                                :aria-label="'Facial - ' + service.abDescription" />
                            </div>
                          </div>
                        </div>

                        <div class="grid grid-col-1 col-span-12 mt-3 ml-6 animate-fadeIn" v-if="
                          bookGlobal.service.facialBar === service.serviceCode &&
                          bookGlobal.barAddonGroups[service.serviceCode] !== undefined
                        ">
                          <div class="text-base">Let's Customize It</div>
                          <div v-for="service in bookGlobal.barAddonGroups[service.serviceCode]"
                            :key="service.serviceCode"
                            class="rounded-sm border border-solid border-gray-300 bg-primary-100 py-2 pl-2">
                            <div>
                              <div class="my-0 float-left">
                                {{ service.abDescription }}
                                <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                                  @click="toggle($event, service)">
                                  $
                                </span>
                              </div>
                            </div>
                            <div>
                              <div class="pr-3 float-right leading-none">
                                <Checkbox :id="service.serviceCode" class="mb-1"
                                  v-model="bookGlobal.multiSelectService.facialBarAdds" :inputId="service.serviceCode"
                                  name="faceWaxing" :value="service.serviceCode"
                                  :aria-label="'Face Waxing - ' + service.abDescription" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="headSpas.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Head Spa</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('headSpa'); headSpaChanged()">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in headSpas" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div class="grid grid-cols-1">
                        <div class="col-span-12">
                          <div>
                            <div class="my-0 float-left">
                              {{ service.abDescription }}
                              <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                                @click="toggle($event, service)">
                                $
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="pr-3 float-right leading-none">
                              <RadioButton :id="service.serviceCode" class="mb-1" @change="headSpaChanged()"
                                v-model="bookGlobal.service.headSpa" name="headSpa" :value="service.serviceCode"
                                :aria-label="'Head Spa - ' + service.abDescription" />
                            </div>
                          </div>
                        </div>

                        <div class="grid grid-col-1 col-span-12 mt-3 ml-6 animate-fadeIn" v-if="
                          bookGlobal.getServicesByGroup('hairNoHeadSpa') == '' &&
                          bookGlobal.service.headSpa === service.serviceCode &&
                          bookGlobal.barAddonGroups[service.serviceCode] !== undefined
                        ">
                          <div class="text-base">Let's Customize It</div>
                          <div v-for="service in bookGlobal.barAddonGroups[service.serviceCode]"
                            :key="service.serviceCode"
                            class="rounded-sm border border-solid border-gray-300 bg-primary-100 py-2 pl-2">
                            <div>
                              <div class="my-0 float-left">
                                {{ service.abDescription }}
                                <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                                  @click="toggle($event, service)">
                                  $
                                </span>
                              </div>
                            </div>
                            <div>
                              <div class="pr-3 float-right leading-none">
                                <RadioButton :id="service.serviceCode" class="mb-1"
                                  v-model="bookGlobal.service.headSpaAdd" name="headSpaAdd" :value="service.serviceCode"
                                  :aria-label="'Head Spa Add - ' + service.abDescription" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="waxBars.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Bar Waxings</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('barWaxings')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in waxBars" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <Checkbox :id="service.serviceCode" class="mb-1"
                            v-model="bookGlobal.multiSelectService.barWaxings" :inputId="service.serviceCode"
                            name="barWaxing" :value="service.serviceCode"
                            :aria-label="'Bar Waxing - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="browBars.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Bar Brows</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('browBar')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in browBars" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.browBar"
                            name="browBar" :value="service.serviceCode"
                            :aria-label="'Brows - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="lashBars.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Bar Lashes</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('lashBar')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in lashBars" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.lashBar"
                            name="lashBar" :value="service.serviceCode"
                            :aria-label="'Lashes - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!--Facial Services-->
    <div v-show="bookGlobal.book.serviceGroupVisible.esthetic"
      class="col-span-12 items-center md:mx-auto md:w-[800px] py-2">
      <Accordion :value="getAccordionValue(bookGlobal.book.serviceGroupShow.esthetic)" class="text-left">
        <AccordionPanel value="0">
          <AccordionHeader><span class="text-xl text-bold uppercase">Suite Facials</span></AccordionHeader>
          <AccordionContent>
            <div class="bg-primary-100 pr-2 pb-2 rounded-md">
              <div v-if="facials.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Facials</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('facial'); facialChanged('F')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in facials" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" @change="facialChanged('F')"
                            v-model="bookGlobal.service.facial" name="facial" :value="service.serviceCode"
                            :aria-label="'Facial - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="facialAdds.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">
                        Add-Ons
                        <span class="text-base">(Must have facial selected)</span>
                      </span>
                      <span class="float-right cursor-pointer text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('facialAdd')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in facialAdds" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1"
                            :disabled="bookGlobal.serviceStep.facialAddDisabled" v-model="bookGlobal.service.facialAdd"
                            name="maniAdd" :value="service.serviceCode"
                            :aria-label="'Facial Add-On - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="hydraFacials.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">HydraFacials</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('hydraFacial'); facialChanged('H')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in hydraFacials" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" @change="facialChanged('H')"
                            v-model="bookGlobal.service.hydraFacial" name="hydraFacial" :value="service.serviceCode"
                            :aria-label="'Hydrafacial - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="microderms.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Treatments/Peels</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('microderm')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in microderms" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.microderm"
                            name="microderm" :value="service.serviceCode"
                            :aria-label="'Treatment/Peel - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!--Waxing Services-->
    <div v-show="bookGlobal.book.serviceGroupVisible.wax" class="col-span-12 items-center md:mx-auto md:w-[800px] py-2">
      <Accordion :value="getAccordionValue(bookGlobal.book.serviceGroupShow.wax)" class="text-left">
        <AccordionPanel value="0">
          <AccordionHeader><span class="text-xl text-bold uppercase">Waxing</span></AccordionHeader>
          <AccordionContent>
            <div class="bg-primary-100 pr-2 pb-2 rounded-md">
              <div v-if="faceWaxings.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Facial Waxings</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('faceWaxings')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in faceWaxings" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <Checkbox :id="service.serviceCode" class="mb-1"
                            v-model="bookGlobal.multiSelectService.faceWaxings" :inputId="service.serviceCode"
                            name="faceWaxing" :value="service.serviceCode"
                            :aria-label="'Face Waxing - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="bodyWaxings.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Body Waxings</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('bodyWaxings')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in bodyWaxings" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <Checkbox :id="service.serviceCode" class="mb-1"
                            v-model="bookGlobal.multiSelectService.bodyWaxings" :inputId="service.serviceCode"
                            name="bodyWaxing" :value="service.serviceCode"
                            :aria-label="'Body Waxing - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!--Massage Services-->
    <div v-show="bookGlobal.book.serviceGroupVisible.massage"
      class="col-span-12 items-center md:mx-auto md:w-[800px] py-2">
      <Accordion :value="getAccordionValue(bookGlobal.book.serviceGroupShow.massage)" class="text-left">
        <AccordionPanel value="0">
          <AccordionHeader><span class="text-xl text-bold uppercase">Women's Massage</span></AccordionHeader>

          <AccordionContent>
            <div class="bg-primary-100 pr-2 pb-2 rounded-md">
              <div class="text-red-600 text-base">*Available at our Hilliard and New Albany Locations</div>

              <div v-if="massages.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Women's Massages</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('massage')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in massages" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>

                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.massage"
                            name="massage" :value="service.serviceCode"
                            :aria-label="'Womens Massage - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!--Make Up/Tint/Lash/Brow-->
    <div v-show="bookGlobal.book.serviceGroupVisible.makeUp"
      class="col-span-12 items-center md:mx-auto md:w-[800px] py-2">
      <Accordion :value="getAccordionValue(bookGlobal.book.serviceGroupShow.makeUp)" class="text-left">
        <AccordionPanel value="0">
          <AccordionHeader><span class="text-xl text-bold uppercase">Make Up/Brow/Lash</span></AccordionHeader>
          <AccordionContent>
            <div class="bg-primary-100 pr-2 pb-2 rounded-md">
              <div v-if="makeUps.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Make Up</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('makeUp')">
                        Clear
                      </span>
                    </div>
                    <div v-for="service in makeUps" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.makeUp"
                            name="makeUp" :value="service.serviceCode"
                            :aria-label="'Makeup - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="tints.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Brows</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false" @click="bookGlobal.clearService('tint')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in tints" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.tint"
                            name="tint" :value="service.serviceCode" :aria-label="'Tint - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="lashBrows.length !== 0" class="grid mt-1 text-lg lg:text-xl">
                <div class="col-span-12 px-0">
                  <div class="flex ml-2 flex-col">
                    <div>
                      <span class="font-bold float-left mt-2">Lashes</span>
                      <span class="clear-button cursor-pointer float-right text-blue-700 text-base mt-1"
                        v-show="bookGlobal.webMarketing.mustSelect === false"
                        @click="bookGlobal.clearService('lashBrow')">
                        Clear
                      </span>
                    </div>

                    <div v-for="service in lashBrows" :key="service.serviceCode"
                      class="rounded-sm border border-solid border-primary-200 bg-white py-2 pl-2">
                      <div>
                        <div class="my-0 float-left">
                          {{ service.abDescription }}
                          <span v-if="props.showPricingPopup" class="dollar-icon cursor-pointer"
                            @click="toggle($event, service)">
                            $
                          </span>
                        </div>
                      </div>
                      <div>
                        <div class="pr-3 float-right leading-none">
                          <RadioButton :id="service.serviceCode" class="mb-1" v-model="bookGlobal.service.lashBrow"
                            name="lashBrow" :value="service.serviceCode"
                            :aria-label="'Lash - ' + service.abDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!-- <div class="col-12 align-items-center sans-serif text-red-500 text-xl font-bold">
      {{ bookGlobal.serviceStep.error }}
    </div> -->

    <div v-if="bookGlobal.isMarketing === true"
      class="col-12 align-items-center lg:w-[60%] sans-serif text-base font-bold text-center mx-auto">
      <div v-if="bookGlobal.webMarketing.webMarketingHd.marketingText2 !== ''">
        <div v-html="bookGlobal.webMarketing.webMarketingHd.marketingText2"></div>
      </div>

      {{ bookGlobal.webMarketing.webMarketingHd.marketingDisclaimer }}
    </div>
  </div>

  <Popover ref="op" style="max-width: 600px;" class="sans-serif">
    <table v-if="bookGlobal.filteredLocationCode !== 'AT'">
      <tbody>
        <tr>
          <td colspan="6">
            {{ bookGlobal.serviceStep.webDescription }}
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-center pt-2">Level Pricing</td>
        </tr>
        <tr>
          <td class="text-center td-border-bottom">1</td>
          <td class="text-center td-border-bottom">2</td>
          <td class="text-center td-border-bottom">3</td>
          <td class="text-center td-border-bottom">4</td>
          <td class="text-center td-border-bottom">5</td>
          <td class="text-center td-border-bottom">6</td>
        </tr>
        <tr>
          <td class="text-center k-table-column">
            ${{ bookGlobal.serviceStep.price1 }}<span v-show="bookGlobal.serviceStep.isStartPrice">+</span>
          </td>
          <td class="text-center k-table-column">
            ${{ bookGlobal.serviceStep.price2 }}<span v-show="bookGlobal.serviceStep.isStartPrice">+</span>
          </td>
          <td class="text-center k-table-column">
            ${{ bookGlobal.serviceStep.price3 }}<span v-show="bookGlobal.serviceStep.isStartPrice">+</span>
          </td>
          <td class="text-center k-table-column">
            ${{ bookGlobal.serviceStep.price4 }}<span v-show="bookGlobal.serviceStep.isStartPrice">+</span>
          </td>
          <td class="text-center k-table-column">
            ${{ bookGlobal.serviceStep.price5 }}<span v-show="bookGlobal.serviceStep.isStartPrice">+</span>
          </td>
          <td class="text-center k-table-column">
            ${{ bookGlobal.serviceStep.price6 }}<span v-show="bookGlobal.serviceStep.isStartPrice">+</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <div>
        {{ bookGlobal.serviceStep.webDescription }}
        <span class="font-bold">
          ${{ bookGlobal.serviceStep.price0 }}<span v-show="bookGlobal.serviceStep.isStartPrice">+</span>
        </span>
      </div>
    </div>
  </Popover>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { bookGlobal } from '~/composables/bookGlobal'

import Accordion from '@/volt/Accordion'
import AccordionPanel from '@/volt/AccordionPanel'
import AccordionHeader from '@/volt/AccordionHeader'
import AccordionContent from '@/volt/AccordionContent'
import Checkbox from '@/volt/Checkbox'
import Popover from '@/volt/Popover'
import RadioButton from '@/volt/RadioButton'
import Select from '@/volt/Select'

import { useToast } from 'primevue/usetoast'
const toast = useToast()

const props = defineProps({
  showPricingPopup: {
    type: Boolean,
    default: false
  }
})

const { getWebBookServices } = useKhsds()

const op = ref()

const cuts = computed(() => Array.isArray(bookGlobal.serviceGroups?.cuts) ? bookGlobal.serviceGroups.cuts : [])
const colors = computed(() => Array.isArray(bookGlobal.serviceGroups?.colors) ? bookGlobal.serviceGroups.colors : [])
const weaves = computed(() => Array.isArray(bookGlobal.serviceGroups?.weaves) ? bookGlobal.serviceGroups.weaves : [])
const treatments = computed(() => Array.isArray(bookGlobal.serviceGroups?.treatments) ? bookGlobal.serviceGroups.treatments : [])
const perms = computed(() => Array.isArray(bookGlobal.serviceGroups?.perms) ? bookGlobal.serviceGroups.perms : [])
const extensions = computed(() => Array.isArray(bookGlobal.serviceGroups?.extensions) ? bookGlobal.serviceGroups.extensions : [])

const manis = computed(() => Array.isArray(bookGlobal.serviceGroups?.manis) ? bookGlobal.serviceGroups.manis : [])
const nailEnhances = computed(() => Array.isArray(bookGlobal.serviceGroups?.nailEnhances) ? bookGlobal.serviceGroups.nailEnhances : [])
const maniAdds = computed(() => Array.isArray(bookGlobal.serviceGroups?.maniAdds) ? bookGlobal.serviceGroups.maniAdds : [])
const pedis = computed(() => Array.isArray(bookGlobal.serviceGroups?.pedis) ? bookGlobal.serviceGroups.pedis : [])
const pediAdds = computed(() => Array.isArray(bookGlobal.serviceGroups?.pediAdds) ? bookGlobal.serviceGroups.pediAdds : [])

const facialBars = computed(() => Array.isArray(bookGlobal.serviceGroups?.facialBars) ? bookGlobal.serviceGroups.facialBars : [])
const headSpas = computed(() => Array.isArray(bookGlobal.serviceGroups?.headSpas) ? bookGlobal.serviceGroups.headSpas : [])
const waxBars = computed(() => Array.isArray(bookGlobal.serviceGroups?.waxBars) ? bookGlobal.serviceGroups.waxBars : [])
const browBars = computed(() => Array.isArray(bookGlobal.serviceGroups?.browBars) ? bookGlobal.serviceGroups.browBars : [])
const lashBars = computed(() => Array.isArray(bookGlobal.serviceGroups?.lashBars) ? bookGlobal.serviceGroups.lashBars : [])

const facials = computed(() => Array.isArray(bookGlobal.serviceGroups?.facials) ? bookGlobal.serviceGroups.facials : [])
const facialAdds = computed(() => Array.isArray(bookGlobal.serviceGroups?.facialAdds) ? bookGlobal.serviceGroups.facialAdds : [])
const hydraFacials = computed(() => Array.isArray(bookGlobal.serviceGroups?.hydraFacials) ? bookGlobal.serviceGroups.hydraFacials : [])
const microderms = computed(() => Array.isArray(bookGlobal.serviceGroups?.microderms) ? bookGlobal.serviceGroups.microderms : [])

const faceWaxings = computed(() => Array.isArray(bookGlobal.serviceGroups?.faceWaxings) ? bookGlobal.serviceGroups.faceWaxings : [])
const bodyWaxings = computed(() => Array.isArray(bookGlobal.serviceGroups?.bodyWaxings) ? bookGlobal.serviceGroups.bodyWaxings : [])

const massages = computed(() => Array.isArray(bookGlobal.serviceGroups?.massages) ? bookGlobal.serviceGroups.massages : [])

const makeUps = computed(() => Array.isArray(bookGlobal.serviceGroups?.makeUps) ? bookGlobal.serviceGroups.makeUps : [])
const tints = computed(() => Array.isArray(bookGlobal.serviceGroups?.tints) ? bookGlobal.serviceGroups.tints : [])
const lashBrows = computed(() => Array.isArray(bookGlobal.serviceGroups?.lashBrows) ? bookGlobal.serviceGroups.lashBrows : [])

function getAccordionValue(isOpen) {
  return isOpen ? '0' : null
}

onMounted(() => {
  if (bookGlobal.service.cut === 'HSB') {
    bookGlobal.service.cut = ''
  }

  bookGlobal.setShowServiceGroup()
})

const toggle = (event, service) => {
  bookGlobal.serviceStep.webDescription = service?.webDescription ?? ''
  bookGlobal.serviceStep.price0 = service?.price0 ?? 0
  bookGlobal.serviceStep.price1 = service?.price1 ?? 0
  bookGlobal.serviceStep.price2 = service?.price2 ?? 0
  bookGlobal.serviceStep.price3 = service?.price3 ?? 0
  bookGlobal.serviceStep.price4 = service?.price4 ?? 0
  bookGlobal.serviceStep.price5 = service?.price5 ?? 0
  bookGlobal.serviceStep.price6 = service?.price6 ?? 0
  bookGlobal.serviceStep.isStartPrice = service?.isStartPrice ?? false

  op.value?.toggle(event)
}

function pediChanged() {
  if (bookGlobal.service.pedi === '') {
    bookGlobal.service.pediAdd = ''
    bookGlobal.serviceStep.pediAddDisabled = true
  } else {
    bookGlobal.serviceStep.pediAddDisabled = false
  }
}

function maniChanged(fromWhere) {
  if (fromWhere === 'M') {
    if (bookGlobal.service.mani !== '' && bookGlobal.service.nailEnhance !== '') {
      bookGlobal.service.nailEnhance = ''
      toast.add({
        severity: 'info',
        summary: 'De-selected',
        detail: 'Nail Enhancement de-selected, cannot have both a Manicure and Nail Enhancement selected',
        life: 3500
      })
    }
  } else if (fromWhere === 'E') {
    if (bookGlobal.service.nailEnhance !== '' && bookGlobal.service.mani !== '') {
      bookGlobal.service.mani = ''
      toast.add({
        severity: 'info',
        summary: 'De-selected',
        detail: 'Manicure de-selected, cannot have both a Manicure and nail Enhancement selected',
        life: 3500
      })
    }
  }

  if (bookGlobal.service.mani === '' && bookGlobal.service.nailEnhance === '') {
    bookGlobal.service.maniAdd = ''
    bookGlobal.serviceStep.maniAddDisabled = true
  } else {
    bookGlobal.serviceStep.maniAddDisabled = false
  }
}

function facialChanged(fromWhere) {
  if (fromWhere === 'F') {
    if (bookGlobal.service.facial !== '') {
      if (bookGlobal.service.hydraFacial !== '') {
        bookGlobal.service.hydraFacial = ''
        toast.add({
          severity: 'info',
          summary: 'De-selected',
          detail: 'Hydrafacial de-selected, cannot have both a Facial and HydraFacial selected',
          life: 3500
        })
      }
      if (bookGlobal.service.facialBar !== '') {
        bookGlobal.service.facialBar = ''
        bookGlobal.multiSelectService.facialBarAdds = []
        toast.add({
          severity: 'info',
          summary: 'De-selected',
          detail: 'Bar Facial de-selected, cannot have both a Facial and Bar Facial selected',
          life: 3500
        })
      }
    }
  } else if (fromWhere === 'H') {
    if (bookGlobal.service.hydraFacial !== '') {
      if (bookGlobal.service.facial !== '') {
        bookGlobal.service.facial = ''
        toast.add({
          severity: 'info',
          summary: 'De-selected',
          detail: 'Facial de-selected, cannot have both a HydraFacial and Facial selected',
          life: 3500
        })
      }
      if (bookGlobal.service.facialBar !== '') {
        bookGlobal.service.facialBar = ''
        bookGlobal.multiSelectService.facialBarAdds = []
        toast.add({
          severity: 'info',
          summary: 'De-selected',
          detail: 'Bar Facial de-selected, cannot have both a HydraFacial and Bar Facial selected',
          life: 3500
        })
      }
    }
  } else if (fromWhere === 'B') {
    if (bookGlobal.service.facialBar !== '') {
      if (bookGlobal.service.facial !== '') {
        bookGlobal.service.facial = ''
        toast.add({
          severity: 'info',
          summary: 'De-selected',
          detail: 'Facial de-selected, cannot have both a Bar Facial and Facial selected',
          life: 3500
        })
      }
      if (bookGlobal.service.hydraFacial !== '') {
        bookGlobal.service.hydraFacial = ''
        toast.add({
          severity: 'info',
          summary: 'De-selected',
          detail: 'Hydrafacial de-selected, cannot have both a Bar Facial and HydraFacial selected',
          life: 3500
        })
      }
    }
  }

  if (bookGlobal.service.facial + bookGlobal.service.hydraFacial === '') {
    bookGlobal.service.facialAdd = ''
    bookGlobal.serviceStep.facialAddDisabled = true
  } else {
    bookGlobal.serviceStep.facialAddDisabled = false
  }
}

function headSpaChanged() {
  bookGlobal.service.headSpaAdd = ''
  if (bookGlobal.service.cut !== '') {
    bookGlobal.service.cut = ''
    toast.add({
      severity: 'info',
      summary: 'De-selected',
      detail: 'Cut + Style de-selected, cannot have 2 hair cut or styles selected',
      life: 3500
    })
  }
}

function cutChanged() {
  if (bookGlobal.service.cut !== '' && bookGlobal.service.headSpaAdd !== '') {
    bookGlobal.service.headSpaAdd = ''
  }
}

function barChanged() {
  bookGlobal.multiSelectService.facialBarAdds = []
}

async function filteredLocationChange() {
  bookGlobal.clearBookingData()

  bookGlobal.serviceGroups =
    (await getWebBookServices(
      'MENU',
      bookGlobal.book.sex,
      'A',
      'A',
      'A',
      bookGlobal.filteredLocationCode
    )) || {}

  bookGlobal.generateBarAddonGroups()
  await bookGlobal.setServiceGroupVisible()
}
</script>

<style scoped>
.clear-button {
  cursor: pointer;
  color: blue;
  font-size: .95rem;
  margin-right: .5rem;
  margin-top: .35rem;
}

.select-label {
  font-size: .95rem;
  margin-right: .25rem;
}

.service-dropdown {
  width: 100%;
}

.k-table-column {
  min-width: 50px;
}

.dollar-icon {
  position: relative;
  top: -2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 17px;
  height: 17px;
  border: 1px solid #696969;
  border-radius: 50%;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  background-color: #696969;
}
</style>