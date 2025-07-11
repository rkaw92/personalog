<script lang="ts">
    import { liveQuery } from 'dexie';
    import { db } from '../db';

    let categories = liveQuery(
        () => db.categories.toArray()
    );
</script>

<style>
    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }

    li {
        display: block;
    }
</style>

<ul>
    {#if $categories}
        {#each $categories as category}
            <li><a class="item" href={`/categories/${category.id}/entries`}>{category.name}</a></li>
        {/each}
    {/if}
</ul>
