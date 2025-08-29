import os

# List of folder and file names to ignore
IGNORE_NAMES = {
    '__pycache__', '.git', '.venv', 'venv', 'env', 'node_modules',
    '.DS_Store', '.idea', '.mypy_cache', '.pytest_cache', '.vscode',
}

def generate_structure(start_path, prefix=""):
    entries = sorted(os.listdir(start_path))
    entries = [e for e in entries if e not in IGNORE_NAMES]
    
    for index, entry in enumerate(entries):
        full_path = os.path.join(start_path, entry)
        is_last = index == len(entries) - 1
        connector = "└── " if is_last else "├── "

        print(prefix + connector + entry)

        if os.path.isdir(full_path):
            extension = "    " if is_last else "│   "
            generate_structure(full_path, prefix + extension)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate file/folder structure of a project.")
    parser.add_argument("path", nargs="?", default=".", help="Root path of the project (default: current directory)")
    args = parser.parse_args()

    print(args.path)
    generate_structure(args.path)
