<script lang="ts">
    import { db } from '../db';

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
                throw new Error('Category name cannot be empty');
            }
            const id = await createCategory(newCategoryName);
            console.log('Added new category %s', id);
            newCategoryName = '';
            
        } catch (err: unknown) {
            window.alert(`Failed to create category: ${err}`);
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

<button class="item action add" onclick={openCreateDialog}>New category</button>

<dialog bind:this={creationDialog}>
    <form method="dialog" onsubmit={submitCreateForm}>
        <h2>Create a new category:</h2>
        <section class="inputsection">
            <div class="labels">
                <label for="name">Name:</label>
            </div>
            <div class="inputs">
                <input id="name" type="text" bind:value={newCategoryName}>
            </div>
        </section>
        
        <fieldset class="actions">
            <button class="action" type="submit">Create</button>
            <button onclick={closeCreateDialog}>Cancel</button>
        </fieldset>
    </form>
</dialog>
