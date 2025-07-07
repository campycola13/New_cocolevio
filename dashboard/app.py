from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import date
from sqlalchemy import create_engine
from datetime import datetime
from flask import request, jsonify
import pickle


with open('model.pkl', 'rb') as f:
    model = pickle.load(f)


app = Flask(__name__)
# Fixed CORS to match your frontend URLs

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}, supports_credentials=True)
engine = create_engine('postgresql://postgres:root@localhost:5432/cocolevio')
query = 'SELECT * FROM "Cocoleviodata"'
df1 = pd.read_sql(query, engine)



@app.route('/api/project-selection', methods=['POST'])
def project_selection():
    global df1
    data = request.get_json()
    selected_project = data.get('project')
    if selected_project:
        df1 = df1[df1['Project name'] == selected_project].copy()
        return '', 204  # or jsonify({"status": "success"})
    else:
        return jsonify({"error": "No project name provided"}), 400


    
df = df1[['Issue key', 'Issue id', 'Issue Type', 'Project name', 'Project lead',
          'Priority', 'Assignee', 'Reporter', 'Due date', 'Description',
          'Original estimate', 'Time Spent', 'Status Category', 'Created',
          'inward_problem', 'outward_problem']].dropna()
dff=df1[['Status Category','Created']]
analytics_df=df1[['Issue id', 'Issue Type' ,'Priority', 'Assignee' , 'Status Category' , 'Original estimate', 'Time Spent' , 'Created' , 'Due date' ]].dropna()

@app.route('/')
def home():
    return 'Flask backend is running.'


@app.route('/api/unique-projects')
def get_unique_projects():
    unique_projects = df['Project name'].dropna().unique().tolist()
    return jsonify(unique_projects)



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

@app.route('/weekly-status')
def get_weekly_status():
    dff['Created'] = pd.to_datetime(dff['Created'])
    dff['Status Category'] = dff['Status Category'].str.strip()
    dff['week'] = dff['Created'].dt.to_period('W').apply(lambda r: r.start_time.strftime('%b %d'))
    grouped = dff.groupby(['week', 'Status Category']).size().unstack(fill_value=0).reset_index()
    total_counts = dff['Status Category'].value_counts().to_dict()
    data_list = [total_counts] + grouped.to_dict(orient='records')
    return jsonify(data_list)


@app.route('/project-data')
def get_project_data():
    try:
        df = analytics_df.copy()
       
        # Keep as datetime for proper timedelta math
        df['Created'] = pd.to_datetime(df['Created'], errors='coerce')
        df['Due date'] = pd.to_datetime(df['Due date'], errors='coerce')

        # Calculate difference in days
        df['days_diff'] = (df['Due date'] - df['Created']).dt.days

        # Today's date
        today = pd.to_datetime(datetime.today().date())
        df['days_since_created'] = (today - df['Created']).dt.days

        # Estimated value
        df['rqd'] = df['Original estimate'] / df['days_diff'].replace(0, 1)  # Avoid division by zero
        df['estimate'] = (df['days_since_created'] * df['rqd'])/60
        df['Time Spent']/=60
        # Rename and finalize columns
        df = df.rename(columns={
            'Issue id': 'id',
            'Issue Type': 'type',
            'Priority': 'priority',
            'Assignee': 'assignee',
            'Status Category': 'status',
            'Time Spent': 'spent',
            'Created': 'created',
            'Due date': 'due'
        })

        # Optional: format created and due as dates only (not timestamps)
        df['created'] = df['created'].dt.date
        df['due'] = df['due'].dt.date

        df = df[['id', 'type', 'priority', 'assignee', 'status', 'estimate', 'spent', 'created', 'due']]

        return jsonify(df.to_dict(orient='records'))

    except Exception as e:
        print(f"Error in /project-data: {e}")
        return jsonify({"error": str(e)}), 500


def calculate_risk_data():
    todays = pd.Timestamp.today()

    risky_data = df1[df1['Status Category'] != 'Done'].copy()

    risky_data['Created'] = pd.to_datetime(risky_data['Created'], errors='coerce')
    risky_data['Due date'] = pd.to_datetime(risky_data['Due date'], errors='coerce')
    risky_data.dropna(subset=['Created', 'Due date', 'Original estimate', 'Time Spent',
                              'Priority', 'Issue Type', 'Status Category'], inplace=True)

    total_pending = len(risky_data)

    risky_data['Status Category Int'] = risky_data['Status Category'].replace({
        'To Do': 1, 'Done': 2, 'In Progress': 3
    })
    risky_data['Issue Type Mapped'] = risky_data['Issue Type'].replace({
        'Task': 1, 'Bug': 2, 'Story': 3, 'Sub-Task': 4, 'Epic': 5, 'Test': 6
    }).astype('Int64')
    risky_data['Priority_mapped'] = risky_data['Priority'].replace({
        'P1': 1, 'P2': 2, 'P3': 3, 'P4': 4, 'Blocker': 0
    }).astype('Int64')

    risky_data['Days Remaining'] = (risky_data['Due date'] - todays).dt.days
    risky_data['working_days'] = risky_data.apply(
        lambda row: np.busday_count(row['Created'].date(), row['Due date'].date())
        if pd.notnull(row['Created']) and pd.notnull(row['Due date']) else 0,
        axis=1
    )

    X = risky_data[['Issue Type Mapped', 'Status Category Int', 'Priority_mapped',
                    'Original estimate', 'Time Spent', 'working_days', 'Days Remaining']].dropna()
    
    risky_data = risky_data.loc[X.index]
    predictions = model.predict(X)
    risky_data['risk_prediction'] = predictions

    risky_only = risky_data[risky_data['risk_prediction'] == 1].copy()

    return risky_only, len(risky_only), total_pending




totalnumberofrisky=0
totalpending = 0

@app.route('/analytic/risk')
def getlistrisk():
    risky_only, _, _ = calculate_risk_data()

    risky_only = risky_only[['Issue id', 'Issue Type', 'Assignee', 'Created', 'Due date']].rename(columns={
        'Issue id': 'id',
        'Issue Type': 'type',
        'Assignee': 'assignee',
        'Created': 'created',
        'Due date': 'due'
    })
    return jsonify(risky_only.dropna().to_dict(orient='records'))





@app.route('/risky_notrisky')
def riskycaluclation():
    _, total_risky, total_pending = calculate_risk_data()
    return jsonify([total_risky, total_pending])


    

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)