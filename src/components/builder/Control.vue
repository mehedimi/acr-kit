<script setup lang="ts"></script>

<template>
  <div class="control-wrapper">
    <div class="control-buttons">
      <button class="button" title="Move element up">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-up-icon lucide-chevron-up"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
      <button class="button" title="Move element down">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-down-icon lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <button class="button" title="Edit element">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-cog-icon lucide-cog"
        >
          <path d="M11 10.27 7 3.34" />
          <path d="m11 13.73-4 6.93" />
          <path d="M12 22v-2" />
          <path d="M12 2v2" />
          <path d="M14 12h8" />
          <path d="m17 20.66-1-1.73" />
          <path d="m17 3.34-1 1.73" />
          <path d="M2 12h2" />
          <path d="m20.66 17-1.73-1" />
          <path d="m20.66 7-1.73 1" />
          <path d="m3.34 17 1.73-1" />
          <path d="m3.34 7 1.73 1" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      </button>
      <button class="button" title="Delete element">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-trash2-icon lucide-trash-2"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
    <slot></slot>
  </div>
</template>
