<?php
 
 namespace App\Http\Controllers;

 use App\Models\User;
 use Illuminate\Http\Request;
 use App\Http\Resources\UserResource;
 use App\Http\Resources\PodcastResource;
 use Illuminate\Support\Facades\Auth;
 use Illuminate\Support\Facades\Log;
 use App\Models\Podcast;
 use Illuminate\Support\Facades\File;
 use Illuminate\Support\Facades\Storage;
 class UserController extends Controller
 {
     

    public function index(Request $request)
    {
        try {
           
            $users = User::whereIn('role', ['viewer', 'creator'])->get();
    
       
            return UserResource::collection($users);
    
        } catch (\Exception $e) {
            // Rukovanje greškom
            return response()->json([
                'message' => 'An error occurred while loading the user.',
                'error' => $e->getMessage()
            ], 500); 
        }
    }


    public function creators(Request $request){
       
        try {
           
            $users = User::where('role','creator')->get();
            return UserResource::collection($users);
    
        } catch (\Exception $e) {
            // Rukovanje greškom
            return response()->json([
                'message' => 'An error occurred while loading the user.',
                'error' => $e->getMessage()
            ], 500); 
        }
    
    }
    


   
    

    public function destroy($userId)
    {
        try {
            
            $user = User::findOrFail($userId);
            foreach ($user->myPodcasts as $podcast) {
                if ($podcast->creators()->count() == 1) {
                    $podcast->delete();
                } 
            }
            $user->delete();
            return response()->json([
                'message' => 'User successfully deleted.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while deleting the user.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
     


   


    public function creatorPodcasts(Request $request)
    {
       
        try{
            $perPage = $request->input('per_page', 5); 
            $user = Auth::user();
            $podcasts = $user->myPodcasts()->paginate($perPage);
            return PodcastResource::collection($podcasts);
        }catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching the podcast.',
                'error' => $e->getMessage(),
            ], 500);
        }
       
    }


    public function updateProfilePicture(Request $request){
        try{
            $request->validate([
                 'profile_picture'=> 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);
            if($request->hasFile('profile_picture')){

               $user = Auth::user();
                if (File::exists($user->profile_picture)) {
                    File::delete($user->profile_picture);
                }

                $user->profile_picture = $this->uploadLogo($request->file('profile_picture'), $user->username);
                $user->save();
            }

            return response()->json([
                'message' => 'User successfully updated.'
            ], 200);

            
          

            
        }catch (\Exception $e) {
            // Rukovanje greškom
            return response()->json([
                'message' => 'An error occurred while fetching the podcast.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function addToFavorites($id)
    {
        try {
           
            $user = Auth::user();
            $podcast = Podcast::findOrFail($id);

         
            if (!$user->myFavoritePodcasts->contains($podcast->id)) {
                $user->myFavoritePodcasts()->attach($podcast->id);
            }

           
            return response()->json(['message' => 'The podcast has been successfully added to favorites.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the podcast to favorites.','error'=> $e->getMessage()], 500);
        }
    }


    public function removeFavorite($id)
    {
        try {
            $user = Auth::user();
            $podcast = Podcast::findOrFail($id);
            $user->myFavoritePodcasts()->detach($podcast->id);
            return response()->json(['message' => 'The podcast has been successfully removed from favorites.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while removing the podcast from favorites.','error'=> $e->getMessage()], 500);
        }
    }


    private function uploadLogo($file, $username)
{
    // Sanitizovanje naziva za ime fajla
    $sanitizedusername = preg_replace('/[^a-zA-Z0-9_-]/', '_', $username);
    $extension = $file->getClientOriginalExtension();
    $filename = $sanitizedusername . '.' . $extension;

    // Putanja gde će se sačuvati logo
    $path = 'public/app/' . $sanitizedusername;

    // Provera da li direktorijum postoji, ako ne, pravi ga
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }
    $pathFile = $file->storeAs($path, $filename);
    return Storage::url($pathFile);
}


public function show($id){
    try{
        $user = User::findOrFail($id);
        return new UserResource($user);
    }catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching the user.','error'=> $e->getMessage()], 500);
        }
}

     
 }