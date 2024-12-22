import os
import zipfile
import shutil
from datetime import datetime
import subprocess

# MOVE THIS FILE TO OTHER FOLDER IN ORDER TO USE!
# ===============================================

# Paths
download_folder = "/Users/biton/Downloads"
repo_folder = "/Users/biton/Downloads/likutil-staging"

# Function to find the most recent zip file starting with "sb1-"
def get_latest_zip(folder, prefix):
    files = [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if f.startswith(prefix) and f.endswith(".zip")
    ]
    if not files:
        raise FileNotFoundError(f"No zip files starting with {prefix} found in {folder}")
    latest_file = max(files, key=os.path.getmtime)
    return latest_file

# Function to unzip and replace files
def update_repo(zip_file, target_folder):
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        temp_folder = os.path.join(download_folder, "temp_unzip")
        os.makedirs(temp_folder, exist_ok=True)
        zip_ref.extractall(temp_folder)
        
        # Replace files
        for item in os.listdir(temp_folder):
            s = os.path.join(temp_folder, item)
            d = os.path.join(target_folder, item)
            if os.path.isdir(s):
                if os.path.exists(d):
                    shutil.rmtree(d)
                shutil.copytree(s, d)
            else:
                shutil.copy2(s, d)
        
        # Cleanup
        shutil.rmtree(temp_folder)
        print(f"Repo updated from {zip_file}")

# Function to commit and push changes
def git_push(repo_folder):
    try:
        os.chdir(repo_folder)  # Change to the repo directory
        # Add all changes
        subprocess.run(["git", "add", "."], check=True)
        # Commit with a dynamic message
        commit_message = f"Bolt Sync {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        # Push changes
        subprocess.run(["git", "push"], check=True)
        print(f"Changes pushed to GitHub with commit message: {commit_message}")
    except subprocess.CalledProcessError as e:
        print(f"Git operation failed: {e}")

# Main script with confirmation
if __name__ == "__main__":
    try:
        # Confirmation prompt
        confirmation = input("This will discard all of your local changes. Are you sure? (Type 'yes' to continue): ").strip().lower()
        if confirmation != "yes":
            print("Operation cancelled.")
            exit()

        latest_zip = get_latest_zip(download_folder, "sb1-")
        print(f"Latest zip found: {latest_zip}")
        update_repo(latest_zip, repo_folder)
        git_push(repo_folder)
    except Exception as e:
        print(f"Error: {e}")
