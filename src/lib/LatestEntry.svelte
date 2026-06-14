<script lang="ts">
    import { liveQuery } from 'dexie';
    import { db, type Category } from '../db';
    import { DateTime, type DateTimeFormatOptions } from 'luxon';
    import { t } from '$lib/i18n';

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
        border-radius: 10px;
        box-shadow: var(--shadow-sm);
        padding: 1rem 1.25rem;
        margin-bottom: 1.25rem;
        width: 100%;
        box-sizing: border-box;
    }

    section.latest h2 {
        margin-bottom: 0.5rem;
    }

    section.latest p {
        color: var(--color-primary);
        font-size: 0.9375rem;
        line-height: 1.6;
        margin: 0;
    }

    .relative-time {
        color: var(--color-text-muted);
        font-size: 0.8125rem;
        display: block;
        margin-top: 0.125rem;
    }
</style>

<section class="latest">
    <h2>{t('latest-entry-heading')}</h2>
    {#if $lastEntry}
        <p>
            { DateTime.fromJSDate($lastEntry.timestamp).toLocaleString(formatOpts) }
            <span class="relative-time">{ DateTime.fromJSDate($lastEntry.timestamp).toRelative() }</span>
        </p>
    {:else}
        <p>{t('no-entries')}</p>
    {/if}
</section>
