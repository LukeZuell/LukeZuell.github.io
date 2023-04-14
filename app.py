import streamlit as st
import pandas as pd


st.set_page_config(page_title="AFL Data")

st.subheader("AFL Live Data")

liveData = pd.read_json("liveStats.json")
def getPlayerData(teamStatus):   
    rows = []
    for item in liveData[teamStatus]:

        row = [item['player']['player']['player']['playerJumperNumber'],
            item['player']['player']['player']['playerName']['givenName'] + " " + item['player']['player']['player']['playerName']['surname'],
            item['playerStats']['stats']['kicks'],
            item['playerStats']['stats']['handballs'],
            item['playerStats']['stats']['marks'],
            item['playerStats']['stats']['tackles'],
            item['playerStats']['stats']['hitouts'],
            str(item['playerStats']['stats']['freesFor']) + "/" + str(item['playerStats']['stats']['freesAgainst']),
            str(item['playerStats']['stats']['goals']) + "/" + str(item['playerStats']['stats']['behinds']),
            item['playerStats']['stats']['metresGained'],
            item['playerStats']['stats']['contestedPossessions'],
            item['playerStats']['stats']['clearances']['totalClearances'],
            item['playerStats']['stats']['clangers'],
            "{:.2f}".format(round(item['playerStats']['stats']['disposalEfficiency'], 2)),
            "{:.2f}".format(round(item['playerStats']['timeOnGroundPercentage'], 2))]
        #print(round(item['playerStats']['stats']['disposalEfficiency'], 2))
        rows.append(row)
    return rows
# print(headerRow)
# print(rows)
# for col in headerRow:
#     st.write(col, end='\t')
headerRow = ["#", "Player", "Kk", "Hb", "Mk", "Tk", "HO", "FK", "G.B", "MG", "CP", "CL", "Clang", "Disp Eff (%)", "Time On (%)"]
team1 = pd.DataFrame(getPlayerData('homeTeamPlayerStats'), columns=headerRow)
team1 = team1.set_index(['#'])
team2 = pd.DataFrame(getPlayerData('awayTeamPlayerStats'), columns=headerRow)
team2 = team2.set_index(['#'])
st.title('Team 1')
st.table(team1)
st.title('Team 2')
st.table(team2)
#st.write(liveData)