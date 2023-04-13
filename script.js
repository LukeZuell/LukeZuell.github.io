async function fetchData() {
    try {
        const response = await fetch('/api/fetch-data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



function processData(jsonData, location) {
    try {
        const headerRow = ["#", "Player", "Kk", "Hb", "Mk", "Tk", "HO", "FK", "G.B", "MG", "CP", "CL", "Clang", "Disp Eff"];
        let rows = [];
        if (location == "Home") {
            if (jsonData.homeTeamPlayerStats.length > 0) {
                rows = jsonData.homeTeamPlayerStats.map(item => [
                    item.player.player.player.playerJumperNumber,
                    item.player.player.player.playerName.givenName + " " + item.player.player.player.playerName.surname,
                    item.playerStats.stats.kicks,
                    item.playerStats.stats.handballs,
                    item.playerStats.stats.marks,
                    item.playerStats.stats.tackles,
                    item.playerStats.stats.hitouts,
                    item.playerStats.stats.freesFor + "/" + item.playerStats.stats.freesAgainst,
                    item.playerStats.stats.goals + "/" + item.playerStats.stats.behinds,
                    item.playerStats.stats.metresGained,
                    item.playerStats.stats.contestedPossessions,
                    item.playerStats.stats.clearances.totalClearances,
                    item.playerStats.stats.clangers,
                    item.playerStats.stats.disposalEfficiency,
                    //item.playerStats.player.timeOnGroundPercentage,
                ]);
            }
            else {
                console.log("Test4");
            }
        }
        else    {
            if (jsonData.homeTeamPlayerStats.length > 0) {
                
                rows = jsonData.awayTeamPlayerStats.map(item => [
                    item.player.player.player.playerJumperNumber,
                    item.player.player.player.playerName.givenName + " " + item.player.player.player.playerName.surname,
                    item.playerStats.stats.kicks,
                    item.playerStats.stats.handballs,
                    item.playerStats.stats.marks,
                    item.playerStats.stats.tackles,
                    item.playerStats.stats.hitouts,
                    item.playerStats.stats.freesFor + "/" + item.playerStats.stats.freesAgainst,
                    item.playerStats.stats.goals + "/" + item.playerStats.stats.behinds,
                    item.playerStats.stats.metresGained,
                    item.playerStats.stats.contestedPossessions,
                    item.playerStats.stats.clearances.totalClearances,
                    item.playerStats.stats.clangers,
                    item.playerStats.stats.disposalEfficiency,
                    //item.playerStats.player.timeOnGroundPercentage,
                ]);
            }
            else {
                console.log("Test4");
            }
        }
        return [headerRow, ...rows];
    } catch (error) {
        console.log('Error in processData:', error);
    }
}

function createTable(data) {
    //console.log("sdfsdf")
    const table = document.getElementById("table");
    const headerRow = data[0];
    const rows = data.slice(1);

    const thead = document.createElement("thead");
    const headerRowElem = document.createElement("tr");
    headerRow.forEach(cell => {
        const th = document.createElement("th");
        th.textContent = cell;
        headerRowElem.appendChild(th);
    });
    thead.appendChild(headerRowElem);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    rows.forEach(row => {
        const rowElem = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            rowElem.appendChild(td);
        });
        tbody.appendChild(rowElem);
    });
    table.appendChild(tbody);
}

async function displayData() {
    const data = await fetchData("https://cors-anywhere.herokuapp.com/https://api.afl.com.au/cfs/afl/playerStats/match/CD_M20230140501");
    const processedHomeData = processData(data, "Home");
    const processedAwayData = processData(data, "Away");
    //console.log(processedData);
    createTable(processedHomeData);
    createTable(processedAwayData);
}


window.onload = function () {
    displayData();
};
