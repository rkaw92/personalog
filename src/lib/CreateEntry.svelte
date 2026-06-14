<script lang="ts">
    import { db, type Category } from '../db';
    import { t } from '$lib/i18n';

    interface Props {
        category: Category;
    }

    const { category }: Props = $props();

    let newComment = $state('');
    let timeOffsetIndex = $state(0);

    // Steps in minutes: from "now" to progressively further back
    const TIME_STEPS = [0, 5, 10, 15, 30, 60, 90, 120, 180, 240, 360, 480, 720, 1440];

    function formatOffset(minutes: number): string {
        if (minutes === 0) return t('time-now');
        if (minutes < 60) return t('time-min-ago', { minutes });
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return m === 0
            ? t('time-h-ago', { hours: h })
            : t('time-h-min-ago', { hours: h, minutes: m });
    }

    let timeLabel = $derived(formatOffset(TIME_STEPS[timeOffsetIndex]));

    let entryDialog: HTMLDialogElement;

    function openEntryDialog() {
        timeOffsetIndex = 0;
        entryDialog!.showModal();
    }

    function closeEntryDialog(event: Event) {
        entryDialog!.close();
        event.preventDefault();
        newComment = '';
        timeOffsetIndex = 0;
    }

    function stepBack() {
        if (timeOffsetIndex < TIME_STEPS.length - 1) timeOffsetIndex++;
    }

    function stepForward() {
        if (timeOffsetIndex > 0) timeOffsetIndex--;
    }

    async function submitEntryForm() {
        try {
            const timestamp = new Date(Date.now() - TIME_STEPS[timeOffsetIndex] * 60 * 1000);
            const id = await addEntry(category.id, timestamp, newComment);
            console.log('Added new entry %s', id);
            newComment = '';
            timeOffsetIndex = 0;

        } catch (err: unknown) {
            window.alert(t('add-entry-failed', { error: String(err) }));
        }
    }

    function addEntry(category: number, timestamp: Date, comment: string) {
        return db.entries.add({ category, timestamp, comment });
    }
</script>

<button onclick={openEntryDialog}>{t('add-entry')}</button>

<dialog bind:this={entryDialog}>
    <form method="dialog" onsubmit={submitEntryForm}>
        <h2>{t('add-entry-heading')}</h2>
        <p>{t('in-category')} <strong>{category.name}</strong></p>
        <section class="inputsection">
            <div class="labels">
                <label for="comment">{t('comment-label')}</label>
            </div>
            <div class="inputs">
                <input id="comment" type="text" bind:value={newComment} placeholder={t('comment-placeholder')}>
            </div>
        </section>
        <div class="timepicker">
            <button type="button" class="timebtn" onclick={stepBack} disabled={timeOffsetIndex >= TIME_STEPS.length - 1}>&larr;</button>
            <span class="timelabel">{timeLabel}</span>
            <button type="button" class="timebtn" onclick={stepForward} disabled={timeOffsetIndex === 0}>&rarr;</button>
        </div>
        <fieldset class="actions">
            <button type="submit">{t('add-to-log')}</button>
            <button onclick={closeEntryDialog}>{t('cancel')}</button>
        </fieldset>

    </form>
</dialog>

<style>
    .timepicker {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
        margin: 0.75em 0;
    }

    .timebtn {
        width: 2.5em;
        flex-shrink: 0;
        font-size: 1.25rem;
        padding: 0.2em;
    }

    .timebtn:disabled {
        opacity: 0.3;
    }

    .timelabel {
        flex: 1;
        text-align: center;
        font-variant-numeric: tabular-nums;
    }
</style>
