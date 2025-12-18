#!/usr/bin/env php
<?php
/**
 * Ensure CLI-only execution
 */
if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "This script must be run from the command line.\n");
    exit(1);
}


/**
 * Read file contents
 */
$filePath = 'includes/Loader.php';

$content = file_get_contents($filePath);

if ($content === false) {
    fwrite(STDERR, "Failed to read file.\n");
    exit(1);
}

$manifest = json_decode(file_get_contents('dist/.vite/manifest.json'), true);

/**
 * Regex:
 * - Matches: assets/admin.css
 * - Matches: assets/admin-ANYTHING.css
 */
$patterns = [
    '#assets/admin(?:-[^"\'>\s]+)?\.css#',
    '#assets/admin(?:-[^"\'>\s]+)?\.js#',
    '#assets/frontend(?:-[^"\'>\s]+)?\.js#'
];

$replacements = [
    $manifest['src/admin.ts']['css'][0],
    $manifest['src/admin.ts']['file'],
    $manifest['src/frontend.ts']['file'],
];

/**
 * Perform replacement
 */
$newContent = preg_replace($patterns, $replacements, $content, -1, $count);

if ($newContent === null) {
    fwrite(STDERR, "Regex error occurred.\n");
    exit(1);
}

/**
 * Save file
 */
file_put_contents($filePath, $newContent);

echo "Replacement completed. {$count} occurrence(s) updated.\n";
