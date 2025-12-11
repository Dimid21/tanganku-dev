<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import ArticleTeaser from '$lib/components/ArticleTeaser.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import IntroStep from '$lib/components/IntroStep.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Image from '$lib/components/Image.svelte';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';

  export let data;

  const EMAIL = 'michael@letsken.com';
  const PHONE_NUMBER = '43 664 1533015';

  const FAQS_PLACEHOLDER = `
		<h2>Question 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
    <h2>Question 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
	`;

  const BIO_PLACEHOLDER = `
		<p>Modern tools, such as Svelte and Tailwind allow you to easily hand-craft fast and beautiful websites. What’s missing is the ability to <strong>make edits without changing the source code</strong>.</p>
		<p>With this <a href="https://github.com/michael/editable-website">open-source website template</a>, I want to fill that gap.</p>
    <p>If you have questions or need any help, contact me.</p>
	`;

  const TESTIMONIALS_PLACEHOLDER = [
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.”',
      image: '/images/person-placeholder.jpg',
      name: 'Jane Doe · jane-doe.org'
    }
  ];

  let title,
    testimonials,
    faqs,
    introStep1,
    introStep2,
    introStep3,
    introStep4,
    bioTitle,
    bioPicture,
    bio,
    showUserMenu;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'Untitled Website';
    faqs = data.page?.faqs || FAQS_PLACEHOLDER;

    testimonials = JSON.parse(JSON.stringify(data.page?.testimonials || TESTIMONIALS_PLACEHOLDER));

    introStep1 = JSON.parse(
      JSON.stringify(
        data.page?.introStep1 || {
          label: 'THE PROBLEM',
          title: 'The problem statement',
          description: 'Describe the problem you are solving in a short sentence.'
        }
      )
    );
    introStep2 = JSON.parse(
      JSON.stringify(
        data.page?.introStep2 || {
          label: 'THE DREAM',
          title: 'This is how it should be.',
          description: 'Describe why it should be like that.'
        }
      )
    );
    introStep3 = JSON.parse(
      JSON.stringify(
        data.page?.introStep3 || {
          label: 'THE REALITY',
          title: 'A statement why it is not that easy.',
          description: 'Describe the reality a bit more.'
        }
      )
    );
    introStep4 = JSON.parse(
      JSON.stringify(
        data.page?.introStep4 || {
          label: 'THE PROMISE',
          title: 'Still the solution is worth it.',
          description: 'And why this is, should be described here.'
        }
      )
    );
    bioPicture = data.page?.bioPicture || '/images/person-placeholder.jpg';
    bioTitle = data.page?.bioTitle || "Hi, I'm Michael — I want your website to be editable.";
    bio = data.page?.bio || BIO_PLACEHOLDER;
    $isEditing = false;
  }

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }
  function addTestimonial() {
    testimonials.push({
      text: '“Add a quote text here”',
      image: '/images/person-placeholder.jpg',
      name: 'Firstname Lastname · example.com'
    });
    testimonials = testimonials;
  }
  function deleteTestimonial(index) {
    testimonials.splice(index, 1);
    testimonials = testimonials;
  }
  function moveTestimonial(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) toIndex = index - 1;
    else if (direction === 'down' && index < testimonials.length - 1) toIndex = index + 1;
    else return;
    const element = testimonials.splice(index, 1)[0];
    testimonials.splice(toIndex, 0, element);
    testimonials = testimonials;
  }
  async function savePage() {
    try {
      if ($currentUser) {
        await fetchJSON('POST', '/api/save-page', {
          pageId: 'home',
          page: {
            title,
            faqs,
            testimonials,
            introStep1,
            introStep2,
            introStep3,
            introStep4,
            bioPicture,
            bioTitle,
            bio
          }
        });
      }
      $isEditing = false;
    } catch (err) {
      console.error(err);
      alert('There was an error. Please try again.');
    }
  }

  initOrReset();
</script>

<svelte:head>
  <title>Make your website editable</title>
  <meta name="description" content="Make changes to your website while browsing it." />
  <link rel="alternate" hreflang="en" href="https://editable.website" />
  <link rel="canonical" href="https://editable.website" />
</svelte:head>

<!-- Header (unchanged logic; subtle spacing polish) -->
<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<!-- HERO -->
<section class="relative isolate bg-white dark:bg-transparent">
  <div class="max-w-screen-md mx-auto px-6 pt-14 sm:pt-20">
    <NotEditable>
      <svg
        class="pb-8 w-14 sm:w-20 mx-auto opacity-90 dark:opacity-100"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M164 110L64 163.768V200L164 147.059V110Z"
          class="fill-neutral-900 dark:fill-white"
        />
        <path d="M136 66L36 119.768V156L136 103.059V66Z" class="fill-neutral-900 dark:fill-white" />
        <path d="M164 0L64 53.7684V90L164 37.0588V0Z" class="fill-neutral-900 dark:fill-white" />
      </svg>
    </NotEditable>

    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
      <PlainText bind:content={title} />
    </h1>

    <NotEditable>
      <div class="text-center pt-6 pb-2 text-lg" aria-hidden="true">↓</div>
      <div class="text-center">
        <PrimaryButton size="lg" type="button" on:click={toggleEdit}>Start editing</PrimaryButton>
      </div>
      <p class="mt-3 text-center text-sm opacity-70">UI-only changes; editing logic unchanged.</p>
    </NotEditable>
  </div>
</section>

<!-- INTRO TIMELINE -->
<!-- INTRO TIMELINE -->
<section class="pt-12 md:pt-20 border-b border-neutral-200/70 dark:border-white/10">
  <div class="max-w-screen-md mx-auto px-6">
    <div class="relative">
      <div class="w-px bg-neutral-900 dark:bg-white absolute inset-0 -top-8 bottom-12 mx-auto z-0">
        <div class="w-3 h-3 rounded-full bg-neutral-900 dark:bg-white absolute -top-1 -left-1.5" />
      </div>

      <div class="relative z-10 space-y-14">
        <IntroStep bind:intro={introStep1} />
        <IntroStep bind:intro={introStep2} />
        <IntroStep bind:intro={introStep3} />
        <IntroStep bind:intro={introStep4} />
      </div>
    </div>

    <!-- keep the rest (arrow + CTA) unchanged -->
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="bg-white dark:bg-transparent">
  <div class="max-w-screen-md mx-auto px-6">
    <div
      class="font-semibold tracking-wide text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 py-10 sm:pt-16"
    >
      WHAT PEOPLE SAY
    </div>
  </div>

  {#each testimonials as testimonial, i}
    <Testimonial
      bind:testimonial
      firstEntry={i === 0}
      lastEntry={i === testimonials.length - 1}
      on:delete={() => deleteTestimonial(i)}
      on:up={() => moveTestimonial(i, 'up')}
      on:down={() => moveTestimonial(i, 'down')}
    />
  {/each}

  {#if $isEditing}
    <div class="text-center py-10 border-t border-neutral-200/70 dark:border-white/10">
      <SecondaryButton on:click={addTestimonial}>Add testimonial</SecondaryButton>
    </div>
  {/if}
</section>

<!-- BLOG TEASERS -->
{#if data.articles.length > 0}
  <NotEditable>
    <section
      class="bg-white dark:bg-transparent border-t border-neutral-200/70 dark:border-white/10"
    >
      <div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-20">
        <div
          class="font-semibold tracking-wide text-xs sm:text-sm text-neutral-600 dark:text-neutral-300"
        >
          FROM THE BLOG
        </div>
      </div>
      {#each data.articles as article, i}
        <ArticleTeaser {article} firstEntry={i === 0} />
      {/each}
    </section>
  </NotEditable>
{/if}

<!-- BIO -->
<section
  id="contact"
  class="bg-white dark:bg-transparent border-y border-neutral-200/70 dark:border-white/10 py-12 sm:py-20"
>
  <div class="max-w-screen-md mx-auto px-6">
    <div class="text-center">
      <div
        class="w-40 h-40 md:w-60 md:h-60 mx-auto overflow-hidden relative rounded-full ring-1 ring-neutral-200/70 dark:ring-white/10"
      >
        <Image
          class="block w-40 h-40 md:w-60 md:h-60 rounded-full object-cover"
          maxWidth="384"
          maxHeight="384"
          quality="0.8"
          bind:src={bioPicture}
          alt="Portrait"
        />
      </div>
    </div>

    <div class="mt-8 text-center">
      <h2 class="text-3xl md:text-5xl font-bold">
        <PlainText bind:content={bioTitle} />
      </h2>
    </div>

    <div class="prose md:prose-xl pb-4 mx-auto">
      <RichText multiLine bind:content={bio} />
    </div>

    <NotEditable>
      <div class="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 gap-3">
        <PrimaryButton size="lg" href={`mailto:${EMAIL}`}>Email</PrimaryButton>
        <SecondaryButton size="lg" href={`https://wa.me/${PHONE_NUMBER.replace(/\s+/g, '')}`}>
          WhatsApp (+{PHONE_NUMBER})
        </SecondaryButton>
      </div>
    </NotEditable>
  </div>
</section>

<!-- FAQs -->
<section class="bg-white dark:bg-transparent">
  <div class="max-w-screen-md mx-auto px-6">
    <div
      class="font-semibold tracking-wide text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 pt-12 sm:pt-20 -mb-4 md:-mb-8"
    >
      FAQs
    </div>
    <div class="prose md:prose-xl pb-16 sm:pb-24">
      <RichText multiLine bind:content={faqs} />
    </div>
  </div>
</section>

<Footer counter="/" />
