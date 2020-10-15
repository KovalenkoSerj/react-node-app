import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Link</h2>
            <p>Sliced Link: <a href={link.to} target='_blank' rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target='_blank' rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicked:  <strong>{link.clicks}</strong></p>
            <p>Created: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </>
    )
}