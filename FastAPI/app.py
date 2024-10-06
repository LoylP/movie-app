from fastapi import FastAPI, HTTPException, Query, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

base_path = "/home/loylp/project/movie-app/public/video"

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Movie API!"}

@app.get("/videos/{videourl}")
async def serve_specific_video(videourl: str):
    file_path = os.path.join(base_path, videourl)
    if not os.path.isfile(file_path):
        # print(f"File not found: {file_path}")
        raise HTTPException(status_code=404, detail="Video not found")

    response = FileResponse(file_path)
    response.headers["Accept-Ranges"] = "bytes" 
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("serve:app", host="0.0.0.0", port=8080, reload=True)

