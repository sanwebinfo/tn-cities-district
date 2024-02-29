import json

def remove_duplicates_from_json_file(json_file_path):
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    
    unique_districts = {}
    for district_data in data.values():
        district_name = district_data['district']
        if district_name.lower() not in unique_districts:
            unique_districts[district_name.lower()] = district_data
    
    with open(json_file_path, 'w') as file:
        json.dump(unique_districts, file, indent=2)

json_file_path = 'districts.json'
remove_duplicates_from_json_file(json_file_path)