<script lang="ts">
    import { liveQuery } from 'dexie';
    import { db } from '../db';
    import { t } from '$lib/i18n';

    let showArchived = $state(false);

    const categories = liveQuery(() => db.categories.toArray());

    async function archiveCategory(id: number) {
        if (!confirm(t('archive-category-confirm'))) return;
        await db.categories.update(id, { archived: true });
    }

    async function unarchiveCategory(id: number) {
        if (!confirm(t('unarchive-category-confirm'))) return;
        await db.categories.update(id, { archived: false });
    }
</script>

<style>
    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }

    li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--color-border);
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    li a.item {
        flex: 1;
        width: auto;
        border-bottom: none;
    }

    .archive-btn, .unarchive-btn {
        flex-shrink: 0;
        width: 1.75rem;
        height: 1.75rem;
        padding: 0;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 0.5rem;
    }

    .archive-btn {
        background: var(--color-bg-subtle);
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
    }

    .unarchive-btn {
        background: rgb(37 99 235 / 0.08);
        color: var(--color-secondary);
        border: 1px solid rgb(37 99 235 / 0.3);
    }

    .archived-list li {
        opacity: 0.55;
    }

    .archived-list li span.item {
        flex: 1;
        width: auto;
        border-bottom: none;
    }

    .show-archived-toggle {
        display: block;
        width: 100%;
        padding: 0.625rem 0.75rem;
        background: none;
        border: none;
        border-top: 1px solid var(--color-border);
        color: var(--color-text-muted);
        font-size: 0.8125rem;
        text-align: left;
        cursor: pointer;
    }
</style>

{#if $categories}
    <ul>
        {#each $categories.filter(c => !c.archived) as category}
            <li>
                <a class="item" href={`/categories/${category.id}/entries`}>{category.name}</a>
                <button class="archive-btn" type="button" onclick={() => archiveCategory(category.id!)}>↓</button>
            </li>
        {/each}
    </ul>

    {#if $categories.some(c => c.archived)}
        <button class="show-archived-toggle" onclick={() => showArchived = !showArchived}>
            {showArchived ? t('hide-archived') : t('show-archived')} ({$categories.filter(c => c.archived).length})
        </button>

        {#if showArchived}
            <ul class="archived-list">
                {#each $categories.filter(c => c.archived) as category}
                    <li>
                        <span class="item">{category.name}</span>
                        <button class="unarchive-btn" type="button" onclick={() => unarchiveCategory(category.id!)}>↑</button>
                    </li>
                {/each}
            </ul>
        {/if}
    {/if}
{/if}
