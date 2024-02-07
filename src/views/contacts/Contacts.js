import React, {useEffect, useState} from "react";
import AllGames from "../tables/ReactBootstrapTable";
import GeneralDetails from "../general-details/GeneralDetails";
import PCK from "../chat/Chat";
import { getAllGamesThunk } from "../../reducers/games";
import {useDispatch, useSelector} from "react-redux";
import Skins from "../Skins";
import {getAllGamesBtn, setGamesBtnAction, setGamesBtnSelectedAction} from "../../reducers/gamesBtn";


export default () => {
    const [row, setRow] = useState(null)
    const dispatch = useDispatch();

    const gamesBtn = useSelector(getAllGamesBtn);

    const setGamesBtn = (property) => {
        dispatch(setGamesBtnAction({...gamesBtn, [property]: !gamesBtn[property]}))
    }

    useEffect(() => {
        dispatch(getAllGamesThunk());
    }, [])

    return (
        <>
            {<div>
                {
                    gamesBtn.isSelected && <div className='mb-2'>
                        <button className={'btn-nav'} onClick={() => {
                            dispatch(setGamesBtnAction({
                                ...gamesBtn,
                                isGeneral: true,
                                isGames: false,
                                isPCK: false,
                                isSkins: false,
                            }))
                        }}>General details
                        </button>

                        <button className={'btn-nav'} onClick={() => {
                            dispatch(setGamesBtnAction({
                                ...gamesBtn,
                                isGeneral: false,
                                isGames: false,
                                isPCK: false,
                                isSkins: true,
                            }))
                        }}>Skins
                        </button>


                        <button className={'btn-nav'} onClick={() => {
                            dispatch(setGamesBtnAction({
                                ...gamesBtn,
                                isGeneral: false,
                                isGames: false,
                                isPCK: true,
                                isSkins: false,
                            }))
                        }}>PCK
                        </button>
                    </div>
                }
                {
                    gamesBtn.isGames &&
                    <AllGames setRow={setRow} setSelected={() => {
                        dispatch(setGamesBtnSelectedAction(true));
                        return ;
                        if (!row) {
                            dispatch(setGamesBtnSelectedAction(false));
                        }
                    }}
                              setGeneral={() => setGamesBtn("isGeneral")} setPCK={() => setGamesBtn("isPCK")}
                              setIsSkins={() => setGamesBtn("isSkins")} setGames={() => setGamesBtn("isGames")}/>
                }
                {
                    gamesBtn.isGeneral && <GeneralDetails row={row}/>
                }

                {
                    gamesBtn.isSkins && <Skins/>
                }

                {
                    gamesBtn.isPCK && <PCK/>
                }

            </div>}
        </>
    );
}
;
