<script lang="ts">
  import type { Snippet } from 'svelte'

  // Native <dialog> on purpose. showModal() gives focus trapping, Escape to
  // dismiss, focus restoration to the trigger, inert-ing the rest of the page and
  // aria-modal semantics without hand-rolling any of it. Hand-built modals get
  // those details subtly wrong and it is the user with a keyboard who pays.
  let {
    label,
    onclose,
    children
  }: {
    /** Accessible name for the dialog. The product name. */
    label: string
    onclose: () => void
    children: Snippet
  } = $props()

  let dialog = $state<HTMLDialogElement | null>(null)

  $effect(() => {
    if (dialog && !dialog.open) dialog.showModal()
  })

  // showModal() inerts the rest of the page but does not reliably stop the body
  // scrolling behind the sheet, so lock it explicitly and restore whatever was
  // there before rather than assuming it was ''.
  $effect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  })

  // Clicking the backdrop closes. <dialog> does not do this natively, and the
  // check works because the backdrop is part of the dialog's own box: a click
  // that lands on the element itself rather than the panel inside it is a
  // backdrop click.
  function onBackdrop(event: MouseEvent) {
    if (event.target === dialog) dialog?.close()
  }
</script>

<dialog
  bind:this={dialog}
  aria-label={label}
  onclose={onclose}
  onclick={onBackdrop}
  class="sheet"
>
  <div class="panel">
    <button class="close" onclick={() => dialog?.close()} aria-label="Close">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path
          d="M5 5l10 10M15 5L5 15"
          stroke="currentColor"
          stroke-width="1.75"
          fill="none"
          stroke-linecap="round"
        />
      </svg>
    </button>
    {@render children()}
  </div>
</dialog>

<style>
  /* Bottom sheet on phones, centred modal from sm up. One component, two shapes,
     because a centred box on a phone wastes the screen and fights the thumb. */
  .sheet {
    padding: 0;
    border: 0;
    background: transparent;
    max-width: 100vw;
    max-height: 100dvh;
    width: 100%;
    margin: 0;
    /* pin to the bottom for the sheet shape */
    position: fixed;
    inset: auto 0 0 0;
  }

  .sheet::backdrop {
    background: rgb(0 0 0 / 0.72);
  }

  .panel {
    position: relative;
    background: var(--color-dark, #111111);
    color: var(--color-light, #fcfcfc);
    border-top: 2px solid rgb(255 255 255 / 0.14);
    border-radius: 14px 14px 0 0;
    padding: 2.25rem 1.25rem 1.5rem;
    max-height: 88dvh;
    overflow-y: auto;
    /* room for the grab affordance */
    overscroll-behavior: contain;
  }

  /* grab handle, sheet only */
  .panel::before {
    content: '';
    position: absolute;
    top: 0.6rem;
    left: 50%;
    translate: -50% 0;
    width: 2.5rem;
    height: 0.25rem;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.28);
  }

  .close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: grid;
    place-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    color: inherit;
    background: rgb(255 255 255 / 0.08);
  }

  .close:hover {
    background: rgb(255 255 255 / 0.16);
  }

  .close:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  @media (min-width: 640px) {
    .sheet {
      inset: 0;
      display: grid;
      place-content: center;
      width: 100%;
      height: 100%;
    }

    .panel {
      width: min(64rem, 92vw);
      max-height: 88dvh;
      border: 2px solid rgb(255 255 255 / 0.14);
      border-radius: 4px;
      padding: 2rem;
    }

    .panel::before {
      display: none;
    }
  }

  /* Slide up on phones, fade in on larger screens. Both collapse to nothing
     under reduced motion. */
  @media (prefers-reduced-motion: no-preference) {
    .sheet[open] .panel {
      animation: sheet-in 260ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sheet[open]::backdrop {
      animation: fade-in 200ms ease-out;
    }

    @media (min-width: 640px) {
      .sheet[open] .panel {
        animation: modal-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
      }
    }
  }

  @keyframes sheet-in {
    from {
      translate: 0 100%;
    }
  }

  @keyframes modal-in {
    from {
      opacity: 0;
      scale: 0.98;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }
</style>
