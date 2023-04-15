import streamlit as st
import pandas as pd
import re


def buildTable(teamStatus):
    team = pd.DataFrame(getPlayerData(teamStatus), columns=headerRow)
    team = team.set_index(['#'])
    return team

def teamName(teamStatus):
    if (teamStatus == "homeTeamPlayerStats"):
        teamID = liveStatData[teamStatus][0]['teamId']
    else:
        teamID = liveStatData[teamStatus][0]['teamId']
    teamName = teamNameDict.get(teamID)
    return teamName

def getPlayerData(teamStatus):   
    rows = []
    for player in liveStatData[teamStatus]:

        row = [player['player']['player']['player']['playerJumperNumber'],
            player['player']['player']['player']['playerName']['givenName'] + " " + player['player']['player']['player']['playerName']['surname'],
            player['playerStats']['stats']['kicks'],
            player['playerStats']['stats']['handballs'],
            player['playerStats']['stats']['marks'],
            player['playerStats']['stats']['tackles'],
            player['playerStats']['stats']['hitouts'],
            player['playerStats']['stats']['freesFor'],
            player['playerStats']['stats']['freesAgainst'],
            player['playerStats']['stats']['goals'],
            player['playerStats']['stats']['behinds'],
            #str(player['playerStats']['stats']['freesFor']) + "/" + str(player['playerStats']['stats']['freesAgainst']),
            #str(player['playerStats']['stats']['goals']) + "/" + str(player['playerStats']['stats']['behinds']),
            player['playerStats']['stats']['metresGained'],
            player['playerStats']['stats']['contestedPossessions'],
            player['playerStats']['stats']['clearances']['totalClearances'],
            player['playerStats']['stats']['clangers'],
            "{:.0f}".format(round(player['playerStats']['stats']['disposalEfficiency'], 0)),
            "{:.0f}".format(round(player['playerStats']['timeOnGroundPercentage'], 0))]
        #st.write(liveStatSC["id"])
        for index, col in liveStatSC.iterrows():
            if col['first_name'] == player['player']['player']['player']['playerName']['givenName'] and col['last_name'] == player['player']['player']['player']['playerName']['surname']:
                row.append(col['player_stats'][0]['livepts'])
                pass
        row.append("{:.0f}".format(round(player['playerStats']['stats']['dreamTeamPoints']), 0))
        rows.append(row)
    return rows


headerRow = ["#", "Player", "Kk", "Hb", "Mk", "Tk", "HO", "FK", "G.B", "MG", "CP", "CL", "Clang", "Disp Eff (%)", "Time On (%)", "SC"]
headerRow = ["#", "Player", "Kk", "Hb", "Mk", "Tk", "HO", "FF", "FA", "G", "B", "MG", "CP", "CL", "Clang", "Disp Eff (%)", "Time On (%)", "SC", "DTP"]
teamNameDict = dict({
    'CD_T10': 'Adelaide Crows',
    'CD_T20': 'Brisbane Lions',
    'CD_T30': 'Carlton',
    'CD_T40': 'Collingwood Magpies',
    'CD_T50': 'Essendon',
    'CD_T60': 'Fremantle',
    'CD_T70': 'Geelong Cats',
    'CD_T80': 'Hawthorn',
    'CD_T90': 'Melbourne',
    'CD_T100': 'North Melbourne',
    'CD_T110': 'Port Adelaide',
    'CD_T120': 'Richmond',
    'CD_T130': 'St Kilda',
    'CD_T140': 'Western Bulldogs',
    'CD_T150': 'West Coast Eagles',
    'CD_T160': 'Sudney Swans',
    'CD_T1000' : 'Gold Coast Suns',
    'CD_T1010': 'GWS Giants'
})

st.set_page_config(page_title="AFL Data", layout='wide')

st.subheader("AFL Live Data")

# collects db to pull
st.caption("Pick a number between 01 and 09 (Respective of the games this week)")
st.caption("FOR NOW INCLUDE THE 0, SO 01 OR 02")
user_input = st.text_input("Pick game number to pull: ")

# creates refresh button
st.caption("Refresh Selected Game Scores")
if st.button('Refresh'):
    #st.cache.clear_cache()
    st.experimental_rerun()

# reads file from specific game number
if user_input is not None and user_input != '':
    liveStatData = pd.read_json(user_input + ".json")
    liveStatSC = pd.read_json("superCoach.json")
    st.title(teamName("homeTeamPlayerStats"))
    st.dataframe(buildTable("homeTeamPlayerStats"))
    st.title(teamName("awayTeamPlayerStats"))
    st.dataframe(buildTable("awayTeamPlayerStats"))
else:
    st.write("Please enter a game number to pull")
