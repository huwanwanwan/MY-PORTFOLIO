# Data Analytics certificate border cleanup

Output: `public/certificates/data-analytics-essentials-borderless.png`.

The built-in `image_gen.imagegen` edited the black outside border. To protect the certificate's text, signature, QR code, and identifier from generative changes, the original interior was restored byte-for-byte at pixel level using Sharp. Only an eight-pixel outside edge uses the cleaned generated image. The original image is retained.

Final imagegen prompt:

Minimal edge cleanup of the provided certificate. Remove ONLY the thick black rectangular outermost border at the four extreme edges, replacing it with white. Preserve the complete certificate and its aspect ratio. The internal light gray lines and fine gray decorative wave pattern should stay, all text stays precisely the same, all logos, printed recipient Militante Juan Enrico Domanico, title Data Analytics Essentials, completion date 27 Oct 2026, signature, QR code, certificate ID and layout stay unchanged. Do not blur anything, do not crop any content, do not add rounded corners, do not add any dark outline, no shadow. White outer edges, otherwise exact same certificate.
