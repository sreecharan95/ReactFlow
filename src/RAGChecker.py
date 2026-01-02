from fastapi import FastAPI, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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


def build_graph(nodes, edges):
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph.setdefault(edge.source, []).append(edge.target)
    return graph

origins = [
    "http://localhost:3000",
]

def is_dag(nodes, edges) -> bool:
    if (len(nodes) == 0 or len(edges) == 0):
        return False
    graphVals = build_graph(nodes, edges)
    visitedstack = set()
    currstack = set()
    def recursive_cycle_check(nodeId):
        if nodeId in currstack:
            return False
        if nodeId in visitedstack:
            return True
        visitedstack.add(nodeId)
        currstack.add(nodeId)
        for neighbor in graphVals.get(nodeId, []):
            if not recursive_cycle_check(neighbor):
                return False
        currstack.remove(nodeId)
        return True
    for nodeId in graphVals:
        if nodeId not in visitedstack:
            if not recursive_cycle_check(nodeId):
                return False
    return True

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],      
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelineRequest):
    isDAG = is_dag(payload.nodes, payload.edges)
    return {
        "num_nodes": len(payload.nodes),
        "num_edges": len(payload.edges),
        "is_DAG": isDAG,
        "message": "Pipeline is a valid DAG" if isDAG else "Pipeline is not a valid DAG"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
