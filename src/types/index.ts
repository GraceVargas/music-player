
export type SpotifyResponse = {
  "album": {
    "album_type": string,
    "total_tracks": number,
    "available_markets": [
      string,
      string,
      string
    ],
    "external_urls": {
      "spotify": string
    },
    "href": string,
    "id": string,
    "images": [
      {
        "url": string,
        "height": number,
        "width": number
      }
    ],
    "name": string,
    "release_date": string,
    "release_date_precision": string,
    "restrictions": {
      "reason": string
    },
    "type": string,
    "uri": string,
    "artists": [
      {
        "external_urls": {
          "spotify": string
        },
        "href": string,
        "id": string,
        "name": string,
        "type": string,
        "uri": string
      }
    ]
  },
  "artists": [
    {
      "external_urls": {
        "spotify": string
      },
      "followers": {
        "href": string,
        "total": number
      },
      "genres": [
        string,
        string
      ],
      "href": string,
      "id": string,
      "images": [
        {
          "url": string,
          "height": number,
          "width": number
        }
      ],
      "name": string,
      "popularity": number,
      "type": string,
      "uri": string
    }
  ],
  "available_markets": [
    string
  ],
  "disc_number": number,
  "duration_ms": number,
  "explicit": false,
  "external_ids": {
    "isrc": string,
    "ean": string,
    "upc": string
  },
  "external_urls": {
    "spotify": string
  },
  "href": string,
  "id": string,
  "is_playable": false,
  "linked_from": object,
  "restrictions": {
    "reason": string
  },
  "name": string,
  "popularity": number,
  "preview_url": string,
  "track_number": number,
  "type": string,
  "uri": string,
  "is_local": false
}

export type SpotifyResponseArtist = {
    "external_urls": {
      "spotify": string
    },
    "followers": {
      "href": string,
      "total": number
    },
    "genres": string [],
    "href": string,
    "id": string,
    "images": [
      {
        "url": string,
        "height": number,
        "width": number
      }
    ],
    "name": string,
    "popularity": number,
    "type": string,
    "uri": string
  }


// export type SpotifyResponseArtistPartial = {
//         "external_urls": {
//           "spotify": string
//         },
//         "followers": {
//           "href": string,
//           "total": number
//         },
//         "genres": [
//           string,
//           string
//         ],
//         "href": string,
//         "id": string,
//         "images": [
//           {
//             "url": string,
//             "height": number,
//             "width": number
//           }
//         ],
//         "name": string,
//         "popularity": number,
//         "type": string,
//         "uri": string
//       }


export type SearchedTrack = {
    artistName: string,
    artistId: string,
    title: string,
    uri: string,
    albumUrl: string,
    album: string,
    albumId: string
  };


  export type SearchedArtist = {
    id: string,
    name: string,
    genres: string,
    followers: number,
    image: string,
  }
       
  

  export type User = {
      country: string,
      display_name: string,
      email: string,
      explicit_content: {
        filter_enabled: false,
        filter_locked: false
      },
      external_urls: {
        spotify: string
      },
      followers: {
        href: string,
        total: number
      },
      href: string,
      id: string,
      images: [
        {
          url: string,
          height: number,
          width: number
        }
      ],
      product: string,
      type: string,
      uri: string
    
  }