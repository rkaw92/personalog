<script lang="ts">
    import Categories from '$lib/Categories.svelte';
    import CreateCategory from '$lib/CreateCategory.svelte';
</script>

<style>
    footer {
        margin-top: 2rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--color-border);
        font-size: 0.75rem;
        color: var(--color-text-muted);
        text-align: center;
        line-height: 1.6;
    }

    footer a {
        color: var(--color-text-muted);
        text-decoration: underline;
        text-underline-offset: 2px;
    }
</style>

<main>
    <Categories />
    <CreateCategory />
    <footer>
        Free software released under the
        <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener">AGPLv3</a>
        license. Source code available at
        <a href="https://github.com/rkaw92/personalog" target="_blank" rel="noopener">github.com/rkaw92/personalog</a>.
    </footer>
</main>
