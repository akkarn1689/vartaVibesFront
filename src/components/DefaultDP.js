import React from 'react'

const DefaultDP = ({ userId, username }) => {
    return (
        <div className='mx-2' style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'gray', color: 'white', textAlign: 'center', lineHeight: '24px' }}>
            <div className='text-center w-100'>{username[0]}</div>
        </div>
    )
}

export default DefaultDP