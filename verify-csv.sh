#!/bin/bash
# verify-csv.sh - Verify the CSV file integrity

CSV_FILE="github-issues-import.csv"

echo "========================================"
echo "GitHub Issues CSV Verification"
echo "========================================"
echo ""

# Check file exists
if [ ! -f "$CSV_FILE" ]; then
    echo "❌ ERROR: $CSV_FILE not found!"
    exit 1
fi

echo "✓ CSV file exists: $CSV_FILE"
echo ""

# Count total lines
total_lines=$(wc -l < "$CSV_FILE")
echo "Total lines in file: $total_lines"

# Count issues (lines starting with issue numbers)
issue_count=$(grep -c '^"[0-9]' "$CSV_FILE")
echo "Total issues found: $issue_count"
echo ""

if [ "$issue_count" -eq 148 ]; then
    echo "✓ Correct number of issues (148)"
else
    echo "❌ Expected 148 issues, found $issue_count"
fi

echo ""

# Count by phase
echo "Issues by Phase:"
echo "----------------"
for phase in {1..24}; do
    count=$(grep -c "^\"$phase\." "$CSV_FILE")
    if [ $count -gt 0 ]; then
        printf "Phase %2d: %2d issues\n" $phase $count
    fi
done

echo ""

# File size
file_size=$(ls -lh "$CSV_FILE" | awk '{print $5}')
echo "File size: $file_size"

echo ""

# Sample first issue
echo "Sample (first issue title):"
echo "----------------------------"
head -n 2 "$CSV_FILE" | tail -n 1 | cut -d',' -f1

echo ""
echo "========================================"
echo "Verification complete!"
echo "========================================"
