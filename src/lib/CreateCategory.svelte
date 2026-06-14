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
    .add {
        display: list-item;
        list-style-type: none;
    }
    .add::before {
        content: "+";
    }
</style>

<button class="item action add" onclick={openCreateDialog}>{t('new-category')}</button>

<dialog bind:this={creationDialog}>
    <form method="dialog" onsubmit={submitCreateForm}>
        <h2>{t('create-category-heading')}</h2>
        <section class="inputsection">
            <div class="labels">
                <label for="name">{t('category-name-label')}</label>
            </div>
            <div class="inputs">
                <input id="name" type="text" bind:value={newCategoryName}>
            </div>
        </section>

        <fieldset class="actions">
            <button class="action" type="submit">{t('create')}</button>
            <button onclick={closeCreateDialog}>{t('cancel')}</button>
        </fieldset>
    </form>
</dialog>
