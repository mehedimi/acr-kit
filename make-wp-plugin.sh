#!/bin/bash

# Get the current directory name (plugin folder name)
DIR_NAME=$(basename "$PWD")

# Set output filename
OUTPUT_NAME="${DIR_NAME}.zip"

# Array of files and directories to include
INCLUDE_ITEMS=(
  "assets"
  "dist/assets"
  "includes"
  "vendor"
  "abandoned-cart-recover.php"
  "readme.txt"
  "composer.json"
)

# Check if required items exist
echo "Checking for required files and directories..."
MISSING=()
for item in "${INCLUDE_ITEMS[@]}"; do
  if [ ! -e "$item" ]; then
    MISSING+=("$item")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "⚠ Warning: The following items are missing:"
  printf '  - %s\n' "${MISSING[@]}"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
fi

# Create the zip file with only specified items
echo "Creating WordPress plugin package..."
zip -r "$OUTPUT_NAME" "${INCLUDE_ITEMS[@]}" 2>/dev/null

# Check if zip was successful
if [ $? -eq 0 ]; then
  echo "✓ WordPress plugin package created successfully!"
  echo "  File: $OUTPUT_NAME"
  echo "  Size: $(du -h "$OUTPUT_NAME" | cut -f1)"
  echo ""
  echo "Included items:"
  printf '  ✓ %s\n' "${INCLUDE_ITEMS[@]}"
else
  echo "✗ Error creating plugin package"
  exit 1
fi