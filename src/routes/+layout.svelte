<script lang="ts">
    import '../fonts.css';
    import '../style.css';
    import { t } from '$lib/i18n';

    const { children } = $props();

    // The static <title> in app.html is the pre-JS shell; localize it once
    // on the client. Importing i18n here also initializes <html lang> and the
    // Luxon locale early.
    $effect(() => {
        document.title = t('app-title');
    });
</script>

{@render children()}
