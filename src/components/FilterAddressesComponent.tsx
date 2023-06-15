import React, {FC, useRef, useState} from 'react';
import Place from "../models/PlacesResponse";
import RequestService from "../services/request.service";

type FilterAddressProps = {
    getAddress: (place: Place) => void
}
const FilterAddressesComponent: FC<FilterAddressProps> = ({getAddress}) => {

    const debounce = useRef<any>();

    const [places, setPlaces] = useState<Place[]>([]);
    const [place, setPlace] = useState<Place>();
    const [address, setAddress] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onSearch = (ad: string) => {

        setAddress(ad);

        clearTimeout(debounce.current)

        debounce.current = setTimeout(() => {

            if (ad.length > 5) {
                RequestService.getAddresses(ad).then(res => {
                    if (res.status === 'OK') {
                        setPlaces(res.results)
                    }
                })
            }

        }, 500)
    }

    const onItemClick = (item: Place) => {
        setPlace(place);
        setIsFocused(false);
        getAddress(item);
    }

    return (
        <div className="addresses-root">
            <input type="text"
                   value={address}
                   onFocus={() => setIsFocused(true)}
                   /*onBlur={() => setIsFocused(false)}*/
                   onChange={e => onSearch(e.target.value)}/>

            {(isFocused && places.length > 0) ? (
                <div className="addresses-list-container">
                    {places.map(pl => {
                        return (
                            <div className="address-item" key={pl.place_id} onClick={() => onItemClick(pl)}>
                                {pl.name} - {pl.formatted_address}
                            </div>
                        )
                    })}

                </div>
            ) : null}

        </div>
    )
}


export default FilterAddressesComponent;