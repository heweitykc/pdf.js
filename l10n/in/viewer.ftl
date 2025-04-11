## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Halaman Sebelumnya
pdfjs-previous-button-label = Sebelumnya
pdfjs-next-button =
    .title = Halaman Berikutnya
pdfjs-next-button-label = Berikutnya
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Halaman
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = dari { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } dari { $pagesCount })
pdfjs-zoom-out-button =
    .title = Perkecil
pdfjs-zoom-out-button-label = Perkecil
pdfjs-zoom-in-button =
    .title = Perbesar  
pdfjs-zoom-in-button-label = Perbesar
pdfjs-zoom-select =
    .title = Zoom
pdfjs-presentation-mode-button =
    .title = Mode Presentasi
pdfjs-presentation-mode-button-label = Mode Presentasi
pdfjs-open-file-button =
    .title = Buka File
pdfjs-open-file-button-label = Buka
pdfjs-print-button =
    .title = Cetak
pdfjs-print-button-label = Cetak
pdfjs-save-button =
    .title = Simpan
pdfjs-save-button-label = Simpan
# Used in Firefox for Android as a tooltip for the download button ("download" is a verb).
pdfjs-download-button =
    .title = Unduh
# Used in Firefox for Android as a label for the download button ("download" is a verb).
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = Unduh
pdfjs-bookmark-button =
    .title = Halaman Ini (Lihat URL Halaman Ini)
pdfjs-bookmark-button-label = Halaman Ini

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Alat
pdfjs-tools-button-label = Alat
pdfjs-first-page-button =
    .title = Ke Halaman Pertama
pdfjs-first-page-button-label = Ke Halaman Pertama
pdfjs-last-page-button =
    .title = Ke Halaman Terakhir
pdfjs-last-page-button-label = Ke Halaman Terakhir
pdfjs-page-rotate-cw-button =
    .title = Putar Searah Jarum Jam
pdfjs-page-rotate-cw-button-label = Putar Searah Jarum Jam
pdfjs-page-rotate-ccw-button =
    .title = Putar Berlawanan Arah Jarum Jam
pdfjs-page-rotate-ccw-button-label = Putar Berlawanan Arah Jarum Jam
pdfjs-cursor-text-select-tool-button =
    .title = Aktifkan Alat Pilih Teks
pdfjs-cursor-text-select-tool-button-label = Alat Pilih Teks
pdfjs-cursor-hand-tool-button =
    .title = Aktifkan Alat Tangan
pdfjs-cursor-hand-tool-button-label = Alat Tangan
pdfjs-scroll-page-button =
    .title = Gunakan Gulir Halaman
pdfjs-scroll-page-button-label = Gulir Halaman
pdfjs-scroll-vertical-button =
    .title = Gunakan Gulir Vertikal
pdfjs-scroll-vertical-button-label = Gulir Vertikal
pdfjs-scroll-horizontal-button =
    .title = Gunakan Gulir Horizontal
pdfjs-scroll-horizontal-button-label = Gulir Horizontal
pdfjs-scroll-wrapped-button =
    .title = Gunakan Gulir Terbungkus
pdfjs-scroll-wrapped-button-label = Gulir Terbungkus
pdfjs-spread-none-button =
    .title = Jangan gabungkan halaman
pdfjs-spread-none-button-label = Tampilan Tunggal
pdfjs-spread-odd-button =
    .title = Gabungkan halaman mulai dari halaman ganjil
pdfjs-spread-odd-button-label = Tampilan Ganda
pdfjs-spread-even-button =
    .title = Gabungkan halaman mulai dari halaman genap
pdfjs-spread-even-button-label = Tampilan Buku

## Document properties dialog

pdfjs-document-properties-button =
    .title = Properti Dokumen…
pdfjs-document-properties-button-label = Properti Dokumen
pdfjs-document-properties-file-name = Nama file:
pdfjs-document-properties-file-size = Ukuran file:
# Variables:
#   $kb (Number) - the PDF file size in kilobytes
#   $b (Number) - the PDF file size in bytes
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } byte)
# Variables:
#   $mb (Number) - the PDF file size in megabytes
#   $b (Number) - the PDF file size in bytes
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } byte)
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } byte)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } byte)
pdfjs-document-properties-title = Judul:
pdfjs-document-properties-author = Penulis:
pdfjs-document-properties-subject = Subjek:
pdfjs-document-properties-keywords = Kata kunci:
pdfjs-document-properties-creation-date = Tanggal dibuat:
pdfjs-document-properties-modification-date = Tanggal diubah:
# Variables:
#   $dateObj (Date) - the creation/modification date and time of the PDF file
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Pembuat:
pdfjs-document-properties-producer = Pembuat PDF:
pdfjs-document-properties-version = Versi PDF:
pdfjs-document-properties-page-count = Jumlah halaman:
pdfjs-document-properties-page-size = Ukuran halaman:
pdfjs-document-properties-page-size-unit-inches = inci
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = potret
pdfjs-document-properties-page-size-orientation-landscape = lanskap
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Letter
pdfjs-document-properties-page-size-name-legal = Legal

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

# The linearization status of the document; usually called "Fast Web View" in
# English locales of Adobe software.
pdfjs-document-properties-linearized = Tampilan Web Cepat:
pdfjs-document-properties-linearized-yes = Ya
pdfjs-document-properties-linearized-no = Tidak
pdfjs-document-properties-close-button = Tutup

## Print

pdfjs-print-progress-message = Menyiapkan dokumen untuk dicetak…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Batal
pdfjs-printing-not-supported = Peringatan: Browser ini belum sepenuhnya mendukung pencetakan.
pdfjs-printing-not-ready = Peringatan: PDF belum dimuat sepenuhnya untuk dicetak.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Tampilkan/Sembunyikan Panel Samping
pdfjs-toggle-sidebar-notification-button =
    .title = Tampilkan/Sembunyikan Panel Samping (dokumen berisi outline/lampiran/layer)
pdfjs-toggle-sidebar-button-label = Panel Samping
pdfjs-document-outline-button =
    .title = Tampilkan Outline Dokumen (klik dua kali untuk membuka/menutup semua item)
pdfjs-document-outline-button-label = Outline Dokumen
pdfjs-attachments-button =
    .title = Tampilkan Lampiran
pdfjs-attachments-button-label = Lampiran
pdfjs-layers-button =
    .title = Tampilkan Layer (klik dua kali untuk mengatur ulang semua layer ke keadaan default)
pdfjs-layers-button-label = Layer
pdfjs-thumbs-button =
    .title = Tampilkan Thumbnail
pdfjs-thumbs-button-label = Thumbnail
pdfjs-current-outline-item-button =
    .title = Temukan Item Outline Saat Ini
pdfjs-current-outline-item-button-label = Item Outline Saat Ini
pdfjs-findbar-button =
    .title = Cari dalam Dokumen
pdfjs-findbar-button-label = Cari
pdfjs-additional-layers = Layer Tambahan

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Halaman { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Thumbnail Halaman { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Cari
    .placeholder = Cari dalam dokumen...
pdfjs-find-previous-button =
    .title = Temukan kata sebelumnya
pdfjs-find-previous-button-label = Sebelumnya
pdfjs-find-next-button =
    .title = Temukan kata berikutnya
pdfjs-find-next-button-label = Berikutnya
pdfjs-find-highlight-checkbox = Sorot semua
pdfjs-find-match-case-checkbox-label = Cocokkan huruf besar/kecil
pdfjs-find-match-diacritics-checkbox-label = Cocokkan diakritik
pdfjs-find-entire-word-checkbox-label = Kata utuh
pdfjs-find-reached-top = Mencapai awal dokumen, dilanjutkan dari bawah
pdfjs-find-reached-bottom = Mencapai akhir dokumen, dilanjutkan dari atas
# Variables:
#   $current (Number) - the index of the currently active find result
#   $total (Number) - the total number of matches in the document
pdfjs-find-match-count = { $current } dari { $total } yang cocok
# Variables:
#   $limit (Number) - the maximum number of matches
pdfjs-find-match-count-limit = Lebih dari { $limit } kecocokan
pdfjs-find-not-found = Frasa tidak ditemukan

## Predefined zoom values

pdfjs-page-scale-width = Lebar Halaman
pdfjs-page-scale-fit = Pas Halaman
pdfjs-page-scale-auto = Zoom Otomatis
pdfjs-page-scale-actual = Ukuran Sebenarnya
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page

# Variables:
#   $page (Number) - the page number
pdfjs-page-landmark =
    .aria-label = Halaman { $page }

## Loading indicator messages

pdfjs-loading-error = Terjadi kesalahan saat memuat PDF.
pdfjs-invalid-file-error = File PDF tidak valid atau rusak.
pdfjs-missing-file-error = File PDF tidak ada.
pdfjs-unexpected-response-error = Respons server tidak terduga.
pdfjs-rendering-error = Terjadi kesalahan saat merender halaman.

## Annotations

# Variables:
#   $date (Date) - the modification date of the annotation
#   $time (Time) - the modification time of the annotation
pdfjs-annotation-date-string = { $date }, { $time }
# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [Anotasi { $type }]
# Variables:
#   $dateObj (Date) - the modification date and time of the annotation
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }

## Password

pdfjs-password-label = Masukkan kata sandi untuk membuka file PDF ini.
pdfjs-password-invalid = Kata sandi salah. Silakan coba lagi.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Batal
pdfjs-web-fonts-disabled = Font web dinonaktifkan: tidak dapat menggunakan font PDF yang tertanam.

## Editing

pdfjs-edit-button-label = Edit
pdfjs-editor-undo-button-label = Batalkan
pdfjs-editor-redo-button-label = Ulangi
pdfjs-editor-insert-button-label = Sisipkan

pdfjs-editor-free-text-button =
    .title = Teks
pdfjs-editor-free-text-button-label = Teks
pdfjs-editor-ink-button =
    .title = Gambar
pdfjs-editor-ink-button-label = Gambar
pdfjs-editor-stamp-button =
    .title = Tambah atau edit gambar
pdfjs-editor-stamp-button-label = Tambah atau edit gambar
pdfjs-editor-highlight-button =
    .title = Sorot
pdfjs-editor-highlight-button-label = Sorot
pdfjs-highlight-floating-button1 =
    .title = Sorot
    .aria-label = Sorot
pdfjs-highlight-floating-button-label = Sorot

## Remove button for the various kind of editor.

pdfjs-editor-remove-ink-button =
    .title = Hapus gambar
pdfjs-editor-remove-freetext-button =
    .title = Hapus teks
pdfjs-editor-remove-stamp-button =
    .title = Hapus gambar
pdfjs-editor-remove-highlight-button =
    .title = Hapus sorotan

##

# Editor Parameters
pdfjs-editor-free-text-color-input = Warna
pdfjs-editor-free-text-size-input = Ukuran
pdfjs-editor-ink-color-input = Warna
pdfjs-editor-ink-thickness-input = Ketebalan
pdfjs-editor-ink-opacity-input = Transparansi
pdfjs-editor-stamp-add-image-button =
    .title = Tambah gambar
pdfjs-editor-stamp-add-image-button-label = Tambah gambar
# This refers to the thickness of the line used for free highlighting (not bound to text)
pdfjs-editor-free-highlight-thickness-input = Ketebalan
pdfjs-editor-free-highlight-thickness-title =
    .title = Ubah ketebalan saat menyorot item selain teks
# .default-content is used as a placeholder in an empty text editor.
pdfjs-free-text2 =
    .aria-label = Editor Teks
    .default-content = Mulai mengetik…
pdfjs-free-text =
    .aria-label = Editor Teks
pdfjs-free-text-default-content = Mulai mengetik…
pdfjs-ink =
    .aria-label = Editor Gambar
pdfjs-ink-canvas =
    .aria-label = Gambar buatan pengguna

## Alt-text dialog

pdfjs-editor-alt-text-button-label = Teks alternatif
pdfjs-editor-alt-text-edit-button =
    .aria-label = Edit teks alternatif
pdfjs-editor-alt-text-edit-button-label = Edit teks alternatif
pdfjs-editor-alt-text-dialog-label = Pilih opsi
pdfjs-editor-alt-text-dialog-description = Teks alternatif membantu saat gambar tidak dapat dilihat atau dimuat.
pdfjs-editor-alt-text-add-description-label = Tambah deskripsi
pdfjs-editor-alt-text-add-description-description = Tulis 1-2 kalimat yang menjelaskan subjek, suasana, atau tindakan.
pdfjs-editor-alt-text-mark-decorative-label = Tandai sebagai dekoratif
pdfjs-editor-alt-text-mark-decorative-description = Ini digunakan untuk gambar hias, seperti bingkai atau watermark.
pdfjs-editor-alt-text-cancel-button = Batal
pdfjs-editor-alt-text-save-button = Simpan
pdfjs-editor-alt-text-decorative-tooltip = Ditandai sebagai dekoratif
# .placeholder: This is a placeholder for the alt text input area
pdfjs-editor-alt-text-textarea =
    .placeholder = Contoh: Seorang pemuda duduk di meja makan bersiap untuk makan
# Alternative text (alt text) helps when people can't see the image.
pdfjs-editor-alt-text-button =
    .aria-label = Teks alternatif

## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

pdfjs-editor-resizer-label-top-left = Ubah ukuran - Pojok kiri atas
pdfjs-editor-resizer-label-top-middle = Ubah ukuran - Tengah atas
pdfjs-editor-resizer-label-top-right = Ubah ukuran - Pojok kanan atas
pdfjs-editor-resizer-label-middle-right = Ubah ukuran - Tengah kanan
pdfjs-editor-resizer-label-bottom-right = Ubah ukuran - Pojok kanan bawah
pdfjs-editor-resizer-label-bottom-middle = Ubah ukuran - Tengah bawah
pdfjs-editor-resizer-label-bottom-left = Ubah ukuran - Pojok kiri bawah
pdfjs-editor-resizer-label-middle-left = Ubah ukuran - Tengah kiri
pdfjs-editor-resizer-top-left =
    .aria-label = Ubah ukuran - Pojok kiri atas
pdfjs-editor-resizer-top-middle =
    .aria-label = Ubah ukuran - Tengah atas
pdfjs-editor-resizer-top-right =
    .aria-label = Ubah ukuran - Pojok kanan atas
pdfjs-editor-resizer-middle-right =
    .aria-label = Ubah ukuran - Tengah kanan
pdfjs-editor-resizer-bottom-right =
    .aria-label = Ubah ukuran - Pojok kanan bawah
pdfjs-editor-resizer-bottom-middle =
    .aria-label = Ubah ukuran - Tengah bawah
pdfjs-editor-resizer-bottom-left =
    .aria-label = Ubah ukuran - Pojok kiri bawah
pdfjs-editor-resizer-middle-left =
    .aria-label = Ubah ukuran - Tengah kiri

## Color picker

# This means "Color used to highlight text"
pdfjs-editor-highlight-colorpicker-label = Warna sorot
pdfjs-editor-colorpicker-button =
    .title = Ubah warna
pdfjs-editor-colorpicker-dropdown =
    .aria-label = Pilihan warna
pdfjs-editor-colorpicker-yellow =
    .title = Kuning
pdfjs-editor-colorpicker-green =
    .title = Hijau
pdfjs-editor-colorpicker-blue =
    .title = Biru
pdfjs-editor-colorpicker-pink =
    .title = Merah muda
pdfjs-editor-colorpicker-red =
    .title = Merah

## Show all highlights
## This is a toggle button to show/hide all the highlights.

pdfjs-editor-highlight-show-all-button-label = Tampilkan semua
pdfjs-editor-highlight-show-all-button =
    .title = Tampilkan semua

## New alt-text dialog
## Group note for entire feature: Alternative text (alt text) helps when people can't see the image. This feature includes a tool to create alt text automatically using an AI model that works locally on the user's device to preserve privacy.

# Modal header positioned above a text box where users can edit the alt text.
pdfjs-editor-new-alt-text-dialog-edit-label = Edit teks alternatif (deskripsi gambar)
# Modal header positioned above a text box where users can add the alt text.
pdfjs-editor-new-alt-text-dialog-add-label = Tambah teks alternatif (deskripsi gambar)
pdfjs-editor-new-alt-text-textarea =
    .placeholder = Tulis deskripsi di sini...
# This text refers to the alt text box above this description. It offers a definition of alt text.
pdfjs-editor-new-alt-text-description = Deskripsi singkat untuk pengguna yang tidak dapat melihat atau memuat gambar.
# This is a required legal disclaimer that refers to the automatically created text inside the alt text box above this text. It disappears if the text is edited by a human.
pdfjs-editor-new-alt-text-disclaimer1 = Teks alternatif ini dibuat secara otomatis dan mungkin tidak akurat.
pdfjs-editor-new-alt-text-disclaimer-learn-more-url = Pelajari lebih lanjut
pdfjs-editor-new-alt-text-create-automatically-button-label = Buat teks alternatif otomatis
pdfjs-editor-new-alt-text-not-now-button = Nanti saja
pdfjs-editor-new-alt-text-error-title = Tidak dapat membuat teks alternatif otomatis
pdfjs-editor-new-alt-text-error-description = Silakan tulis teks alternatif sendiri atau coba lagi nanti.
pdfjs-editor-new-alt-text-error-close-button = Tutup
# Variables:
#   $totalSize (Number) - the total size (in MB) of the AI model.
#   $downloadedSize (Number) - the downloaded size (in MB) of the AI model.
#   $percent (Number) - the percentage of the downloaded size.
pdfjs-editor-new-alt-text-ai-model-downloading-progress = Mengunduh model AI untuk teks alternatif ({ $downloadedSize }/{ $totalSize } MB)
    .aria-valuetext = Mengunduh model AI untuk teks alternatif ({ $downloadedSize }/{ $totalSize } MB)
# This is a button that users can click to edit the alt text they have already added.
pdfjs-editor-new-alt-text-added-button =
    .aria-label = Teks alternatif sudah ditambahkan
pdfjs-editor-new-alt-text-added-button-label = Teks alternatif sudah ditambahkan
# This is a button that users can click to open the alt text editor and add alt text when it is not present.
pdfjs-editor-new-alt-text-missing-button =
    .aria-label = Teks alternatif belum ada
pdfjs-editor-new-alt-text-missing-button-label = Teks alternatif belum ada
# This is a button that opens up the alt text modal where users should review the alt text that was automatically generated.
pdfjs-editor-new-alt-text-to-review-button =
    .aria-label = Periksa teks alternatif
pdfjs-editor-new-alt-text-to-review-button-label = Periksa teks alternatif
# "Created automatically" is a prefix that will be added to the beginning of any alt text that has been automatically generated. After the colon, the user will see/hear the actual alt text description. If the alt text has been edited by a human, this prefix will not appear.
# Variables:
#   $generatedAltText (String) - the generated alt-text.
pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer = [Dibuat otomatis] { $generatedAltText }

## Image alt-text settings

pdfjs-image-alt-text-settings-button =
    .title = Pengaturan Teks Alternatif Gambar
pdfjs-image-alt-text-settings-button-label = Pengaturan Teks Alternatif Gambar
pdfjs-editor-alt-text-settings-dialog-label = Pengaturan Teks Alternatif Gambar
pdfjs-editor-alt-text-settings-automatic-title = Buat Teks Alternatif Otomatis
pdfjs-editor-alt-text-settings-create-model-button-label = Buat Teks Alternatif Otomatis
pdfjs-editor-alt-text-settings-create-model-description = Bantu pengguna yang tidak dapat melihat atau memuat gambar.
# Variables:
#   $totalSize (Number) - the total size (in MB) of the AI model.
pdfjs-editor-alt-text-settings-download-model-label = Model AI untuk teks alternatif ({ $totalSize } MB)
pdfjs-editor-alt-text-settings-ai-model-description = Berjalan secara lokal di perangkat Anda untuk menjaga privasi data. Diperlukan untuk membuat teks alternatif otomatis.
pdfjs-editor-alt-text-settings-delete-model-button = Hapus
pdfjs-editor-alt-text-settings-download-model-button = Unduh
pdfjs-editor-alt-text-settings-downloading-model-button = Mengunduh…
pdfjs-editor-alt-text-settings-editor-title = Editor Teks Alternatif
pdfjs-editor-alt-text-settings-show-dialog-button-label = Tampilkan editor teks alternatif setelah menambah gambar
pdfjs-editor-alt-text-settings-show-dialog-description = Bantu memastikan semua gambar memiliki teks alternatif.
pdfjs-editor-alt-text-settings-close-button = Tutup

## "Annotations removed" bar

pdfjs-editor-undo-bar-message-highlight = Sorotan dihapus
pdfjs-editor-undo-bar-message-freetext = Teks dihapus
pdfjs-editor-undo-bar-message-ink = Gambar dihapus
pdfjs-editor-undo-bar-message-stamp = Gambar dihapus
# Variables:
#   $count (Number) - the number of removed annotations.
pdfjs-editor-undo-bar-message-multiple = { $count } anotasi dihapus
pdfjs-editor-undo-bar-undo-button =
    .title = Batalkan
pdfjs-editor-undo-bar-undo-button-label = Batalkan
pdfjs-editor-undo-bar-close-button =
    .title = Tutup
pdfjs-editor-undo-bar-close-button-label = Tutup
pdfjs-share-pdf-button-label = Bagikan
pdfjs-more-button-label = Lainnya