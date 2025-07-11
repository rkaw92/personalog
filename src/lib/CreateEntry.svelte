<script lang="ts">
    import { db, type Category } from '../db';

    interface Props {
        category: Category;
    }

    const { category }: Props = $props();

    let newComment = $state('');

    let entryDialog: HTMLDialogElement;

    function openEntryDialog() {
        entryDialog!.showModal();
    }

    function closeEntryDialog(event: Event) {
        entryDialog!.close();
        event.preventDefault();
        newComment = '';
    }

    async function submitEntryForm() {
        try {
            const id = await addEntry(category.id, new Date(), newComment);
            console.log('Added new entry %s', id);
            newComment = '';
            
        } catch (err: unknown) {
            window.alert(`Failed to add entry: ${err}`);
        }
    }

    function addEntry(category: number, timestamp: Date, comment: string) {
        return db.entries.add({ category, timestamp, comment });
    }
</script>

<button onclick={openEntryDialog}>Add entry</button>

<dialog bind:this={entryDialog}>
    <form method="dialog" onsubmit={submitEntryForm}>
        <h2>Add log entry</h2>
        <p>In category: <strong>{category.name}</strong></p>
        <section class="inputsection">
            <div class="labels">
                <label for="comment">Comment:</label>
            </div>
            <div class="inputs">
                <input id="comment" type="text" bind:value={newComment} placeholder="(optional)">
            </div>
        </section>
        <fieldset class="actions">
            <button type="submit">Add to log</button>
            <button onclick={closeEntryDialog}>Cancel</button>
        </fieldset>
        
    </form>
</dialog>
