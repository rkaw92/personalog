<script lang="ts">
    import { liveQuery } from 'dexie';
    import { db, type Category } from '../db';
    import { DateTime, type DateTimeFormatOptions } from 'luxon';
    import { t } from '$lib/i18n';

    interface Props {
        category: Category;
    }

    const { category }: Props = $props();

    const historyEntries = liveQuery(
        () =>
            db.entries.where(
                { category: category.id }
            ).toArray()
    );

    const formatOpts: DateTimeFormatOptions = { weekday: 'short', month: 'short', year: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
</script>

<style>
    section.history {
        margin-top: 1.5rem;
    }

    ol {
        list-style: none;
        padding: 0;
        margin: 0;
        border-top: 1px solid var(--color-border);
    }

    .entry-date {
        font-size: 0.875rem;
        color: var(--color-primary);
        font-weight: 500;
    }

    .entry-relative {
        font-size: 0.75rem;
        color: var(--color-text-muted);
        display: block;
        margin-top: 0.0625rem;
    }

    .entry-comment {
        font-size: 0.8125rem;
        color: var(--color-text-muted);
        margin: 0.25rem 0 0;
        font-style: italic;
    }
</style>

<section class="history">
    <h2>{t('history-heading')}</h2>
    <ol>
        {#if $historyEntries}
            {#each $historyEntries.toReversed() as entry}
                <li class="item">
                    <div>
                        <span class="entry-date">{ DateTime.fromJSDate(entry.timestamp).toLocaleString(formatOpts) }</span>
                        <span class="entry-relative">{ DateTime.fromJSDate(entry.timestamp).toRelative() }</span>
                        {#if entry.comment}
                            <p class="entry-comment">{entry.comment}</p>
                        {/if}
                    </div>
                </li>
            {/each}
        {/if}
    </ol>
</section>
