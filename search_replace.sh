#!/bin/bash

read -p "Enter the absolute path of the search directory: " search_dir

read -p "Enter the search word: " search_word

read -p "Enter the replace word: " replace_word

total_count=$(grep -r -l "$search_word" "$search_dir" | xargs grep -o "$search_word" | wc -l)
echo "Total occurrences of '$search_word' in the directory: $total_count"

read -p "Do you want to replace '$search_word' with '$replace_word'? (Y/N): " confirmation

if [ "$confirmation" = "Y" ] || [ "$confirmation" = "y" ]; then
    # Step 6: Process the operation
    find "$search_dir" -type f -exec sed -i "s/$search_word/$replace_word/g" {} +

    # Step 7: Show the total number of replace words
    replace_count=$(grep -r -o "$replace_word" "$search_dir" | wc -l)
    echo "Total occurrences of '$replace_word' after replacement: $replace_count"
    echo "Operation completed."
elif [ "$confirmation" = "N" ] || [ "$confirmation" = "n" ]; then
    echo "Operation aborted."
else
    echo "Invalid input. Exiting."
fi
