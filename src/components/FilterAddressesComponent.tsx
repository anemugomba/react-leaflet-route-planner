import React, {FC, useEffect, useRef, useState} from 'react';
import Place from "../models/PlacesResponse";
import RequestService from "../services/request.service";
import LoadingAnimationComponent from "./LoadingAnimationComponent";

type FilterAddressProps = {
    getAddress: (place: Place) => void
}
const FilterAddressesComponent: FC<FilterAddressProps> = ({getAddress}) => {

    const debounce = useRef<any>();
    const myRef = useRef<any>();

    const [places, setPlaces] = useState<Place[]>([]);
    const [place, setPlace] = useState<Place>();
    const [address, setAddress] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [clickedOutside, setClickedOutside] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onSearch = (ad: string) => {

        setAddress(ad);
        setError(false);

        clearTimeout(debounce.current)

        debounce.current = setTimeout(() => {

            if (ad.length > 5) {
                setLoading(true)
                RequestService.getAddresses(ad).then(res => {
                    if (res.status === 'OK') {
                        setPlaces(res.results)
                    }
                }).catch(() => {
                    setError(true);
                }).finally(() => setLoading(false))
            }

        }, 500)
    }

    const onItemClick = (item: Place) => {
        setPlace(place);
        setIsFocused(false);
        getAddress(item);
    }

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
            <label htmlFor="address">Type and select address {loading ? <LoadingAnimationComponent/> : null}</label>
            <input id="address"
                   className="input"
                   type="text"
                   value={address}
                   onFocus={() => setIsFocused(true)}
                   onChange={e => onSearch(e.target.value)}/>

            {error ? (
                <div style={{margin: '20px'}}>
                    <small style={{color: "red"}}>An error occurred please try again later</small>
                </div>
            ) : null}

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