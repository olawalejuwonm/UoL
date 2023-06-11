# START
# Initialize parameters
# and variables
# Iteration, t = t + 1
# Actors choose among
# alternatives
# Evaluation
# time
# No
# reached?
# Yes
# Explore alternatives for
# adaptation
# Terminate?
# Yes
# STOP

# Initialize parameters and variables
t = 0
T = 100
# Iteration, t = t + 1  
while t < T:
    # Actors choose among alternatives
    # Evaluation time
    # Explore alternatives for adaptation
    t = t + 1
    # Terminate?
    if t == T:
        break
# STOP

# BEGIN
# Normal
# Initialize parameters and variables
# to=0
# t = to
# Eval time, t₁ =?
# ref_count(i) = 0; i = 1,2,3...n
# cum_count(i) = 0; i = 1,2,3...n
# Alternative performance f1 = ?
# Alternative performance f2 = 1-f1
# Actor performance d1 = ?
# Actor performance d2 = 1-d1
# Alternative Adapt factor, p = ?
# Actor Adapt factor, q = ?
# Threshold Growth rate, y = ?
# Good enough, g = ?
# Note
# ?= input paramete
# RETURN

def initializeParameterAndVariable():
    # BEGIN
    # Normal
    # Initialize parameters and variables
    to = 0
    t = to
    # Eval time, t₁ =?
    t1 = input("Enter the evaluation time t1: ")
    ref_count = 0
    cum_count = 0
    # Alternative performance f1 = ? is input parameter
    f1 = input("Enter the alternative performance f1: ")
    # Alternative performance f2 = 1-f1
    f2 = 1 - f1
    # Actor performance d1 = ? is input parameter
    d1 = input("Enter the actor performance d1: ")
    # Actor performance d2 = 1-d1
    d2 = 1 - d1
    # Alternative Adapt factor, p = ? is input parameter
    p = input("Enter the alternative adapt factor p: ")
    # Actor Adapt factor, q = ? is input parameter
    q = input("Enter the actor adapt factor q: ")
    # Threshold Growth rate, y = ? is input parameter
    y = input("Enter the threshold growth rate y: ")
    # Good enough, g = ? is input parameter
    g = input("Enter the good enough g: ")
    # Note
    # ?= input paramete
    # RETURN



# BEGIN
# Do While Actors
# Determine the relative
# importance of features
# Acquire performance of
# alternatives relative to
# features
# Assess overall
# performance of
# alternatives
# Select highest
# performing alternative
# Satisfied?
# (score >= g)
# No
# Adapt_Actor
# More Actors?
# No
# RETURN

# BEGIN
if __name__ == 'main':
    # Do While Actors
    while True:
        # Determine the relative importance of features
        # Acquire performance of alternatives relative to features
        # Assess overall performance of alternatives
        # Select highest performing alternative
        # Satisfied?
        # (score >= g)
        # No
        # Adapt_Actor
        # More Actors?
        # No

        break
    # RETURN