<script lang="ts">
    import { page } from "$app/state";
    import CreateEntry from "$lib/CreateEntry.svelte";
    import History from "$lib/History.svelte";
    import { liveQuery } from "dexie";
    import { db } from "../../../../db";
    import LatestEntry from '$lib/LatestEntry.svelte';

    const { category: categoryId } = page.params;

    const category = liveQuery(() => db.categories.get(Number(categoryId)));
</script>

<style>
    .top {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }
    .top h1 {
        flex: 4;
    }
    .back {
        text-align: center;
        color: var(--color-primary);
        display: block;
        margin-top: 1em;
        flex: 1;
    }
    .back::before {
        content: '← ';
    }
</style>

<main>
    {#if $category}
        <span class="top">
            <h1>{$category.name}</h1>
            <a class="back button" href="/">Go back</a>
        </span>
        <LatestEntry category={$category} />
        <CreateEntry category={$category} />
        <History category={$category} />
        
    {/if}
</main>
