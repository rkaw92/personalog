<script lang="ts">
    import { db } from '../db';
    import { t } from '$lib/i18n';

    let newCategoryName = $state('');

    let creationDialog: HTMLDialogElement;

    function openCreateDialog() {
        creationDialog!.showModal();
    }

    function closeCreateDialog(event: Event) {
        creationDialog!.close();
        event.preventDefault();
        newCategoryName = '';
    }

    async function submitCreateForm() {
        try {
            if (!newCategoryName) {
                throw new Error(t('category-name-empty'));
            }
            const id = await createCategory(newCategoryName);
            console.log('Added new category %s', id);
            newCategoryName = '';

        } catch (err: unknown) {
            window.alert(t('create-category-failed', { error: String(err) }));
        }
    }

    function createCategory(name: string) {
        return db.categories.add({ name });
    }
</script>

<style>
    .field {
        display: flex;
        flex-direction: column;
        gap: 0.3125rem;
        margin-bottom: 1rem;
    }
</style>

<button class="btn-primary btn-trigger" onclick={openCreateDialog}>+ {t('new-category')}</button>

<dialog bind:this={creationDialog}>
    <form method="dialog" onsubmit={submitCreateForm}>
        <h2>{t('create-category-heading')}</h2>
        <div class="field">
            <label for="name">{t('category-name-label')}</label>
            <input id="name" type="text" bind:value={newCategoryName} autocomplete="off">
        </div>
        <fieldset class="actions">
            <button class="btn-primary" type="submit">{t('create')}</button>
            <button class="btn-secondary" onclick={closeCreateDialog}>{t('cancel')}</button>
        </fieldset>
    </form>
</dialog>
