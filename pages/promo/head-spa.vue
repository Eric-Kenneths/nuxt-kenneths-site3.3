<template>
    <section class="bg-primary-900 pt-24 md:pt-35">
        <div class="mx-auto max-w-[1200px] px-4 pt-8 pb-14 sm:pt-10">
            <!-- Hero -->
            <section class="rounded-3xl bg-white/95 shadow-xl ring-1 ring-black/5 overflow-hidden"
                aria-labelledby="headspa-hero-title">
                <div class="grid grid-cols-1 gap-6 p-5 sm:p-8 md:grid-cols-12 md:items-center">
                    <div class="md:col-span-7">
                        <h1 id="headspa-hero-title" class="k-section-title tracking-tight text-primary-900">
                            Clear Your Mind. Renew Your Scalp. Transform Your Hair.
                        </h1>

                        <p class="mt-4 k-para-text leading-relaxed text-black/70">
                            Experience the art of Japanese Head Spa—where ancient ritual meets modern tranquility.
                            For a limited time, enjoy <span class="font-bold text-primary-900">20% off your first
                                visit</span>.
                        </p>

                        <div class="mt-6">
                            <a href="/book/new/promo?d=dfv&p=b&s=FYH&l=pl&x=f"
                                class="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary-900 px-6 py-3 k-section-link uppercase tracking-wide text-primary-100 shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                aria-label="Book now and save 20 percent on your first Japanese Head Spa visit">
                                Book Now - Save 20%
                            </a>
                        </div>
                    </div>

                    <div class="md:col-span-5">
                        <div class="flex justify-center">
                            <div class="w-full max-w-md">
                                <video ref="heroVideo" class="w-full rounded-2xl shadow-md ring-1 ring-black/10"
                                    loading="eager" fetchpriority="high" autoplay loop muted playsinline preload="none"
                                    aria-label="Japanese Head Spa promotional video">
                                    <source :src="videoSrc" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Benefits -->
            <section class="mt-8 rounded-3xl bg-white/90 shadow-lg ring-1 ring-black/5 p-5 sm:p-8">
                <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-primary-900 text-center">
                    Why a Japanese Head Spa?
                </h2>

                <ul class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Benefits list">
                    <li v-for="benefit in benefits" :key="benefit"
                        class="flex items-start gap-3 rounded-2xl k-para-text bg-primary-100/40 p-4 ring-1 ring-black/5">
                        <span
                            class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-900 text-primary-100 k-para-text font-bold"
                            aria-hidden="true">
                            ✓
                        </span>
                        <span class="k-para-text text-primary-900/90">
                            {{ benefit }}
                        </span>
                    </li>
                </ul>
            </section>

            <!-- Experience -->
            <section class="mt-8 rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 p-5 sm:p-8">
                <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-primary-900 text-center">
                    The Experience at Kenneth's
                </h2>

                <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
                    <div>
                        <ul class="list-disc pl-5 k-para-text leading-relaxed text-black/70">
                            <li>A warm eye mask and soft blanket cocoon</li>
                            <li>Aromatic steam and gentle water therapy</li>
                            <li>Detoxifying scalp clarifiers and restorative massage</li>
                            <li>Nourishing treatments to strengthen and hydrate hair</li>
                            <li>A ritual of touch, flow, and renewal</li>
                        </ul>
                    </div>

                    <div>
                        <img src="/images/promo/spa/headspa-promo.webp" alt="Japanese Head Spa"
                            class="w-full rounded-2xl shadow-md ring-1 ring-black/10 object-cover" loading="lazy" />
                    </div>
                </div>
            </section>

            <!-- Testimonial -->
            <section class="mt-8 k-para-text bg-white/90 shadow-lg ring-1 ring-black/5 p-5 sm:p-8">
                <h2 class="sr-only">Testimonial</h2>

                <figure class="mx-auto max-w-3xl text-center">
                    <blockquote class="k-para-text leading-relaxed text-primary-900">
                        “I just gifted myself a headspa treatment at Kenneth's Polaris, and what a treat! I have never
                        felt so relaxed. It was one hour of pure bliss! Emily did an amazing job making sure that no
                        detail was overlooked, and I will definitely return!”
                    </blockquote>
                    <figcaption class="mt-4 k-para-text font-semibold text-black/70">
                        Melissa H.
                    </figcaption>
                </figure>
            </section>

            <!-- CTA -->
            <section class="mt-8 rounded-3xl bg-primary-100/60 shadow-lg ring-1 ring-black/5 p-6 sm:p-10 text-center"
                aria-labelledby="headspa-cta-title">
                <h2 id="headspa-cta-title" class="text-2xl sm:text-3xlfont-extrabold tracking-tight text-primary-900">
                    Limited Time Offer – 20% Off Your First Visit
                </h2>
                <p class="mt-3 k-para-text text-black/70">
                    Step into a ritual of peace and renewal. Your scalp, hair, and spirit will thank you.
                </p>

                <div class="mt-6">
                    <a href="/book/new/promo?d=dfv&p=b&s=FYH&dsl=y&x=f&bps=y"
                        class="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary-900 px-6 py-3 k-section-link uppercase tracking-wide text-primary-100 shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label="Book now and save 20 percent, with bps parameter enabled">
                        Book Now - Save 20%
                    </a>
                </div>
            </section>

            <!-- FAQ -->
            <section class="mt-8 rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 p-5 sm:p-8">
                <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-900 text-center">
                    Frequently Asked Questions
                </h2>

                <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <article v-for="faq in faqs" :key="faq.q"
                        class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                        <h3 class="k-para-text font-bold text-primary-900">
                            {{ faq.q }}
                        </h3>
                        <p class="mt-2 k-para-text leading-relaxed text-black/70">
                            {{ faq.a }}
                        </p>
                    </article>
                </div>
            </section>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'


useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
            key: 'robots',
        }
    ]
})

const benefits = [
    'Relieve stress & mental fatigue',
    'Detoxify the scalp for balance',
    'Encourage stronger, healthier hair',
    'Promote mental clarity',
    'Deep relaxation & self-care',
]

const faqs = [
    { q: 'How long is the experience?', a: 'About 45 minutes of pure relaxation.' },
    { q: 'Is it just for scalp health?', a: "No—it's a full-body experience of calm, clarity, and renewal." },
    { q: 'Do I need to prepare?', a: "Just bring yourself. We'll handle the rest." },
]

const heroVideo = ref(null)
const videoSrc = ref('')

onMounted(() => {
    // Keep the original behavior: only load video on wider screens
    const screenWidth = window.innerWidth
    if (screenWidth >= 570) {
        videoSrc.value = 'https://kenneths.com/static/promo/headspa-promo.mp4'
        // Nudge the element to load once the src is set
        heroVideo.value?.load?.()
    }
})
</script>
