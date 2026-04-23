import { useState } from 'react';
import './App.css';

function App() {
  // Predefined graph adjacency list
  const graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E']
  };

  // State variables
  const [startNode, setStartNode] = useState('A');
  const [visited, setVisited] = useState(new Set());
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [currentQueue, setCurrentQueue] = useState([]);
  const [currentStack, setCurrentStack] = useState([]);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Calculate number of nodes and edges
  const numNodes = Object.keys(graph).length;
  const numEdges = Object.values(graph).reduce((sum, neighbors) => sum + neighbors.length, 0) / 2;

  // Node positions for visualization (simple layout)
  const nodePositions = {
    A: { x: 150, y: 150 },
    B: { x: 300, y: 100 },
    C: { x: 300, y: 200 },
    D: { x: 450, y: 100 },
    E: { x: 450, y: 200 },
    F: { x: 600, y: 150 }
  };

  // Reset function
  const reset = () => {
    setVisited(new Set());
    setTraversalOrder([]);
    setCurrentQueue([]);
    setCurrentStack([]);
    setCurrentAlgorithm('');
    setIsRunning(false);
  };

  // BFS implementation
  const bfs = async (start) => {
    setIsRunning(true);
    setCurrentAlgorithm('BFS');
    const visitedSet = new Set();
    const queue = [start];
    const order = [];
    const queueHistory = [];

    visitedSet.add(start);
    order.push(start);

    while (queue.length > 0) {
      const current = queue.shift();
      setVisited(new Set(visitedSet));
      setTraversalOrder([...order]);
      setCurrentQueue([...queue]);
      queueHistory.push([...queue]);

      // Highlight current node
      await new Promise(resolve => setTimeout(resolve, 1000));

      for (const neighbor of graph[current]) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          queue.push(neighbor);
          order.push(neighbor);
        }
      }
    }

    setIsRunning(false);
  };

  // DFS implementation using recursion
  const dfsRecursive = async (node, visitedSet, order, stack) => {
    visitedSet.add(node);
    order.push(node);
    stack.push(node);

    setVisited(new Set(visitedSet));
    setTraversalOrder([...order]);
    setCurrentStack([...stack]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    for (const neighbor of graph[node]) {
      if (!visitedSet.has(neighbor)) {
        await dfsRecursive(neighbor, visitedSet, order, stack);
      }
    }

    stack.pop();
  };

  const dfs = async (start) => {
    setIsRunning(true);
    setCurrentAlgorithm('DFS');
    const visitedSet = new Set();
    const order = [];
    const stack = [];

    await dfsRecursive(start, visitedSet, order, stack);

    setIsRunning(false);
  };

  return (
    <div className="app">
      <h1>Interactive Graph Traversal Visualizer</h1>
      
      <div className="container">
        <div className="graph-section">
          <div className="graph-container">
            <svg width="800" height="300" viewBox="0 0 800 300" className="graph-svg">
              {/* Edges */}
              {Object.entries(graph).map(([node, neighbors]) =>
                neighbors.map(neighbor => {
                  const startPos = nodePositions[node];
                  const endPos = nodePositions[neighbor];
                  // Avoid drawing duplicate edges
                  if (node < neighbor) {
                    return (
                      <line
                        key={`${node}-${neighbor}`}
                        x1={startPos.x + 25}
                        y1={startPos.y + 25}
                        x2={endPos.x + 25}
                        y2={endPos.y + 25}
                        stroke="#666"
                        strokeWidth="2"
                      />
                    );
                  }
                  return null;
                })
              )}
              
              {/* Nodes */}
              {Object.keys(graph).map(node => {
                const pos = nodePositions[node];
                const isVisited = visited.has(node);
                const isStart = node === startNode;
                return (
                  <g key={node}>
                    <circle
                      cx={pos.x + 25}
                      cy={pos.y + 25}
                      r="25"
                      fill={isVisited ? '#4CAF50' : isStart ? '#FF9800' : '#2196F3'}
                      stroke="#000"
                      strokeWidth="2"
                    />
                    <text
                      x={pos.x + 25}
                      y={pos.y + 30}
                      textAnchor="middle"
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                    >
                      {node}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          
          <div className="controls">
            <div className="control-group">
              <label htmlFor="start-node">Starting Node:</label>
              <select
                id="start-node"
                value={startNode}
                onChange={(e) => setStartNode(e.target.value)}
                disabled={isRunning}
              >
                {Object.keys(graph).map(node => (
                  <option key={node} value={node}>{node}</option>
                ))}
              </select>
            </div>
            
            <div className="control-group">
              <button onClick={() => bfs(startNode)} disabled={isRunning}>Run BFS</button>
              <button onClick={() => dfs(startNode)} disabled={isRunning}>Run DFS</button>
              <button onClick={reset} disabled={isRunning}>Reset</button>
            </div>
          </div>
        </div>
        
        <div className="info-panel">
          <h2>Information</h2>
          <p><strong>Algorithm:</strong> {currentAlgorithm || 'None'}</p>
          <p><strong>Starting Node:</strong> {startNode}</p>
          <p><strong>Number of Nodes:</strong> {numNodes}</p>
          <p><strong>Number of Edges:</strong> {numEdges}</p>
          <p><strong>Time Complexity:</strong> O(V + E)</p>
          <p><strong>Data Structure:</strong> {currentAlgorithm === 'BFS' ? 'Queue' : currentAlgorithm === 'DFS' ? 'Recursion Stack' : 'None'}</p>
          
          <h3>Traversal Order:</h3>
          <p>{traversalOrder.join(' → ') || 'None'}</p>
          
          <h3>Current {currentAlgorithm === 'BFS' ? 'Queue' : 'Stack'}:</h3>
          <p>{currentAlgorithm === 'BFS' ? currentQueue.join(', ') : currentStack.join(', ') || 'Empty'}</p>
        </div>
      </div>
      
      <div className="explanation">
        <h2>How BFS and DFS Work</h2>
        <div className="explanation-section">
          <h3>Breadth First Search (BFS)</h3>
          <p>
            BFS explores the graph level by level. It starts from the root node and visits all the neighboring nodes at the current level before moving to the next level. 
            It uses a queue data structure to keep track of nodes to visit next. BFS is useful for finding the shortest path in an unweighted graph.
          </p>
        </div>
        <div className="explanation-section">
          <h3>Depth First Search (DFS)</h3>
          <p>
            DFS explores the graph by going as deep as possible along each branch before backtracking. It starts from the root node and explores as far as possible along each branch before backtracking. 
            It can be implemented using recursion or a stack. DFS is useful for topological sorting, detecting cycles, and solving puzzles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;