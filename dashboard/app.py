from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import date
from sqlalchemy import create_engine

app = Flask(__name__)
# Fixed CORS to match your frontend URLs
CORS(app, supports_credentials=True, origins=[
    "http://127.0.0.1:5173", 
    "http://localhost:5173",
    "http://127.0.0.1:3000", 
    "http://localhost:3000"
])

df1=pd.read_csv('C:\\Users\\uansh\\Downloads\\FINAL_DATA_JIRA_Processed.csv')
df = df1[['Issue key', 'Issue id', 'Issue Type', 'Project name', 'Project lead',
          'Priority', 'Assignee', 'Reporter', 'Due date', 'Description',
          'Original estimate', 'Time Spent', 'Status Category', 'Created',
          'inward_problem', 'outward_problem']].dropna()



@app.route('/')
def home():
    return 'Flask backend is running.'


@app.route('/progress')
def progress():
    try:
        
        
        
        df1=df[['Project name' , 'Status Category']]
        percent_complete=round(len(df[df['Status Category']=='Done'])/len(df)*100,2)
        percent_remaining=100-percent_complete
      
        
        data = {
            "completed": percent_complete,
            "remaining": percent_remaining
        }
        
        print(f"Returning data: {data}")
        return jsonify(data)
        
    except Exception as e:
        print(f"Error in progress route: {str(e)}")
        return jsonify({
            "completed": 0,
            "remaining": 100,
            "error": str(e)
        }), 500
    



@app.route('/api/tasks')
def get_tasks():
    df1 = df[['Issue id','Issue Type', 'Assignee', 'Status Category', 'Priority', 'outward_problem']].copy()
    df1['Assignee'].dropna()
    priority_order = {'Blocker': 0, 'P1': 1, 'P2': 2, 'P3': 3, 'P4': 4}
    df1['priority_num'] = df1['Priority'].map(priority_order).fillna(99)
    
    df_sorted = df1.sort_values(by=['outward_problem', 'priority_num'], ascending=[False, True])
    df_sorted=df_sorted[df_sorted['Status Category']!='Done']
    df_sorted['Priority'].replace({
        'P1': 'High',
    'P2': 'Medium',
    'P3': 'Low',
    'Blocker': 'Critical'
    }, inplace=True)

    df_sorted = df_sorted.rename(columns={
        'Issue id': 'id',
        'Issue Type': 'task',
        'Assignee': 'assignedTo',
        'Status Category': 'status',
        'Priority': 'priority'
    } )
   
    
    return jsonify(df_sorted.drop(['outward_problem', 'priority_num'], axis=1).to_dict(orient='records'))

@app.route('/api/projects', methods=['GET'])
def get_projects():
    unique_projects = df['Project name'].dropna().unique().tolist()
    return jsonify(unique_projects)



@app.route('/test')
def test():
    """Test route to verify backend is working"""
    return jsonify({
        "status": "Backend is working!",
        "timestamp": str(date.today())
    })

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)