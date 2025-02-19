<?php
 
namespace App\Http\Controllers;
 
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
 
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:creator,viewer',
            'profile_picture'=> 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
 
        if($validator->fails()){
            return response()->json(['success'=> false, 'data'=> $validator->errors()]);
        }

        $user = User::create([
            'username'=> $request->username,
            'email'=> $request->email,
            'password'=> Hash::make($request->password),
            'role'=> $request->role,
            'profile_picture'=>null
        ]);


        if($request->hasFile('profile_picture')){
          
           $user->profile_picture =  $this->uploadProfile($request->file('profile_picture'), $request->username);
        }
        $user->save();
        
 
        
 
        $token = $user->createToken('auth_token')->plainTextToken;
 
        return response()->json(['success'=>true,'data'=> $user, 'access_token'=> $token, 'token_type'=> 'Bearer']);
    }
 
    public function login(Request $request)
    {

        \Log::info('Login attempt: ', ['email' => $request->email, 'password' => $request->password]);
        
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['success'=> false]);
        }
 
        $user = User::where('email', $request['email'])->firstOrFail();
 
        $token = $user->createToken('auth_token')->plainTextToken;
 
        return response()->json(['success'=>true,'data'=> $user, 'access_token'=> $token, 'token_type'=> 'Bearer','role'=>$user->role]);
    }
 
    public function logout(Request $request)
    {
       $request->user()->tokens()->delete();
       return response()->json(['message'=> 'Successfully logged out!']);
    }



    private function uploadProfile($file, $username)
{
    $sanitizedusername = preg_replace('/[^a-zA-Z0-9_-]/', '_', $username);
    $extension = $file->getClientOriginalExtension();
    $filename = $sanitizedusername . '.' . $extension;

    $path = 'app/' . $sanitizedusername;
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }
    $pathFile = $file->storeAs($path, $filename,"public");
    return Storage::url($pathFile);
}
}