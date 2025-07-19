<script lang="ts">
    import { liveQuery } from 'dexie';
    import { db, type Category } from '../db';
    import { DateTime, type DateTimeFormatOptions } from 'luxon';

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
        display: block;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 1em;
        box-sizing: border-box;
        padding: 0.5em;
        border: 1px dashed var(--color-secondary);
        color: var(--color-secondary);
        text-align: center;
    }
</style>

<section class="latest">
    <h2>Latest entry</h2>
        {#if $lastEntry}
        <p>
            { DateTime.fromJSDate($lastEntry.timestamp).toLocaleString(formatOpts) }<br />
            ({ DateTime.fromJSDate($lastEntry.timestamp).toRelative() })
        </p>
        {:else}
        <p>(no entries)</p>
        {/if}
</section>
