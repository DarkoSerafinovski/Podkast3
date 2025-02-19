<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use App\Models\Podcast;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Resources\EpisodeResource;


class EpisodeController extends Controller
{
    public function getFile($id)
    {
        try {
           
            $episode = Episode::findOrFail($id);
            $relativePath = $episode->file;
            $absolutePath = public_path($relativePath); 

    
            if (!File::exists($absolutePath)) {
                return response()->json(['error' => 'File does not exist'], 404);
            }
    
           
            return response()->stream(function () use ($absolutePath) {
                readfile($absolutePath);
            }, 200, [
                'Content-Type' => $episode->type,
                'Accept-Ranges' => 'bytes',
                'Content-Length' => filesize($absolutePath),
            ]);
        } catch (\Exception $e) {
            Log::error('Error occurred while loading file: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while loading the file.'], 500);
        }
    }


    public function show($id){
        try{
            $episode = Episode::findOrFail($id);
            return new EpisodeResource($episode);
        }catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while loading the episode.'], 500);
        }
    }


    public function store(Request $request)
    {
        try{
            Log::info('Request Data:', $request->all());


        $request->validate([
            'title' => 'required|string',
            'podcast_id' => 'required|exists:podcasts,id',
          
        ]);


        $user = Auth::user();
        $podcast = Podcast::findOrFail($request->podcast_id);

        if ($podcast->creators()->where('user_id', $user->id)->exists() || $user->role=="admin") {
          
     

        $file = $this->uploadFile($request->file('file'), $request->title,$podcast);
        $episode = Episode::create([
            'title' => $request->title,
            'date' =>now(),
            'podcast_id' => $request->podcast_id,
            'file'=>$file,
            'type'=>$request->file('file')->getMimeType()
        ]);
        return response()->json(['message' => 'The episode and file have been successfully saved'], 201);

    }
        else{
            return response()->json([
                'error' => 'You do not have permission to store episode.',
            ], 403); 
        }

        }
        catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while saving the episode and file.'], 500);
        }
    
    }
    
    private function uploadFile($file, $title,$podcast)
    {
        $originalExtension = $file->getClientOriginalExtension(); 
        $filename = $title . '.' . $originalExtension;
        $sanitizedtitle = preg_replace('/[^a-zA-Z0-9_-]/', '_', $podcast->title);

        $podcastPath = 'app/' . $sanitizedtitle;
        if (!Storage::exists($podcastPath)) {
             Storage::makeDirectory($podcastPath);
            }

            $sanitizedtitle = preg_replace('/[^a-zA-Z0-9_-]/', '_', $title);
            $path = $podcastPath . '/'. $sanitizedtitle;
            if(!Storage::exists($path))
            {
                Storage::makeDirectory($path);
            }
        
        $pathFile = $file->storeAs($path, $filename,"public");

        return Storage::url($pathFile); 
    }
    




}

