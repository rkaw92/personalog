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

<style>
    .field {
        display: flex;
        flex-direction: column;
        gap: 0.3125rem;
        margin-bottom: 1rem;
    }

    .timepicker {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        margin: 0.75rem 0;
        padding: 0.5rem 0.75rem;
        background-color: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }

    .timelabel {
        flex: 1;
        text-align: center;
        font-size: 0.9375rem;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
    }
</style>

<button class="btn-primary btn-trigger" onclick={openEntryDialog}>{t('add-entry')}</button>

<dialog bind:this={entryDialog}>
    <form method="dialog" onsubmit={submitEntryForm}>
        <h2>{t('add-entry-heading')}</h2>
        <p>{t('in-category')} <strong>{category.name}</strong></p>
        <div class="field">
            <label for="comment">{t('comment-label')}</label>
            <input id="comment" type="text" bind:value={newComment} placeholder={t('comment-placeholder')}>
        </div>
        <div class="timepicker">
            <button type="button" class="btn-icon" onclick={stepBack} disabled={timeOffsetIndex >= TIME_STEPS.length - 1}>&larr;</button>
            <span class="timelabel">{timeLabel}</span>
            <button type="button" class="btn-icon" onclick={stepForward} disabled={timeOffsetIndex === 0}>&rarr;</button>
        </div>
        <fieldset class="actions">
            <button class="btn-primary" type="submit">{t('add-to-log')}</button>
            <button class="btn-secondary" onclick={closeEntryDialog}>{t('cancel')}</button>
        </fieldset>
    </form>
</dialog>
