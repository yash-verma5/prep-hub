import re

with open('src/content/computer-organization-architecture-module.json', 'r') as f:
    text = f.read()

# First, collapse all multiple backslashes into a single backslash temporarily
text = re.sub(r'\\+', r'\\', text)

# Now every backslash is a single backslash. 
# We need to double it if it is followed by something that is NOT a valid json escape.
# Valid json escapes for string: " \ / b f n r t
# But wait, if it's already a valid escape like \n (meaning a literal backslash followed by n),
# in LaTeX it might be \n or \text. If the original was \n in LaTeX, we need it to be \\n in JSON!
# Because in JSON, \n is a newline character, but in LaTeX we want the literal text \n.
# Actually, the best way is to replace ALL single backslashes with double backslashes,
# except for the ones used for quotes \", which were meant to escape the quote.
# Are there any other JSON escapes in the file? Newlines are actual \n strings or literal newlines?
# The file was created by me, and I used standard JSON formatting.

def replacer(match):
    # match.group(0) is \ followed by something
    c = match.group(1)
    if c == '"':
        return '\\"'
    else:
        # We want to double the backslash for everything else (e.g. \c -> \\c, \n -> \\n)
        return '\\\\' + c

text = re.sub(r'\\(.)', replacer, text)

with open('src/content/computer-organization-architecture-module.json', 'w') as f:
    f.write(text)

