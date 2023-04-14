while ($true) {
    # Run your continuousFetch.mjs script
    node .\continuousFetch.mjs

    # Add, commit, and push the changes to GitHub
    git add .\liveStats.json
    git commit -m "Update liveStats.json"
    git push

    # Wait for a while before running the loop again
    Start-Sleep -Seconds 30
}