<script lang="ts">
  import Typewriter from 'svelte-typewriter'

  let search = ''
  let hideTypeWriter = !!search
</script>

<div class="min-h-screen bg-[url(/bg.jpg)] bg-center bg-no-repeat bg-[length:80%] flex flex-col">
  <header class="py-5 flex justify-center sticky top-0 flex-grow-0">
    <!-- logo -->
    <img src="/logo.png" alt="Logo Vinothek Bouton" class="h-[80px] w-auto">
  </header>

  <main class="flex flex-1 justify-center items-center">
    <div class="flex-1">
      <div class="relative w-full max-w-[800px] mx-auto">
        <svg
          class="absolute right-[20px] top-[23px] cursor-pointer"
          width="36"
          height="37"
          viewBox="0 0 36 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="23" cy="13" r="11.5" stroke="#D9D9D9" stroke-width="3"/>
          <line x1="14.0607" y1="22.0607" x2="1.06066" y2="35.0607" stroke="#D9D9D9" stroke-width="3"/>
        </svg>

        <div class="absolute left-8 top-4 pointer-events-none">
          <Typewriter mode="loopRandom" delay={1000} interval={50} bind:disabled={hideTypeWriter}>
            <p class="text-[32px] text-gray-500">Welcher Wein passt zu Wildessen?</p>
            <p class="text-[32px] text-gray-500">Welcher Whisky passt zu einem Einsteiger?</p>
            <p class="text-[32px] text-gray-500">Gibt es Rotweine für Einsteiger?</p>
            <p class="text-[32px] text-gray-500">Was ist Histamin?</p>
            <p class="text-[32px] text-gray-500">Was ist ein spiced Rum?</p>
            <p class="text-[32px] text-gray-500">Warum sind manche Whiskys rauchig?</p>
            <p class="text-[32px] text-gray-500">Woraus wird Grappa hergestellt?</p>
            <p class="text-[32px] text-gray-500">Wird jeder Wein einmal zu Essig?</p>
            <p class="text-[32px] text-gray-500">Wo kommen Whiskys her?</p>
            <p class="text-[32px] text-gray-500">Was ist ein Single Malt Whisky?</p>
            <p class="text-[32px] text-gray-500">Was passiert zwischen Ernte und Abfüllung mit Wein?</p>
          </Typewriter>
        </div>

        <input
          type="text"
          class="h-[80px] w-full rounded-full border-2 outline-none px-8 text-[32px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.10)]" bind:value={search} on:click={() => hideTypeWriter = true} on:blur={() => hideTypeWriter = search.length > 0}/>
      </div>
    </div>
  </main>

  <footer class="flex-grow-0">
    <!--- imprint, shop, contact -->
    <div class="text-center space-x-4 pb-3">
      <a href="/impressum" class="hover:underline">Impressum</a>
      <a href="/kontakt" class="hover:underline">Kontakt</a>
      <a href="https://shop.bouton.at" class="hover:underline" target="_blank">Shop</a>
    </div>
  </footer>
</div>
