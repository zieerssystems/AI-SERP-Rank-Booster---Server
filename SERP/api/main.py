from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CampaignInput(BaseModel):
    keywords: str
    domain_name: str
    search_engine: str

@app.post("/run-serp")
async def run_serp(data: CampaignInput):
    with open("input.txt", "w") as f:
        f.write(f"{data.search_engine}\n{data.keywords}\n{data.domain_name}")

    subprocess.Popen(["run_campaign.exe"], cwd="C:\\wamp64\\www\\SERP\\api")
    return {"message": "Campaign started"}
