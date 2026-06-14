app-title = persona/log — osobisty rejestr zdarzeń

# Category list + creation (CreateCategory.svelte)
new-category = Nowa kategoria
create-category-heading = Utwórz nową kategorię:
category-name-label = Nazwa:
create = Utwórz
cancel = Anuluj
category-name-empty = Nazwa kategorii nie może być pusta
create-category-failed = Nie udało się utworzyć kategorii: { $error }

# Entries route (routes/categories/[category]/entries/+page.svelte)
go-back = Wstecz

# LatestEntry.svelte
latest-entry-heading = Ostatni wpis
no-entries = (brak wpisów)

# Categories.svelte
archive-category-confirm = Zarchiwizować tę kategorię?
unarchive-category-confirm = Przywrócić tę kategorię?
show-archived = Pokaż zarchiwizowane
hide-archived = Ukryj zarchiwizowane

# History.svelte
history-heading = Od najnowszych:
remove-entry-confirm = Usunąć ten wpis?

# CreateEntry.svelte
add-entry = Dodaj wpis
add-entry-heading = Dodaj wpis do dziennika
in-category = W kategorii:
comment-label = Komentarz:
comment-placeholder = (opcjonalnie)
add-to-log = Zapisz
add-entry-failed = Nie udało się dodać wpisu: { $error }

# CreateEntry relative-time picker labels
time-now = teraz
time-min-ago = { $minutes } min temu
time-h-ago = { $hours } godz. temu
time-h-min-ago = { $hours } godz. { $minutes } min temu
