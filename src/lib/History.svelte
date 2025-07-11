<script lang="ts">
    import { liveQuery } from 'dexie';
    import { db, type Category } from '../db';
    import { DateTime, type DateTimeFormatOptions } from 'luxon';

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
    const lastEntry = liveQuery(
        () =>
            db.entries.where(
                { category: category.id }
            ).last()
    );

    const formatOpts: DateTimeFormatOptions = { weekday: 'short', month: 'short', year: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
</script>

<style>
/* empty */
</style>

<section class="history">
    <h2>In order of recency:</h2>
    <ol>
        {#if $historyEntries}
            {#each $historyEntries.toReversed() as entry}
                <li class="small item">
                    { DateTime.fromJSDate(entry.timestamp).toLocaleString(formatOpts) }<br />
                    ({ DateTime.fromJSDate(entry.timestamp).toRelative() })
                    {#if entry.comment}
                        <p>{entry.comment}</p>
                    {/if}
                </li>
            {/each}
        {/if}
    </ol>
</section>
