# Interactive Graph Traversal Visualizer

A React-based interactive visualizer for demonstrating Breadth First Search (BFS) and Depth First Search (DFS) algorithms on a graph.

## Features

- **Visual Graph Representation**: Nodes displayed as circles with connecting edges
- **Interactive Controls**: Select starting node, run BFS or DFS, reset
- **Step-by-Step Animation**: Highlights nodes as they are visited with delays
- **Real-Time Information**: Shows traversal order, current queue/stack, algorithm details
- **Educational Content**: Explanations of BFS and DFS algorithms

## Graph Structure

The predefined graph consists of 6 nodes (A, B, C, D, E, F) with the following adjacency list:
- A: B, C
- B: A, D, E
- C: A, F
- D: B
- E: B, F
- F: C, E

## Algorithms

### Breadth First Search (BFS)
- Uses a queue data structure
- Explores nodes level by level
- Time complexity: O(V + E)

### Depth First Search (DFS)
- Uses recursion (stack)
- Explores as deep as possible along each branch
- Time complexity: O(V + E)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. Select a starting node from the dropdown
2. Click "Run BFS" or "Run DFS" to start the traversal
3. Watch the animation as nodes are highlighted
4. View the traversal order and current data structure state in the info panel
5. Click "Reset" to clear and start over

## Technologies Used

- React 18
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

## Project Structure

```
src/
├── App.jsx      # Main component with graph logic
├── App.css      # Styling
└── main.jsx     # Entry point
```

## Learning Outcomes

This project demonstrates:
- Graph data structures (adjacency list)
- BFS and DFS traversal algorithms
- React state management
- Asynchronous programming with delays
- SVG for graph visualization
- Responsive UI design