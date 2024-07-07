from graphviz import Digraph

dot = Digraph(comment='Cypress Testing Flow')

# Defining the main activities as nodes
dot.node('A', 'Start')
dot.node('B', 'Visit Cronos')
dot.node('C', 'Fill Sign Up Form')
dot.node('D', 'Attempt to Register')
dot.node('E', 'Check Email Registered')
dot.node('F', 'Log In')
dot.node('G', 'Fill Sign In Form')
dot.node('H', 'Submit Log In')
dot.node('I', 'Navigate to Projects')
dot.node('J', 'Iterate Over Projects')
dot.node('K', 'Navigate to Calendar')
dot.node('L', 'Interact with Calendar Events')
dot.node('M', 'Log Out')

# Defining the transitions
dot.edge('A', 'B', 'Start Testing')
dot.edge('B', 'C', 'Access Sign Up Page')
dot.edge('C', 'D', 'Fill and Submit Form')
dot.edge('D', 'E', 'Registration Attempt')
dot.edge('E', 'F', 'Email Registered')
dot.edge('E', 'C', 'Email Not Registered')
dot.edge('F', 'G', 'Access Sign In Page')
dot.edge('G', 'H', 'Fill and Submit Form')
dot.edge('H', 'I', 'Login Successful')
dot.edge('I', 'J', 'Access Projects Page')
dot.edge('J', 'I', 'Iterate Completed')
dot.edge('H', 'K', 'Login Successful')
dot.edge('K', 'L', 'Access Calendar Page')
dot.edge('L', 'K', 'Interact Completed')
dot.edge('H', 'M', 'Login Successful')
dot.edge('M', 'A', 'Logout Completed')

# Render and display the graph inline
dot.render('/mnt/data/Cypress_Testing_Flow', format='png', cleanup=True)
'/mnt/data/Cypress_Testing_Flow.png'
