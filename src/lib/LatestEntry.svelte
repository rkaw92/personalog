<script lang="ts">
    import { liveQuery } from 'dexie';
    import { db, type Category } from '../db';
    import { DateTime, type DateTimeFormatOptions } from 'luxon';
    import { t } from '$lib/i18n';
    import { fade } from 'svelte/transition';

    interface Props {
        category: Category;
    }

    const { category }: Props = $props();

    const lastEntry = liveQuery(
        () =>
            db.entries.where(
                { category: category.id }
            ).last()
    );

    const formatOpts: DateTimeFormatOptions = { weekday: 'short', month: 'short', year: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
</script>

<style>
    section.latest {
        background-color: var(--color-bg-elevated);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        box-shadow: var(--shadow-sm);
        padding: 1.25rem 1.25rem 1rem;
        margin-bottom: 1rem;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
    }

    .label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        margin: 0 0 0.5rem;
    }

    .relative-time {
        display: block;
        font-size: clamp(1.5rem, 8vw, 2.25rem);
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.1;
        margin-bottom: 0.5rem;
        background: linear-gradient(
            135deg,
            var(--color-secondary) 0%,
            color-mix(in srgb, var(--color-secondary) 55%, white) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .full-date {
        display: block;
        font-size: 0.75rem;
        color: var(--color-text-muted);
        letter-spacing: 0.01em;
    }

    .empty {
        font-size: 0.9375rem;
        color: var(--color-text-muted);
        margin: 0;
    }
</style>

<section class="latest">
    {#if $lastEntry}
        {#key $lastEntry.id}
            <p class="label" in:fade={{ duration: 300 }}>{t('latest-entry-heading')}</p>
            <span class="relative-time" in:fade={{ duration: 500, delay: 60 }}>
                { DateTime.fromJSDate($lastEntry.timestamp).toRelative() }
            </span>
            <span class="full-date" in:fade={{ duration: 300, delay: 180 }}>
                { DateTime.fromJSDate($lastEntry.timestamp).toLocaleString(formatOpts) }
            </span>
        {/key}
    {:else}
        <p class="empty">{t('no-entries')}</p>
    {/if}
</section>
