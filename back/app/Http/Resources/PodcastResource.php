<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
class PodcastResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = Auth::user();
        $sortEpisode = $this->episodes->sortByDesc('date');
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'banner' => asset($this->banner),
            'category'=>new CategoryResource($this->category),
            'epizodes'=>EpisodeResource::collection($sortEpisode),
            'creators' => UserResource::collection($this->creators),
            'favorites'=> $user ? $user->myFavoritePodcasts->contains($this->id) : false,
        ];
    }
}
