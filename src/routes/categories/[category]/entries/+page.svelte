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
    .back {
        text-align: center;
        color: var(--color-primary);
        display: block;
        width: 100%;
        margin-top: 1em;
    }
    .back::before {
        content: '← ';
    }
</style>

<main>
    {#if $category}
        <h1>{$category.name}</h1>
        <LatestEntry category={$category} />
        <a class="back button" href="/">Go back</a>
        <History category={$category} />
        <CreateEntry category={$category} />
    {/if}
</main>
