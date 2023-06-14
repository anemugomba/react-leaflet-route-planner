export type PlacesResponse = {
    html_attributions: [],
    results: Place[],
    status: string,
}

export type LatitudeLongitude = { lat: number, lng: number }

export type Geometry = {
    location: LatitudeLongitude,
    viewport:
        {
            northeast: LatitudeLongitude,
            southwest: LatitudeLongitude,
        },
}

export type PlaceCode = {
    compound_code: string,
    global_code: string,
}
export type Place = {
    formatted_address: string,
    geometry:Geometry,
    icon: string,
    icon_background_color: string,
    icon_mask_base_uri: string,
    name: string,
    place_id: string,
    plus_code:PlaceCode,
    reference: string,
    types: string[],
}

export default Place;