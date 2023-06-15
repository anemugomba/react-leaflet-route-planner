import React, {FC, useEffect, useRef, useState} from 'react';
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


    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef<any>();

    const handleClickOutside = (e: any) => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(true);
            setIsFocused(false)
        }
    };

    const handleClickInside = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });


    return (
        <div className="addresses-root" ref={myRef} onClick={handleClickInside}>
            <label htmlFor="address">Type address here {clickedOutside ? 'Bye!' : 'Hello!'}</label>
            <input id="address"
                   className="input"
                   type="text"
                   value={address}
                   onFocus={() => setIsFocused(true)}
                   /*onBlur={() => {
                       setIsFocused(false)
                   }}*/
                   onChange={e => onSearch(e.target.value)}/>

            {(isFocused && places.length > 0) ? (
                <div className="addresses-list-container" onFocus={() => alert()}>
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