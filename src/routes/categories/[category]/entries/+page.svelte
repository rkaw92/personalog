<script lang="ts">
    import { page } from "$app/state";
    import CreateEntry from "$lib/CreateEntry.svelte";
    import History from "$lib/History.svelte";
    import { liveQuery } from "dexie";
    import { db } from "../../../../db";
    import LatestEntry from '$lib/LatestEntry.svelte';
    import { t } from '$lib/i18n';

    const { category: categoryId } = page.params;

    const category = liveQuery(() => db.categories.get(Number(categoryId)));
</script>

<style>
    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.25rem;
    }
    .top h1 {
        flex: 1;
        margin: 0;
    }
    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-muted);
        text-decoration: none;
        flex-shrink: 0;
        transition: color 120ms ease;
    }
    .back-link::before {
        content: '←';
        font-size: 1rem;
    }
    .back-link:hover {
        color: var(--color-secondary);
    }
</style>

<main>
    {#if $category}
        <span class="top">
            <h1>{$category.name}</h1>
            <a class="back-link" href="/">{t('go-back')}</a>
        </span>
        <LatestEntry category={$category} />
        <CreateEntry category={$category} />
        <History category={$category} />
        
    {/if}
</main>
