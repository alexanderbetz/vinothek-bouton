<script lang="ts">
  import type { ThreadMessage } from 'openai/resources/beta/threads'
  import Typewriter from 'svelte-typewriter'

  let searchText = ''
  let isTyping = false
  let isSearching = false
  let showTimeHint = false
  let answers = <ThreadMessage[]>[]
  const preDefinedPrompts = [
    'Welcher Wein passt zu Wildessen?',
    'Welcher Whisky passt zu einem Einsteiger?',
    'Gibt es Rotweine für Einsteiger?',
    'Was ist Histamin?',
    'Was ist ein spiced Rum?',
    'Warum sind manche Whiskys rauchig?',
    'Woraus wird Grappa hergestellt?',
    'Wird jeder Wein einmal zu Essig?',
    'Wo kommen Whiskys her?',
    'Was ist ein Single Malt Whisky?',
    'Was passiert zwischen Ernte und Abfüllung mit Wein?',
    'Was bedeutet Dry Gin?'
  ]

  async function search() {
    if (searchText.trim().length === 0) {
      return
    }

    isSearching = true
    setTimeout(() => showTimeHint = true, 2000)
    const response = await fetch('/api/ask', { method: 'POST', body: JSON.stringify({ q: searchText }) })
    isSearching = false
    showTimeHint = false
    answers = (await response.json()).reverse()
    console.log(answers)
  }

  $: hideTypeWriter = Boolean(searchText).valueOf() || isTyping

  $: threeRandomPrompts = preDefinedPrompts
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, 3)
</script>

<div class="min-h-screen bg-[url(/bg.jpg)] bg-center bg-no-repeat bg-[length:80%] portrait:bg-[cover] flex flex-col">
  <header class="py-5 flex justify-center sticky top-0 flex-grow-0">
    <!-- logo -->
    <img src="/logo.png" alt="Logo Vinothek Bouton" class="h-[40px] md:h-[80px] w-auto">
  </header>

  <main class="flex flex-1 justify-center items-center">
    <div class="flex-1 px-5 md:px-0">
      {#if !isSearching && answers.length === 0}
        <form on:submit|preventDefault={search}>
          <div class="relative max-w-[800px] mx-auto">
            <button type="submit" class="absolute right-[15px] top-[16px] md:right-[20px] md:top-[23px]" disabled={isSearching}>
              <svg
                class="h-[20px] w-auto md:h-auto"
                width="36"
                height="37"
                viewBox="0 0 36 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="23" cy="13" r="11.5" stroke="#D9D9D9" stroke-width="3"/>
                <line x1="14.0607" y1="22.0607" x2="1.06066" y2="35.0607" stroke="#D9D9D9" stroke-width="3"/>
              </svg>
            </button>

            <!-- type writer on desktop -->
            <div class="hidden md:block absolute left-8 top-4 pointer-events-none h-[48px] overflow-hidden w-[calc(100%_-_100px)]">
              <Typewriter mode="loopRandom" delay={1000} interval={50} bind:disabled={hideTypeWriter}>
                {#each preDefinedPrompts as prompt}
                  <p class="text-[32px] text-gray-500 whitespace-nowrap">{prompt}</p>
                {/each}
              </Typewriter>
            </div>

            <input
              type="text"
              class="md:hidden py-3 pl-4 pr-10 w-full rounded-full border-2 outline-none"
              placeholder="Wie können wir dir behilflich sein?"
              bind:value={searchText}
              readonly={isSearching}/>

            <input
              type="text"
              class="hidden md:block h-[80px] w-full rounded-full border-2 outline-none px-8 text-[32px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.10)]"
              bind:value={searchText}
              readonly={isSearching}
              on:click={() => isTyping = true}
              on:blur={() => isTyping = false}/>
          </div>

          <div class="md:hidden space-y-1 mt-3">
            {#each threeRandomPrompts as prompt}
              <button
                class="py-2 px-3 w-full rounded-[20px] border bg-white/70 text-start text-gray-400"
                on:click={() => { searchText = prompt }}>{prompt}</button>
            {/each}
          </div>
        </form>
      {:else if isSearching}
        <div class="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid">
            <defs>
              <mask id="circle-mask">
                <circle r="50" cx="50" cy="50" fill="white"></circle>
              </mask>
            </defs>
            <circle cx="50" cy="50" r="50" fill="#8c0932"></circle>
            <g mask="url(#circle-mask)">
              <rect x="-100" y="-250" width="300" height="300" rx="90" ry="90" fill="#ffffff" opacity="0.4">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="1s"
                  repeatCount="indefinite"
                  values="0 50 -100;90 50 -100"
                  keyTimes="0;1"></animateTransform>
              </rect>

              <rect x="-100" y="-260" width="300" height="300" rx="95" ry="95" fill="#ffffff" opacity="0.4">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="1.5151515151515151s"
                  repeatCount="indefinite"
                  values="0 50 -110;90 50 -110"
                  keyTimes="0;1"></animateTransform>
              </rect>

              <rect x="-100" y="-270" width="300" height="300" rx="100" ry="100" fill="#ffffff" opacity="0.4">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="3.0303030303030303s"
                  repeatCount="indefinite"
                  values="0 50 -120;90 50 -120"
                  keyTimes="0;1"></animateTransform>
              </rect>

            </g>
          </svg>

          <p class="mt-5 mb-1 text-[20px]">Jetzt fragen wir Eric.</p>
          <p class="text-gray-500 transition-opacity" class:opacity-0="{!showTimeHint}">Das kann eine Weile dauern...</p>
        </div>
      {:else}
        <div class="max-w-[800px] w-full mx-auto flex flex-col text-[20px]">
          {#each answers as message}
            {#if message.role === 'user'}
              <p class="text-center">"{message.content[0].text.value}"</p>
            {:else}
              <p class="font-bold">Eric antwortet: </p>
              <Typewriter mode="cascade" delay={500}>
                <p class="whitespace-pre-line">{message.content[0].text.value}</p>
              </Typewriter>
            {/if}
            <div class="mb-4"></div>
          {/each}

          <div class="mb-10">
            <button
              class="mx-auto rounded-md bg-primary px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              on:click={() => { answers = []; }}>
              Neue Frage stellen
            </button>
          </div>
        </div>
      {/if}
    </div>
  </main>

  <footer class="flex-grow-0">
    <div class="text-center space-x-4 pb-3">
      <a href="/impressum" class="hover:underline">Impressum</a>
      <a href="/kontakt" class="hover:underline">Kontakt</a>
      <a href="https://shop.bouton.at" class="hover:underline" target="_blank">Shop</a>
    </div>
  </footer>
</div>
