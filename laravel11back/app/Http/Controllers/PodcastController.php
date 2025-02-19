<?php

namespace App\Http\Controllers;

use App\Models\Podcast;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\PodcastResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;


class PodcastController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); 
        $idCategory = $request->input('category_id'); 
        $favorites = $request->input('favorites'); 
        Log::info($favorites);
     
      
        try {
            
            if ($favorites) {
              
                $user = Auth::user();
                
                $podkastiQuery = $user->myFavoritePodcasts();
              
            } else {
                $podkastiQuery = Podcast::query();
            }
    
       
            if ($idCategory) {
                $category = Category::find($idCategory);
    
                if (!$category) {
                    return response()->json([
                        'message' => 'Category not found.',
                    ], 404);
                }
    
              
                $podkastiQuery->whereHas('category', function ($query) use ($idCategory) {
                    $query->where('id', $idCategory);
                });
            }
    
            $podkasti = $podkastiQuery->orderBy('title', 'asc')->paginate($perPage);
            return PodcastResource::collection($podkasti);
    
        } catch (\Exception $e) {
            // Rukovanje greškom
            return response()->json([
                'message' => 'An error occurred while fetching the podcast.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    


    public function show($id)
    {
        try{
            $podkast = Podcast::findOrFail($id);
            Log::info($podkast);
            return new PodcastResource($podkast);
        }
        catch (\Exception $e) {
          
            return response()->json([
                'message' => 'An error occurred while fetching the podcast.',
                'error' => $e->getMessage(),
            ], 500);
        }
        
      
    }
    

    public function destroy($id)
    {
        try {
           
    
                  
            $user = Auth::user();
            $podcast = Podcast::findOrFail($id);
            if ($podcast->creators()->where('user_id', $user->id)->exists() || $user->role=='admin') {
               
         
          
    
            if ($podcast->banner) {
                $putanjaBanera = public_path($podcast->banner);
                $direktorijum = dirname($putanjaBanera);
                if (File::exists($direktorijum)) {
                    File::deleteDirectory($direktorijum);
                }
            }
    
          
            $podcast->delete();
    
            return response()->json(['message' => 'The podcast and all associated resources have been successfully deleted.'], 200);
        }

            else{
                return response()->json([
                    'error' => 'You do not have permission to remove podcasts.',
                ], 403); 
            }
        } catch (\Exception $e) {
            Log::error('Greška prilikom brisanja podcasta: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while deleting the podcast.', 'error' => $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
{
    try {
   


              
        $user = Auth::user();
        if($user->role!='creator'){
            return response()->json([
                'error' => 'You do not have permission to add podcast.',
            ], 403); 
        }

        // Validacija unetih podataka
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
            'creators' => 'required|array',
            'creators.*.id' => 'exists:users,id', // Svaki kreator mora da postoji u tabeli users
        ]);

        $podcast = Podcast::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'banner' => $this->uploadBanner($request->file('banner'), $request->title,null),

        ]);

        $creators = collect($request->creators)->pluck('id');
        $podcast->creators()->sync($creators);

       
        return response()->json([
            'message' => 'The podcast has been successfully saved'
        ], 201);
    } catch (\Exception $e) {
        // Greška pri obradi zahteva
        return response()->json([
            'message' => 'An error occurred while saving the podcast',
            'error' => $e->getMessage()
        ], 500);
    }
}

// Funkcija za upload logotipa
private function uploadBanner($file, $title,$podcast)
{
    if($podcast && $podcast->title!=$title){
        $putanjaBanera = public_path($podcast->banner);
        $direktorijum = dirname($putanjaBanera);
        if (File::exists($direktorijum)) {
            File::deleteDirectory($direktorijum);
        }
    }

    // Sanitizovanje naziva za ime fajla
    $sanitizedtitle = preg_replace('/[^a-zA-Z0-9_-]/', '_', $title);
    $extension = $file->getClientOriginalExtension();
    $filename = $sanitizedtitle . '.' . $extension;

    // Putanja gde će se sačuvati logo
    $path = 'app/' . $sanitizedtitle;

    // Provera da li direktorijum postoji, ako ne, pravi ga
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    $pathFile = $file->storeAs($path, $filename,"public");

    
    return Storage::url($pathFile);
}




}

    






