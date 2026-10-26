<template>
    <div>
        <section class="bg-primary-900 w-full h-[95px]  lg:h-[120px] flex items-end">
            <GoldLine />
        </section>
        <section
            class="relative flex flex-col items-center justify-center w-full overflow-hidden text-primary-100 py-12">
            <!-- Background Icon -->
            <img src="/images/icons/k-icon-light.webp" alt="" role="presentation"
                class="absolute -top-35 -left-10 w-auto h-[250%] z-0 pointer-events-none opacity-30" />

            <!-- Content -->
            <div class="relative z-10 flex flex-col items-center text-center">
                <h1 class="text-4xl lg:text-6xl uppercase pb-3">
                    Find Your Perfect Stylist
                </h1>
            </div>

        </section>

        <section v-if="showLanding === true" class="bg-primary-100">
            <!-- Content 02 -->
            <div class="w-full pt-2">
                <div id="content-02"
                    class="text-center text-primary-900 leading-[1] p-0 mt-[15px] text-[3.5rem] md:text-[110px]">
                    SAVE 20%
                </div>
            </div>

            <!-- Content 03 -->
            <div class="mt-2 w-full">
                <div id="content-03" class="text-center text-primary-900 leading-[1] p-0 text-[1.5rem] md:text-[28px]">
                    ON YOUR FIRST VISIT WITH YOUR MATCH
                </div>
            </div>

            <!-- Content 04 (CTA) -->
            <div class="w-full">
                <div id="content-04" class="text-center p-0 mt-[40px] mb-[20px]">
                    <Button tabindex="101" label="TAKE THE QUIZ ►"
                        class="!w-[300px] md:!w-[350px] !border-0 !rounded-none bg-primary-900 !text-primary-100 font-normal !px-5 !py-[15px] !text-[26px] md:!text-[1.75rem]"
                        @click="StartQuiz" />
                </div>
            </div>

            <!-- How-to row -->
            <div class="mt-3 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                    <div class="flex justify-center">
                        <img src="/images/quiz/home/answer.webp" alt="Answer 10 Questions Label"
                            class="customerImageResponse" />
                    </div>
                    <div class="mt-0 text-3xl">
                        Answer<br />
                        10 Questions
                    </div>
                </div>

                <div class="text-center">
                    <div class="flex justify-center">
                        <img src="/images/quiz/home/match.webp" alt="Match With Your Stylist Label"
                            class="customerImageResponse" />
                    </div>
                    <div class="mt-0 text-3xl">
                        Match With<br />
                        Your Stylist
                    </div>
                </div>

                <div class="text-center">
                    <div class="flex justify-center">
                        <img src="/images/quiz/home/find.webp" alt="Find a New Bestie Label"
                            class="customerImageResponse" />
                    </div>
                    <div class="mt-0 text-3xl">
                        Find A New<br />
                        Bestie
                    </div>
                </div>
            </div>

            <!-- Content 05 -->
            <div class="w-full mt-6 bg-[#989584]">
                <div id="content-05"
                    class="bg-primary-500 shadow-md text-primary-900 text-center px-0 pt-[25px] pb-[15px] text-[1.5rem] md:text-[34px]">
                    Find Your Match Based On...
                </div>
            </div>

            <!-- Based on row -->
            <div class="mt-2 w-full flex flex-col-reverse md:flex-row bg-transparent">
                <!-- Left -->
                <div id="content-06" class="w-full md:w-1/2 text-center px-0 pt-[30px] pb-[15px]">
                    <div class="flex justify-center">
                        <img class="image-rotated" src="/images/quiz/home/match-with-a-hair-stylist.webp"
                            alt="Take the Quiz Below" />
                    </div>

                    <div class="mt-6">
                        <Button tabindex="102" label="TAKE THE QUIZ ►"
                            class="!w-[300px] md:!w-[350px] !border-0 !rounded-none bg-primary-900 !text-primary-100 !font-normal !px-5 !py-[15px] !text-[26px] md:!text-[1.75rem]"
                            @click="StartQuiz" />
                    </div>
                </div>

                <!-- Right -->
                <div id="content-07" class="w-full md:w-1/2 px-0 pt-[25px] pb-[15px]">
                    <h2 class="text-left px-2 text-[1.75rem] md:text-[34px] leading-[1]">
                        HAIR GOALS
                    </h2>
                    <div
                        class="max-w-[400px] text-left px-2 mt-[7px] mb-[30px] leading-[1] text-[1.25rem] md:text-[20px]">
                        because a goal without a plan is just a wish.
                    </div>

                    <h2 class="text-left px-2 text-[1.75rem] md:text-[34px] leading-[1]">
                        LIFESTYLE
                    </h2>
                    <div
                        class="max-w-[400px] text-left px-2 mt-[7px] mb-[30px] leading-[1] text-[1.25rem] md:text-[20px]">
                        because a girl who cuts her hair is about to change her life.
                    </div>

                    <h2 class="text-left px-2 text-[1.75rem] md:text-[34px] leading-[1]">
                        HOBBIES &amp; INTERESTS
                    </h2>
                    <div
                        class="max-w-[400px] text-left px-2 mt-[7px] mb-[30px] leading-[1] text-[1.25rem] md:text-[20px]">
                        because friends have all things in common.
                    </div>
                </div>
            </div>

        </section>

        <div v-if="showLanding === false" ref="quizScroller" class="grow overflow-y-auto">
            <quiz-home :scroller-el="quizScroller" />
        </div>

    </div>
</template>

<script setup>
import { mhhGlobal } from '~/composables/mhhGlobal';

import Button from '@/volt/Button.vue';

useHead({
    title: "Find Your Perfect Stylist | Hair Quiz | Kenneth's",
    link: [
        {
            rel: 'canonical',
            href: 'https://kenneths.com/hair-quiz'
        }
    ],
    meta: [
        {
            name: 'description',
            content:
                "Take Kenneth's Hair Quiz to get matched with your perfect stylist based on your hair goals, lifestyle, and interests. Save 20% on your first visit with your match."
        },
        {
            name: 'robots',
            content: 'index, follow'
        },

        // Open Graph
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:title',
            content: "Find Your Perfect Stylist | Hair Quiz | Kenneth's"
        },
        {
            property: 'og:description',
            content:
                "Take Kenneth's Hair Quiz to get matched with your perfect stylist based on your hair goals, lifestyle, and interests. Save 20% on your first visit with your match."
        },
        {
            property: 'og:url',
            content: 'https://kenneths.com/hair-quiz'
        },
        {
            property: 'og:image',
            content: 'https://kenneths.com/images/quiz/home/social-share.webp'
        },
        {
            property: 'og:image:secure_url',
            content: 'https://kenneths.com/images/quiz/home/social-share.webp'
        },
        {
            property: 'og:image:type',
            content: 'image/webp'
        },
        {
            property: 'og:image:alt',
            content: "Find Your Perfect Stylist with Kenneth's Hair Quiz"
        },
        {
            property: 'og:site_name',
            content: "Kenneth's Hair Salons And Day Spas"
        },
        {
            property: 'og:locale',
            content: 'en_US'
        },

        // Twitter
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: "Find Your Perfect Stylist | Hair Quiz | Kenneth's"
        },
        {
            name: 'twitter:description',
            content:
                "Take Kenneth's Hair Quiz to get matched with your perfect stylist based on your hair goals, lifestyle, and interests. Save 20% on your first visit with your match."
        },
        {
            name: 'twitter:image',
            content: 'https://kenneths.com/images/quiz/home/social-share.webp'
        },
        {
            name: 'twitter:image:alt',
            content: "Find Your Perfect Stylist with Kenneth's Hair Quiz"
        }
    ]
})

const route = useRoute();

const quizScroller = ref(null)

const showLanding = ref(true);

var referral = route.query.ref;
var refid = route.query.refid;
var custcd = route.query.custcd;

if (referral == null) {
    referral = "org";
}

if (refid == null) {
    refid = "0";
}

referral = referral.toLowerCase();

if (referral == "khs") {
    mhhGlobal.isKhs = true;
}

if (custcd != null) {
    mhhGlobal.custcd = custcd;
}

mhhGlobal.ref = referral;
mhhGlobal.refid = refid;

await mhhGlobal.trackStart(referral, refid);

function StartQuiz() {
    showLanding.value = false;
}
</script>

<style scoped>
/* Keep any complex/unique styles you still need */
.image-rotated {
    max-width: 65%;
    height: auto;
    padding: 0;
    border: 4px solid #ffffff;
    box-shadow: -2px 2px 2px #888888;
    transform: rotate(-3deg);
}
</style>