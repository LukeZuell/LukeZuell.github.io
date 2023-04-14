import streamlit as st
import pandas as pd


st.set_page_config(page_title="AFL Data")

st.subheader("AFL Live Data")

liveData = pd.read_json("liveData.json")
print(liveData)
#st.write(liveData)