from fastapi import FastAPI
from typing import List, Optional, Dict
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from collections import deque, defaultdict

app = FastAPI()

class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[dict] = None

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def build_graph(nodes, edges) -> Dict[str, List[str]]:
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph.setdefault(edge.source, []).append(edge.target)
    return graph

def is_DAG_Kahn(nodes, edges) -> bool:
    if not nodes:
        return False
    graph = build_graph(nodes, edges)
    in_degree = {node.id: 0 for node in nodes}
    for edge in edges:
        in_degree[edge.target] += 1
    queue = deque([n for n in in_degree if in_degree[n] == 0])
    visited_count = 0
    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in graph.get(node, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return visited_count == len(nodes)

def recursive_find_cycle(nodes, edges):
    graph = build_graph(nodes, edges)
    visited = set()
    stack = set()
    path = []
    cycles = []
    def recurse(node):
        if node in stack:
            cycle_start_index = path.index(node)
            cycles.append(path[cycle_start_index:] + [node])
            return
        if node in visited:
            return
        visited.add(node)
        stack.add(node)
        path.append(node)
        for neighbor in graph.get(node, []):
            recurse(neighbor)
        stack.remove(node)
        path.pop()
    for node in graph:
        if node not in visited:
            recurse(node)
    return cycles

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Purpose": "RAG graph detector in a pipeline"}

@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelineRequest):
    is_dag = is_DAG_Kahn(payload.nodes, payload.edges)
    cycles = []
    if not is_dag:
        cycles = recursive_find_cycle(payload.nodes, payload.edges)
    return {
        "num_nodes": len(payload.nodes),
        "num_edges": len(payload.edges),
        "is_DAG": is_dag,
        "cycles": cycles,
        "message": (
            "Pipeline is a valid DAG"
            if is_dag
            else "Pipeline is NOT a DAG."
        ),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
