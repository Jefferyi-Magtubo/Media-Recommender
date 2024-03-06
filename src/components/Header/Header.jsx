import React from 'react'
import { NavLink, Outlet } from "react-router-dom"
import './Header.css'

export default function Header() {

    return(
        <>
            <header>
                <h1><NavLink></NavLink>Media Recommender</h1>
                <h2>Saved Media</h2>
            </header>
            <Outlet />
        </>
    )
}