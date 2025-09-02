import os

# Names of folders/files to ignore
IGNORE_NAMES = {
    '__pycache__', '.git', '.venv', 'venv', 'env', 'node_modules',
    '.DS_Store', '.idea', '.mypy_cache', '.pytest_cache', '.vscode',
    '.next', '.cache', 'dist', 'build', '.turbo', '.vercel', '.parcel-cache',
    '.serverless', '.coverage', 'coverage', '.nyc_output', '.sass-cache',
}

# File extensions to ignore
IGNORE_EXTENSIONS = {
    '.log', '.tmp', '.lock', '.pyc', '.pyo', '.pack.gz', '.woff2', '.hot-update.js',
    '.map', '.jpg', '.jpeg', '.png', '.svg', '.webp', '.ico', '.ttf', '.eot', '.otf',
    '.gz', '.zip', '.tar', '.7z', '.rar',
}

# Partial filename matches (patterns or substrings)
IGNORE_PATTERNS = [
    'hot-update', 'manifest.json', 'chunk.js', 'polyfills.js',
    'trace', 'cache', 'stats.json', '.old'
]

def should_ignore(name: str) -> bool:
    if name in IGNORE_NAMES:
        return True

    _, ext = os.path.splitext(name)
    if ext in IGNORE_EXTENSIONS:
        return True

    for pattern in IGNORE_PATTERNS:
        if pattern in name:
            return True

    return False

def generate_structure(start_path, file_handle, prefix=""):
    try:
        entries = sorted(os.listdir(start_path))
    except (PermissionError, FileNotFoundError):
        return

    entries = [e for e in entries if not should_ignore(e)]
    
    for index, entry in enumerate(entries):
        full_path = os.path.join(start_path, entry)
        is_last = index == len(entries) - 1
        connector = "└── " if is_last else "├── "

        line = prefix + connector + entry
        file_handle.write(line + "\n")

        if os.path.isdir(full_path):
            extension = "    " if is_last else "│   "
            generate_structure(full_path, file_handle, prefix + extension)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate file/folder structure of a project.")
    parser.add_argument("path", nargs="?", default=".", help="Root path of the project (default: current directory)")
    parser.add_argument("-o", "--output", default="structure.txt", help="Output file name (default: structure.txt)")
    args = parser.parse_args()

    with open(args.output, "w", encoding="utf-8") as f:
        f.write(f"Project structure for: {args.path}\n\n")
        generate_structure(args.path, f)
